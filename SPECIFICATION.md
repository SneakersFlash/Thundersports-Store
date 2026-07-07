# ThunderSports Store — App Specification

> **Version:** 1.0  
> **Date:** 2026-06-25  
> **Stack:** Next.js 15 · React 19 · TypeScript 5 · Tailwind CSS 3

---

## 1. App Overview

ThunderSports Store adalah e-commerce storefront untuk toko sepatu dan perlengkapan olahraga premium Indonesia. Platform ini menjual produk dari brand ternama (Nike, Adidas, New Balance, dll.) dan menyediakan pengalaman belanja mobile-first dengan fitur event/flash sale, voucher, poin reward, dan lacak pengiriman.

---

## 2. Pages & Features

### 2.1 Public Pages (Tanpa Login)

| Route | Deskripsi |
|---|---|
| `/` | Homepage: hero banner, kategori shortcut, brand carousel, product sections by tag, event campaign, voucher claim |
| `/products` | Listing semua produk dengan filter & sort |
| `/products/[slug]` | Detail produk: galeri, pilih ukuran/varian, add to cart, buy now, related products |
| `/brands` | Halaman daftar semua brand |
| `/blog` | Listing artikel blog |
| `/blog/[slug]` | Detail artikel blog |
| `/events/[slug]` | Grid produk untuk event/campaign tertentu |
| `/about` | Halaman tentang perusahaan |
| `/contact-us` | Halaman kontak |
| `/faq` | Halaman tanya jawab |
| `/size-guide` | Panduan ukuran sepatu/pakaian |
| `/shipping` | Informasi pengiriman |
| `/privacy-policy` | Kebijakan privasi |
| `/term-condition` | Syarat & ketentuan |
| `/thunder-club` | Halaman program loyalitas Thunder Club |
| `/order-status` | Cek status pesanan tanpa login |

### 2.2 Auth Pages

| Route | Deskripsi |
|---|---|
| `/login` | Login email+password atau Google OAuth |
| `/register` | Registrasi akun baru (nama, email, password, nomor HP) |
| `/forgot-password` | Request reset password via email |
| `/verify-otp` | Verifikasi OTP untuk konfirmasi identitas |

### 2.3 Protected Pages (Login Wajib)

| Route | Deskripsi |
|---|---|
| `/account` | Dashboard akun: profil, poin, tier |
| `/account/edit` | Edit profil pengguna |
| `/account/addresses` | Manajemen daftar alamat |
| `/account/addresses/add` | Tambah alamat baru |
| `/account/addresses/[id]/edit` | Edit alamat tersimpan |
| `/account/orders` | Riwayat pesanan |
| `/account/my-vouchers` | Daftar voucher milik pengguna |
| `/checkout` | Proses checkout: pilih alamat, kurir, metode bayar, apply voucher/poin |
| `/orders/[id]` | Halaman pembayaran pending (VA / QRIS / deeplink) |
| `/orders/[id]/detail` | Detail pesanan lengkap + tracking pengiriman |
| `/orders/[id]/success` | Konfirmasi pesanan berhasil |

---

## 3. Core Feature Modules

### 3.1 Authentication & User

- Login lokal (email + password) dengan JWT Bearer token
- Login via Google OAuth (`@react-oauth/google`)
- Registrasi dengan OTP verification
- Forgot password flow
- Auth state disimpan di Zustand store (`authStore`)
- Auto logout on 401 response (interceptor Axios)
- Customer tier system (`customerTier`) dan poin reward (`pointsBalance`)

### 3.2 Product Catalog

- Listing produk dengan filter: kategori, brand, gender, tag, harga, ukuran
- Sort: terbaru, harga naik/turun, nama
- Pagination server-side
- Produk memiliki varian (SKU, ukuran, harga, stok, gambar)
- Dukungan flash sale / event price per varian (`specialPrice`, `eventQuotaLimit`)
- Wishlist per produk (requires login)
- Rating rata-rata dan jumlah review ditampilkan

### 3.3 Cart & Wishlist

- Cart disimpan di Zustand store (`cartStore`) — sidebar slide-out
- Wishlist sidebar slide-out (requires login)
- Validasi stok sebelum checkout
- "Buy Now" langsung ke checkout tanpa masuk cart

