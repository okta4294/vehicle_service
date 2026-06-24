
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
    let systemColor: 'primary' | 'error' = 'primary'
    for (const v of vehicles) {
      if (v.serviceRecords.length === 0) {
        systemStatus = 'Service Required'
        systemColor = 'error'
        break
      }

      const lastService = v.serviceRecords[0]
      const remainingKm = (lastService.kmAtService + 2000) - v.currentKm
      if (remainingKm <= 500) {
        systemStatus = 'Service Required'
        systemColor = 'error'
        break
      }
    }

    const statusStyles = {
      primary: { wrapper: 'border-primary/20', dot: 'bg-primary', text: 'text-primary' },
      error: { wrapper: 'border-error/20', dot: 'bg-error', text: 'text-error' },
    } as const
    const ss = statusStyles[systemColor]

    return (
        <div className="p-6 flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
<header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
<div>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">Garasi Kendaraan</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and monitor your active fleet.</p>
</div>
<div className="flex items-center gap-2">
<Suspense fallback={<div className="w-10 h-10 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-on-surface-variant"><i className="fa-solid fa-magnifying-glass"></i></div>}>
<VehicleSearch />
</Suspense>
<ThemeToggle />
<Link href="/dashboard/vehicles/new" className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-fixed transition-colors border border-primary">
<i className="fa-solid fa-plus"></i>Tambah Kendaraan
</Link>
</div>
</header>
<div className="flex items-center gap-2">
<div className={`px-3 py-1 rounded-full flex items-center gap-2 border ${ss.wrapper} bg-surface-container-low`}>
<div className={`w-2 h-2 rounded-full ${ss.dot}`}></div>
<span className={`font-label-sm text-label-sm ${ss.text}`}>{systemStatus}</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
{vehicles.map((v) => {
        const latestService = v.serviceRecords[0]
        let statusIcon = 'fa-circle-question'
        let statusLabel = 'Belum Servis'
        let statusColor = 'text-on-surface-variant'
        let dotColor = 'bg-outline'

        if (latestService) {
            statusIcon = 'fa-circle-check'
            statusLabel = 'Aman'
            statusColor = 'text-primary'
            dotColor = 'bg-primary'
        }

        return (
            <Link key={v.id} href={`/dashboard/vehicles/${v.id}`}>
                <article className="bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden flex flex-col">
<div className="p-4 flex flex-col gap-4 flex-1">
<div className="flex justify-between items-start gap-2">
<div>
<h2 className="font-body-lg text-body-lg font-bold text-on-surface">{v.brand} {v.model}</h2>
<p className="font-body-md text-body-md text-on-surface-variant font-mono mt-1">{v.plateNumber || '-'}</p>
</div>
<div className={`flex items-center gap-1 px-2 py-1 border rounded-full bg-surface ${latestService ? 'border-primary' : 'border-outline'}`}>
<div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
<span className={`font-label-sm text-label-sm ${statusColor} uppercase tracking-wider`}>{statusLabel}</span>
</div>
</div>
<div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
<div className="flex items-center gap-1 text-on-surface-variant">
<i className="fa-solid fa-gauge text-sm"></i>
<span className="font-label-md text-label-md">{v.currentKm.toLocaleString('id-ID')} km</span>
</div>
<span className="font-label-sm text-label-sm text-primary hover:underline underline-offset-4">Details</span>
</div>
</div>
                </article>
            </Link>
        )
    })}
<Link href="/dashboard/vehicles/new" className="bg-surface-container-low border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center min-h-[200px] hover:bg-surface-container-high transition-colors">
<i className="fa-solid fa-plus text-3xl text-outline mb-2"></i>
<span className="font-label-md text-label-md text-on-surface-variant">Tambah Kendaraan</span>
</Link></div></div>
    )
}