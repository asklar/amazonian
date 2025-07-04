import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projectile from '../components/Projectile'
import type { Projectile as ProjectileType } from '../components/types'

// Mock the dataLoader
vi.mock('../services/DataLoader', () => ({
  dataLoader: {
    isConfigLoaded: vi.fn(),
    getGameConfig: vi.fn()
  }
}))

import { dataLoader } from '../services/DataLoader'

const mockDataLoader = vi.mocked(dataLoader)

// Mock projectile data
const mockProjectile: ProjectileType = {
  id: 'proj-1',
  type: 'arrow',
  position: { x: 150, y: 200 },
  velocity: { x: 5, y: 0 },
  damage: 25,
  facing: 'right',
  isActive: true,
  source: 'player'
}

describe('Projectile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render active projectile at correct position', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    render(
      <Projectile 
        projectile={mockProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileElement = screen.getByAltText('arrow projectile')
    expect(projectileElement).toBeInTheDocument()
  })

  it('should not render inactive projectile', () => {
    const inactiveProjectile = { ...mockProjectile, isActive: false }
    
    render(
      <Projectile 
        projectile={inactiveProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileElement = screen.queryByAltText('arrow projectile')
    expect(projectileElement).not.toBeInTheDocument()
  })

  it('should apply camera offset to position', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    render(
      <Projectile 
        projectile={mockProjectile}
        cameraOffset={{ x: 50, y: 25 }}
      />
    )

    const projectileContainer = screen.getByAltText('arrow projectile').parentElement!
    const style = window.getComputedStyle(projectileContainer)
    
    // Projectile should be at position (150 - 50) = 100px from left
    expect(style.left).toBe('100px')
    // Projectile should be at position (200 - 25) = 175px from top
    expect(style.top).toBe('175px')
  })

  it('should apply correct facing transform', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    const leftFacingProjectile = { ...mockProjectile, facing: 'left' as const }
    
    render(
      <Projectile 
        projectile={leftFacingProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileContainer = screen.getByAltText('arrow projectile').parentElement!
    const style = window.getComputedStyle(projectileContainer)
    
    expect(style.transform).toBe('scaleX(-1)')
  })

  it('should use config-based sprite when available', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(true)
    mockDataLoader.getGameConfig.mockReturnValue({
      weaponTypes: {
        bow: {
          projectile: {
            type: 'arrow',
            sprite: '/custom/arrow.svg',
            size: { width: 20, height: 8 }
          }
        }
      }
    })
    
    render(
      <Projectile 
        projectile={mockProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileContainer = screen.getByAltText('arrow projectile').parentElement!
    const style = window.getComputedStyle(projectileContainer)
    
    // Should use config size
    expect(style.width).toBe('20px')
    expect(style.height).toBe('8px')
  })

  it('should use fallback sprite when config not available', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    render(
      <Projectile 
        projectile={mockProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileContainer = screen.getByAltText('arrow projectile').parentElement!
    const style = window.getComputedStyle(projectileContainer)
    
    // Should use default size
    expect(style.width).toBe('16px')
    expect(style.height).toBe('16px')
  })

  it('should handle different projectile types', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    const fireProjectile = { ...mockProjectile, type: 'fire' as const }
    
    render(
      <Projectile 
        projectile={fireProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileElement = screen.getByAltText('fire projectile')
    expect(projectileElement).toBeInTheDocument()
    
    const projectileContainer = projectileElement.parentElement!
    expect(projectileContainer).toHaveClass('projectile', 'fire')
  })

  it('should handle frost projectiles', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    const frostProjectile = { ...mockProjectile, type: 'frost' as const }
    
    render(
      <Projectile 
        projectile={frostProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileElement = screen.getByAltText('frost projectile')
    expect(projectileElement).toBeInTheDocument()
  })

  it('should handle whirlwind projectiles', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    const whirlwindProjectile = { ...mockProjectile, type: 'whirlwind' as const }
    
    render(
      <Projectile 
        projectile={whirlwindProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileElement = screen.getByAltText('whirlwind projectile')
    expect(projectileElement).toBeInTheDocument()
  })

  it('should set high z-index for projectiles', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(false)
    
    render(
      <Projectile 
        projectile={mockProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileContainer = screen.getByAltText('arrow projectile').parentElement!
    const style = window.getComputedStyle(projectileContainer)
    
    expect(style.zIndex).toBe('100')
    expect(style.position).toBe('absolute')
  })

  it('should handle config loading errors gracefully', () => {
    mockDataLoader.isConfigLoaded.mockReturnValue(true)
    mockDataLoader.getGameConfig.mockImplementation(() => {
      throw new Error('Config error')
    })
    
    // Should not throw and should render with fallback
    render(
      <Projectile 
        projectile={mockProjectile}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const projectileElement = screen.getByAltText('arrow projectile')
    expect(projectileElement).toBeInTheDocument()
  })
})
