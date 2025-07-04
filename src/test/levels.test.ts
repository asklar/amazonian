import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getAvailableLevels, getMaxLevel, levelExists } from '../components/levels'
import { dataLoader } from '../services/DataLoader'

// Mock the dataLoader
vi.mock('../services/DataLoader', () => ({
  dataLoader: {
    getGameConfig: vi.fn()
  }
}))

describe('Levels Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAvailableLevels', () => {
    it('should return sorted level IDs from game config', () => {
      vi.mocked(dataLoader.getGameConfig).mockReturnValue({
        levels: [
          { id: 3, name: 'Level 3' },
          { id: 1, name: 'Level 1' },
          { id: 2, name: 'Level 2' }
        ],
        monsterTypes: {},
        weaponTypes: {},
        platformTypes: {},
        gameConstants: {}
      })

      const levels = getAvailableLevels()
      expect(levels).toEqual([1, 2, 3])
    })

    it('should return fallback levels when config is not loaded', () => {
      vi.mocked(dataLoader.getGameConfig).mockImplementation(() => {
        throw new Error('Config not loaded')
      })

      const levels = getAvailableLevels()
      expect(levels).toEqual([1, 2, 3])
    })

    it('should handle empty levels array', () => {
      vi.mocked(dataLoader.getGameConfig).mockReturnValue({
        levels: [],
        monsterTypes: {},
        weaponTypes: {},
        platformTypes: {},
        gameConstants: {}
      })

      const levels = getAvailableLevels()
      expect(levels).toEqual([])
    })
  })

  describe('getMaxLevel', () => {
    it('should return the highest level ID', () => {
      vi.mocked(dataLoader.getGameConfig).mockReturnValue({
        levels: [
          { id: 1, name: 'Level 1' },
          { id: 5, name: 'Level 5' },
          { id: 3, name: 'Level 3' }
        ],
        monsterTypes: {},
        weaponTypes: {},
        platformTypes: {},
        gameConstants: {}
      })

      const maxLevel = getMaxLevel()
      expect(maxLevel).toBe(5)
    })

    it('should handle single level', () => {
      vi.mocked(dataLoader.getGameConfig).mockReturnValue({
        levels: [{ id: 1, name: 'Level 1' }],
        monsterTypes: {},
        weaponTypes: {},
        platformTypes: {},
        gameConstants: {}
      })

      const maxLevel = getMaxLevel()
      expect(maxLevel).toBe(1)
    })
  })

  describe('levelExists', () => {
    beforeEach(() => {
      vi.mocked(dataLoader.getGameConfig).mockReturnValue({
        levels: [
          { id: 1, name: 'Level 1' },
          { id: 2, name: 'Level 2' },
          { id: 5, name: 'Level 5' }
        ],
        monsterTypes: {},
        weaponTypes: {},
        platformTypes: {},
        gameConstants: {}
      })
    })

    it('should return true for existing level', () => {
      expect(levelExists(1)).toBe(true)
      expect(levelExists(2)).toBe(true)
      expect(levelExists(5)).toBe(true)
    })

    it('should return false for non-existing level', () => {
      expect(levelExists(3)).toBe(false)
      expect(levelExists(99)).toBe(false)
      expect(levelExists(0)).toBe(false)
    })

    it('should handle negative level IDs', () => {
      expect(levelExists(-1)).toBe(false)
    })
  })
})
