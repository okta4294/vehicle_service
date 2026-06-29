'use client'
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, BarChart3 } from "lucide-react";

export default function HomePageClient() {
    return (
        <div className="bg-background min-h-screen flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
            </div>

            {/* Navbar */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 w-full z-50 glass flex justify-between items-center px-8 h-20 border-b-0"
            >
                <div className="flex items-center gap-8">
                    <span className="font-headline-md text-headline-md font-bold text-gradient-primary tracking-tight">
                        AutoCare
                    </span>
                    <div className="hidden md:flex gap-8">
                        <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#features">Features</a>
                        <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#support">Support</a>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <Link href="/login" className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors">Login</Link>
                    <Link href="/login" className="bg-primary/90 text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-primary transition-all hover:shadow-[0_0_20px_rgba(176,198,255,0.4)]">
                        Mulai Sekarang
                    </Link>
                </div>
            </motion.nav>

            <main className="flex-grow pt-32 pb-16 flex flex-col w-full z-10">
                {/* Hero Section */}
                <section className="w-full px-6 py-12 md:py-24 flex flex-col items-center text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-sm"
                    >
                        Manajemen Bengkel Generasi Baru
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-display-lg text-[3rem] md:text-[4.5rem] leading-[1.1] text-on-surface m-0 mb-6 font-bold"
                    >
                        Pantau Servis <br/>
                        <span className="text-gradient-primary">Lebih Mudah & Presisi</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl m-0 mb-10"
                    >
                        Solusi monitoring kendaraan profesional untuk efisiensi maksimal. Dirancang khusus untuk manajemen armada dan bengkel premium.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <Link href="/login" className="bg-primary text-on-primary font-label-md px-8 py-4 rounded-full hover:bg-primary-fixed transition-all hover:shadow-[0_0_30px_rgba(176,198,255,0.5)] text-center text-lg">
                            Mulai Sekarang
                        </Link>
                        <Link href="#features" className="glass-dark text-on-surface font-label-md px-8 py-4 rounded-full hover:bg-surface-variant transition-all text-center text-lg">
                            Pelajari Fitur
                        </Link>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full px-6 py-24 max-w-6xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Feature 1 */}
                        <div className="glass-dark p-8 rounded-2xl flex flex-col gap-4 border border-outline-variant/30 hover:border-primary/50 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Activity size={28} />
                            </div>
                            <h3 className="text-headline-md font-semibold text-on-surface">Real-time Monitoring</h3>
                            <p className="text-body-md text-on-surface-variant">Pantau status pengerjaan setiap kendaraan detik demi detik dari dasbor Anda.</p>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className="glass-dark p-8 rounded-2xl flex flex-col gap-4 border border-outline-variant/30 hover:border-primary/50 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-headline-md font-semibold text-on-surface">Data Keamanan Terjamin</h3>
                            <p className="text-body-md text-on-surface-variant">Riwayat servis dan data pelanggan disimpan dengan enkripsi tingkat industri.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass-dark p-8 rounded-2xl flex flex-col gap-4 border border-outline-variant/30 hover:border-primary/50 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <BarChart3 size={28} />
                            </div>
                            <h3 className="text-headline-md font-semibold text-on-surface">Analitik Komprehensif</h3>
                            <p className="text-body-md text-on-surface-variant">Dapatkan wawasan bisnis dari laporan performa bulanan bengkel Anda.</p>
                        </div>
                    </motion.div>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full py-8 mt-auto glass border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center px-12 gap-6 z-10 relative">
                <span className="font-label-md text-label-md font-bold text-gradient-primary">AutoCare</span>
                <div className="flex gap-8">
                    <a className="font-label-sm text-outline hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <a className="font-label-sm text-outline hover:text-primary transition-colors" href="#">Terms of Service</a>
                    <a className="font-label-sm text-outline hover:text-primary transition-colors" href="#">Contact</a>
                </div>
                <span className="font-label-sm text-outline">© 2024 AutoCare Systems</span>
            </footer>
        </div>
    );
}