import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

// Mock DataLoader before importing Background
const mockGetLevelData = vi.fn()
vi.mock('../services/DataLoader', () => ({
  dataLoader: {
    getLevelData: mockGetLevelData
  }
}))

import Background from '../components/Background'

describe('Background Component', () => {
  const mockCameraOffset = { x: 0, y: 0 }

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default mock level data
    mockGetLevelData.mockReturnValue({
      background: {
        skyGradient: ['#87CEEB', '#98D8E8'],
        layers: [
          {
            src: '/sprites/backgrounds/forest_layer1.svg',
            speed: 0.2,
            repeat: true
          },
          {
            src: '/sprites/backgrounds/forest_layer2.svg',
            speed: 0.5,
            repeat: true
          }
        ]
      }
    })
  })

  it('should render background with layers', () => {
    render(
      <Background
        currentLevel={1}
        cameraOffset={mockCameraOffset}
      />
    )

    const backgroundElement = document.querySelector('.background')
    expect(backgroundElement).toBeInTheDocument()
    
    const layers = document.querySelectorAll('.background-layer')
    expect(layers).toHaveLength(2)
  })

  it('should render multiple background layers', () => {
    render(
      <Background
        currentLevel={1}
        cameraOffset={mockCameraOffset}
      />
    )

    const layers = document.querySelectorAll('.background-layer')
    expect(layers).toHaveLength(2)
    
    expect(mockGetLevelData).toHaveBeenCalledWith(1)
  })

  it('should handle camera offset', () => {
    const cameraOffset = { x: 100, y: 50 }
    render(
      <Background
        currentLevel={1}
        cameraOffset={cameraOffset}
      />
    )

    const backgroundElement = document.querySelector('.background')
    expect(backgroundElement).toBeInTheDocument()
  })

  it('should handle case when levels are not loaded', () => {
    mockGetLevelData.mockImplementation(() => {
      throw new Error('Levels not loaded')
    })

    expect(() => {
      render(
        <Background
          currentLevel={1}
          cameraOffset={mockCameraOffset}
        />
      )
    }).not.toThrow()
  })

  it('should handle case when current level has no background', () => {
    mockGetLevelData.mockReturnValue({
      background: {
        skyGradient: ['#87CEEB'],
        layers: []
      }
    })

    render(
      <Background
        currentLevel={1}
        cameraOffset={mockCameraOffset}
      />
    )

    const backgroundElement = document.querySelector('.background')
    expect(backgroundElement).toBeInTheDocument()
    
    const layers = document.querySelectorAll('.background-layer')
    expect(layers).toHaveLength(0)
  })

  it('should handle different current levels', () => {
    render(
      <Background
        currentLevel={2}
        cameraOffset={mockCameraOffset}
      />
    )

    expect(mockGetLevelData).toHaveBeenCalledWith(2)
  })

  it('should apply layer properties correctly', () => {
    render(
      <Background
        currentLevel={1}
        cameraOffset={mockCameraOffset}
      />
    )

    const layers = document.querySelectorAll('.background-layer')
    expect(layers).toHaveLength(2)
  })

  it('should handle array elements for random selection', () => {
    mockGetLevelData.mockReturnValue({
      background: {
        skyGradient: ['#87CEEB', '#98D8E8'],
        layers: [
          {
            src: ['/sprites/bg1.svg', '/sprites/bg2.svg'],
            speed: 0.2,
            repeat: true
          }
        ]
      }
    })

    render(
      <Background
        currentLevel={1}
        cameraOffset={mockCameraOffset}
      />
    )

    const backgroundElement = document.querySelector('.background')
    expect(backgroundElement).toBeInTheDocument()
  })

  it('should handle zero camera offset', () => {
    render(
      <Background
        currentLevel={1}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const backgroundElement = document.querySelector('.background')
    expect(backgroundElement).toBeInTheDocument()
  })

  it('should handle negative camera offset', () => {
    render(
      <Background
        currentLevel={1}
        cameraOffset={{ x: -50, y: -25 }}
      />
    )

    const backgroundElement = document.querySelector('.background')
    expect(backgroundElement).toBeInTheDocument()
  })
})
