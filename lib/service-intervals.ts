/**
 * Database rekomendasi interval servis kendaraan berdasarkan merk.
 * Data dikurasi dari sumber resmi pabrikan & panduan bengkel Indonesia.
 *
 * Sumber:
 * - astra-honda.com, yamaha-motor.co.id, suzuki.co.id
 * - auto2000.co.id, daihatsu.co.id, astra-daihatsu.id
 * - Buku manual pemilik kendaraan
 */

export interface ServiceInterval {
  brand: string
  type: 'motor' | 'mobil'
  oilChangeKm: number       // Interval ganti oli (km)
  oilChangeMonths: number   // Interval ganti oli (bulan)
  generalServiceKm: number  // Interval servis umum (km)
  generalServiceMonths: number // Interval servis umum (bulan)
  notes: string
}

export const serviceIntervals: ServiceInterval[] = [
  // === MOTOR ===
  {
    brand: 'Honda',
    type: 'motor',
    oilChangeKm: 2000,
    oilChangeMonths: 4,
    generalServiceKm: 4000,
    generalServiceMonths: 6,
    notes: 'Motor matic Honda disarankan ganti oli setiap 2.000 km. Motor sport/bebek bisa hingga 3.000 km.',
  },
  {
    brand: 'Yamaha',
    type: 'motor',
    oilChangeKm: 2000,
    oilChangeMonths: 4,
    generalServiceKm: 4000,
    generalServiceMonths: 6,
    notes: 'Yamaha merekomendasikan ganti oli setiap 2.000 km untuk matic, 3.000 km untuk sport.',
  },
  {
    brand: 'Suzuki',
    type: 'motor',
    oilChangeKm: 3000,
    oilChangeMonths: 4,
    generalServiceKm: 6000,
    generalServiceMonths: 6,
    notes: 'Suzuki menyarankan ganti oli setiap 3.000 km atau 4 bulan.',
  },
  {
    brand: 'Kawasaki',
    type: 'motor',
    oilChangeKm: 3000,
    oilChangeMonths: 6,
    generalServiceKm: 6000,
    generalServiceMonths: 6,
    notes: 'Kawasaki sport disarankan ganti oli setiap 3.000 km. Ninja series setiap 6.000 km dengan oli sintetis.',
  },
  {
    brand: 'TVS',
    type: 'motor',
    oilChangeKm: 3000,
    oilChangeMonths: 4,
    generalServiceKm: 5000,
    generalServiceMonths: 6,
    notes: 'TVS merekomendasikan ganti oli setiap 3.000 km.',
  },
  {
    brand: 'Vespa',
    type: 'motor',
    oilChangeKm: 2500,
    oilChangeMonths: 4,
    generalServiceKm: 5000,
    generalServiceMonths: 6,
    notes: 'Piaggio Vespa disarankan ganti oli setiap 2.500 km.',
  },
  {
    brand: 'KTM',
    type: 'motor',
    oilChangeKm: 5000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 12,
    notes: 'KTM dengan oli sintetis bisa hingga 5.000 km. Cek manual untuk model spesifik.',
  },
  {
    brand: 'Benelli',
    type: 'motor',
    oilChangeKm: 3000,
    oilChangeMonths: 6,
    generalServiceKm: 6000,
    generalServiceMonths: 6,
    notes: 'Benelli disarankan ganti oli setiap 3.000 km.',
  },

  // === MOBIL ===
  {
    brand: 'Toyota',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Toyota merekomendasikan servis berkala setiap 10.000 km. Untuk kondisi berat (macet, off-road), bisa 5.000 km.',
  },
  {
    brand: 'Honda',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Honda mobil disarankan ganti oli setiap 10.000 km dengan oli sintetis, atau 5.000 km dengan oli mineral.',
  },
  {
    brand: 'Daihatsu',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Daihatsu menyarankan servis rutin setiap 10.000 km atau 6 bulan.',
  },
  {
    brand: 'Mitsubishi',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Mitsubishi merekomendasikan ganti oli setiap 10.000 km dengan oli sintetis.',
  },
  {
    brand: 'Suzuki',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Suzuki mobil dengan interval servis 10.000 km atau 6 bulan.',
  },
  {
    brand: 'Nissan',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Nissan disarankan servis berkala setiap 10.000 km.',
  },
  {
    brand: 'Hyundai',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 15000,
    generalServiceMonths: 12,
    notes: 'Hyundai merekomendasikan ganti oli 10.000 km, servis umum 15.000 km.',
  },
  {
    brand: 'Wuling',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Wuling interval servis setiap 10.000 km atau 6 bulan.',
  },
  {
    brand: 'Mazda',
    type: 'mobil',
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 20000,
    generalServiceMonths: 12,
    notes: 'Mazda SkyActiv engine disarankan ganti oli setiap 10.000 km.',
  },
  {
    brand: 'BMW',
    type: 'mobil',
    oilChangeKm: 15000,
    oilChangeMonths: 12,
    generalServiceKm: 30000,
    generalServiceMonths: 24,
    notes: 'BMW Condition Based Service (CBS) dengan interval hingga 15.000 km.',
  },
  {
    brand: 'Mercedes-Benz',
    type: 'mobil',
    oilChangeKm: 15000,
    oilChangeMonths: 12,
    generalServiceKm: 25000,
    generalServiceMonths: 12,
    notes: 'Mercedes-Benz ASSYST service interval sekitar 15.000-25.000 km.',
  },
]

