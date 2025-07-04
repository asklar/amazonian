import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import MagicEffect from '../components/MagicEffect'
import type { MagicEffect as MagicEffectType } from '../components/types'

// Mock GAME_CONSTANTS
vi.mock('../constants/gameConstants', () => ({
  GAME_CONSTANTS: {
    MAGIC_RANGES: {
      BLAZE: 100
    }
  }
}))

describe('MagicEffect Component', () => {
  const mockEffect: MagicEffectType = {
    type: 'quake',
    position: { x: 200, y: 300 },
    duration: 500,
    active: true
  }

  const mockCameraOffset = { x: 0, y: 0 }

  it('should render active quake effect at correct position', () => {
    render(
      <MagicEffect
        effect={mockEffect}
        cameraOffset={mockCameraOffset}
      />
    )

    const effectElement = document.querySelector('.magic-effect')
    expect(effectElement).toBeInTheDocument()
  })

  it('should not render inactive effect', () => {
    const inactiveEffect = { ...mockEffect, active: false }
    render(
      <MagicEffect
        effect={inactiveEffect}
        cameraOffset={mockCameraOffset}
      />
    )

    const effectElement = document.querySelector('.magic-effect')
    expect(effectElement).not.toBeInTheDocument()
  })

  it('should apply camera offset to position', () => {
    const cameraOffset = { x: 50, y: 25 }
    render(
      <MagicEffect
        effect={mockEffect}
        cameraOffset={cameraOffset}
      />
    )

    const effectElement = document.querySelector('.magic-effect')
    expect(effectElement).toBeInTheDocument()
    
    const style = window.getComputedStyle(effectElement!)
    expect(style.left).toBe('150px') // 200 - 50
    expect(style.top).toBe('275px')  // 300 - 25
  })

  it('should render cure effect with correct class', () => {
    const cureEffect = { ...mockEffect, type: 'cure' as const }
    render(
      <MagicEffect
        effect={cureEffect}
        cameraOffset={mockCameraOffset}
      />
    )

    const effectElement = document.querySelector('.magic-effect')
    expect(effectElement).toBeInTheDocument()
    expect(effectElement).toHaveClass('cure-effect')
  })

  it('should render blaze effect with range indicator', () => {
    const blazeEffect = { ...mockEffect, type: 'blaze' as const }
    render(
      <MagicEffect
        effect={blazeEffect}
        cameraOffset={mockCameraOffset}
      />
    )

    const effectElement = document.querySelector('.magic-effect')
    const rangeIndicator = document.querySelector('.blaze-range-indicator')
    
    expect(effectElement).toBeInTheDocument()
    expect(rangeIndicator).toBeInTheDocument()
  })

  it('should position blaze range indicator correctly', () => {
    const blazeEffect = { ...mockEffect, type: 'blaze' as const }
    render(
      <MagicEffect
        effect={blazeEffect}
        cameraOffset={mockCameraOffset}
      />
    )

    const rangeIndicator = document.querySelector('.blaze-range-indicator')
    expect(rangeIndicator).toBeInTheDocument()
    
    const style = window.getComputedStyle(rangeIndicator!)
    expect(style.left).toBe('100px') // 200 - 100
    expect(style.top).toBe('200px')  // 300 - 100
  })

  it('should handle different effect types', () => {
    const { rerender } = render(
      <MagicEffect
        effect={mockEffect}
        cameraOffset={mockCameraOffset}
      />
    )

    expect(document.querySelector('.quake-effect')).toBeInTheDocument()

    rerender(
      <MagicEffect
        effect={{ ...mockEffect, type: 'cure' }}
        cameraOffset={mockCameraOffset}
      />
    )

    expect(document.querySelector('.cure-effect')).toBeInTheDocument()
  })

  it('should handle zero camera offset', () => {
    render(
      <MagicEffect
        effect={mockEffect}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const effectElement = document.querySelector('.magic-effect')
    expect(effectElement).toBeInTheDocument()
    
    const style = window.getComputedStyle(effectElement!)
    expect(style.left).toBe('200px')
    expect(style.top).toBe('300px')
  })

  it('should handle negative camera offset', () => {
    render(
      <MagicEffect
        effect={mockEffect}
        cameraOffset={{ x: -30, y: -20 }}
      />
    )

    const effectElement = document.querySelector('.magic-effect')
    expect(effectElement).toBeInTheDocument()
    
    const style = window.getComputedStyle(effectElement!)
    expect(style.left).toBe('230px') // 200 - (-30)
    expect(style.top).toBe('320px')  // 300 - (-20)
  })

  it('should only render range indicator for blaze effects', () => {
    const { rerender } = render(
      <MagicEffect
        effect={{ ...mockEffect, type: 'quake' }}
        cameraOffset={mockCameraOffset}
      />
    )

    const rangeIndicator = document.querySelector('.blaze-range-indicator')
    expect(rangeIndicator).not.toBeInTheDocument()
  })
})
