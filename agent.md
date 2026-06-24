# Agent Instructions

**IMPORTANT:** File ini berisi instruksi mutlak untuk AI Assistant. Patuhi dengan ketat!

### Deskripsi Proyek
AutoCare adalah aplikasi pemantauan jadwal servis dan ganti oli kendaraan (Next.js 16, Prisma, Tailwind v4) bergaya *Precision Automotive* — solid minimalism dengan palet Electric Blue, tanpa glassmorphism.

### Struktur Aplikasi

```
D:\gabut\servis-monitor\
├── app/
│   ├── layout.tsx            # Root layout (Montserrat + Inter font, ThemeProvider)
│   ├── page.tsx              # Landing page (server, redirect ke /dashboard jika login)
│   ├── HomePageClient.tsx    # Landing page (client, navbar solid + hero grid)
│   ├── globals.css           # CSS variables warna/font/typography + utility classes
│   ├── login/
│   │   └── page.tsx          # Login/Register (client, useActionState)
│   ├── dashboard/
│   │   ├── layout.tsx        # Dashboard layout (Navigation sidebar + main wrapper)
│   │   ├── page.tsx          # Daftar kendaraan (server, search, grid cards)
│   │   ├── VehicleSearch.tsx # Search bar (client, debounce + useSearchParams)
│   │   ├── history/
│   │   │   └── page.tsx      # Riwayat servis semua kendaraan
│   │   └── vehicles/
│   │       ├── [id]/
│   │       │   ├── page.tsx         # Detail kendaraan + estimasi servis + riwayat
│   │       │   └── AddServiceForm.tsx # Form tambah riwayat servis
│   │       └── new/
│   │           └── page.tsx  # Form tambah kendaraan baru
│   ├── actions/
│   │   ├── auth.ts           # Server Actions: login, register, logout
│   │   ├── vehicles.ts       # Server Actions: create, updateKm, delete
│   │   └── services.ts       # Server Actions: addServiceRecord, deleteServiceRecord
│   └── components/           # (kosong, Navbar.tsx sudah dihapus)
├── components/
│   ├── Navigation.tsx         # Sidebar (desktop fixed w-64) + Mobile nav + hamburger menu
│   ├── ThemeProvider.tsx       # next-themes wrapper
│   └── ThemeToggle.tsx        # Tombol dark/light mode
├── lib/
│   ├── prisma.ts              # Prisma client singleton (global caching)
│   ├── auth.ts                # JWT session (jose) + cookies
│   └── service-intervals.ts   # Kalkulasi interval servis + rekomendasi oli
├── prisma/
│   └── schema.prisma          # Model: User, Vehicle, ServiceRecord, ServiceInterval, OilInterval
├── design.md                  # Design system documentation
└── agent.md                   # (file ini)
```

### Layout System
- **Root** (`app/layout.tsx`): ThemeProvider (class-based), Toaster, SpeedInsights, Montserrat+Inter font
- **Dashboard** (`app/dashboard/layout.tsx`): `<Navigation />` sidebar (fixed, w-64 desktop) + `main` wrapper dengan `pt-16 md:pt-0 md:pl-64`
- Setiap halaman dashboard otomatis mendapat padding sidebar dari layout — jangan tambah `md:pl-64` manual

### Navigation (`components/Navigation.tsx`)
- Client component dengan `useState` untuk hamburger toggle
- **Desktop**: Sidebar fixed w-64, bg-surface-container, border-r outline-variant
- **Mobile**: Top navbar h-16, bg-surface, hamburger icon → sidebar slide dari kiri
- Menu: Dashboard, History
- Bawah: User avatar + Logout form (server action)

### Perintah Utama (Key Commands)
- Menjalankan server lokal: `npm run dev`
- Membuat migrasi database: `npx prisma db push`
- Generate Prisma Client: `npx prisma generate`

### Peringatan Khusus (Caveats)
- **! CRITICAL:** Desain utama = *Dark Mode* (Precision Automotive). Warna di `app/globals.css` — `:root` untuk dark mode (default), `:root:not(.dark)` untuk light mode.
- **! CRITICAL:** Font utama = **Montserrat** (semua level: display, headline, body, label). Jangan pakai Sora, JetBrains Mono. Inter masih di-load untuk fallback. CSS variable: `--font-montserrat`.
- **! CRITICAL:** DILARANG pakai glassmorphism — tidak ada `backdrop-filter`, `glass-panel`, `text-glow`, `bg-grid-pattern`. Semua komponen pakai solid background (`bg-surface-container-low` / `bg-surface-container`).
- **! CRITICAL:** DILARANG pakai `shadow-[0_0_...]` glow atau `drop-shadow-[...]` glow. Hanya pakai shadow solid Tailwind standar (`shadow-sm`, `shadow-md`).
- **! CRITICAL:** Semua cards & containers harus solid: `bg-surface-container-low border border-outline-variant rounded-lg`. Jangan pakai `glass-panel`.
- **! CRITICAL:** Komponen interaktif dengan `useSearchParams` WAJIB dibungkus `<Suspense>`.
- **! CRITICAL:** DILARANG template literal untuk class Tailwind dinamis. Pakai mapping object eksplisit.
- **! CRITICAL:** DILARANG hardcode credential DB. `DATABASE_URL` hanya di `.env`.
- **! CRITICAL:** Prisma singleton: `globalForPrisma.prismaFresh ?? createPrismaClient()`.
- **! CRITICAL:** Jangan tinggalkan file unused. Hapus jika tidak di-import manapun.
- **! CRITICAL:** Class CSS hanya dari Precision Automotive system (`surface-container-*`, `primary`, `error`, `tertiary`, `outline-variant`, dll). Jangan pakai `dark-*`, `brand-*`, `glass-card`.
- **! CRITICAL:** Typography: `font-display-lg`/`text-display-lg` (48px), `font-headline-lg`/`text-headline-lg` (32px), `font-body-md`/`text-body-md` (16px), `font-label-sm`/`text-label-sm` (12px), `font-label-md`/`text-label-md` (14px). Semua Montserrat.

### Server Action Pattern
- Gunakan `'use server'` di file `app/actions/*.ts`
- Untuk form: `useActionState(serverAction, initialState)` di client
- Redirect dari server action → handle otomatis oleh Next.js
- Return `{ error: string }` untuk error, redirect untuk success
- Jika Server Action melakukan `redirect()`, jangan pakai `useActionState` — pakai manual form submit + `useState` untuk error

### Referensi
- Database schema: `prisma/schema.prisma`
- Design system: `design.md`
