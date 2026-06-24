'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { addServiceRecord } from '@/app/actions/services'

export default function AddServiceForm({ vehicleId, oilOptions = [] }: { vehicleId: string, oilOptions?: { brand: string, oilChangeKm: number }[] }) {
  const [state, formAction, isPending] = useActionState(addServiceRecord, null)
  const formRef = useRef<HTMLFormElement>(null)
  const [serviceType, setServiceType] = useState('')
  const [selectedOilBrand, setSelectedOilBrand] = useState('')
  const [nextInterval, setNextInterval] = useState('')
  const [isManualInterval, setIsManualInterval] = useState(false)

  // Auto-fill interval based on selected oil brand
  useEffect(() => {
    if (serviceType === 'oil_change' && !isManualInterval) {
      const found = oilOptions.find(o => o.brand.toLowerCase() === selectedOilBrand.toLowerCase())
      if (found) {
        setNextInterval(found.oilChangeKm.toString())
      } else {
        setNextInterval('')
      }
    }
  }, [selectedOilBrand, serviceType, oilOptions, isManualInterval])

  useEffect(() => {
    if (state?.success) {
        formRef.current?.reset()
        setServiceType('')
        setSelectedOilBrand('')
        setNextInterval('')
        setIsManualInterval(false)
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="vehicleId" value={vehicleId} />
        <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="serviceDate">Tanggal</label>
            <input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all" type="date" id="serviceDate" name="serviceDate" required defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="type">Jenis Servis</label>
            <select 
                className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all appearance-none" 
                id="type" 
                name="type" 
                required 
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
            >
                <option disabled value="">Pilih Jenis Servis</option>
                <option value="oil_change">Ganti Oli</option>
                <option value="servis_rutin">Servis Rutin</option>
            </select>
        </div>
        
        {serviceType === 'oil_change' && (
            <>
                <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="oilBrand">Merek / Jenis Oli</label>
                    <input list="oilBrands" className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all" type="text" id="oilBrand" name="oilBrand" placeholder="Contoh: Motul Scooter 10W-40" value={selectedOilBrand} onChange={(e) => { setSelectedOilBrand(e.target.value); setIsManualInterval(false); }} />
                    <datalist id="oilBrands">
                        {oilOptions.map((opt, i) => (
                            <option key={i} value={opt.brand} />
                        ))}
                    </datalist>
                </div>
                <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="nextServiceInterval">Jarak Ganti Oli Berikutnya (Opsional)</label>
                    <div className="relative">
                        <input className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-3 pr-12 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all" type="number" id="nextServiceInterval" name="nextServiceInterval" placeholder="Misal: 2500" value={nextInterval} onChange={(e) => { setNextInterval(e.target.value); setIsManualInterval(true); }} />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">KM</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">Kosongkan jika ingin menggunakan jarak standar oli.</p>
                </div>
            </>
        )}

        <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="kmAtService">Kilometer Saat Servis</label>
            <input className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all" type="number" id="kmAtService" name="kmAtService" required placeholder="Contoh: 15400" />
        </div>
        <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="cost">Biaya</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">Rp</span>
                <input className="w-full bg-surface-container/50 border border-outline-variant rounded-lg pl-12 pr-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all" type="number" id="cost" name="cost" placeholder="0" />
            </div>
        </div>
        <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="notes">Catatan</label>
            <textarea className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-all resize-none" id="notes" name="notes" placeholder="Detail pekerjaan..." rows={2}></textarea>
        </div>
        
        {state?.error && <p className="text-error text-sm">{state.error}</p>}
        {state?.success && <p className="text-primary text-sm">Riwayat servis berhasil ditambahkan.</p>}
        
        <button disabled={isPending} className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed transition-colors disabled:opacity-50" type="submit">
            {isPending ? 'Menyimpan...' : 'Simpan Riwayat'}
        </button>
    </form>
  )
}