// Default intervals jika merk tidak ditemukan
export const defaultIntervals = {
  motor: {
    oilChangeKm: 2500,
    oilChangeMonths: 4,
    generalServiceKm: 5000,
    generalServiceMonths: 6,
    notes: 'Interval standar untuk motor: ganti oli setiap 2.500 km atau 4 bulan.',
  },
  mobil: {
    oilChangeKm: 10000,
    oilChangeMonths: 6,
    generalServiceKm: 10000,
    generalServiceMonths: 6,
    notes: 'Interval standar untuk mobil: ganti oli setiap 10.000 km atau 6 bulan.',
  },
}

export function getServiceRecommendation(brand: string, type: 'motor' | 'mobil') {
  const found = serviceIntervals.find(
    (si) => si.brand.toLowerCase() === brand.toLowerCase() && si.type === type
  )
  if (found) return found
  return { brand, type, ...defaultIntervals[type] }
}

/**
 * Cari merk kendaraan yang cocok berdasarkan keyword (autocomplete)
 */
export function searchBrands(query: string, type: 'motor' | 'mobil'): string[] {
  if (!query || query.length < 1) return []
  const q = query.toLowerCase()
  return serviceIntervals
    .filter((si) => si.type === type && si.brand.toLowerCase().includes(q))
    .map((si) => si.brand)
}

/**
 * Hitung estimasi KM dan tanggal berikutnya untuk servis
 */
