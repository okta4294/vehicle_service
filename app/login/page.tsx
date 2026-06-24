'use client'

import { useActionState, useState } from 'react'
import { login, register } from '@/app/actions/auth'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loginState, loginAction, isLoginPending] = useActionState(login, null)
  const [registerState, registerAction, isRegisterPending] = useActionState(register, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-6 antialiased">
      <main className="w-full max-w-sm flex flex-col gap-6">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-1">
            <i className="fa-solid fa-car text-on-primary text-2xl"></i>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary">AutoCare</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">System Access</p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-low border border-surface-container-high rounded-lg p-6 w-full flex flex-col gap-4">
          <form action={isLogin ? loginAction : registerAction} className="flex flex-col gap-4">
            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="name">Nama Lengkap</label>
                <input className="w-full bg-surface border border-surface-container-high rounded p-2 pl-3 font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none transition-colors" id="name" name="name" placeholder="Nama Lengkap" required={!isLogin} type="text"/>
                {registerState?.errors?.name && <p className="text-error text-xs">{registerState.errors.name}</p>}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email</label>
              <input className="w-full bg-surface border border-surface-container-high rounded p-2 pl-3 font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none transition-colors" id="email" name="email" placeholder="admin@autocare.com" required type="email"/>
              {isLogin && loginState?.errors?.email && <p className="text-error text-xs">{loginState.errors.email}</p>}
              {!isLogin && registerState?.errors?.email && <p className="text-error text-xs">{registerState.errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
              <div className="relative">
                <input className="w-full bg-surface border border-surface-container-high rounded p-2 pl-3 font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none transition-colors pr-10" id="password" name="password" placeholder="password" required type={showPassword ? 'text' : 'password'}/>
                <button onClick={() => setShowPassword(!showPassword)} type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {isLogin && loginState?.errors?.password && <p className="text-error text-xs">{loginState.errors.password}</p>}
              {!isLogin && registerState?.errors?.password && <p className="text-error text-xs">{registerState.errors.password}</p>}
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="confirmPassword">Konfirmasi Password</label>
                <input className="w-full bg-surface border border-surface-container-high rounded p-2 pl-3 font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none transition-colors" id="confirmPassword" name="confirmPassword" placeholder="konfirmasi password" required={!isLogin} type={showPassword ? 'text' : 'password'}/>
                {registerState?.errors?.confirmPassword && <p className="text-error text-xs">{registerState.errors.confirmPassword}</p>}
              </div>
            )}

            {isLogin && (
              <div className="flex justify-between items-center mt-1">
                <a className="font-label-sm text-label-sm text-primary hover:text-primary-fixed transition-colors" href="#">Lupa Password</a>
              </div>
            )}

            {isLogin && loginState?.errors?.general && <p className="text-error text-sm bg-error-container/20 text-error p-3 rounded border border-error/20">{loginState.errors.general}</p>}
            {!isLogin && registerState?.errors?.general && <p className="text-error text-sm bg-error-container/20 text-error p-3 rounded border border-error/20">{registerState.errors.general}</p>}

            <button disabled={isLogin ? isLoginPending : isRegisterPending} className="w-full mt-1 bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 disabled:opacity-70" type="submit">
              {(isLogin ? isLoginPending : isRegisterPending) ? (
                <svg className="animate-spin h-5 w-5 text-on-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <span>{isLogin ? 'Masuk' : 'Daftar'}</span>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-2">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {isLogin ? 'Belum memiliki akun?' : 'Sudah terdaftar?'}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-primary-fixed transition-colors font-label-md text-label-md ml-1">
              {isLogin ? 'Daftar' : 'Masuk'}
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}