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
      <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-on-surface hover:text-primary transition-all">
        <span className="material-symbols-outlined">light_mode</span>
      </button>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-on-surface hover:text-primary hover:shadow-[0_0_15px_rgba(76,215,246,0.3)] transition-all"
      aria-label="Toggle Dark Mode"
    >
      <span className="material-symbols-outlined">
        {currentTheme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
