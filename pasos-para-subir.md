# Pasos para poner la app online

La carpeta que se sube es:

`online-app`

## 1. Crear Supabase

1. Entrar a Supabase y crear un proyecto.
2. Ir a **SQL Editor**.
3. Abrir el archivo `supabase-schema.sql`.
4. Copiar todo y ejecutarlo.

Eso crea:

- historial de presupuestos/quotes,
- separacion de historial por usuario,
- tokens para links de invitado,
- lugar para guardar los datos del pedido,
- bucket para fotos.

Nota: si ya tenias quotes online creados antes de esta version, esos registros no tienen `owner_id`.
Para conservarlos en un historial de usuario, conviene exportarlos antes e importarlos despues de ingresar,
o asignarles manualmente el `owner_id` del usuario en Supabase.

En Supabase, ir tambien a **Authentication > URL Configuration**:

1. En **Site URL**, poner la URL de Netlify.
2. En **Redirect URLs**, agregar esa misma URL.

## 2. Subir a Netlify

Lo ideal es subir esta carpeta con Netlify CLI o conectarla a GitHub.

Si usas GitHub:

1. Subir la carpeta `online-app` al repo.
2. En Netlify, crear un nuevo sitio desde ese repo.
3. En **Base directory**, poner: `online-app`
4. En **Publish directory**, poner: `.`
5. Las funciones quedan en: `netlify/functions`

## 3. Poner las claves en Netlify

En Netlify:

1. Ir a **Site configuration**.
2. Ir a **Environment variables**.
3. Agregar:

`SUPABASE_URL`

`SUPABASE_ANON_KEY`

Tambien sirve el nombre `SUPABASE_PUBLISHABLE_KEY` si estas usando la key nueva `sb_publishable_...`.

`SUPABASE_SERVICE_ROLE_KEY`

Tambien sirve el nombre `SUPABASE_SECRET_KEY` si estas usando la key nueva `sb_secret_...`.

`SUPABASE_STORAGE_BUCKET`

El valor de `SUPABASE_STORAGE_BUCKET` es:

`quote-images`

Importante: la `service_role key` va solo en Netlify, nunca dentro del HTML.
La `anon key` es publica y se usa para enviar el link de ingreso por email.

## 4. Redeploy

Despues de cargar las variables, hacer un nuevo deploy.

Cuando la app este bien conectada, arriba tiene que decir:

`Online saving`

Si dice:

`Local mode`

significa que todavia no esta conectada a Supabase.

## 5. Flujo de uso

1. Crear **New quote**.
2. Ingresar con email para tener historial propio.
3. Poner nombre, por ejemplo `Quote 1`.
4. Agregar fotos/productos.
5. Guardar con **Save**.
6. Abrir presupuestos anteriores desde **History**.
7. Usar **Guest link** para compartir solo ese presupuesto.
