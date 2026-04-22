import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Page() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-dark-950 to-dark-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-600/10 blur-[120px]"></div>
      </div>

      <div className="z-10 flex flex-col items-center gap-6 max-w-3xl text-center">
        <div className="bg-dark-800/50 p-4 rounded-3xl border border-dark-700 shadow-2xl mb-4 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-brand-500 to-accent-500 p-4 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="m11.23 2-7.55 7.55A3 3 0 0 0 2.8 14.6l.85.85a3 3 0 0 0 5.05-2.12l7.55-7.55"></path>
              <path d="M15.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
              <path d="m18.5 5.5.5-.5a3.5 3.5 0 1 1 5 5l-.5.5"></path>
              <path d="M21.5 2.5 18 6"></path>
              <path d="m14 10 6 6-6 6-6-6"></path>
              <path d="M9 15 3 21"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          Pantau Servis<br/>
          <span className="text-gradient">Lebih Mudah.</span>
        </h1>
        
        <p className="text-lg text-dark-300 max-w-xl mx-auto font-medium leading-relaxed">
          Jangan biarkan kendaraanmu rusak karena lupa servis. AutoCare membantu mencatat dan memberikan estimasi jadwal servis berikutnya secara otomatis. (khusus Vixion ga usah servis gapapa)
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Link href="/login" className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1">
            Mulai Sekarang
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <a href="#fitur" className="flex items-center justify-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 text-dark-100 rounded-full font-semibold transition-all border border-dark-700 hover:border-dark-600">
            Pelajari Fitur
          </a>
        </div>
      </div>

      {/* Feature Section */}
      <div id="fitur" className="z-10 mt-32 grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="glass-card p-6 rounded-3xl flex flex-col items-start gap-4">
          <div className="p-3 bg-brand-500/20 text-brand-400 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7.53 4.27"/><path d="m7 3.34 1 1.73"/><path d="M20 12h-2"/><path d="M22 12h-2"/><path d="M4 12H2"/><path d="M6 12H4"/><path d="m17 3.34-1 1.73"/><path d="m7 20.66 1-1.73"/></svg>
          </div>
          <h3 className="text-xl font-bold text-dark-50">Estimasi Akurat</h3>
          <p className="text-dark-400">Rekomendasi jarak tempuh ditarik dari data resmi pabrikan untuk setiap merk Honda, Yamaha, Toyota, dll.</p>
        </div>
        
        <div className="glass-card p-6 rounded-3xl flex flex-col items-start gap-4">
          <div className="p-3 bg-accent-500/20 text-accent-400 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h12"/><path d="M3 14h18"/><path d="M3 18h6"/><path d="M3 6h7"/></svg>
          </div>
          <h3 className="text-xl font-bold text-dark-50">Riwayat Teratur</h3>
          <p className="text-dark-400">Catat setiap penggantian oli dan jadwal servis berkalanya dalam satu dashboard yang bersih dan intuitif.</p>
        </div>

        <div className="glass-card p-6 rounded-3xl flex flex-col items-start gap-4">
          <div className="p-3 bg-green-500/20 text-green-400 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h3 className="text-xl font-bold text-dark-50">Multi Kendaraan</h3>
          <p className="text-dark-400">Punya lebih dari satu motor atau mobil? Kelola semuanya dalam satu akun AutoCare dengan mudah.</p>
        </div>
      </div>
    </main>
  )
}
