
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Suspense } from 'react'
import VehicleSearch from './VehicleSearch'
import ThemeToggle from '@/components/ThemeToggle'

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const session = await getSession()
    if (!session) return null
  
    const resolvedParams = await searchParams
    const q = resolvedParams?.q || ''

    const vehicles = await prisma.vehicle.findMany({
      where: { 
        userId: session.userId,
        ...(q ? {
          OR: [
            { brand: { contains: q, mode: 'insensitive' } },
            { model: { contains: q, mode: 'insensitive' } },
            { plateNumber: { contains: q, mode: 'insensitive' } }
          ]
        } : {})
      },
      include: {
        serviceRecords: {
          orderBy: { serviceDate: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Compute System Status
    let systemStatus = 'All System normal'
    let systemColor = 'primary'
    for (const v of vehicles) {
      // Very basic check based on hardcoded defaults since we don't have full intervals here
      // But we can check if they have service records. If they don't, they need service.
      if (v.serviceRecords.length === 0) {
        systemStatus = 'Service Required'
        systemColor = 'error'
        break
      }
      
      const lastService = v.serviceRecords[0]
      // Assume 2000 km oil interval for general check
      const remainingKm = (lastService.kmAtService + 2000) - v.currentKm
      if (remainingKm <= 500) {
        systemStatus = 'Service Required'
        systemColor = 'error'
        break
      }
    }

    return (
        <main className="flex-1 w-full pt-20 md:pt-0 md:ml-20 transition-all duration-300 z-10 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
{/*  Header Section  */}
<header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative">
<div>
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2 tracking-tight">Kendaranku</h1>
<div className="flex items-center gap-3">
<div className={`glass-panel px-3 py-1 rounded-full flex items-center gap-2 border border-${systemColor}/20`}>
<div className={`w-2 h-2 rounded-full bg-${systemColor} animate-pulse shadow-[0_0_8px_var(--sys-${systemColor})]`}></div>
<span className={`font-label-caps text-label-caps text-${systemColor} tracking-widest`}>{systemStatus}</span>
</div>
</div>
</div>
{/*  Theme Toggle & Quick Actions  */}
<div className="flex items-center gap-4">
<Suspense fallback={<div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-on-surface"><i className="fa-solid fa-magnifying-glass"></i></div>}>
<VehicleSearch />
</Suspense>
<ThemeToggle />
</div>
</header>
{/*  Vehicle Grid (Bento Style)  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/*  Vehicle Card 1  */}
{vehicles.map((v) => {
        const latestService = v.serviceRecords[0]
        let statusText = 'Belum Servis'
        let statusColor = 'text-on-surface-variant'
        let iconName = 'fa-circle-question'
        let iconColor = 'text-on-surface-variant'

        if (latestService) {
            statusText = 'Aman'
            statusColor = 'text-primary'
            iconName = 'fa-circle-check'
            iconColor = 'text-primary'
        }

        return (
            <Link key={v.id} href={`/dashboard/vehicles/${v.id}`} className="block">
                <article className="glass-panel rounded-xl p-6 relative overflow-hidden group phantom-glow border-t border-primary/30 h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                            <span className="font-label-caps text-label-caps text-on-surface-variant mb-1 block">{(v.type === 'mobil' ? 'Mobil' : 'Motor')}</span>
                            <h2 className="font-headline-md text-headline-md text-on-surface truncate max-w-[150px]">{v.brand} {v.model}</h2>
                            <p className="font-label-caps text-[10px] text-primary/70 mt-1">{v.plateNumber || 'Belum ada plat'}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-white/5 text-on-surface-variant shrink-0">
                            <i className={`fa-solid ${v.type === 'mobil' ? 'fa-car' : 'fa-motorcycle'} text-xl`}></i>
                        </div>
                    </div>
                    <div className="h-32 mb-6 rounded-lg bg-surface-container relative overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-colors">
                        <div className="w-full h-full bg-gradient-to-b from-transparent to-surface-container-highest absolute inset-0 z-10"></div>
                        <i className={`fa-solid ${v.type === 'mobil' ? 'fa-car' : 'fa-motorcycle'} text-6xl text-on-surface-variant/20 z-0 absolute`}></i>
                    </div>
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div className="bg-surface-container/50 rounded-lg p-3 border border-white/5">
                            <span className="font-label-caps text-[10px] text-on-surface-variant block mb-1">Odometer</span>
                            <div className="font-body-md text-body-md text-on-surface flex items-end gap-1">
                                {v.currentKm.toLocaleString('id-ID')} <span className="text-xs text-on-surface-variant mb-0.5">km</span>
                            </div>
                        </div>
                        <div className={`${latestService ? 'bg-primary/10 border-primary/20 shadow-[inset_0_0_10px_rgba(76,215,246,0.1)]' : 'bg-surface-container/50 border-white/5'} rounded-lg p-3 border`}>
                            <span className={`font-label-caps text-[10px] ${statusColor} block mb-1`}>Status Servis</span>
                            <div className={`font-body-md text-body-md ${statusColor} flex items-center gap-1`}>
                                {statusText} <i className={`fa-solid ${iconName} text-sm`}></i>
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        )
    })}
{/*  Vehicle Card 2  */}

{/*  Add Vehicle Card (Dashed)  */}
<Link href="/dashboard/vehicles/new" className="rounded-xl p-6 border-2 border-dashed border-outline-variant hover:border-primary/50 bg-transparent flex flex-col items-center justify-center min-h-[300px] group transition-all duration-300 hover:bg-primary/5">
<div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 border border-white/5 group-hover:shadow-[0_0_20px_rgba(76,215,246,0.3)] group-hover:border-primary/30 transition-all duration-300">
<i className="fa-solid fa-plus text-3xl text-on-surface-variant group-hover:text-primary transition-colors"></i>
</div>
<span className="font-headline-md text-lg text-on-surface-variant group-hover:text-on-surface transition-colors">Tambah Kendaraan</span>
<span className="font-label-caps text-[10px] text-on-surface-variant/50 mt-2">Sinkronisasi data OBD2 tersedia</span>
</Link></div></main>
    )
}
