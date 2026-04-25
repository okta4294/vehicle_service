import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServiceRecommendation, calculateNextService } from '@/lib/service-intervals'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) return null

  const vehicles = await prisma.vehicle.findMany({
    where: { userId: session.userId },
    include: {
      serviceRecords: {
        orderBy: { serviceDate: 'desc' },
        take: 1, // Only get the latest service record to calculate next
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-50">Kendaranku</h1>
          <p className="text-dark-400 mt-1">Pantau jadwal servis dan ganti oli kendaraanmu.</p>
        </div>
        <Link 
          href="/dashboard/vehicles/new" 
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Tambah Kendaraan
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center p-12 rounded-3xl border border-dark-800 text-center">
          <div className="bg-dark-800 p-4 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark-400"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H8a2 2 0 0 0-2 2v6h1m11 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-11 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>
          </div>
          <h3 className="text-xl font-semibold text-dark-50 mb-2">Belum ada kendaraan</h3>
          <p className="text-dark-400 mb-6 max-w-md">Mulai tambahkan motor atau mobilmu untuk memantau jadwal ganti oli dan servis rutin dengan mudah.</p>
          <Link href="/dashboard/vehicles/new" className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-dark-50 rounded-xl font-medium transition-colors border border-dark-600">
            Mulai Tambah Data
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {await Promise.all(vehicles.map(async (v) => {
            const recommendation = await getServiceRecommendation(v.brand, v.type as 'motor' | 'mobil')
            const latestService = v.serviceRecords[0]
            
            let status = { text: 'Belum ada data servis', color: 'text-dark-400', bg: 'bg-dark-800' }
            let progress = 0

            if (latestService) {
              const calc = calculateNextService(
                v.currentKm,
                latestService.kmAtService,
                latestService.serviceDate,
                latestService.type === 'oil_change' ? recommendation.oilChangeKm : recommendation.generalServiceKm,
                latestService.type === 'oil_change' ? recommendation.oilChangeMonths : recommendation.generalServiceMonths
              )

              if (calc.isOverdue) {
                status = { text: 'Waktunya Servis / Ganti Oli!', color: 'text-red-400', bg: 'bg-red-400/20 border-red-400/30' }
                progress = 100
              } else if (calc.isWarning) {
                status = { text: 'Segera Jadwalkan Servis', color: 'text-accent-400', bg: 'bg-accent-500/20 border-accent-500/30' }
                progress = 85
              } else {
                status = { text: 'Kondisi Aman', color: 'text-green-400', bg: 'bg-green-500/20 border-green-500/30' }
                const serviceInterval = latestService.type === 'oil_change' ? recommendation.oilChangeKm : recommendation.generalServiceKm
                progress = Math.min(100, ((v.currentKm - latestService.kmAtService) / serviceInterval) * 100)
              }
            }

            return (
              <Link key={v.id} href={`/dashboard/vehicles/${v.id}`} className="group drop-shadow-xl block">
                <div className="glass-card h-full p-6 rounded-3xl border border-dark-800 hover:border-brand-500/50 transition-all hover:-translate-y-1 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${progress >= 80 ? (progress >= 100 ? 'bg-red-500' : 'bg-accent-500') : 'bg-brand-500'}`} style={{ width: `${progress}%` }}></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-dark-800 rounded-2xl text-dark-300 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-colors">
                        {v.type === 'mobil' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H8a2 2 0 0 0-2 2v6h1m11 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-11 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3 7 14h6l-1 7 6-11h-6v-7Z"/></svg>
                        )}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-dark-50 truncate max-w-[150px]">{v.brand} {v.model}</h2>
                        <p className="text-xs text-dark-400 font-mono mt-1">{v.plateNumber || 'Plat belum diisi'}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border mb-6 ${status.bg} ${status.color}`}>
                    {status.text}
                  </div>

                  <div className="flex items-center justify-between border-t border-dark-800/50 pt-4">
                    <div>
                      <p className="text-xs text-dark-400 mb-1">KM Saat Ini</p>
                      <p className="text-lg font-bold text-dark-100 font-mono">{v.currentKm.toLocaleString('id-ID')} <span className="text-sm font-normal text-dark-500">km</span></p>
                    </div>
                    {latestService && (
                      <div className="text-right">
                         <p className="text-xs text-dark-400 mb-1">Terakhir Servis</p>
                         <p className="text-sm font-semibold text-dark-200">{latestService.serviceDate.toLocaleDateString('id-ID', { month: 'short', year: 'numeric'})}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          }))}
        </div>
      )}
    </div>
  )
}
