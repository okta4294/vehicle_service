import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HistoryPage() {
    const session = await getSession()
    if (!session) redirect('/login')

    const history = await prisma.serviceRecord.findMany({
        where: { vehicle: { userId: session.userId } },
        include: { vehicle: true },
        orderBy: { serviceDate: 'desc' }
    })

    return (
        <div className="p-6 flex-1 flex flex-col mx-auto w-full">
            <div className="max-w-4xl w-full space-y-8">
                <header className="mb-10">
                    <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface tracking-tight mb-2">Riwayat Servis</h1>
                    <p className="font-body-lg text-on-surface-variant">Semua catatan perawatan dari seluruh kendaraan Anda.</p>
                </header>

                <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6">
                    {history.length === 0 ? (
                        <div className="text-center py-12 text-on-surface-variant">
                            <i className="fa-solid fa-clock-rotate-left text-6xl opacity-20 mb-4 block"></i>
                            Belum ada riwayat servis yang dicatat.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((record) => (
                                <Link href={`/dashboard/vehicles/${record.vehicleId}`} key={record.id} className="block">
                                    <div className="group bg-surface-container/20 hover:bg-surface-container/40 border border-white/5 rounded-lg p-5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                        <div className="flex items-start gap-4 relative z-10">
                                            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors shrink-0 border border-white/5">
                                                <i className={`fa-solid ${record.type === 'oil_change' ? 'fa-oil-can' : record.type === 'servis_rutin' ? 'fa-gear' : 'fa-wrench'} text-2xl`}></i>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-headline-md text-[16px] text-on-surface group-hover:text-primary transition-colors">
                                                        {record.type === 'oil_change' ? 'Ganti Oli' : record.type === 'servis_rutin' ? 'Servis Rutin' : 'Penggantian Part'}
                                                    </h4>
                                                    <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest border border-white/5 text-on-surface-variant">
                                                        {record.vehicle.brand} {record.vehicle.model}
                                                    </span>
                                                </div>
                                                <p className="font-body-md text-sm text-on-surface-variant max-w-md truncate">
                                                    {record.notes || (record.type === 'oil_change' && record.oilBrand ? `Oli: ${record.oilBrand}` : 'Tidak ada catatan tambahan.')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-left md:text-right flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-auto shrink-0 relative z-10">
                                            <span className="font-label-sm text-[11px] text-outline mb-1.5">{record.serviceDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            <span className="font-label-sm text-[12px] text-on-surface bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 shadow-[0_0_10px_rgba(76,215,246,0.1)]">
                                                {record.kmAtService.toLocaleString('id-ID')} km
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
