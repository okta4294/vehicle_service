
'use client'
import Link from "next/link";
import { useState } from "react";

export default function HomePageClient() {
    return (
        <div className="bg-background min-h-screen relative overflow-hidden flex flex-col">
            
{/*  TopNavBar  */}
<nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding py-4 bg-transparent backdrop-blur-xl border-b border-white/10">
<div className="flex items-center gap-4">
<img alt="AutoCare Logo" className="h-10 w-10 rounded-full border border-white/20" src="https://lh3.googleusercontent.com/aida/AP1WRLuOi-fKT5G3ETKsEt4RFHebcQw6PqvDMD5QMTawKTH1A2XM9z1a3YaVXpfYo5zIBPjkpEaqdyIJ2Ykn2yqD1SaGpHiMsY4Il4O14JqY61Bjc5GljCSb8h3kMJh5XNeLsQqkO81DgbJc-BZxgXLcfLn0WynuFuMKeoog2EELfVd55N0EeCEuYHXM8aJ7kbmZxnbwL5oornidPs7FA7uPdC7Xu71O48Q1i0DU8rtvZzVOh85ef-pLeQEpXJA"/>
<span className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary drop-shadow-[0_0_15px_rgba(76,215,246,0.5)]">AutoCare</span>
</div>
<div className="hidden md:flex items-center gap-8 font-body-md text-body-md">
<a className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all scale-95 active:scale-90" href="#">Features</a>
<a className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all scale-95 active:scale-90" href="#">Pricing</a>
<a className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80 transition-all scale-95 active:scale-90" href="#">Support</a>
</div>
<div className="flex items-center gap-4">
<Link href="/login" className="hidden md:flex text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90 transition-transform font-body-md text-body-md">Login</Link>
<Link href="/login" className="bg-gradient-to-r from-primary to-secondary text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps hover:opacity-90 button-glow transition-all scale-95 active:scale-90 font-bold tracking-widest">Get Started</Link>
</div>
</nav>
{/*  Main Content  */}
<main className="flex-grow flex flex-col items-center justify-center relative z-10 px-container-padding md:px-12 w-full">
{/*  Hero Section  */}
<div className="max-w-4xl w-full text-center relative mt-16 md:mt-24">
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 neon-glow tracking-tight leading-tight">
                Pantau Servis <br/><span className="text-primary">Lebih Mudah</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                Minimal ganti Oli mas/mbak. kasihan motornya njing!!
            </p>
<div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 md:mb-24">
<Link href="/login" className="bg-gradient-to-r from-primary to-secondary text-on-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:opacity-90 button-glow transition-all scale-95 active:scale-90 font-bold tracking-widest w-full sm:w-auto text-center">
    LOGIN SEKARANG
</Link>
</div>
</div>
</main>
{/*  Footer  */}
<footer className="w-full py-8 px-container-padding flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-white/5 mt-auto relative z-20">
<div className="font-label-caps text-label-caps text-primary mb-4 md:mb-0">
            AutoCare Phantom Systems
        </div>
<div className="text-secondary font-body-md text-body-md text-center md:text-left mb-4 md:mb-0">
            © 2024 AutoCare Phantom Systems. All rights reserved.
        </div>
<div className="flex gap-6 font-body-md text-body-md text-on-surface-variant">
<a className="hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
<a className="hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
<a className="hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">API Docs</a>
</div>
</footer>

        </div>
    );
}
