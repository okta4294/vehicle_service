import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import HomePageClient from './HomePageClient'

export default async function Page() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return <HomePageClient />
}
