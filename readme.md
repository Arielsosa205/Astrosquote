# Supplier Quotes Online App

This folder is ready to deploy to Netlify.

## What it does

- Creates quote history: `Quote 1`, `Quote 2`, etc.
- Opens old quotes from each signed-in user's History.
- Supports guest links that open only one quote.
- Saves products, product prices, freight, available sizes, available colors, size chart, quantities and totals.
- Uploads photos to Supabase Storage when online saving is configured.
- Works in local browser storage if Supabase/Netlify Functions are not configured yet.

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Paste and run `supabase-schema.sql`.
4. Go to Project Settings > API.
5. Copy:
   - Project URL
   - anon public key
   - service_role key
6. In Authentication > Providers > Email, enable Email signups and password login.
7. If you do not want confirmation emails, disable email confirmation in the Email provider settings.
8. In Authentication > URL Configuration, set the Site URL to your Netlify URL.
9. Add your Netlify URL to Redirect URLs.

## Netlify setup

Deploy this `online-app` folder to Netlify.

Then add these environment variables in Netlify:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- Optional alias: `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- Optional alias: `SUPABASE_SECRET_KEY`
- `SUPABASE_STORAGE_BUCKET` = `quote-images`

Redeploy after adding the variables.

Important: the `service_role` key must only be stored in Netlify environment variables. Never paste it into frontend JavaScript.

Existing online quotes created before user login was added do not have an `owner_id`.
Export/import them after signing in, or assign their `owner_id` manually in Supabase.

## Using the app

1. Open the deployed app.
2. Sign in with email and password, or keep working in Guest mode without an account.
3. Create `New quote`.
4. Add or paste photos.
5. Save.
6. Open old quotes from your own History.
7. Use `Guest link` to share one quote without exposing the rest of the history.

If the top chip says `Local mode`, the app is not connected to Supabase yet.
If it says `Guest mode`, you are working locally without an account.
If it says `Online saving`, it is saving to Supabase.
If it says `Guest quote`, the visitor can access only the quote from that link.
