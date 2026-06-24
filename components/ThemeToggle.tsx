'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-12 h-12 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary transition-all">
        <i className="fa-solid fa-sun"></i>
      </button>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="w-12 h-12 rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary transition-all"
      aria-label="Toggle Dark Mode"
    >
      <i className={`fa-solid ${currentTheme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
    </button>
  )
}
