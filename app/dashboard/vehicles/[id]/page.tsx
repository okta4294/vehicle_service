
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import AddServiceForm from './AddServiceForm'

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) redirect('/login')

  const { id } = await params
  
  const vehicle = await prisma.vehicle.findUnique({
    where: { id, userId: session.userId },
    include: {
      serviceRecords: {
        orderBy: { serviceDate: 'desc' }
      }
    }
  })

  if (!vehicle) notFound()

  const oilIntervalsList = await prisma.oilInterval.findMany({
    select: { brand: true },
    distinct: ['brand']
  })
  const existingOilBrands = oilIntervalsList.map(o => o.brand)

  // 1. Get default service intervals for the vehicle
  const defaultIntervals = await prisma.serviceInterval.findFirst({
    where: { brand: vehicle.brand, type: vehicle.type }
  })
  
  // Defaults
  let defaultOilInterval = defaultIntervals?.oilChangeKm || 2000
  const routineInterval = defaultIntervals?.generalServiceKm || 4000

  // 2. Find latest records
  const latestOilRecord = vehicle.serviceRecords.find(r => r.type === 'oil_change')
  const latestRoutineRecord = vehicle.serviceRecords.find(r => r.type === 'servis_rutin')

  // 3. Fetch specific oil interval if available
  if (latestOilRecord?.oilBrand) {
    const specificOil = await prisma.oilInterval.findFirst({
      where: { brand: latestOilRecord.oilBrand }
    })
    if (specificOil) {
      defaultOilInterval = specificOil.oilChangeKm
    }
  }

  // 4. Calculate Oil Estimations
  const lastOilKm = latestOilRecord ? latestOilRecord.kmAtService : vehicle.currentKm
  const nextOilKm = lastOilKm + defaultOilInterval
  const oilRemaining = nextOilKm - vehicle.currentKm
  const oilProgress = Math.max(0, Math.min(100, ((vehicle.currentKm - lastOilKm) / defaultOilInterval) * 100))
  const oilStatus = oilRemaining <= 0 ? 'Terlewat' : oilRemaining <= 500 ? 'Segera' : 'Aman'
  const oilColor = oilRemaining <= 500 ? 'tertiary' : 'primary'

  // 5. Calculate Routine Estimations
  const lastRoutineKm = latestRoutineRecord ? latestRoutineRecord.kmAtService : vehicle.currentKm
  const nextRoutineKm = lastRoutineKm + routineInterval
  const routineRemaining = nextRoutineKm - vehicle.currentKm
  const routineProgress = Math.max(0, Math.min(100, ((vehicle.currentKm - lastRoutineKm) / routineInterval) * 100))
  const routineStatus = routineRemaining <= 0 ? 'Terlewat' : routineRemaining <= 500 ? 'Segera' : 'Aman'
  const routineColor = routineRemaining <= 500 ? 'tertiary' : 'primary'

  return (
    <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-container-padding py-12 md:py-20">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
{/*  LEFT COLUMN: STATUS & UPDATE  */}
<div className="lg:col-span-4 flex flex-col gap-6">
{/*  ODOMETER CARD  */}
<div className="glass-panel rounded-xl p-6 relative overflow-hidden group">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[100px] text-primary" >speed</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1 relative z-10">Kilometer Saat Ini</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">Pembaruan terakhir: 2 hari lalu</p>
<div className="text-4xl font-display-lg text-primary mb-6 tracking-widest text-glow relative z-10">
                        {vehicle.currentKm.toLocaleString('id-ID')} <span className="text-xl text-primary/70">km</span>
</div>
<div className="flex gap-2 relative z-10">
<input className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Update KM..." type="number"/>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps hover:bg-primary-fixed transition-colors">
<span className="material-symbols-outlined" >sync</span>
</button>
</div>
</div>
{/*  FORM TAMBAH RIWAYAT  */}
<div className="glass-panel rounded-xl p-6">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-tertiary" >build_circle</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Catat Servis Baru</h3>
</div>
<AddServiceForm vehicleId={vehicle.id} existingOilBrands={existingOilBrands} />
</div>
</div>
{/*  RIGHT COLUMN: PROGRESS & HISTORY  */}
<div className="lg:col-span-8 flex flex-col gap-6">
{/*  ESTIMASI SERVIS BENTO  */}
<div className="glass-panel rounded-xl p-6">
<h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" >health_and_safety</span>
                        Estimasi Perawatan
                    </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Oli Mesin  */}
