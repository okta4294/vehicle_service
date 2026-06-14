# Agent Instructions

**IMPORTANT:** File ini berisi instruksi mutlak untuk AI Assistant. Patuhi dengan ketat!

### Deskripsi Proyek
AutoCare adalah aplikasi pemantauan jadwal servis dan ganti oli kendaraan (Next.js 15, Prisma, Tailwind v4) bergaya *Phantom UI* (Glassmorphism & Neon Glow).

### Perintah Utama (Key Commands)
- Menjalankan server lokal: `npm run dev`
- Membuat migrasi database: `npx prisma db push`
- Generate Prisma Client: `npx prisma generate`

### Peringatan Khusus (Caveats)
- **! CRITICAL:** Desain utama aplikasi adalah *Dark Mode* (Phantom UI). Semua perubahan antarmuka *wajib* menyesuaikan variabel warna di `app/globals.css` (`:root` untuk Light Mode, `.dark` untuk Dark Mode).
- **! CRITICAL:** Komponen interaktif yang menggunakan parameter URL (seperti `useSearchParams`) di *Client Component* wajib dibungkus dengan `<Suspense>` agar tidak memblokir render sisi server (SSR).

### Referensi
- Untuk mengubah struktur tabel atau relasi database, baca: `prisma/schema.prisma`
- Untuk pedoman desain spesifik, baca: `design.md`
