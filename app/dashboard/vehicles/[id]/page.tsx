import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getServiceRecommendation, calculateNextService, getOilRecommendation, getAllOilBrands } from '@/lib/service-intervals'
import { updateKilometer, deleteVehicle } from '@/app/actions/vehicles'
import { addServiceRecord, deleteServiceRecord } from '@/app/actions/services'
import { AddServiceForm } from './AddServiceForm'

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) redirect('/login')

  const { id } = await params
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      serviceRecords: {
        orderBy: { serviceDate: 'desc' }
      }
    }
  })

  if (!vehicle || vehicle.userId !== session.userId) {
    redirect('/dashboard')
  }

  const recommendation = await getServiceRecommendation(vehicle.brand, vehicle.type as 'motor' | 'mobil')
  const latestService = vehicle.serviceRecords[0]
  
  const oilBrands = await getAllOilBrands(vehicle.type as 'motor' | 'mobil');

  // Need to await oil recommendations if we have a last oil service
  const lastOil = vehicle.serviceRecords.find(r => r.type === 'oil_change') || latestService;
  const specificOilRecommendation = lastOil && lastOil.oilBrand ? await getOilRecommendation(lastOil.oilBrand, vehicle.type as 'motor' | 'mobil') : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard" className="text-dark-400 hover:text-brand-400 transition-colors inline-flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-dark-50">{vehicle.brand} {vehicle.model}</h1>
          <p className="text-dark-400 mt-1 font-mono uppercase tracking-wider">{vehicle.plateNumber || 'Plat belum terdaftar'}</p>
        </div>
        
        <form action={async () => {
          'use server'
          await deleteVehicle(vehicle.id)
        }}>
           <button type="submit" className="text-red-400 hover:text-red-300 font-medium px-4 py-2 hover:bg-red-400/10 rounded-xl transition-colors">
              Hapus Kendaraan
           </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Form & Status */}
        <div className="space-y-8 lg:col-span-1">
          {/* Current KM Card */}
          <div className="glass-card p-6 rounded-3xl border border-dark-800">
            <h3 className="text-lg font-bold text-dark-50 mb-4">Update Kilometer</h3>
            <div className="text-4xl font-black text-brand-500 font-mono mb-6">
              {vehicle.currentKm.toLocaleString('id-ID')} <span className="text-lg text-dark-400 font-medium">km</span>
            </div>
            
            <form action={async (formData) => {
              'use server'
              const km = parseInt(formData.get('km') as string)
              if (km > 0) await updateKilometer(vehicle.id, km)
            }} className="flex gap-2">
              <input 
                type="number" 
                name="km" 
                placeholder="KM baru"
                className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-dark-50 font-mono text-sm"
              />
              <button className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-dark-50 rounded-xl font-medium transition-colors border border-dark-600 shrink-0">
                Update
              </button>
            </form>
          </div>

          {/* Service Recommendation Status */}
          <div className="glass-card p-6 rounded-3xl border border-dark-800">
            <h3 className="text-lg font-bold text-dark-50 mb-4">Estimasi Servis</h3>
            
            {!latestService ? (
              <p className="text-dark-400 text-sm">Belum ada data servis. Tambahkan riwayat servis untuk melihat estimasi.</p>
            ) : (
              <div className="space-y-6">
                {/* Oil Change */}
                {(() => {
                  const finalOilKm = specificOilRecommendation ? specificOilRecommendation.oilChangeKm : recommendation.oilChangeKm
                  const finalOilMonths = specificOilRecommendation ? specificOilRecommendation.oilChangeMonths : recommendation.oilChangeMonths
                  
                  const calc = calculateNextService(vehicle.currentKm, lastOil!.kmAtService, lastOil!.serviceDate, finalOilKm, finalOilMonths)
                  
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-dark-300">
                           Ganti Oli Berikutnya {lastOil!.oilBrand ? <span className="text-[10px] bg-dark-800 px-2 py-0.5 rounded-full ml-1 text-brand-300 border border-dark-700">{lastOil!.oilBrand}</span> : null}
                        </span>
                        {calc.isOverdue ? (
                          <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Segera Ganti</span>
                        ) : (
                          <span className={`text-xs font-bold ${calc.isWarning ? 'text-accent-400' : 'text-green-400'}`}>
                            {calc.kmRemaining.toLocaleString('id-ID')} km lagi
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-dark-900 rounded-full h-2 overflow-hidden border border-dark-800">
                        <div className={`h-full ${calc.isOverdue ? 'bg-red-500' : calc.isWarning ? 'bg-accent-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, ((vehicle.currentKm - lastOil!.kmAtService) / finalOilKm) * 100)}%`}}></div>
                      </div>
                      <p className="text-xs text-dark-500 mt-2">Target: {calc.nextKm.toLocaleString('id-ID')} km atau {(calc.nextDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric'})}</p>
                    </div>
                  )
                })()}

                {/* General Service */}
                {(() => {
                  const lastServ = vehicle.serviceRecords.find(r => r.type === 'general_service') || latestService
                  const calc = calculateNextService(vehicle.currentKm, lastServ.kmAtService, lastServ.serviceDate, recommendation.generalServiceKm, recommendation.generalServiceMonths)
                  
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-dark-300">Servis Berkala</span>
                        {calc.isOverdue ? (
                          <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Segera Servis</span>
                        ) : (
                          <span className={`text-xs font-bold ${calc.isWarning ? 'text-accent-400' : 'text-green-400'}`}>
                            {calc.kmRemaining.toLocaleString('id-ID')} km lagi
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-dark-900 rounded-full h-2 overflow-hidden border border-dark-800">
                        <div className={`h-full ${calc.isOverdue ? 'bg-red-500' : calc.isWarning ? 'bg-accent-500' : 'bg-green-500'}`} style={{ width: `${Math.min(100, ((vehicle.currentKm - lastServ.kmAtService) / recommendation.generalServiceKm) * 100)}%`}}></div>
                      </div>
                      <p className="text-xs text-dark-500 mt-2">Target: {calc.nextKm.toLocaleString('id-ID')} km atau {(calc.nextDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric'})}</p>
                    </div>
                  )
                })()}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-dark-800">
               <p className="text-xs text-dark-500">Berdasarkan panduan pabrikan: Oli setiap {recommendation.oilChangeKm.toLocaleString('id-ID')} km, Servis setiap {recommendation.generalServiceKm.toLocaleString('id-ID')} km.</p>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-dark-800">
            <h3 className="text-xl font-bold text-dark-50 mb-6">Tambah Riwayat Servis</h3>
            <AddServiceForm 
               vehicle={vehicle} 
               oilBrands={oilBrands.map(brand => brand.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))}
               action={addServiceRecord}
            />
          </div>

          <div>
             <h3 className="text-xl font-bold text-dark-50 mb-6">Riwayat Servis</h3>
             
             {vehicle.serviceRecords.length === 0 ? (
                <div className="p-8 text-center text-dark-400 border border-dashed border-dark-700 rounded-3xl">
                   Belum ada riwayat servis.
                </div>
             ) : (
                <div className="space-y-4">
                   {vehicle.serviceRecords.map((record) => (
                      <div key={record.id} className="p-5 bg-dark-800/50 rounded-2xl border border-dark-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${record.type === 'oil_change' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                  {record.type === 'oil_change' ? 'Ganti Oli' : 'Servis Berkala'}
                               </span>
                               {record.oilBrand && (
                                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-dark-800 text-brand-300 border border-dark-700">
                                     {record.oilBrand}
                                  </span>
                               )}
                               <span className="text-sm font-medium text-dark-300">
                                  {record.serviceDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}
                               </span>
                            </div>
                            <div className="text-lg font-bold text-dark-50 font-mono my-2">
                               {record.kmAtService.toLocaleString('id-ID')} <span className="text-sm font-normal text-dark-400">km</span>
                            </div>
                            {record.notes && <p className="text-sm text-dark-300">{record.notes}</p>}
                            {record.cost ? <p className="text-xs text-dark-400 mt-2 font-mono">Biaya: Rp {record.cost.toLocaleString('id-ID')}</p> : null}
                         </div>
                         
                         <form action={async () => {
                            'use server'
                            await deleteServiceRecord(record.id, vehicle.id)
                         }}>
                            <button type="submit" className="p-2 text-dark-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
                         </form>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
