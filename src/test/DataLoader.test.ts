import { describe, it, expect, beforeEach, vi } from 'vitest'
import { dataLoader } from '../services/DataLoader'

describe('DataLoader', () => {
  beforeEach(() => {
    // Reset any cached data
    vi.clearAllMocks()
  })

  describe('getGameConfig', () => {
    it('should return game configuration when loaded', async () => {
      // Mock the fetch calls
      globalThis.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            levels: [{ id: 1, name: 'Test Level', width: 2400 }]
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            goblin: { health: 30, damage: 10, speed: 1 }
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            sword: { damage: 25, sprite: 'sword.svg' }
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            grass: { friction: 0.8 }
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            gameConstants: { physics: { gravity: 0.25 } }
          })
        })

      await dataLoader.loadGameConfig()
      const config = dataLoader.getGameConfig()
      expect(config).toBeDefined()
      expect(config.levels).toHaveLength(1)
      expect(config.levels[0].id).toBe(1)
    })
  })

  describe('getLevelData', () => {
    beforeEach(async () => {
      globalThis.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            levels: [
              { id: 1, name: 'Level 1', width: 2400 },
              { id: 2, name: 'Level 2', width: 2800 }
            ]
          })
        })
        .mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({})
        })

      await dataLoader.loadGameConfig()
    })

    it('should return correct level data', () => {
      const level1 = dataLoader.getLevelData(1)
      expect(level1.id).toBe(1)
      expect(level1.name).toBe('Level 1')
      expect(level1.width).toBe(2400)

      const level2 = dataLoader.getLevelData(2)
      expect(level2.id).toBe(2)
      expect(level2.name).toBe('Level 2')
      expect(level2.width).toBe(2800)
    })

    it('should throw error for invalid level ID', () => {
      expect(() => dataLoader.getLevelData(999)).toThrow('Level with ID 999 not found')
    })
  })

  describe('error handling', () => {
    it('should handle fetch errors gracefully', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(dataLoader.loadGameConfig()).rejects.toThrow('Failed to load game configuration')
    })

    it('should handle invalid JSON gracefully', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      })

      await expect(dataLoader.loadGameConfig()).rejects.toThrow('Failed to load game configuration')
    })
  })
})
