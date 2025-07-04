import { describe, it, expect, beforeEach, vi } from 'vitest'
import { gameFactory } from '../services/GameFactory'
import { dataLoader } from '../services/DataLoader'

// Mock the dataLoader
vi.mock('../services/DataLoader', () => ({
  dataLoader: {
    getLevelData: vi.fn(),
    getMonsterTypes: vi.fn(),
    getWeaponTypes: vi.fn(),
    getPlatformTypes: vi.fn()
  }
}))

describe('GameFactory', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createLevel', () => {
    it('should create a complete level with all entities', () => {
      // Mock level data
      const mockLevelData = {
        id: 1,
        name: 'Test Level',
        width: 2400,
        background: {
          skyGradient: { top: '#87CEEB', bottom: '#FFA07A' },
          layers: []
        },
        playerStartPosition: { x: 50, y: 452 },
        platforms: [
          { id: 'platform1', x: 0, y: 500, width: 800, height: 100, type: 'grass' }
        ],
        monsters: [
          { 
            id: 'goblin1', 
            type: 'goblin', 
            position: { x: 400, y: 460 }, 
            facing: 'right' as const,
            patrolStart: 350,
            patrolEnd: 550
          }
        ],
        loot: [
          { id: 'coin1', type: 'coin', position: { x: 350, y: 370 }, collected: false }
        ],
        castleGate: {
          position: { x: 2200, y: 380 },
          isUnlocked: false
        }
      }

      // Mock dependencies
      vi.mocked(dataLoader.getLevelData).mockReturnValue(mockLevelData)
      vi.mocked(dataLoader.getMonsterTypes).mockReturnValue({
        goblin: { health: 30, damage: 10, speed: 1, sprite: 'goblin.svg' }
      })
      vi.mocked(dataLoader.getPlatformTypes).mockReturnValue({
        grass: { friction: 0.8, sprite: 'grass.svg' }
      })

      const level = gameFactory.createLevel(1)

      expect(level.id).toBe(1)
      expect(level.name).toBe('Test Level')
      expect(level.width).toBe(2400)
      expect(level.monsters).toHaveLength(1)
      expect(level.platforms).toHaveLength(1)
      expect(level.loot).toHaveLength(1)
      expect(level.castleGate).toBeDefined()
    })

    it('should create monsters with correct properties', () => {
      const mockLevelData = {
        id: 1,
        name: 'Test Level',
        width: 2400,
        background: { skyGradient: { top: '#87CEEB', bottom: '#FFA07A' }, layers: [] },
        playerStartPosition: { x: 50, y: 452 },
        platforms: [],
        monsters: [
          { 
            id: 'dragon1', 
            type: 'dragon', 
            position: { x: 1200, y: 240 }, 
            facing: 'left' as const,
            patrolStart: 1100,
            patrolEnd: 1350
          }
        ],
        loot: [],
        castleGate: { position: { x: 2200, y: 380 }, isUnlocked: false }
      }

      vi.mocked(dataLoader.getLevelData).mockReturnValue(mockLevelData)
      vi.mocked(dataLoader.getMonsterTypes).mockReturnValue({
        dragon: { 
          health: 100, 
          damage: 25, 
          speed: 0.8, 
          sprite: 'dragon.svg',
          projectiles: [
            {
              type: 'fire',
              cooldown: 3000,
              range: 200,
              launchOffset: { x: 0, y: -10 },
              weight: 1
            }
          ]
        }
      })

      const level = gameFactory.createLevel(1)
      const dragon = level.monsters[0]

      expect(dragon.id).toBe('dragon1')
      expect(dragon.type).toBe('dragon')
      expect(dragon.health).toBe(100)
      expect(dragon.maxHealth).toBe(100)
      expect(dragon.position).toEqual({ x: 1200, y: 240 })
      expect(dragon.facing).toBe('left')
      expect(dragon.patrolStart).toBe(1100)
      expect(dragon.patrolEnd).toBe(1350)
      expect(dragon.projectiles).toHaveLength(1)
      expect(dragon.projectiles![0].type).toBe('fire')
    })

    it('should create platforms with correct properties', () => {
      const mockLevelData = {
        id: 1,
        name: 'Test Level',
        width: 2400,
        background: { skyGradient: { top: '#87CEEB', bottom: '#FFA07A' }, layers: [] },
        playerStartPosition: { x: 50, y: 452 },
        platforms: [
          { id: 'ice1', x: 600, y: 300, width: 100, height: 20, type: 'ice' }
        ],
        monsters: [],
        loot: [],
        castleGate: { position: { x: 2200, y: 380 }, isUnlocked: false }
      }

      vi.mocked(dataLoader.getLevelData).mockReturnValue(mockLevelData)
      vi.mocked(dataLoader.getPlatformTypes).mockReturnValue({
        ice: { friction: 0.1, sprite: 'ice.svg' }
      })

      const level = gameFactory.createLevel(1)
      const platform = level.platforms[0]

      expect(platform.id).toBe('ice1')
      expect(platform.x).toBe(600)
      expect(platform.y).toBe(300)
      expect(platform.width).toBe(100)
      expect(platform.height).toBe(20)
      expect(platform.type).toBe('ice')
    })
  })
})
