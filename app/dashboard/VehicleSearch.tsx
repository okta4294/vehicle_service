'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'

export default function VehicleSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isExpanded, setIsExpanded] = useState(false)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        if (query) {
          router.push(`/dashboard?q=${encodeURIComponent(query)}`)
        } else {
          router.push('/dashboard')
        }
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [query, router])

  return (
    <div className={`relative flex items-center transition-all duration-300 ${isExpanded ? 'w-64' : 'w-12'}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute z-10 w-12 h-12 rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-all"
        aria-label="Search"
      >
        <span className="material-symbols-outlined">search</span>
      </button>
      
      <input
        type="text"
        placeholder="Cari kendaraan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        onBlur={(e) => {
          if (!query) setIsExpanded(false)
        }}
        className={`w-full h-12 bg-surface-container/30 border border-white/5 focus:border-primary/50 rounded-full pl-12 pr-4 font-body-md text-on-surface focus:outline-none transition-all duration-300 ${isExpanded ? 'opacity-100 glass-panel' : 'opacity-0 pointer-events-none'}`}
      />
      {isPending && isExpanded && (
        <span className="absolute right-4 w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span>
      )}
    </div>
  )
}