export function calculateNextService(
  currentKm: number,
  lastServiceKm: number,
  lastServiceDate: Date,
  intervalKm: number,
  intervalMonths: number
) {
  const nextKm = lastServiceKm + intervalKm
  const nextDate = new Date(lastServiceDate)
  nextDate.setMonth(nextDate.getMonth() + intervalMonths)

  const kmRemaining = nextKm - currentKm
  const daysRemaining = Math.ceil(
    (nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  return {
    nextKm,
    nextDate,
    kmRemaining: Math.max(0, kmRemaining),
    daysRemaining: Math.max(0, daysRemaining),
    isOverdue: kmRemaining <= 0 || daysRemaining <= 0,
    isWarning: (kmRemaining > 0 && kmRemaining <= intervalKm * 0.2) || (daysRemaining > 0 && daysRemaining <= 14),
  }
}

export interface OilInterval {
  brand: string // keyword pencarian, misal: "motul", "shell ax7"
  vehicleType: 'motor' | 'mobil' | 'all'
  oilChangeKm: number
  oilChangeMonths: number
}

// Data interval rekomendasi berdasarkan merk/jenis oli
export const oilIntervals: OilInterval[] = [
  // --- MOTOR ---
  { brand: 'mpx', vehicleType: 'motor', oilChangeKm: 2500, oilChangeMonths: 4 },
  { brand: 'spx', vehicleType: 'motor', oilChangeKm: 4000, oilChangeMonths: 4 }, // Sintetik Honda
  { brand: 'yamalube super', vehicleType: 'motor', oilChangeKm: 4000, oilChangeMonths: 4 },
  { brand: 'yamalube', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 }, // Default Yamalube
  { brand: 'enduro racing', vehicleType: 'motor', oilChangeKm: 4000, oilChangeMonths: 4 },
  { brand: 'enduro', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 },
  { brand: 'motul 7100', vehicleType: 'motor', oilChangeKm: 5000, oilChangeMonths: 6 },
  { brand: 'motul 5100', vehicleType: 'motor', oilChangeKm: 4000, oilChangeMonths: 6 },
  { brand: 'motul scooter', vehicleType: 'motor', oilChangeKm: 4000, oilChangeMonths: 6 },
  { brand: 'motul', vehicleType: 'motor', oilChangeKm: 4000, oilChangeMonths: 6 }, // Default Motul motor
  { brand: 'shell advance ultra', vehicleType: 'motor', oilChangeKm: 5000, oilChangeMonths: 6 },
  { brand: 'shell advance ax7', vehicleType: 'motor', oilChangeKm: 4000, oilChangeMonths: 4 },
  { brand: 'shell advance ax5', vehicleType: 'motor', oilChangeKm: 2500, oilChangeMonths: 4 },
  { brand: 'shell', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 },
  { brand: 'castrol power', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 },
  { brand: 'idemitsu', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 },
  { brand: 'top1', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 },
  { brand: 'sgo', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 }, // Suzuki Genuine Oil
  { brand: 'bm1', vehicleType: 'motor', oilChangeKm: 3000, oilChangeMonths: 4 },
  
  // --- MOBIL ---
  { brand: 'fastron', vehicleType: 'mobil', oilChangeKm: 10000, oilChangeMonths: 6 },
  { brand: 'prima xp', vehicleType: 'mobil', oilChangeKm: 5000, oilChangeMonths: 6 },
  { brand: 'shell helix hx5', vehicleType: 'mobil', oilChangeKm: 5000, oilChangeMonths: 6 },
  { brand: 'shell helix', vehicleType: 'mobil', oilChangeKm: 10000, oilChangeMonths: 6 },
  { brand: 'castrol magnatec', vehicleType: 'mobil', oilChangeKm: 10000, oilChangeMonths: 6 },
  { brand: 'tmo', vehicleType: 'mobil', oilChangeKm: 10000, oilChangeMonths: 6 }, // Toyota Motor Oil
  { brand: 'honda pro', vehicleType: 'mobil', oilChangeKm: 10000, oilChangeMonths: 6 },
  { brand: 'mobil1', vehicleType: 'all', oilChangeKm: 10000, oilChangeMonths: 6 },
  { brand: 'mobil super', vehicleType: 'all', oilChangeKm: 10000, oilChangeMonths: 6 },
  { brand: 'motul', vehicleType: 'mobil', oilChangeKm: 10000, oilChangeMonths: 6 },
  { brand: 'idemitsu', vehicleType: 'mobil', oilChangeKm: 10000, oilChangeMonths: 6 },
];

/**
 * Mencari rekomendasi interval oli berdasarkan input free-text dari user.
 * Menggunakan fuzzy matching keyword dengan mengambil keyword terpanjang yang cocok.
 */
export function getOilRecommendation(inputBrand: string | null | undefined, vehicleType: 'motor' | 'mobil') {
  if (!inputBrand) return null;
  const query = inputBrand.toLowerCase();
  
  let bestMatch: OilInterval | null = null;
  for (const interval of oilIntervals) {
    if (interval.vehicleType !== 'all' && interval.vehicleType !== vehicleType) continue;
    
    // Jika user mengetik string yang mengandung keyword (contoh: "oli motul 5100" mengandung "motul 5100")
    if (query.includes(interval.brand)) {
        if (!bestMatch || interval.brand.length > bestMatch.brand.length) {
            bestMatch = interval;
        }
    }
  }
  
  if (bestMatch) {
    return {
       oilChangeKm: bestMatch.oilChangeKm,
       oilChangeMonths: bestMatch.oilChangeMonths,
       matchedKeyword: bestMatch.brand
    };
  }
  return null; // Fallback jika tidak ada merk yang cocok
}
