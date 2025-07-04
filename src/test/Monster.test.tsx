import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Monster from '../components/Monster'
import type { Monster as MonsterType } from '../components/types'

// Mock GAME_CONSTANTS
vi.mock('../components/types', async () => {
  const actual = await vi.importActual('../components/types')
  return {
    ...actual,
    GAME_CONSTANTS: {
      MONSTER_SIZE: {
        goblin: { width: 32, height: 40 },
        orc: { width: 32, height: 40 },
        skeleton: { width: 32, height: 40 }
      }
    }
  }
})

describe('Monster Component', () => {
  const mockCameraOffset = { x: 0, y: 0 }

  const mockGoblin: MonsterType = {
    id: '1',
    type: 'goblin',
    position: { x: 200, y: 400 },
    startingPosition: { x: 200, y: 400 },
    velocity: { x: 0, y: 0 },
    health: 50,
    maxHealth: 50,
    facing: 'left',
    isAlive: true,
    isBurning: false,
    burnTimer: 0,
    patrolStart: 150,
    patrolEnd: 250,
    isDying: false,
    deathTimer: 0,
    damage: 10,
    isHit: false,
    hitStunTimer: 0
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render monster at correct position', () => {
    render(
      <Monster
        monster={mockGoblin}
        cameraOffset={mockCameraOffset}
      />
    )

    const monsterElement = screen.getByLabelText('goblin monster')
    expect(monsterElement).toBeInTheDocument()
  })

  it('should not render when monster is dead and not dying', () => {
    const deadMonster = { ...mockGoblin, isAlive: false, isDying: false }
    
    const { container } = render(
      <Monster
        monster={deadMonster}
        cameraOffset={mockCameraOffset}
      />
    )

    expect(container.firstChild).toBeNull()
  })
})
