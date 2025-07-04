import { describe, it, expect } from 'vitest'

// Helper functions to test
export const checkCollision = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor
}

export const distance = (
  pos1: { x: number; y: number },
  pos2: { x: number; y: number }
): number => {
  const dx = pos2.x - pos1.x
  const dy = pos2.y - pos1.y
  return Math.sqrt(dx * dx + dy * dy)
}

describe('Game Utility Functions', () => {
  describe('checkCollision', () => {
    it('should return true when rectangles overlap', () => {
      const rect1 = { x: 0, y: 0, width: 50, height: 50 }
      const rect2 = { x: 25, y: 25, width: 50, height: 50 }
      
      expect(checkCollision(rect1, rect2)).toBe(true)
    })

    it('should return false when rectangles do not overlap', () => {
      const rect1 = { x: 0, y: 0, width: 50, height: 50 }
      const rect2 = { x: 100, y: 100, width: 50, height: 50 }
      
      expect(checkCollision(rect1, rect2)).toBe(false)
    })

    it('should return true when rectangles touch at edge', () => {
      const rect1 = { x: 0, y: 0, width: 50, height: 50 }
      const rect2 = { x: 50, y: 0, width: 50, height: 50 }
      
      expect(checkCollision(rect1, rect2)).toBe(false) // Edge touching should not count
    })

    it('should return true when one rectangle is inside another', () => {
      const rect1 = { x: 0, y: 0, width: 100, height: 100 }
      const rect2 = { x: 25, y: 25, width: 20, height: 20 }
      
      expect(checkCollision(rect1, rect2)).toBe(true)
    })
  })

  describe('clamp', () => {
    it('should return the value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5)
    })

    it('should return min when value is below range', () => {
      expect(clamp(-5, 0, 10)).toBe(0)
    })

    it('should return max when value is above range', () => {
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('should work with negative ranges', () => {
      expect(clamp(-5, -10, -1)).toBe(-5)
      expect(clamp(-15, -10, -1)).toBe(-10)
      expect(clamp(5, -10, -1)).toBe(-1)
    })
  })

  describe('lerp', () => {
    it('should return start value when factor is 0', () => {
      expect(lerp(10, 20, 0)).toBe(10)
    })

    it('should return end value when factor is 1', () => {
      expect(lerp(10, 20, 1)).toBe(20)
    })

    it('should return interpolated value when factor is 0.5', () => {
      expect(lerp(10, 20, 0.5)).toBe(15)
    })

    it('should work with negative values', () => {
      expect(lerp(-10, 10, 0.5)).toBe(0)
    })

    it('should extrapolate when factor is outside 0-1 range', () => {
      expect(lerp(10, 20, 2)).toBe(30)
      expect(lerp(10, 20, -1)).toBe(0)
    })
  })

  describe('distance', () => {
    it('should return 0 for same position', () => {
      const pos1 = { x: 5, y: 5 }
      const pos2 = { x: 5, y: 5 }
      
      expect(distance(pos1, pos2)).toBe(0)
    })

    it('should calculate horizontal distance correctly', () => {
      const pos1 = { x: 0, y: 0 }
      const pos2 = { x: 3, y: 0 }
      
      expect(distance(pos1, pos2)).toBe(3)
    })

    it('should calculate vertical distance correctly', () => {
      const pos1 = { x: 0, y: 0 }
      const pos2 = { x: 0, y: 4 }
      
      expect(distance(pos1, pos2)).toBe(4)
    })

    it('should calculate diagonal distance correctly', () => {
      const pos1 = { x: 0, y: 0 }
      const pos2 = { x: 3, y: 4 }
      
      expect(distance(pos1, pos2)).toBe(5) // 3-4-5 triangle
    })

    it('should work with negative coordinates', () => {
      const pos1 = { x: -3, y: -4 }
      const pos2 = { x: 0, y: 0 }
      
      expect(distance(pos1, pos2)).toBe(5)
    })
  })
})
