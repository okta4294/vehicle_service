'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  // Simple client-side redirect for logout
  const handleLogout = () => {
    window.location.href = '/login' // Or we can trigger a form submit to the Server Action
  }

  return (
    <>
      {/* Mobile Nav */}
      <nav className="md:hidden glass-panel fixed top-0 w-full z-50 px-container-padding py-4 flex justify-between items-center border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <img alt="AutoCare Logo" className="w-8 h-8 rounded-full object-cover shadow-[0_0_15px_rgba(76,215,246,0.3)]" src="https://lh3.googleusercontent.com/aida/AP1WRLuOi-fKT5G3ETKsEt4RFHebcQw6PqvDMD5QMTawKTH1A2XM9z1a3YaVXpfYo5zIBPjkpEaqdyIJ2Ykn2yqD1SaGpHiMsY4Il4O14JqY61Bjc5GljCSb8h3kMJh5XNeLsQqkO81DgbJc-BZxgXLcfLn0WynuFuMKeoog2EELfVd55N0EeCEuYHXM8aJ7kbmZxnbwL5oornidPs7FA7uPdC7Xu71O48Q1i0DU8rtvZzVOh85ef-pLeQEpXJA"/>
          <span className="font-display-lg-mobile text-display-lg-mobile text-primary drop-shadow-[0_0_15px_rgba(76,215,246,0.5)]">AutoCare</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </nav>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Desktop + Mobile) */}
      <nav className={`glass-panel fixed left-0 top-0 h-screen py-glass-padding z-40 border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.3)] group overflow-hidden flex-col transition-all duration-300
        ${isOpen ? 'translate-x-0 w-64 flex' : '-translate-x-full md:translate-x-0 md:flex md:w-20 md:hover:w-64'}`}
      >
        <Link href="/dashboard" className="flex items-center px-6 mb-12 shrink-0 md:mt-0 mt-16" onClick={() => setIsOpen(false)}>
          <img alt="AutoCare Logo" className="w-8 h-8 rounded-full object-cover shadow-[0_0_15px_rgba(76,215,246,0.3)] shrink-0" src="https://lh3.googleusercontent.com/aida/AP1WRLuOi-fKT5G3ETKsEt4RFHebcQw6PqvDMD5QMTawKTH1A2XM9z1a3YaVXpfYo5zIBPjkpEaqdyIJ2Ykn2yqD1SaGpHiMsY4Il4O14JqY61Bjc5GljCSb8h3kMJh5XNeLsQqkO81DgbJc-BZxgXLcfLn0WynuFuMKeoog2EELfVd55N0EeCEuYHXM8aJ7kbmZxnbwL5oornidPs7FA7uPdC7Xu71O48Q1i0DU8rtvZzVOh85ef-pLeQEpXJA"/>
          <span className={`ml-4 font-headline-md text-headline-md text-primary tracking-widest transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>AutoCare</span>
        </Link>
        <div className="flex-1 flex flex-col gap-2 w-full px-2">
          <Link onClick={() => setIsOpen(false)} className="flex items-center w-full px-4 py-3 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-300" href="/dashboard">
            <span className="material-symbols-outlined shrink-0">dashboard</span>
            <span className={`ml-4 font-label-caps text-label-caps transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Dashboard</span>
          </Link>
          <Link onClick={() => setIsOpen(false)} className="flex items-center w-full px-4 py-3 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-300" href="/dashboard/history">
            <span className="material-symbols-outlined shrink-0">history</span>
            <span className={`ml-4 font-label-caps text-label-caps transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>History</span>
          </Link>
        </div>
        <div className={`mt-auto px-4 w-full transition-opacity duration-300 flex justify-center mb-6 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
          <Link onClick={() => setIsOpen(false)} href="/dashboard/vehicles/new" className="bg-gradient-to-r from-primary to-secondary text-on-primary font-label-caps text-label-caps px-4 py-2 rounded-full w-full hover:shadow-[0_0_20px_rgba(76,215,246,0.5)] transition-all whitespace-nowrap text-center block">
            Schedule Service
          </Link>
        </div>
        <div className="border-t border-white/5 pt-4 flex flex-col gap-2 w-full px-2 mt-auto shrink-0">
          <form action="/api/auth/logout" method="POST" className="w-full">
            <button type="submit" className="flex items-center w-full px-4 py-3 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-error transition-all duration-300">
              <span className="material-symbols-outlined shrink-0">logout</span>
              <span className={`ml-4 font-label-caps text-label-caps transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Logout</span>
            </button>
          </form>
          {/* User Profile Placeholder */}
          <div className={`flex items-center w-full px-4 py-3 mt-2 transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
            <div className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold text-sm shrink-0 border border-primary/30">
              JD
            </div>
            <div className="ml-3 flex flex-col overflow-hidden">
              <span className="font-body-md text-sm text-on-surface truncate">AutoCare Pro</span>
              <span className="font-label-caps text-[10px] text-primary flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(76,215,246,1)]"></div>
                System Active
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
