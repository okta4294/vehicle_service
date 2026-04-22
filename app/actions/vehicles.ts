'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createVehicle(formData: FormData) {
  const session = await getSession()
  if (!session) return { error: 'Unauthorized' }

  const type = formData.get('type') as string
  const brand = formData.get('brand') as string
  const model = formData.get('model') as string
  const plateNumber = formData.get('plateNumber') as string
  const currentKm = parseInt(formData.get('currentKm') as string) || 0

  if (!type || !brand || !model) {
    return { error: 'Tipe, Merk, dan Model wajib diisi.' }
  }

  try {
    await prisma.vehicle.create({
      data: {
        userId: session.userId,
        type,
        brand,
        model,
        plateNumber,
        currentKm,
      },
    })
  } catch (error) {
    console.error('Create vehicle error:', error)
    return { error: 'Gagal menambahkan kendaraan.' }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateKilometer(vehicleId: string, newKm: number) {
  const session = await getSession()
  if (!session) return { error: 'Unauthorized' }

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } })
    if (!vehicle || vehicle.userId !== session.userId) {
      return { error: 'Kendaraan tidak ditemukan atau akses ditolak.' }
    }

    if (newKm < vehicle.currentKm) {
      return { error: 'Kilometer baru tidak boleh lebih kecil dari kilometer saat ini.' }
    }

    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { currentKm: newKm },
    })

    revalidatePath(`/dashboard/vehicles/${vehicleId}`)
    revalidatePath('/dashboard')
    
    return { success: true }
  } catch (error) {
    console.error('Update KM error:', error)
    return { error: 'Gagal memperbarui kilometer.' }
  }
}

export async function deleteVehicle(vehicleId: string) {
  const session = await getSession()
  if (!session) return { error: 'Unauthorized' }

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } })
    if (!vehicle || vehicle.userId !== session.userId) {
      return { error: 'Akses ditolak.' }
    }

    await prisma.vehicle.delete({ where: { id: vehicleId } })
  } catch (error) {
    console.error('Delete vehicle error:', error)
    return { error: 'Gagal menghapus kendaraan.' }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