### 3.4 Checkout & Payment

- Pilih alamat tersimpan atau buat baru
- Kalkulasi ongkir via dua provider: **Lion Parcel** dan **Komerce**
- Metode pembayaran: Virtual Account (BNI/BRI/Permata/Mandiri), QRIS, GoPay, ShopeePay, Akulaku, Kartu Kredit
- Apply voucher diskon (persentase / nominal / gratis ongkir)
- Tukar poin reward (opsional)
- Response checkout berisi VA number / QR URL / deeplink sesuai metode

### 3.5 Order & Tracking

- Riwayat pesanan di akun pengguna
- Status pesanan real-time
- Tracking pengiriman via:
  - **Komerce / RajaOngkir** — kurir instant/same-day
  - **Lion Parcel** — kurir reguler
- Status mapping Lion Parcel ke label Indonesia (`lionParcelStatus.ts`)
- Cek status pesanan tanpa login via nomor pesanan

### 3.6 Voucher & Promotions

- Voucher claimable di homepage (sekali klaim per user)
- Welcome voucher otomatis saat registrasi
- Jenis diskon: `percentage`, `fixed_amount`, `free_shipping`
- Voucher selector di halaman checkout dengan validasi min. pembelian

### 3.7 Marketing & Content

- Hero banner dinamis dari CMS (`home_top`, `home_middle`)
- Event/Campaign section dengan countdown timer
- Category banner dengan gambar dari API
- Brand carousel
- Trust bar (promo strip)
- Blog dengan slug-based routing
- SEO: metadata per halaman, sitemap.ts

### 3.8 UI & Experience

- Dark mode support via `next-themes`
- Framer Motion untuk animasi halaman (`AnimatedPage`)
- Bottom navigation bar untuk mobile
- Chat widget (`ChatWidget`) — live support
- Toast notification via `sonner`
- Skeleton loading states untuk produk dan akun
- Filter modal untuk listing produk
- Leaflet map untuk pemilihan titik koordinat alamat

---

## 4. Tech Stack & Skill Set

### Frontend

| Layer | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router, SSR + SSG) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| UI Primitives | Radix UI (Dialog, Select, Checkbox, Slider, Toast, dll.) |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Map | Leaflet |
| Theme | next-themes (dark/light) |

### State & Data Fetching

| Layer | Teknologi |
|---|---|
| Server State | TanStack React Query v5 |
| Client State | Zustand v5 |
| HTTP Client | Axios (dengan interceptor JWT) |
| Form | React Hook Form + Zod validation |

### Auth

| Layer | Teknologi |
|---|---|
| Auth | JWT Bearer Token (in-memory via Zustand) |
| OAuth | Google OAuth via `@react-oauth/google` |

### Backend Integration

- REST API via `NEXT_PUBLIC_API_URL` (default: `http://localhost:3001`)
- Platform header `X-Platform: TS` dikirim di setiap request
- Timeout 15 detik per request

---

## 5. Data Models

### Product
```
id, name, slug, description, basePrice, salePrice, weightGrams, sku,
isActive, isFeatured, brand, categories[], images[], variants[],
activeEvent, wishlists[], tags[], ratingAvg, reviewCount
```

### ProductVariant
```
id, sku, size, price, stock, imageUrl[], isFlashSale, specialPrice,
eventQuotaLimit, eventQuotaSold
```

### User / UserProfile
```
id, email, firstName/lastName, phone, role (USER|ADMIN),
provider (LOCAL|GOOGLE|APPLE), customerTier, pointsBalance, createdAt
```

### UserAddress
```
id, label, recipientName, phone, addressLine,
provinceId, cityId, districtId, subdistrictId, postalCode,
isDefault, latitude, longitude
```

### Order / Checkout
```
cartItemIds[], address (CheckoutAddress), courier (name/service/cost),
paymentMethod, voucherCode?, usePoints?, pointsToRedeem?
→ response: orderNumber, vaNumber, qrCodeUrl, deeplinkUrl, expireTime
```

### Voucher
```
id, code, discountType (percentage|fixed_amount|free_shipping),
discountValue, minPurchaseAmount, maxDiscountAmount, expiresAt, isClaimed
```

