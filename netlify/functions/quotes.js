const crypto = require("crypto");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const TABLE = process.env.SUPABASE_QUOTES_TABLE || "quotes";

exports.handler = async (event) => {
  try {
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(503, { error: "Supabase is not configured yet." });
    }

    const context = await requestContext(event);

    if (event.httpMethod === "GET") {
      const params = new URLSearchParams(event.rawQuery || "");
      const id = params.get("id") || event.queryStringParameters?.id;
      if (id) return getQuote(id, context);
      return listQuotes(context);
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      return createQuote(body, context);
    }

    if (event.httpMethod === "PUT") {
      const body = JSON.parse(event.body || "{}");
      return updateQuote(body, context);
    }

    if (event.httpMethod === "DELETE") {
      const params = new URLSearchParams(event.rawQuery || "");
      const id = params.get("id") || event.queryStringParameters?.id;
      return deleteQuote(id, context);
    }

    return json(405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    return json(500, { error: error.message || "Unexpected error" });
  }
};

async function listQuotes(context) {
  if (context.guestToken) {
    const quote = await quoteByGuestToken(context.guestToken);
    return json(200, { quotes: quote ? [quote] : [] });
  }
  if (!context.userId) return json(401, { error: "Sign in required" });

  const select = "id,name,status,supplier_name,product_count,photo_count,total,created_at,updated_at";
  const url = `${SUPABASE_URL}/rest/v1/${TABLE}?owner_id=eq.${encodeURIComponent(context.userId)}&select=${select}&order=updated_at.desc`;
  const response = await supabaseFetch(url);
  if (!response.ok) return proxyError(response);
  const rows = await response.json();
  return json(200, {
    quotes: rows.map((row) => ({
      id: row.id,
      name: row.name,
      status: row.status,
      supplierName: row.supplier_name || "",
      products: [],
      product_count: row.product_count || 0,
      photo_count: row.photo_count || 0,
      total: Number(row.total || 0),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }))
  });
}

async function getQuote(id, context) {
  let url = `${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${encodeURIComponent(id)}&select=*&limit=1`;
  if (context.guestToken) {
    url += `&guest_token=eq.${encodeURIComponent(context.guestToken)}`;
  } else if (context.userId) {
    url += `&owner_id=eq.${encodeURIComponent(context.userId)}`;
  } else {
    return json(401, { error: "Sign in required" });
  }

  const response = await supabaseFetch(url);
  if (!response.ok) return proxyError(response);
  const rows = await response.json();
  if (!rows.length) return json(404, { error: "Quote not found" });
  return json(200, { quote: rowToQuote(rows[0]) });
}

async function createQuote(body, context) {
  if (!context.userId) return json(401, { error: "Sign in required" });
  const row = bodyToRow(body);
  row.owner_id = context.userId;
  if (body.share_with_guest) row.guest_token = createGuestToken();

  const response = await supabaseFetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(row)
  });
  if (!response.ok) return proxyError(response);
  const rows = await response.json();
  return json(200, { quote: rowToQuote(rows[0]) });
}

async function updateQuote(body, context) {
  if (!body.id) return json(400, { error: "Missing quote id" });
  const row = bodyToRow(body);
  let url = `${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${encodeURIComponent(body.id)}`;

  if (context.guestToken) {
    url += `&guest_token=eq.${encodeURIComponent(context.guestToken)}`;
  } else if (context.userId) {
    url += `&owner_id=eq.${encodeURIComponent(context.userId)}`;
    if (body.share_with_guest && !body.data?.guestToken && !body.guest_token) {
      row.guest_token = createGuestToken();
    }
  } else {
    return json(401, { error: "Sign in required" });
  }

  const response = await supabaseFetch(url, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(row)
  });
  if (!response.ok) return proxyError(response);
  const rows = await response.json();
  if (!rows.length) return json(404, { error: "Quote not found" });
  return json(200, { quote: rowToQuote(rows[0]) });
}

async function deleteQuote(id, context) {
  if (!id) return json(400, { error: "Missing quote id" });
  if (!context.userId || context.guestToken) return json(403, { error: "Owner sign-in required" });

  const response = await supabaseFetch(`${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${encodeURIComponent(id)}&owner_id=eq.${encodeURIComponent(context.userId)}`, {
    method: "DELETE",
    headers: { Prefer: "return=representation" }
  });
  if (!response.ok) return proxyError(response);
  const rows = await response.json();
  if (!rows.length) return json(404, { error: "Quote not found" });
  return json(200, { id });
}

async function quoteByGuestToken(token) {
  const url = `${SUPABASE_URL}/rest/v1/${TABLE}?guest_token=eq.${encodeURIComponent(token)}&select=*&limit=1`;
  const response = await supabaseFetch(url);
  if (!response.ok) return null;
  const rows = await response.json();
  return rows.length ? rowToQuote(rows[0]) : null;
}

async function requestContext(event) {
  const guestToken = getHeader(event, "x-guest-token") || event.queryStringParameters?.guest || "";
  if (guestToken) return { guestToken, userId: "", email: "" };

  const authorization = getHeader(event, "authorization");
  const accessToken = authorization?.replace(/^Bearer\s+/i, "");
  if (!accessToken || !ANON_KEY) return { guestToken: "", userId: "", email: "" };

  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: ANON_KEY,
        authorization: `Bearer ${accessToken}`
      }
    });
    if (!response.ok) throw new Error("Invalid token");
    const user = await response.json();
    return {
      guestToken: "",
      userId: user.id || "",
      email: user.email || ""
    };
  } catch (error) {
    return { guestToken: "", userId: "", email: "" };
  }
}

function bodyToRow(body) {
  return {
    name: String(body.name || "Quote"),
    status: String(body.status || "Draft"),
    supplier_name: String(body.supplier_name || body.supplierName || ""),
    product_count: Number(body.product_count || 0),
    photo_count: Number(body.photo_count || 0),
    total: Number(body.total || 0),
    data: body.data || {},
    updated_at: new Date().toISOString()
  };
}

function rowToQuote(row) {
  const data = row.data && typeof row.data === "object" ? row.data : {};
  return {
    ...data,
    id: row.id,
    name: row.name || data.name || "Quote",
    status: row.status || data.status || "Draft",
    supplierName: row.supplier_name || data.supplierName || "",
    guestToken: row.guest_token || data.guestToken || "",
    products: Array.isArray(data.products) ? data.products : [],
    createdAt: row.created_at || data.createdAt,
    updatedAt: row.updated_at || data.updatedAt
  };
}

async function supabaseFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      apikey: SERVICE_KEY,
      authorization: `Bearer ${SERVICE_KEY}`,
      "content-type": "application/json",
      ...(options.headers || {})
    }
  });
}

async function proxyError(response) {
  const text = await response.text();
  return json(response.status, { error: text || response.statusText });
}

function createGuestToken() {
  return crypto.randomBytes(24).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function getHeader(event, name) {
  const headers = event.headers || {};
  const key = Object.keys(headers).find((item) => item.toLowerCase() === name.toLowerCase());
  return key ? headers[key] : "";
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store"
    },
    body: JSON.stringify(body)
  };
}
