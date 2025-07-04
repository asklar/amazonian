import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CastleGate from '../components/CastleGate'
import type { CastleGate as CastleGateType } from '../components/types'

// Mock castle gate data
const mockLockedGate: CastleGateType = {
  position: { x: 400, y: 300 },
  isUnlocked: false
}

const mockUnlockedGate: CastleGateType = {
  position: { x: 400, y: 300 },
  isUnlocked: true
}

describe('CastleGate Component', () => {
  it('should render castle gate at correct position', () => {
    render(
      <CastleGate 
        castleGate={mockLockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateElement = screen.getByLabelText('Castle Gate')
    expect(gateElement).toBeInTheDocument()
  })

  it('should apply camera offset to position', () => {
    render(
      <CastleGate 
        castleGate={mockLockedGate}
        cameraOffset={{ x: 100, y: 50 }}
      />
    )

    const gateContainer = screen.getByLabelText('Castle Gate').parentElement!
    const style = window.getComputedStyle(gateContainer)
    
    // Gate should be at position (400 - 100) = 300px from left
    expect(style.left).toBe('300px')
    // Gate should be at position (300 - 50) = 250px from top
    expect(style.top).toBe('250px')
  })

  it('should set correct dimensions', () => {
    render(
      <CastleGate 
        castleGate={mockLockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateContainer = screen.getByLabelText('Castle Gate').parentElement!
    const style = window.getComputedStyle(gateContainer)
    
    expect(style.width).toBe('80px')
    expect(style.height).toBe('120px')
  })

  it('should not have unlocked class when locked', () => {
    render(
      <CastleGate 
        castleGate={mockLockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateContainer = screen.getByLabelText('Castle Gate').parentElement!
    expect(gateContainer).toHaveClass('castle-gate')
    expect(gateContainer).not.toHaveClass('unlocked')
  })

  it('should have unlocked class when unlocked', () => {
    render(
      <CastleGate 
        castleGate={mockUnlockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateContainer = screen.getByLabelText('Castle Gate').parentElement!
    expect(gateContainer).toHaveClass('castle-gate', 'unlocked')
  })

  it('should apply filter when unlocked', () => {
    render(
      <CastleGate 
        castleGate={mockUnlockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateImage = screen.getByLabelText('Castle Gate')
    const style = window.getComputedStyle(gateImage)
    
    expect(style.filter).toContain('brightness')
    expect(style.filter).toContain('hue-rotate')
  })

  it('should not apply filter when locked', () => {
    render(
      <CastleGate 
        castleGate={mockLockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateImage = screen.getByLabelText('Castle Gate')
    const style = window.getComputedStyle(gateImage)
    
    expect(style.filter).toBe('none')
  })

  it('should show glow effect when unlocked', () => {
    render(
      <CastleGate 
        castleGate={mockUnlockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const glowElement = document.querySelector('.gate-glow')
    expect(glowElement).toBeInTheDocument()
  })

  it('should not show glow effect when locked', () => {
    render(
      <CastleGate 
        castleGate={mockLockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const glowElement = document.querySelector('.gate-glow')
    expect(glowElement).not.toBeInTheDocument()
  })

  it('should handle different gate positions', () => {
    const gateAtDifferentPosition = { ...mockLockedGate, position: { x: 100, y: 200 } }
    render(
      <CastleGate 
        castleGate={gateAtDifferentPosition}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateContainer = screen.getByLabelText('Castle Gate').parentElement!
    const style = window.getComputedStyle(gateContainer)
    
    expect(style.left).toBe('100px')
    expect(style.top).toBe('200px')
  })

  it('should set image dimensions to 100%', () => {
    render(
      <CastleGate 
        castleGate={mockLockedGate}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const gateImage = screen.getByLabelText('Castle Gate')
    const style = window.getComputedStyle(gateImage)
    
    expect(style.width).toBe('100%')
    expect(style.height).toBe('100%')
  })
})
