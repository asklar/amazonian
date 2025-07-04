import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import GameUI from '../components/GameUI'
import type { Player } from '../components/types'

// Mock GAME_CONSTANTS in types.ts
vi.mock('../components/types', async () => {
  const actual = await vi.importActual('../components/types') as any
  return {
    ...actual,
    GAME_CONSTANTS: {
      MAGIC_COSTS: {
        quake: 20,
        blaze: 15,
        cure: 10
      }
    }
  }
})

describe('GameUI Component', () => {
  const mockPlayer: Player = {
    position: { x: 100, y: 400 },
    health: 80,
    maxHealth: 100,
    magic: 60,
    maxMagic: 100,
    weapon: 'sword',
    coins: 150,
    facingLeft: false,
    onGround: true,
    attacking: false,
    invulnerable: false
  }

  const defaultProps = {
    player: mockPlayer,
    currentLevel: 1
  }

  it('should display current level', () => {
    render(<GameUI {...defaultProps} />)
    
    expect(screen.getByText('Level: 1')).toBeInTheDocument()
  })

  it('should display player coins', () => {
    render(<GameUI {...defaultProps} />)
    
    expect(screen.getByText('Coins: 150')).toBeInTheDocument()
  })

  it('should display current weapon in uppercase', () => {
    render(<GameUI {...defaultProps} />)
    
    expect(screen.getByText('Weapon: SWORD')).toBeInTheDocument()
  })

  it('should display health bar with correct percentage', () => {
    render(<GameUI {...defaultProps} />)
    
    const healthBar = document.querySelector('.health-bar-fill')
    expect(healthBar).toBeInTheDocument()
    expect(healthBar).toHaveStyle('width: 80%')
  })

  it('should display magic bar with correct percentage', () => {
    render(<GameUI {...defaultProps} />)
    
    const magicBar = document.querySelector('.magic-bar-fill')
    expect(magicBar).toBeInTheDocument()
    expect(magicBar).toHaveStyle('width: 60%')
  })

  it('should show control instructions', () => {
    render(<GameUI {...defaultProps} />)
    
    expect(screen.getByText(/arrows to move/i)).toBeInTheDocument()
    expect(screen.getByText(/space to attack/i)).toBeInTheDocument()
  })

  it('should show spell costs and availability', () => {
    render(<GameUI {...defaultProps} />)
    
    expect(screen.getByText(/Q: Quake \(20\)/)).toBeInTheDocument()
    expect(screen.getByText(/W: Blaze \(15\)/)).toBeInTheDocument()
    expect(screen.getByText(/E: Cure \(10\)/)).toBeInTheDocument()
  })

  it('should show disabled spell styling when insufficient magic', () => {
    const lowMagicPlayer = { ...mockPlayer, magic: 5 }
    render(<GameUI {...defaultProps} player={lowMagicPlayer} />)
    
    const quakeSpell = screen.getByText(/Q: Quake \(20\)/).parentElement
    expect(quakeSpell).toHaveClass('disabled')
  })

  it('should display restart and debug controls', () => {
    render(<GameUI {...defaultProps} />)
    
    expect(screen.getByText('R: Restart')).toBeInTheDocument()
    expect(screen.getByText('F1: Debug')).toBeInTheDocument()
  })

  it('should handle different weapon types', () => {
    const bowPlayer = { ...mockPlayer, weapon: 'bow' }
    render(<GameUI {...defaultProps} player={bowPlayer} />)
    
    expect(screen.getByText('Weapon: BOW')).toBeInTheDocument()
  })

  it('should handle zero health and magic', () => {
    const deadPlayer = { ...mockPlayer, health: 0, magic: 0 }
    render(<GameUI {...defaultProps} player={deadPlayer} />)
    
    const healthBar = document.querySelector('.health-bar-fill')
    const magicBar = document.querySelector('.magic-bar-fill')
    expect(healthBar).toHaveStyle('width: 0%')
    expect(magicBar).toHaveStyle('width: 0%')
  })

  it('should handle maximum health and magic', () => {
    const fullPlayer = { ...mockPlayer, health: 100, magic: 100 }
    render(<GameUI {...defaultProps} player={fullPlayer} />)
    
    const healthBar = document.querySelector('.health-bar-fill')
    const magicBar = document.querySelector('.magic-bar-fill')
    expect(healthBar).toHaveStyle('width: 100%')
    expect(magicBar).toHaveStyle('width: 100%')
  })
})
