'use client'

import { useState, useTransition } from 'react'
import { updateKilometer } from '@/app/actions/vehicles'

export default function UpdateKmForm({ vehicleId, currentKm }: { vehicleId: string, currentKm: number }) {
  const [km, setKm] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleUpdate = async () => {
    const newKm = parseInt(km)
    if (isNaN(newKm)) return
    if (newKm <= currentKm) {
      alert('Kilometer baru harus lebih besar dari kilometer saat ini.')
      return
    }

    startTransition(async () => {
      const res = await updateKilometer(vehicleId, newKm)
      if (res.error) {
        alert(res.error)
      } else {
        setKm('')
      }
    })
  }

  return (
    <div className="flex gap-2 relative z-10">
      <input 
        className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50" 
        placeholder="Update KM..." 
        type="number"
        value={km}
        onChange={(e) => setKm(e.target.value)}
        disabled={isPending}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleUpdate()
          }
        }}
      />
      <button 
        onClick={handleUpdate}
        disabled={isPending || !km}
        className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-primary-fixed transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <i className={`fa-solid ${isPending ? 'fa-spinner fa-spin' : 'fa-arrows-rotate'}`}></i>
      </button>
    </div>
  )
}
