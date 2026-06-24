'use client'

import Link from 'next/link'
import { createVehicle } from '@/app/actions/vehicles'
import { useState } from 'react'

export default function NewVehiclePage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const result = await createVehicle(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="p-6 flex-1 flex flex-col max-w-7xl mx-auto w-full">
      <div className="max-w-2xl w-full">
      <div className="mb-6">
        <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-2 mb-4 font-body-md text-body-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Kembali
        </Link>
        <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface tracking-tight">Tambah Kendaraan</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Masukkan detail kendaraanmu untuk mulai melacak riwayat servis.</p>
      </div>

      <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="type" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Tipe Kendaraan *</label>
              <select 
                id="type" 
                name="type" 
                required
                className="w-full px-4 py-3 bg-surface-container/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-on-surface transition-all appearance-none"
              >
                <option value="motor">🏍️ Sepeda Motor</option>
                <option value="mobil">🚗 Mobil</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="brand" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Merk *</label>
              <input 
                id="brand" 
                name="brand" 
                type="text" 
                required
                placeholder="Cth: Honda, Toyota, Yamaha"
                className="w-full px-4 py-3 bg-surface-container/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-on-surface transition-all"
              />
              <p className="text-xs text-on-surface-variant mt-1">Isi manual merk kendaraanmu.</p>
            </div>
            
            <div>
              <label htmlFor="model" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Model *</label>
              <input 
                id="model" 
                name="model" 
                type="text" 
                required
                placeholder="Cth: Vario 160, Avanza, NMAX"
                className="w-full px-4 py-3 bg-surface-container/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-on-surface transition-all"
              />
            </div>

            <div>
              <label htmlFor="plateNumber" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Nomor Polisi</label>
              <input 
                id="plateNumber" 
                name="plateNumber" 
                type="text" 
                placeholder="Cth: B 1234 ABC"
                className="w-full px-4 py-3 bg-surface-container/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-on-surface transition-all uppercase"
              />
            </div>

            <div>
              <label htmlFor="currentKm" className="block font-label-sm text-label-sm text-on-surface-variant mb-2">Kilometer Saat Ini</label>
              <div className="relative">
                <input 
                  id="currentKm" 
                  name="currentKm" 
                  type="number" 
                  min="0"
                  defaultValue="0"
                  className="w-full pl-4 pr-12 py-3 bg-surface-container/50 border border-outline-variant rounded-lg focus:outline-none focus:border-primary text-on-surface font-mono transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">km</span>
              </div>
            </div>
          </div>

          {error && <div className="p-4 bg-error-container/20 border border-error/20 text-error rounded-lg font-body-md text-body-md">{error}</div>}

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/5">
            <Link href="/dashboard" className="px-6 py-3 text-on-surface-variant hover:text-on-surface font-body-md text-body-md transition-colors">
              Batal
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-lg font-label-sm text-label-sm font-bold transition-all hover:opacity-90 disabled:opacity-70 flex items-center gap-2 tracking-widest shadow-[0_4px_14px_0_rgba(76,215,246,0.39)]"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                'Simpan Kendaraan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}
