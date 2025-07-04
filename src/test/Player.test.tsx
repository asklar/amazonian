import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Player from '../components/Player'
import type { Player as PlayerType } from '../components/types'

describe('Player Component', () => {
  const mockPlayer: PlayerType = {
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

  const mockCameraOffset = { x: 0, y: 0 }

  it('should render player at correct position', () => {
    render(
      <Player
        player={mockPlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const playerElement = screen.getByLabelText('Amazonian Warrior')
    expect(playerElement).toBeInTheDocument()
  })

  it('should apply camera offset to position', () => {
    const cameraOffset = { x: 50, y: 0 }
    render(
      <Player
        player={mockPlayer}
        cameraOffset={cameraOffset}
      />
    )

    const playerElement = screen.getByLabelText('Amazonian Warrior')
    const style = window.getComputedStyle(playerElement.parentElement!)
    
    expect(style.left).toBe('50px') // 100 - 50
  })

  it('should render correct weapon sprite when attacking', () => {
    const attackingPlayer = { ...mockPlayer, attacking: true }
    render(
      <Player
        player={attackingPlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const weaponImage = screen.getByLabelText('sword')
    expect(weaponImage).toBeInTheDocument()
  })

  it('should apply facing-left class when facing left', () => {
    const leftFacingPlayer = { ...mockPlayer, facingLeft: true }
    render(
      <Player
        player={leftFacingPlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const playerContainer = screen.getByLabelText('Amazonian Warrior').parentElement!
    expect(playerContainer).toHaveClass('facing-left')
  })

  it('should show attacking class when player is attacking', () => {
    const attackingPlayer = { ...mockPlayer, attacking: true }
    render(
      <Player
        player={attackingPlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const playerContainer = screen.getByLabelText('Amazonian Warrior').parentElement!
    expect(playerContainer).toHaveClass('attacking')
  })

  it('should show jumping class when not on ground', () => {
    const jumpingPlayer = { ...mockPlayer, onGround: false }
    render(
      <Player
        player={jumpingPlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const playerContainer = screen.getByLabelText('Amazonian Warrior').parentElement!
    expect(playerContainer).toHaveClass('jumping')
  })

  it('should show invulnerable class when invulnerable', () => {
    const invulnerablePlayer = { ...mockPlayer, invulnerable: true }
    render(
      <Player
        player={invulnerablePlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const playerContainer = screen.getByLabelText('Amazonian Warrior').parentElement!
    expect(playerContainer).toHaveClass('invulnerable')
  })

  it('should not render weapon when not attacking', () => {
    render(
      <Player
        player={mockPlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const weaponImage = screen.queryByLabelText('sword')
    expect(weaponImage).not.toBeInTheDocument()
  })

  it('should render different weapons based on weapon type', () => {
    const bowPlayer = { ...mockPlayer, weapon: 'bow', attacking: true }
    render(
      <Player
        player={bowPlayer}
        cameraOffset={mockCameraOffset}
      />
    )

    const bowImage = screen.getByLabelText('bow')
    expect(bowImage).toBeInTheDocument()
  })
})
