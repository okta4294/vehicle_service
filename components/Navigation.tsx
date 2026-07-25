'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: 'fa-table-columns'
    },
    {
      name: 'History',
      href: '/dashboard/history',
      icon: 'fa-clock-rotate-left'
    }
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-surface fixed bottom-0 left-0 w-full z-50 border-t border-outline-variant flex justify-around items-center px-4 h-20 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/dashboard'
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}
            >
              <div className="relative flex items-center justify-center h-8 w-12 rounded-full mb-1">
                <i className={`text-xl ${isActive ? `fa-solid ${item.icon}` : `fa-regular ${item.icon}`}`}></i>
                {isActive && (
                  <span className="absolute -bottom-2 w-1.5 h-1.5 bg-secondary rounded-full"></span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.name}
              </span>
            </Link>
          )
        })}
        
        {/* Floating Action/Profile Mock (to match reference) */}
        <Link 
          href="/dashboard/profile"
          className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${pathname === '/dashboard/profile' ? 'text-secondary' : 'text-on-surface-variant'}`}
        >
           <div className="relative flex items-center justify-center h-8 w-12 rounded-full mb-1">
              <i className={`text-xl ${pathname === '/dashboard/profile' ? 'fa-solid fa-user' : 'fa-regular fa-user'}`}></i>
           </div>
           <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>

      {/* Sidebar (Desktop) */}
      <nav className="hidden md:flex bg-surface-container fixed left-0 top-0 h-full w-64 border-r border-outline-variant flex-col gap-2 p-4 z-40 transition-transform duration-200">
        <div className="mb-6 px-2">
          <div className="font-headline-md text-headline-md font-bold text-primary">AutoCare</div>
          <div className="font-label-sm text-label-sm text-on-surface-variant">Fleet Management</div>
        </div>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== '/dashboard'
            
            return (
              <Link 
                key={item.href}
                className={`flex items-center gap-4 p-3 transition-all duration-200 rounded-xl ${
                  isActive 
                    ? 'bg-primary-container text-white shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`} 
                href={item.href}
              >
                <i className={`${isActive ? `fa-solid ${item.icon}` : `fa-regular ${item.icon}`} w-5 text-center`}></i>
                <span className="font-label-md text-label-md">{item.name}</span>
              </Link>
            )
          })}
        </div>
        <div className="mt-auto border-t border-outline-variant pt-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-sm shrink-0">
              JD
            </div>
            <div className="flex flex-col">
              <span className="font-body-md text-sm text-on-surface font-semibold truncate">AutoCare Pro</span>
              <span className="font-label-sm text-[10px] text-primary flex items-center gap-1">System Active</span>
            </div>
          </div>
          <form action={logout}>
            <button type="submit" className="flex items-center w-full gap-4 p-3 rounded-xl text-on-surface-variant hover:bg-surface-container-highest hover:text-error transition-all duration-200">
              <i className="fa-regular fa-arrow-right-from-bracket w-5 text-center"></i>
              <span className="font-label-md text-label-md">Logout</span>
            </button>
          </form>
        </div>
      </nav>
    </>
  )
}