'use client'

import { useActionState, useState } from 'react'
import { login, register } from '@/app/actions/auth'
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loginState, loginAction, isLoginPending] = useActionState(login, null)
  const [registerState, registerAction, isRegisterPending] = useActionState(register, null)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-dark-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-600/5 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-dark-400 hover:text-dark-100 transition-colors mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Kembali ke Beranda
        </Link>
        
        <div className="glass-card p-8 rounded-3xl w-full border border-dark-800">
          <div className="flex justify-center mb-8">
             <div className="bg-gradient-to-br from-brand-500 to-accent-500 p-3 rounded-2xl inline-flex">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                 <path d="m11.23 2-7.55 7.55A3 3 0 0 0 2.8 14.6l.85.85a3 3 0 0 0 5.05-2.12l7.55-7.55"></path>
                 <path d="M15.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                 <path d="m18.5 5.5.5-.5a3.5 3.5 0 1 1 5 5l-.5.5"></path>
               </svg>
             </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-dark-50 mb-2">
            {isLogin ? 'Selamat Datang' : 'Buat Akun'}
          </h2>
          <p className="text-dark-400 text-center mb-8">
            {isLogin ? 'Masuk untuk mengelola kendaraan Anda' : 'Daftar sekarang untuk mulai memantau servis'}
          </p>

          <form action={isLogin ? loginAction : registerAction} className="flex flex-col gap-5">
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-dark-300">Nama Lengkap</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required={!isLogin}
                  className={`px-4 py-3 bg-dark-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-dark-50 transition-all ${registerState?.errors?.name ? 'border-red-500' : 'border-dark-700'}`}
                  placeholder="Masukkan nama Anda"
                />
                {!isLogin && registerState?.errors?.name && <p className="text-red-400 text-xs mt-1">{registerState.errors.name}</p>}
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-dark-300">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required
                className={`px-4 py-3 bg-dark-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-dark-50 transition-all ${(isLogin ? loginState?.errors?.email : registerState?.errors?.email) ? 'border-red-500' : 'border-dark-700'}`}
                placeholder="nama@email.com"
              />
              {isLogin && loginState?.errors?.email && <p className="text-red-400 text-xs mt-1">{loginState.errors.email}</p>}
              {!isLogin && registerState?.errors?.email && <p className="text-red-400 text-xs mt-1">{registerState.errors.email}</p>}
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-dark-300">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required
                className={`px-4 py-3 bg-dark-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-dark-50 transition-all ${(isLogin ? loginState?.errors?.password : registerState?.errors?.password) ? 'border-red-500' : 'border-dark-700'}`}
                placeholder="Minimal 6 karakter"
              />
              {isLogin && loginState?.errors?.password && <p className="text-red-400 text-xs mt-1">{loginState.errors.password}</p>}
              {!isLogin && registerState?.errors?.password && <p className="text-red-400 text-xs mt-1">{registerState.errors.password}</p>}
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-dark-300">Konfirmasi Password</label>
                <input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  required={!isLogin}
                  className={`px-4 py-3 bg-dark-900 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-dark-50 transition-all ${registerState?.errors?.confirmPassword ? 'border-red-500' : 'border-dark-700'}`}
                  placeholder="Ulangi password"
                />
                {!isLogin && registerState?.errors?.confirmPassword && <p className="text-red-400 text-xs mt-1">{registerState.errors.confirmPassword}</p>}
              </div>
            )}

            {/* General Error Message */}
            {isLogin && loginState?.errors?.general && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">{loginState.errors.general}</p>}
            {!isLogin && registerState?.errors?.general && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">{registerState.errors.general}</p>}

            <button 
              type="submit" 
              disabled={isLogin ? isLoginPending : isRegisterPending}
              className="mt-2 w-full py-3 px-4 bg-brand-600 hover:bg-brand-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center h-12"
            >
              {(isLogin ? isLoginPending : isRegisterPending) ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                isLogin ? 'Masuk' : 'Daftar'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-dark-400">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-brand-500 font-medium hover:text-brand-400 transition-colors"
            >
              {isLogin ? 'Daftar sekarang' : 'Masuk di sini'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
