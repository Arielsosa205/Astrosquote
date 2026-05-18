const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

exports.handler = async () => {
  return json(200, {
    configured: Boolean(SUPABASE_URL && ANON_KEY),
    supabaseUrl: SUPABASE_URL || "",
    supabaseAnonKey: ANON_KEY || ""
  });
};

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
