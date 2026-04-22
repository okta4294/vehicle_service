'use client'

import Link from 'next/link'
import { logout } from '@/app/actions/auth'

export function Navbar({ userName }: { userName: string | null }) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-brand-500 to-accent-500 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                 <path d="m11.23 2-7.55 7.55A3 3 0 0 0 2.8 14.6l.85.85a3 3 0 0 0 5.05-2.12l7.55-7.55"></path>
                 <path d="M15.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                 <path d="m18.5 5.5.5-.5a3.5 3.5 0 1 1 5 5l-.5.5"></path>
                </svg>
              </div>
              <span className="font-bold text-xl text-dark-50">AutoCare</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-dark-300">
              Halo, <span className="text-dark-50 font-medium">{userName || 'Pengguna'}</span>
            </div>
            <button 
              onClick={() => logout()}
              className="text-sm font-medium text-dark-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-400/10"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
