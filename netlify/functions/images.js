const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "quote-images";

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed" });
    }
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(503, { error: "Supabase is not configured yet." });
    }

    const body = JSON.parse(event.body || "{}");
    if (!body.base64) return json(400, { error: "Missing image data" });

    const mimeType = String(body.mimeType || "image/jpeg");
    const ext = extensionFor(mimeType, body.filename);
    const path = `quotes/${new Date().toISOString().slice(0, 10)}/${Date.now()}-${randomToken()}.${ext}`;
    const bytes = Buffer.from(body.base64, "base64");

    if (bytes.length > 4_500_000) {
      return json(413, { error: "Image is too large after compression." });
    }

    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`;
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        authorization: `Bearer ${SERVICE_KEY}`,
        "content-type": mimeType,
        "x-upsert": "false"
      },
      body: bytes
    });

    if (!response.ok) {
      const text = await response.text();
      return json(response.status, { error: text || response.statusText });
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
    return json(200, { path, url: publicUrl });
  } catch (error) {
    console.error(error);
    return json(500, { error: error.message || "Unexpected error" });
  }
};

function extensionFor(mimeType, filename = "") {
  if (mimeType.includes("png")) return "png";
  if (mimeType.includes("webp")) return "webp";
  if (mimeType.includes("jpeg") || mimeType.includes("jpg")) return "jpg";
  const match = String(filename).toLowerCase().match(/\.([a-z0-9]{2,5})$/);
  return match ? match[1] : "jpg";
}

function randomToken() {
  return Math.random().toString(36).slice(2, 10);
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