---

## 6. Requirements

### Functional Requirements

- [x] User dapat browsing produk tanpa login
- [x] User dapat mendaftar dan login (lokal + Google)
- [x] User dapat menambah produk ke cart dan wishlist
- [x] User dapat checkout dengan pilihan alamat, kurir, dan metode bayar
- [x] User dapat menggunakan voucher dan poin saat checkout
- [x] User dapat melacak pengiriman pesanan
- [x] User dapat mengelola profil, alamat, dan riwayat pesanan
- [x] Admin konten dapat mengatur banner dan campaign via backend
- [x] Halaman SEO-ready dengan metadata dan sitemap

### Non-Functional Requirements

- Halaman homepage di-revalidate setiap **60 detik** (ISR)
- API timeout maksimal **15 detik**
- Gambar dioptimalkan via Next.js `Image` component dan ImageKit
- Mobile-first responsive design
- Produk listing dengan pagination server-side (tidak infinite scroll penuh)
- Error ditangani dengan fallback `catch(() => [])` di fetch SSR

---

## 7. Boundaries & Out of Scope

### In Scope (Storefront)

- Semua halaman dan fitur yang terdaftar di Section 2
- Manajemen cart, wishlist, checkout, pembayaran, tracking
- Manajemen akun pengguna dan alamat
- Tampilan konten marketing (banner, campaign, blog)

### Out of Scope (Ditangani di `thundersports-admin` / `thundersports-backend`)

- CRUD produk, kategori, brand
- Manajemen pesanan oleh admin (update status, refund)
- Upload dan manajemen banner/campaign
- Manajemen voucher oleh admin
- Laporan penjualan dan analytics
- Manajemen pengguna oleh admin
- Konfigurasi pengiriman dan tarif kurir
- Integrasi payment gateway (Midtrans) — hanya response dikonsumsi di storefront
- Integrasi kurir (Lion Parcel, Komerce) — hanya response tracking dikonsumsi

### Constraints

- Store hanya untuk role `USER`; user dengan role `ADMIN` tidak mendapatkan akses khusus di storefront
- Cart state tidak persistent ke server — hilang saat sesi browser ditutup
- Poin hanya bisa ditukarkan saat checkout, tidak bisa ditarik
- Voucher hanya satu per checkout
- Tidak ada fitur review/rating produk dari sisi store (hanya ditampilkan)
- Tidak ada fitur chat real-time — `ChatWidget` terhubung ke layanan eksternal

---

## 8. Folder Structure

```
src/
├── app/
│   ├── (auth)/          # Login, Register, OTP, Forgot Password
│   └── (main)/          # Semua halaman publik dan protected
├── components/
│   ├── address/         # Form dan card alamat
│   ├── auth/            # Komponen auth (form, banner)
│   ├── blog/            # Blog card
│   ├── cart/            # Cart sidebar
│   ├── chat/            # Chat widget
│   ├── common/          # Shared UI: pagination, loader, filter modal
│   ├── home/            # Section homepage: hero, carousel, product section, dll.
│   ├── layout/          # Navbar, Footer, MobileMenu, PageHeader
│   ├── order/           # Track order sheet
│   ├── product/         # ProductCard, ProductGrid, skeleton
│   ├── voucher/         # VoucherSelector, WelcomeVoucherPopup
│   └── wishlist/        # Wishlist sidebar
├── contexts/
│   └── AuthContext.tsx  # React context wrapper untuk auth state
├── lib/
│   ├── api/             # Service layer per domain (products, orders, cart, dll.)
│   ├── hooks/           # Custom React Query hooks
│   ├── store/           # Zustand stores (auth, cart)
│   └── utils/           # Helpers: cn, date, formatPrice, imageUrl
└── types/               # TypeScript interfaces per domain
```

---

## 9. Environment Variables

| Variable | Keterangan | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL backend API | `http://localhost:3001` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | — |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | — |

---

## 10. Development Commands

```bash
npm run dev          # Jalankan dev server (Next.js)
npm run build        # Build production
npm run start        # Jalankan production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check (tsc --noEmit)
```
