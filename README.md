# Thunder Sports — Store

Storefront pelanggan **Thunder Sports**, dibangun dengan Next.js (App Router).
Toko sepatu & perlengkapan olahraga premium Indonesia.

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3002](http://localhost:3002).

## Konfigurasi

Salin/atur `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_API_DOMAIN=localhost
NEXT_PUBLIC_SITE_URL=http://localhost:3002
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google-oauth-client-id>
```

## Tema

- Primary (Orange): `#FF5D01`
- Secondary (Biru): `#004F81`

Token warna: `src/app/globals.css` & `tailwind.config.ts`.
