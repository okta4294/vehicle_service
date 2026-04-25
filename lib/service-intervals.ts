import { prisma } from './prisma';

/**
 * Default intervals jika merk tidak ditemukan
 */
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

export async function getServiceRecommendation(brand: string, type: 'motor' | 'mobil') {
  const found = await prisma.serviceInterval.findFirst({
    where: {
      brand: { equals: brand, mode: 'insensitive' },
      type,
    }
  });

  if (found) return found;
  return { brand, type, ...defaultIntervals[type] };
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
  const nextKm = lastServiceKm + intervalKm;
  const nextDate = new Date(lastServiceDate);
  nextDate.setMonth(nextDate.getMonth() + intervalMonths);

  const kmRemaining = nextKm - currentKm;
  const daysRemaining = Math.ceil(
    (nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return {
    nextKm,
    nextDate,
    kmRemaining: Math.max(0, kmRemaining),
    daysRemaining: Math.max(0, daysRemaining),
    isOverdue: kmRemaining <= 0 || daysRemaining <= 0,
    isWarning: (kmRemaining > 0 && kmRemaining <= intervalKm * 0.2) || (daysRemaining > 0 && daysRemaining <= 14),
  };
}

/**
 * Mencari rekomendasi interval oli berdasarkan input free-text dari user.
 * Menggunakan fuzzy matching keyword dengan mengambil keyword terpanjang yang cocok.
 */
export async function getOilRecommendation(inputBrand: string | null | undefined, vehicleType: 'motor' | 'mobil') {
  if (!inputBrand) return null;
  const query = inputBrand.toLowerCase();
  
  // Mengambil semua interval oli untuk filter di memori karena kita butuh logika includes
  const allIntervals = await prisma.oilInterval.findMany({
    where: {
      OR: [
        { vehicleType },
        { vehicleType: 'all' }
      ]
    }
  });
  
  let bestMatch: typeof allIntervals[0] | null = null;
  for (const interval of allIntervals) {
    if (query.includes(interval.brand.toLowerCase())) {
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

export async function getAllOilBrands(vehicleType: 'motor' | 'mobil') {
  const intervals = await prisma.oilInterval.findMany({
    where: {
      OR: [
        { vehicleType },
        { vehicleType: 'all' }
      ]
    },
    select: { brand: true }
  });
  return Array.from(new Set(intervals.map(o => o.brand)));
}
