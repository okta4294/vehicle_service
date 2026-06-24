# AutoCare Design System — Precision Automotive

### Konsep Utama: Solid Minimalism + Electric Blue
Desain **Precision Automotive** — minimalis solid tanpa glassmorphism. Background navy gelap (#051424) dengan aksen Electric Blue (#b0c6ff). Komponen menggunakan solid background + border tipis. Tidak ada efek transparan/glass/blur.

### Mode Warna
Dark mode adalah default (`:root`). Light mode di `:root:not(.dark)`.
| Token | Dark | Light |
|-------|------|-------|
| `--sys-background` | `#051424` | `#fdfcff` |
| `--sys-primary` | `#b0c6ff` (light blue) | `#0058ca` (dark blue) |
| `--sys-on-surface` | `#d5e4fa` | `#1a1c1e` |
| `--sys-surface` | `#051424` | `#fdfcff` |
| `--sys-surface-container-low` | `#0e1c2d` | `#f0f2f5` |
| `--sys-surface-container` | `#122031` | `#f1f2f6` |
| `--sys-surface-container-high` | `#1d2b3c` | `#e2e4ea` |
| `--sys-outline-variant` | `#424654` | `#c4c6d0` |
| `--sys-error` | `#ffb4ab` | `#ba1a1a` |
| `--sys-tertiary` | `#89ceff` | `#009ada` |

### Tipografi (Montserrat)
Semua level teks pakai **Montserrat** (400/500/600/700 weight). Di-load via `next/font/google`.
| Level | Size/LineH | Weight | Letter-spacing |
|-------|-----------|--------|---------------|
| `display-lg` | 48px/56px | 700 | -0.02em |
| `headline-lg` | 32px/40px | 600 | -0.01em |
| `headline-lg-mobile` | 24px/32px | 600 | — |
| `headline-md` | 24px/32px | 600 | — |
| `body-lg` | 18px/28px | 400 | — |
| `body-md` | 16px/24px | 400 | — |
| `label-md` | 14px/20px | 600 | 0.05em |
| `label-sm` | 12px/16px | 500 | — |

### Komponen Layout

#### Cards & Containers
- **Card standar**: `bg-surface-container-low border border-outline-variant rounded-lg p-4`
- **Card elevated**: `bg-surface-container-high border border-outline-variant rounded-lg p-4`
- **Form card**: `bg-surface-container-low border border-surface-container-high rounded-lg p-6`

#### Sidebar (Navigation.tsx)
- Desktop: fixed w-64, `bg-surface-container border-r border-outline-variant`
- Mobile: top navbar h-16, `bg-surface border-b border-outline-variant` + hamburger menu
- Menu items: `flex items-center gap-4 p-2 rounded-lg`, hover: `bg-surface-container-high`
- Active item: `bg-secondary-container text-on-secondary-container`

#### Tombol
- **Primary**: `bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded`
- **Ghost**: `bg-transparent text-primary font-label-md text-label-md px-4 py-2 rounded border border-outline`
- **Hover**: `hover:bg-primary-fixed` (primary), `hover:bg-surface-container-low` (ghost)

#### Input
- `w-full bg-surface border border-surface-container-high rounded p-2 pl-3 font-body-md text-body-md`
- Focus: `focus:border-primary focus:outline-none`

#### Status Chip
- `flex items-center gap-1 px-2 py-1 border rounded-full bg-surface`
- Dot: `w-2 h-2 rounded-full bg-{color}`
- Text: `font-label-sm text-label-sm uppercase tracking-wider`

### Utility Classes (masih ada di globals.css tapi tidak dipakai komponen)
- `.glass-panel`, `.glass-panel-elevated`, `.text-glow`, `.bg-grid-pattern` — masih didefinisikan di `globals.css` tapi **tidak digunakan** komponen manapun.

### Aturan Penting
1. **Solid, bukan glass**: Semua komponen pakai `bg-*` solid. NO backdrop-filter, NO glass-panel.
2. **NO glow effects**: Jangan pakai `shadow-[0_0_...rgba(...)]` atau `drop-shadow-[0_0_...]`.
3. **Border konsisten**: `border border-outline-variant` untuk cards/containers.
4. **Rounded konsisten**: `rounded-lg` (8px) untuk cards, `rounded` (4px) untuk buttons/input.
5. **Typography Montserrat**: Semua level head/body/label pakai Montserrat.
