
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

  const oilOptions = await prisma.oilInterval.findMany({
    select: { brand: true, oilChangeKm: true },
    orderBy: { brand: 'asc' }
  })

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
  
  // Jika user menyetel target KM custom saat servis, gunakan itu. Jika tidak, gunakan default interval.
  const nextOilKm = (latestOilRecord && latestOilRecord.nextServiceKm) 
      ? latestOilRecord.nextServiceKm 
      : lastOilKm + defaultOilInterval

  // Sesuaikan interval untuk progress bar jika user mengisi target spesifik
  const activeOilInterval = (latestOilRecord && latestOilRecord.nextServiceKm)
      ? latestOilRecord.nextServiceKm - latestOilRecord.kmAtService
      : defaultOilInterval

  const oilRemaining = nextOilKm - vehicle.currentKm
  const oilProgress = Math.max(0, Math.min(100, ((vehicle.currentKm - lastOilKm) / activeOilInterval) * 100))
  const oilStatus = oilRemaining <= 0 ? 'Terlewat' : oilRemaining <= 500 ? 'Segera' : 'Aman'
  const oilColor = oilRemaining <= 500 ? 'tertiary' : 'primary'

  // 5. Calculate Routine Estimations
  const lastRoutineKm = latestRoutineRecord ? latestRoutineRecord.kmAtService : vehicle.currentKm
  const nextRoutineKm = lastRoutineKm + routineInterval
  const routineRemaining = nextRoutineKm - vehicle.currentKm
  const routineProgress = Math.max(0, Math.min(100, ((vehicle.currentKm - lastRoutineKm) / routineInterval) * 100))
  const routineStatus = routineRemaining <= 0 ? 'Terlewat' : routineRemaining <= 500 ? 'Segera' : 'Aman'
  const routineColor = routineRemaining <= 500 ? 'tertiary' : 'primary'

  const serviceColorStyles = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      fill: 'bg-primary',
    },
    tertiary: {
      bg: 'bg-tertiary/10',
      text: 'text-tertiary',
      fill: 'bg-tertiary',
    },
  } as const
  const oilStyle = serviceColorStyles[oilColor]
  const routineStyle = serviceColorStyles[routineColor]

  return (
    <div className="p-6 flex-1 flex flex-col max-w-7xl mx-auto w-full">

<Link href="/dashboard" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 font-body-md text-body-md">
<i className="fa-solid fa-arrow-left"></i>
Kembali ke Dashboard
</Link>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
{/*  LEFT COLUMN: STATUS & UPDATE  */}
<div className="lg:col-span-4 flex flex-col gap-6">
{/*  ODOMETER CARD  */}
<div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 relative">
<div className="absolute top-0 right-0 p-4 opacity-10">
<i className="fa-solid fa-gauge text-[100px] text-primary"></i>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1 relative z-10">Kilometer Saat Ini</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">Pembaruan terakhir: 2 hari lalu</p>
<div className="text-4xl font-display-lg text-primary mb-6 tracking-widest relative z-10">
                        {vehicle.currentKm.toLocaleString('id-ID')} <span className="text-xl text-primary/70">km</span>
</div>
<div className="flex gap-2 relative z-10">
<input className="w-full bg-surface-container/50 border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Update KM..." type="number"/>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-primary-fixed transition-colors">
<i className="fa-solid fa-arrows-rotate"></i>
</button>
</div>
</div>
{/*  FORM TAMBAH RIWAYAT  */}
    <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
<i className="fa-solid fa-screwdriver-wrench text-tertiary"></i>
<h3 className="font-headline-md text-headline-md text-on-surface">Catat Servis Baru</h3>
</div>
<AddServiceForm vehicleId={vehicle.id} oilOptions={oilOptions} />
</div>
</div>
{/*  RIGHT COLUMN: PROGRESS & HISTORY  */}
<div className="lg:col-span-8 flex flex-col gap-6">
{/*  ESTIMASI SERVIS BENTO  */}
    <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6">
      <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2">
<i className="fa-solid fa-shield-heart text-primary"></i>
                        Estimasi Perawatan
                    </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Oli Mesin  */}
<div className="bg-surface-container/30 rounded-lg p-5 border border-outline-variant">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className={`w-10 h-10 rounded-full ${oilStyle.bg} flex items-center justify-center ${oilStyle.text}`}>
<i className="fa-solid fa-oil-can"></i>
</div>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface">Oli</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant">
  {oilRemaining <= 0 ? `Terlewat ${Math.abs(oilRemaining).toLocaleString('id-ID')} km` : `Sisa ~${oilRemaining.toLocaleString('id-ID')} km`}
</p>
</div>
</div>
<span className={`font-label-sm text-label-sm ${oilStyle.text} ${oilStyle.bg} px-2 py-1 rounded`}>{oilStatus}</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className={`h-full ${oilStyle.fill} rounded-full relative`} style={{ width: `${oilProgress}%` }}>
<div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]"></div>
</div>
</div>
</div>
{/*  Busi -> Servis Rutin  */}
<div className="bg-surface-container/30 rounded-lg p-5 border border-outline-variant">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className={`w-10 h-10 rounded-full ${routineStyle.bg} flex items-center justify-center ${routineStyle.text}`}>
<i className="fa-solid fa-gear"></i>
</div>
<div>
<h4 className="font-body-lg text-body-lg text-on-surface">Servis Rutin</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant">
  {routineRemaining <= 0 ? `Terlewat ${Math.abs(routineRemaining).toLocaleString('id-ID')} km` : `Sisa ~${routineRemaining.toLocaleString('id-ID')} km`}
</p>
</div>
</div>
<span className={`font-label-sm text-label-sm ${routineStyle.text} ${routineStyle.bg} px-2 py-1 rounded`}>{routineStatus}</span>
</div>
<div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className={`h-full ${routineStyle.fill} rounded-full relative`} style={{ width: `${routineProgress}%` }}>
<div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]"></div>
</div>
</div>
</div>
</div>
</div>
{/*  RIWAYAT SERVIS  */}
<div className="bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden flex-grow flex flex-col">
<div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container/10">
<h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<i className="fa-solid fa-clock-rotate-left text-outline-variant"></i>
                            Riwayat Servis
                        </h3>
<button className="text-primary font-label-sm text-label-sm hover:text-primary-fixed transition-colors">Lihat Semua</button>
</div>
<div className="flex-grow p-6 space-y-4">
{vehicle.serviceRecords.map((record) => {
  const recordConfig: Record<string, { icon: string; label: string }> = {
    oil_change: { icon: 'fa-oil-can', label: 'Ganti Oli' },
    servis_rutin: { icon: 'fa-gear', label: 'Servis Rutin' },
  }
  const config = recordConfig[record.type] || { icon: 'fa-wrench', label: record.type }
  return (
    <div key={record.id} className="group bg-surface-container/20 hover:bg-surface-container/40 border border-outline-variant rounded-lg p-4 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
          <i className={`fa-solid ${config.icon}`}></i>
        </div>
        <div>
          <h4 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">{config.label}</h4>
          <p className="font-body-md text-body-md text-on-surface-variant">{record.oilBrand || record.notes || '-'}</p>
        </div>
      </div>
      <div className="text-left md:text-right flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto">
        <span className="font-label-sm text-label-sm text-outline mb-1">{record.serviceDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        <span className="font-label-sm text-label-sm text-on-surface bg-surface-container-high px-2 py-1 rounded border border-outline-variant">{record.kmAtService.toLocaleString('id-ID')} km</span>
      </div>
    </div>
  )
})}
</div>
</div>
</div>
</div>
</div>
  )
}