<div className="bg-surface-container/30 rounded-lg p-5 border border-white/5">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className={`w-10 h-10 rounded-full bg-${oilColor}/10 flex items-center justify-center text-${oilColor}`}>
<span className="material-symbols-outlined" >oil_barrel</span>
</div>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface">Oli</h4>
<p className="font-label-caps text-label-caps text-on-surface-variant">
  {oilRemaining <= 0 ? `Terlewat ${Math.abs(oilRemaining).toLocaleString('id-ID')} km` : `Sisa ~${oilRemaining.toLocaleString('id-ID')} km`}
</p>
</div>
</div>
<span className={`font-label-caps text-label-caps text-${oilColor} bg-${oilColor}/10 px-2 py-1 rounded`}>{oilStatus}</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className={`h-full bg-${oilColor} rounded-full relative`} style={{ width: `${oilProgress}%` }}>
<div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]"></div>
</div>
</div>
</div>
{/*  Busi -> Servis Rutin  */}
<div className="bg-surface-container/30 rounded-lg p-5 border border-white/5">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className={`w-10 h-10 rounded-full bg-${routineColor}/10 flex items-center justify-center text-${routineColor}`}>
<span className="material-symbols-outlined" >settings</span>
</div>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface">Servis Rutin</h4>
<p className="font-label-caps text-label-caps text-on-surface-variant">
  {routineRemaining <= 0 ? `Terlewat ${Math.abs(routineRemaining).toLocaleString('id-ID')} km` : `Sisa ~${routineRemaining.toLocaleString('id-ID')} km`}
</p>
</div>
</div>
<span className={`font-label-caps text-label-caps text-${routineColor} bg-${routineColor}/10 px-2 py-1 rounded`}>{routineStatus}</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className={`h-full bg-${routineColor} rounded-full relative`} style={{ width: `${routineProgress}%` }}>
<div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]"></div>
</div>
</div>
</div>
</div>
</div>
{/*  RIWAYAT SERVIS  */}
<div className="glass-panel rounded-xl p-0 overflow-hidden flex-grow flex flex-col">
<div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container/10">
<h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-outline-variant" >history</span>
                            Riwayat Servis
                        </h3>
<button className="text-primary font-label-caps text-label-caps hover:text-primary-fixed transition-colors">Lihat Semua</button>
</div>
<div className="flex-grow p-6 space-y-4">
{/*  History Card 1  */}
<div className="group bg-surface-container/20 hover:bg-surface-container/40 border border-white/5 rounded-lg p-4 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined" >oil_barrel</span>
</div>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">Ganti Oli Mesin &amp; Gardan</h4>
<p className="font-body-md text-body-md text-on-surface-variant">AHASS Honda Motor Center</p>
</div>
</div>
<div className="text-left md:text-right flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto">
<span className="font-label-caps text-label-caps text-outline mb-1">12 Okt 2023</span>
<span className="font-label-caps text-label-caps text-on-surface bg-surface-container-high px-2 py-1 rounded border border-white/5">11,900 km</span>
</div>
</div>
{/*  History Card 2  */}
<div className="group bg-surface-container/20 hover:bg-surface-container/40 border border-white/5 rounded-lg p-4 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
<span className="material-symbols-outlined" >settings</span>
</div>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">Servis Rutin Lengkap</h4>
<p className="font-body-md text-body-md text-on-surface-variant">AHASS Honda Motor Center</p>
</div>
</div>
<div className="text-left md:text-right flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto">
<span className="font-label-caps text-label-caps text-outline mb-1">05 Ags 2023</span>
<span className="font-label-caps text-label-caps text-on-surface bg-surface-container-high px-2 py-1 rounded border border-white/5">10,000 km</span>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
  )
}
