# AutoCare Design System

### Konsep Utama: Phantom UI
AutoCare menggunakan desain eksklusif bergaya **Phantom UI** yang mengandalkan efek elemen tembus pandang (glassmorphism), pendaran cahaya (neon glow), dan warna kontras untuk membedakan status aplikasi.

### Implementasi CSS Variables (Tailwind v4)
Aplikasi mendukung 2 mode utama yang dikendalikan oleh file `app/globals.css`:
1. **Dark Mode (Default & Utama)**: 
   - Latar belakang sangat gelap (`#0c1324`).
   - Elemen antarmuka beraksen biru cyan (neon glow).
   - Warna teks utama putih dengan sedikit kebiruan (`#dce1fb`).
2. **Light Mode**:
   - Latar belakang terang, bersih, dan bersih (`#fdfcff`).
   - Warna teks menjadi gelap abu-hitam (`#1a1c1e`) agar mudah dibaca.
   - Pendaran cahaya (glow) lebih diminimalisir agar tidak menyilaukan.

### Komponen Kunci (Utility Classes)
Anda wajib menggunakan class CSS khusus berikut saat membuat komponen baru untuk menjaga konsistensi:
- `.glass-panel`: Kotak transparan berblur `20px` dengan border tipis transparan. Digunakan untuk latar belakang Sidebar, Navbar, dan elemen statis.
- `.glass-panel-elevated`: Sama seperti `.glass-panel` namun dengan bayangan (`box-shadow`) yang lebih pekat, cocok untuk modal atau elemen melayang.
- `.text-glow`: Memberikan bayangan teks (text-shadow) berwarna cyan neon. Biasanya dipakai di judul halaman atau status "Aman".
- `.bg-grid-pattern`: Latar belakang berpola titik/kotak tipis yang terlihat elegan di belakang layout utama.

### Struktur Warna (Berdasarkan Status)
- **Primary / Aman (Cyan)**: `--sys-primary` (Digunakan saat kondisi kendaraan aman).
- **Error / Bahaya (Merah/Pink)**: `--sys-error` (Digunakan saat jadwal servis telah terlewat).
- **Surface / Latar Panel (Gelap/Terang)**: `--sys-surface-container-low` (Dasar dari semua `.glass-panel`).
