'use client'

import { useActionState, useEffect, useState, useRef } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function AddServiceForm({ 
  vehicle, 
  oilBrands, 
  action 
}: { 
  vehicle: { id: string, type: string, currentKm: number }, 
  oilBrands: string[],
  action: (prevState: any, formData: FormData) => Promise<any>
}) {
  const [state, formAction, isPending] = useActionState(action, null)
  const [serviceType, setServiceType] = useState('oil_change')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.error) {
      toast.error('Gagal Menyimpan', { description: state.error })
    } else if (state?.success) {
      toast.success('Berhasil Disimpan', { description: 'Riwayat servis telah dicatat ke sistem.' })
      formRef.current?.reset()
      setServiceType('oil_change')
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input type="hidden" name="vehicleId" value={vehicle.id} />
      
      <div className="space-y-2">
         <label className="text-sm font-medium leading-none text-dark-300">Jenis Servis *</label>
         <select 
            name="type" 
            required 
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="flex h-10 w-full items-center justify-between rounded-md border border-dark-700 bg-dark-900 px-3 py-2 text-sm ring-offset-dark-950 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 text-dark-50 appearance-none"
         >
            <option value="oil_change">Ganti Oli</option>
            <option value="general_service">Servis Berkala</option>
         </select>
      </div>

      {serviceType === 'oil_change' ? (
         <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-dark-300">Merk Oli <span className="text-xs text-dark-500 font-normal">(opsional)</span></label>
            <input 
              type="text" 
              name="oilBrand" 
              list="oil-brands" 
              placeholder="Ketik atau pilih merk oli" 
              className="flex h-10 w-full rounded-md border border-dark-700 bg-dark-900 px-3 py-2 text-sm ring-offset-dark-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-dark-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 text-dark-50"
            />
            <datalist id="oil-brands">
               {oilBrands.map((brand, i) => (
                  <option key={i} value={brand} />
               ))}
            </datalist>
         </div>
      ) : <div />}

      <div className="space-y-2">
         <label className="text-sm font-medium leading-none text-dark-300">Tanggal *</label>
         <input 
           type="date" 
           name="serviceDate" 
           required 
           defaultValue={new Date().toISOString().split('T')[0]} 
           className="flex h-10 w-full rounded-md border border-dark-700 bg-dark-900 px-3 py-2 text-sm ring-offset-dark-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 text-dark-50 [color-scheme:dark]" 
         />
      </div>

      <div className="space-y-2">
         <label className="text-sm font-medium leading-none text-dark-300">Kilometer Saat Ini *</label>
         <input 
           type="number" 
           name="kmAtService" 
           required 
           defaultValue={vehicle.currentKm} 
           className="flex h-10 w-full rounded-md border border-dark-700 bg-dark-900 px-3 py-2 text-sm ring-offset-dark-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 text-dark-50 font-mono" 
         />
      </div>

      <div className="space-y-2">
         <label className="text-sm font-medium leading-none text-dark-300">Biaya (Rp)</label>
         <input 
           type="number" 
           name="cost" 
           placeholder="0" 
           className="flex h-10 w-full rounded-md border border-dark-700 bg-dark-900 px-3 py-2 text-sm ring-offset-dark-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 text-dark-50 font-mono" 
         />
      </div>

      <div className="space-y-2 sm:col-span-2">
         <label className="text-sm font-medium leading-none text-dark-300">Catatan</label>
         <input 
           type="text" 
           name="notes" 
           placeholder="Cth: Ganti oli gardan, kampas rem depan" 
           className="flex h-10 w-full rounded-md border border-dark-700 bg-dark-900 px-3 py-2 text-sm ring-offset-dark-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 text-dark-50" 
         />
      </div>

      <div className="sm:col-span-2 mt-2">
         <button 
           type="submit" 
           disabled={isPending}
           className={cn(
             "inline-flex w-full items-center justify-center rounded-md text-sm font-medium ring-offset-dark-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50",
             "bg-brand-600 text-white hover:bg-brand-500 shadow hover:shadow-lg hover:shadow-brand-500/20 h-10 px-4 py-2"
           )}
         >
           {isPending ? (
             <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Sedang Menyimpan...
             </>
           ) : (
             "Simpan Riwayat"
           )}
         </button>
      </div>
    </form>
  )
}
