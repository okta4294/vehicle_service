'use client'

import { useActionState, useState } from 'react'
import { login, register } from '@/app/actions/auth'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loginState, loginAction, isLoginPending] = useActionState(login, null)
  const [registerState, registerAction, isRegisterPending] = useActionState(register, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-body-md text-body-md selection:bg-primary/30 selection:text-primary-fixed">
      {/* Ambient Background Ethereal Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px] opacity-60 mix-blend-screen translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full bg-secondary-container/10 blur-[120px] opacity-40 mix-blend-screen -translate-x-1/4 translate-y-1/4"></div>
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik02MCAwaC0xdjYwaDFWMHptLTIgMGgtMXY2MGgxVjB6TTAgNTloNjB2MWgtNjB2LTF6TTAgNTdoNjB2MWgtNjB2LTF6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz48L2c+PC9zdmc+')] opacity-20" style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))" }}></div>
      </div>
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-on-surface-variant hover:text-primary hover:bg-white/5 hover:shadow-[0_0_15px_rgba(76,215,246,0.2)] transition-all group">
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label-caps text-label-caps hidden sm:block">Kembali</span>
        </Link>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Login Container */}
      <main className="relative z-10 w-full max-w-[480px] px-container-padding">
        {/* Glass Card */}
        <div className="glass-panel rounded-xl p-8 md:p-12 phantom-glow relative overflow-hidden flex flex-col items-center">
          {/* Diagonal Light Sweep Effect inside card */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          {/* Header Section */}
          <div className="w-full text-center mb-10 flex flex-col items-center">
            <div className="w-24 h-24 mb-6 rounded-full glass-panel p-2 shadow-[0_0_30px_rgba(76,215,246,0.2)]">
              <img alt="AutoCare Logo" className="w-full h-full object-contain rounded-full" src="https://lh3.googleusercontent.com/aida/AP1WRLuOi-fKT5G3ETKsEt4RFHebcQw6PqvDMD5QMTawKTH1A2XM9z1a3YaVXpfYo5zIBPjkpEaqdyIJ2Ykn2yqD1SaGpHiMsY4Il4O14JqY61Bjc5GljCSb8h3kMJh5XNeLsQqkO81DgbJc-BZxgXLcfLn0WynuFuMKeoog2EELfVd55N0EeCEuYHXM8aJ7kbmZxnbwL5oornidPs7FA7uPdC7Xu71O48Q1i0DU8rtvZzVOh85ef-pLeQEpXJA"/>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-2 tracking-tight">
              {isLogin ? 'Selamat Datang' : 'Buat Akun'}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto">
              {isLogin ? 'Akses dashboard AutoCare Anda untuk pemantauan sistem.' : 'Registrasi untuk mulai memantau kendaraan Anda.'}
            </p>
          </div>
          
          {/* Login Form */}
          <form action={isLogin ? loginAction : registerAction} className="w-full space-y-6">
            {!isLogin && (
                <div className="space-y-2">
                    <label className="block font-label-caps text-label-caps text-primary uppercase tracking-widest pl-1" htmlFor="name">
                        Nama Lengkap
                    </label>
                    <div className="relative glass-input rounded-xl flex items-center px-4 py-3 group">
                        <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 transition-colors text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>person</span>
                        <input className="bg-transparent border-none w-full text-on-surface font-body-md focus:ring-0 placeholder:text-outline/50 p-0" id="name" name="name" placeholder="Nama Lengkap" required={!isLogin} type="text"/>
                    </div>
                    {!isLogin && registerState?.errors?.name && <p className="text-error text-xs mt-1 pl-1">{registerState.errors.name}</p>}
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block font-label-caps text-label-caps text-primary uppercase tracking-widest pl-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative glass-input rounded-xl flex items-center px-4 py-3 group">
                <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 transition-colors text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>mail</span>
                <input className="bg-transparent border-none w-full text-on-surface font-body-md focus:ring-0 placeholder:text-outline/50 p-0" id="email" name="email" placeholder="admin@autocare.com" required type="email"/>
              </div>
              {isLogin && loginState?.errors?.email && <p className="text-error text-xs mt-1 pl-1">{loginState.errors.email}</p>}
              {!isLogin && registerState?.errors?.email && <p className="text-error text-xs mt-1 pl-1">{registerState.errors.email}</p>}
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="block font-label-caps text-label-caps text-primary uppercase tracking-widest" htmlFor="password">
                  Password
                </label>
                {isLogin && (
                    <a className="font-label-caps text-[10px] text-primary/70 hover:text-primary transition-colors tracking-wider" href="#">
                        Lupa Password?
                    </a>
                )}
              </div>
              <div className="relative glass-input rounded-xl flex items-center px-4 py-3 group">
                <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 transition-colors text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                <input className="bg-transparent border-none w-full text-on-surface font-body-md focus:ring-0 placeholder:text-outline/50 p-0 tracking-widest" id="password" name="password" placeholder="••••••••" required type={showPassword ? 'text' : 'password'}/>
                <button onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility" className="ml-3 text-outline hover:text-on-surface transition-colors focus:outline-none" type="button">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {isLogin && loginState?.errors?.password && <p className="text-error text-xs mt-1 pl-1">{loginState.errors.password}</p>}
              {!isLogin && registerState?.errors?.password && <p className="text-error text-xs mt-1 pl-1">{registerState.errors.password}</p>}
            </div>

            {!isLogin && (
                <div className="space-y-2">
                    <label className="block font-label-caps text-label-caps text-primary uppercase tracking-widest pl-1" htmlFor="confirmPassword">
                        Konfirmasi Password
                    </label>
                    <div className="relative glass-input rounded-xl flex items-center px-4 py-3 group">
                        <span className="material-symbols-outlined text-outline group-focus-within:text-primary mr-3 transition-colors text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>lock</span>
                        <input className="bg-transparent border-none w-full text-on-surface font-body-md focus:ring-0 placeholder:text-outline/50 p-0 tracking-widest" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required={!isLogin} type={showPassword ? 'text' : 'password'}/>
                    </div>
                    {!isLogin && registerState?.errors?.confirmPassword && <p className="text-error text-xs mt-1 pl-1">{registerState.errors.confirmPassword}</p>}
                </div>
            )}

            {/* General Error Message */}
            {isLogin && loginState?.errors?.general && <p className="text-error text-sm bg-error-container/20 text-error p-3 rounded-xl border border-error/20">{loginState.errors.general}</p>}
            {!isLogin && registerState?.errors?.general && <p className="text-error text-sm bg-error-container/20 text-error p-3 rounded-xl border border-error/20">{registerState.errors.general}</p>}

            {/* Action Area */}
            <div className="pt-4">
              <button disabled={isLogin ? isLoginPending : isRegisterPending} className="w-full bg-gradient-to-r from-[#4cd7f6] to-[#06b6d4] rounded-full py-4 px-6 font-body-lg text-body-lg font-semibold text-on-primary flex items-center justify-center gap-2 group shadow-[0_4px_14px_0_rgba(76,215,246,0.39)] hover:shadow-[0_0_20px_rgba(76,215,246,0.4)] hover:-translate-y-[1px] transition-all disabled:opacity-70 disabled:cursor-not-allowed" type="submit">
                {(isLogin ? isLoginPending : isRegisterPending) ? (
                    <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                    <>
                        <span>{isLogin ? 'Masuk' : 'Daftar'}</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                    </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="font-body-md text-sm text-on-surface-variant">
              {isLogin ? 'Belum punya akses?' : 'Sudah terdaftar?'}
              {' '}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)} 
                className="text-primary hover:text-primary-fixed font-medium transition-colors"
              >
                {isLogin ? 'Daftar Sistem' : 'Masuk Sistem'}
              </button>
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center border-t border-white/5 pt-4 w-full">
            <p className="font-label-caps text-label-caps text-on-surface-variant">
              Sistem Operasi Phantom <span className="text-primary/50 mx-2">|</span> v2.4.1
            </p>
          </div>
        </div>
      </main>
      
      {/* Shared Footer from JSON (Contextual adaptation: Minimal version for Login) */}
      <footer className="absolute bottom-0 w-full py-2 px-container-padding flex flex-col md:flex-row justify-between items-center bg-surface-container-lowest/50 backdrop-blur-md border-t border-white/5 z-10">
        <div className="font-label-caps text-label-caps text-primary mb-2 md:mb-0">
            AUTOCARE PHANTOM
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant text-sm">
            © 2024 AutoCare Phantom Systems. All rights reserved.
        </div>
        <div className="flex gap-4 mt-2 md:mt-0 font-body-md text-body-md text-sm">
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}
