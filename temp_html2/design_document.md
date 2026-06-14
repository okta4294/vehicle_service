---
name: Phantom UI
description: A high-tech, futuristic design system with an obsidian aesthetic, featuring deep dark surfaces, glassmorphism, and electric cyan neon glows.
colors:
  surface: '#0c1324'
  surface-dim: '#0c1324'
  surface-bright: '#33394c'
  surface-container-lowest: '#070d1f'
  surface-container-low: '#151b2d'
  surface-container: '#1c2437'
  surface-container-high: '#282f42'
  surface-container-highest: '#33394c'
  on-surface: '#f0f4f9'
  on-surface-variant: '#c2cbdc'
  outline: '#414859'
  outline-variant: '#2e3546'
  primary: '#06b6d4'
  on-primary: '#003640'
  primary-container: '#004e5d'
  on-primary-container: '#97f0ff'
  secondary: '#b0c9ef'
  on-secondary: '#193254'
  secondary-container: '#31496c'
  on-secondary-container: '#d3e4ff'
  tertiary: '#dfbbef'
  on-tertiary: '#412752'
  tertiary-container: '#593d6a'
  on-tertiary-container: '#f7d8ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
typography:
  font-family: Sora, sans-serif
  display-lg:
    size: 57px
    line-height: 64px
    weight: 700
  headline-md:
    size: 28px
    line-height: 36px
    weight: 600
  body-md:
    size: 16px
    line-height: 24px
    weight: 400
  label-caps:
    size: 12px
    line-height: 16px
    weight: 600
    letter-spacing: 0.1em
    text-transform: uppercase
effects:
  glassmorphism:
    background: rgba(28, 36, 55, 0.6)
    backdrop-filter: blur(12px)
    border: 1px solid rgba(255, 255, 255, 0.1)
  neon-glow-cyan:
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.4)
    text-shadow: 0 0 10px rgba(6, 182, 212, 0.5)
shape:
  corner-radius:
    full: 9999px
    large: 24px
    medium: 16px
---

# Phantom UI Design System

Phantom UI is built for high-performance automotive and telemetry interfaces. It prioritizes readability in low-light environments while maintaining a sleek, futuristic aesthetic.

## Principles

1. **Obsidian Foundation**: Deep, dark backgrounds (#0c1324) reduce eye strain and provide the perfect canvas for high-contrast accents.
2. **Neon Precision**: Electric Cyan (#06b6d4) is used sparingly for critical actions, status indicators, and brand elements to guide user attention.
3. **Glassmorphism**: Layering uses transparency and blur to create depth without breaking the clean, flat aesthetic.
4. **Sora Typography**: A geometric sans-serif that balances tech-focused styling with exceptional legibility.

## Components

### Buttons
- **Primary**: Full rounded shape, Electric Cyan background with a subtle neon glow.
- **Secondary**: Ghost style with a thin border and translucent background.

### Cards
- **Vehicle Card**: Featuring `backdrop-blur` and a thin border highlight. Status indicators use pulsing neon glows.
- **Service History**: List items with high-contrast labels and iconography.

### Navigation
- **Side Navigation**: Minimalist icons with text labels, active states highlighted with a primary container background and glow.
