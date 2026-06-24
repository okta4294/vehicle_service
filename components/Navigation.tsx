'use client'

import Link from 'next/link'
import { useState } from 'react'
import { logout } from '@/app/actions/auth'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Nav */}
      <nav className="md:hidden bg-surface fixed top-0 w-full z-50 border-b border-outline-variant flex justify-between items-center px-6 h-16">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="font-headline-md text-headline-md font-bold text-primary">AutoCare</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </nav>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Desktop) - Mobile sidebar when toggled */}
      <nav className={`bg-surface-container fixed left-0 top-0 h-full w-64 border-r border-outline-variant flex-col gap-2 p-4 z-40 transition-transform duration-200 md:flex
        ${isOpen ? 'flex translate-x-0' : 'hidden -translate-x-full md:flex md:translate-x-0'}`}>
        <div className="mb-6 px-2">
          <div className="font-headline-md text-headline-md font-bold text-primary">AutoCare</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">Fleet Management</div>
        </div>
        <div className="flex flex-col gap-1">
          <Link onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-2 text-on-surface-variant hover:bg-surface-container-high hover:bg-surface-container-highest transition-all duration-200 rounded-lg" href="/dashboard">
            <i className="fa-solid fa-table-columns w-5"></i>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-2 text-on-surface-variant hover:bg-surface-container-high hover:bg-surface-container-highest transition-all duration-200 rounded-lg" href="/dashboard/history">
            <i className="fa-solid fa-clock-rotate-left w-5"></i>
            <span className="font-label-md text-label-md">History</span>
          </Link>
        </div>
        <div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold text-sm shrink-0">
              JD
            </div>
            <div className="flex flex-col">
              <span className="font-body-md text-sm text-on-surface truncate">AutoCare Pro</span>
              <span className="font-label-sm text-[10px] text-primary flex items-center gap-1">System Active</span>
            </div>
          </div>
          <form action={logout}>
            <button type="submit" className="flex items-center w-full gap-4 p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-error transition-all duration-200">
              <i className="fa-solid fa-right-from-bracket w-5"></i>
              <span className="font-label-md text-label-md">Logout</span>
            </button>
          </form>
        </div>
      </nav>
    </>
  )
}