import { beforeEach, vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock requestAnimationFrame for tests
Object.defineProperty(globalThis, 'requestAnimationFrame', {
  value: (callback: FrameRequestCallback) => {
    return setTimeout(callback, 16) // ~60fps
  },
  writable: true
})

Object.defineProperty(globalThis, 'cancelAnimationFrame', {
  value: (id: number) => {
    clearTimeout(id)
  },
  writable: true
})

// Mock HTMLCanvasElement methods
HTMLCanvasElement.prototype.getContext = vi.fn() as any

// Mock Image constructor for sprite loading tests
class MockImage extends EventTarget {
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  private _src: string = ''
  
  get src() {
    return this._src
  }
  
  set src(value: string) {
    this._src = value
    // Simulate successful image load
    setTimeout(() => {
      if (this.onload) this.onload()
    }, 10)
  }
}

Object.defineProperty(globalThis, 'Image', {
  value: MockImage,
  writable: true
})
