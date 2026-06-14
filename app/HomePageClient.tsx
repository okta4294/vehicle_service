
'use client'
import Link from "next/link";
import { useState } from "react";

export default function HomePageClient() {
    return (
        <div className="bg-background min-h-screen relative overflow-hidden">
            
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
<button className="hidden md:flex text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90 transition-transform font-body-md text-body-md">Login</button>
<button className="bg-gradient-to-r from-primary to-secondary text-on-primary px-6 py-2 rounded-full font-label-caps text-label-caps hover:opacity-90 button-glow transition-all scale-95 active:scale-90 font-bold tracking-widest">Get Started</button>
</div>
</nav>
{/*  Main Content  */}
<main className="flex-grow pt-32 pb-24 px-container-padding md:px-12 flex flex-col items-center justify-center relative z-10">
{/*  Hero Section  */}
<div className="max-w-4xl mx-auto text-center mb-24 relative">
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 neon-glow tracking-tight leading-tight">
                Pantau Servis <br/><span className="text-primary">Lebih Mudah</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                Advanced telemetry and predictive maintenance for the modern automotive enthusiast. Experience a phantom interface that anticipates your vehicle's needs.
            </p>
<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
<button className="bg-gradient-to-r from-primary to-secondary text-on-primary px-8 py-4 rounded-full font-label-caps text-label-caps hover:opacity-90 button-glow transition-all scale-95 active:scale-90 font-bold tracking-widest w-full sm:w-auto">
                    CONNECT VEHICLE
                </button>
<button className="border border-white/20 bg-white/5 backdrop-blur-md text-on-surface px-8 py-4 rounded-full font-label-caps text-label-caps hover:bg-white/10 hover:border-white/40 transition-all scale-95 active:scale-90 tracking-widest w-full sm:w-auto">
                    EXPLORE DEMO
                </button>
</div>
</div>
{/*  Features Bento Grid  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter w-full max-w-6xl mx-auto">
{/*  Feature 1  */}
<div className="glass-panel rounded-xl p-8 md:col-span-8 flex flex-col justify-end min-h-[300px] relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent z-10"></div>
{/*  Abstract decorative element  */}
<div className="absolute top-8 right-8 w-32 h-32 border border-primary/30 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
<div className="absolute top-16 right-16 w-16 h-16 border border-secondary/30 rounded-full opacity-50 group-hover:-rotate-45 transition-transform duration-700"></div>
<div className="relative z-20">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
<span className="material-symbols-outlined text-primary" data-icon="speed" data-weight="fill" >speed</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Real-Time Telemetry</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">Live streaming data from your ECU. Monitor pressure, temperature, and RPM with zero latency in a high-fidelity HUD.</p>
</div>
</div>
{/*  Feature 2  */}
<div className="glass-panel rounded-xl p-8 md:col-span-4 flex flex-col justify-end min-h-[300px] relative overflow-hidden">
<div className="relative z-20">
<div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 border border-secondary/20">
<span className="material-symbols-outlined text-secondary" data-icon="auto_awesome" data-weight="fill" >auto_awesome</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Predictive AI</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Machine learning models forecast component wear before failure.</p>
</div>
</div>
{/*  Feature 3  */}
<div className="glass-panel rounded-xl p-8 md:col-span-4 flex flex-col justify-end min-h-[300px] relative overflow-hidden">
<div className="relative z-20">
<div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center mb-4 border border-tertiary/20">
<span className="material-symbols-outlined text-tertiary" data-icon="history" data-weight="fill" >history</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-2">Service History</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Immutable, blockchain-verified maintenance logs.</p>
</div>
</div>
{/*  Feature 4  */}
<div className="glass-panel rounded-xl p-8 md:col-span-8 flex flex-col justify-center items-center min-h-[300px] relative overflow-hidden text-center group border-primary/30 hover:border-primary/60 transition-colors duration-500">
<div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"></div>
<div className="relative z-20 flex flex-col items-center">
<span className="material-symbols-outlined text-primary text-5xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity" data-icon="satellite_alt" data-weight="fill" >satellite_alt</span>
<h3 className="font-headline-md text-headline-md text-on-surface mb-4">Global Network Sync</h3>
<button className="bg-white/10 hover:bg-white/20 text-on-surface px-6 py-2 rounded-full border border-white/20 font-label-caps text-label-caps transition-all tracking-widest backdrop-blur-md">
                        VIEW COVERAGE
                    </button>
</div>
</div>
</div>
</main>
{/*  Footer  */}
<footer className="w-full py-unit px-container-padding flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest border-t border-white/5 mt-auto relative z-20">
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
