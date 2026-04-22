'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function addServiceRecord(formData: FormData) {
  const session = await getSession()
  if (!session) return { error: 'Unauthorized' }

  const vehicleId = formData.get('vehicleId') as string
  const type = formData.get('type') as string
  const kmAtService = parseInt(formData.get('kmAtService') as string)
  const serviceDateStr = formData.get('serviceDate') as string
  const notes = formData.get('notes') as string
  const cost = parseFloat(formData.get('cost') as string) || 0
  
  // Merk oli bersifat opsional (hanya untuk oil_change)
  const oilBrand = formData.get('oilBrand') as string | null

  if (!vehicleId || !type || !kmAtService || !serviceDateStr) {
    return { error: 'Semua field dengan tanda bintang (*) wajib diisi.' }
  }

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } })
    if (!vehicle || vehicle.userId !== session.userId) {
      return { error: 'Kendaraan tidak ditemukan atau akses ditolak.' }
    }

    const serviceDate = new Date(serviceDateStr)
    
    await prisma.serviceRecord.create({
      data: {
        vehicleId,
        type,
        kmAtService,
        serviceDate,
        oilBrand: type === 'oil_change' && oilBrand ? oilBrand : null, // simpan hanya jika ganti oli
        notes,
        cost,
      },
    })

    // Update current KM of vehicle if the service KM is higher
    if (kmAtService > vehicle.currentKm) {
        await prisma.vehicle.update({
            where: { id: vehicleId },
            data: { currentKm: kmAtService }
        })
    }

  } catch (error) {
    console.error('Add service block error:', error)
    return { error: 'Gagal menambahkan riwayat servis.' }
  }

  revalidatePath(`/dashboard/vehicles/${vehicleId}`)
  return { success: true }
}

export async function deleteServiceRecord(recordId: string, vehicleId: string) {
  const session = await getSession()
  if (!session) return { error: 'Unauthorized' }

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } })
    if (!vehicle || vehicle.userId !== session.userId) {
      return { error: 'Akses ditolak.' }
    }

    await prisma.serviceRecord.delete({ where: { id: recordId } })
    
    revalidatePath(`/dashboard/vehicles/${vehicleId}`)
    return { success: true }
  } catch (error) {
    console.error('Delete service error:', error)
    return { error: 'Gagal menghapus riwayat servis.' }
  }
}
