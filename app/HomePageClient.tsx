'use client'
import Link from "next/link";

export default function HomePageClient() {
    return (
        <div className="bg-background min-h-screen flex flex-col">
<nav className="fixed top-0 w-full z-50 border-b border-outline-variant bg-surface flex justify-between items-center px-6 h-16">
<div className="flex items-center gap-6">
<span className="font-headline-md text-headline-md font-bold text-primary">AutoCare</span>
<div className="hidden md:flex gap-4">
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">Features</a>
<a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">Support</a>
</div>
</div>
<div className="flex items-center gap-4">
<Link href="/login" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors">Login</Link>
<Link href="/login" className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded hover:bg-primary-fixed transition-colors">Mulai Sekarang</Link>
</div>
</nav>
<main className="flex-grow pt-16 flex flex-col w-full">
<section className="w-full px-6 py-8 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-4 items-center min-h-[716px]">
<div className="md:col-span-6 flex flex-col gap-6 items-start">
<h1 className="font-display-lg text-display-lg text-on-surface m-0">
                Pantau Servis <br/><span className="text-primary">Lebih Mudah</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg m-0">
                Solusi monitoring kendaraan profesional untuk efisiensi maksimal. Dirancang khusus untuk manajemen armada dan garasi premium dengan presisi tinggi.
</p>
<div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
<Link href="/login" className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-primary-fixed transition-colors text-center">Mulai Sekarang</Link>
<Link href="/login" className="bg-transparent text-primary font-label-md text-label-md px-6 py-3 rounded border border-outline hover:bg-surface-container-low transition-colors text-center">Pelajari Fitur</Link>
</div>
</div>
<div className="md:col-span-6 w-full min-h-[400px] border border-outline-variant bg-surface-container-low rounded overflow-hidden flex relative">
<div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 mix-blend-luminosity" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqPevDhDOl4Nc0paq6d1j47RJUxjt3SjxHByfsWMG0mTNfo66zkvMAmIKIy7w9MWmAskxXlGjJkquPzYjIvh6QA_90HMjhy97GNcNFV7xN5b_Zivkp4gnr6zi7iHwKcLRVAwlDNuwM7-XM0ki0SoOWIkU0J-vRtC0-Kiz2XS6vgt4Vcs43wEghm5K-2xGpQhL6Y6ViaSO2c-etwckv_JdPe-CLhRvaP02VefsQDDN2Ci3YyrsL5MxHW2XypGDsRiWOGhMfjJeDRxW2')" }}></div>
<div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-60"></div>
</div>
</section>
</main>
<footer className="w-full py-6 mt-auto border-t border-outline-variant bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center px-6 gap-4">
<span className="font-label-md text-label-md font-bold text-on-surface">AutoCare</span>
<div className="flex gap-4">
<a className="font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors underline-offset-4 hover:underline" href="#">Privacy Policy</a>
<a className="font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors underline-offset-4 hover:underline" href="#">Terms of Service</a>
<a className="font-label-sm text-label-sm text-outline hover:text-on-surface transition-colors underline-offset-4 hover:underline" href="#">Contact</a>
</div>
<span className="font-label-sm text-label-sm text-outline">2024 AutoCare Systems</span>
</footer>
        </div>
    );
}