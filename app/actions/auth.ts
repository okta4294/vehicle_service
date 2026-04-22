'use server'

import { prisma } from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const errors: { email?: string, password?: string, general?: string } = {}

  if (!email) errors.email = 'Email wajib diisi.'
  if (!password) errors.password = 'Password wajib diisi.'

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return { errors: { general: 'Email atau password salah.' } }
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
      return { errors: { general: 'Email atau password salah.' } }
    }

    await createSession(user.id, user.email, user.name)
  } catch (error) {
    console.error('Login error:', error)
    return { errors: { general: 'Terjadi kesalahan sistem. Silakan coba lagi.' } }
  }

  redirect('/dashboard')
}

export async function register(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  const errors: { name?: string, email?: string, password?: string, confirmPassword?: string, general?: string } = {}

  if (!name) errors.name = 'Nama wajib diisi.'
  if (!email) errors.email = 'Email wajib diisi.'
  if (!password) {
    errors.password = 'Password wajib diisi.'
  } else if (password.length < 6) {
    errors.password = 'Password minimal 6 karakter.'
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password tidak cocok.'
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { errors: { email: 'Email sudah terdaftar.' } }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    await createSession(user.id, user.email, user.name)
  } catch (error: any) {
    console.error('Register error:', error)
    return { errors: { general: `Terjadi kesalahan saat mendaftar: ${error?.message || String(error)}` } }
  }

  redirect('/dashboard')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
