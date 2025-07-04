import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Platform from '../components/Platform'
import type { Platform as PlatformType } from '../components/types'

// Mock platform data
const mockGrassPlatform: PlatformType = {
  id: 'platform-1',
  x: 100,
  y: 400,
  width: 200,
  height: 32,
  type: 'grass'
}

const mockStonePlatform: PlatformType = {
  id: 'platform-2',
  x: 350,
  y: 300,
  width: 150,
  height: 32,
  type: 'stone'
}

const mockWoodPlatform: PlatformType = {
  id: 'platform-3',
  x: 500,
  y: 200,
  width: 100,
  height: 32,
  type: 'wood'
}

describe('Platform Component', () => {
  it('should render grass platform at correct position', () => {
    render(
      <Platform 
        platform={mockGrassPlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const platformElement = document.querySelector('.platform.grass')
    expect(platformElement).toBeInTheDocument()
  })

  it('should apply camera offset to position', () => {
    render(
      <Platform 
        platform={mockGrassPlatform}
        cameraOffset={{ x: 50, y: 25 }}
      />
    )

    const platformElement = document.querySelector('.platform.grass')!
    const style = window.getComputedStyle(platformElement)
    
    // Platform should be at position (100 - 50) = 50px from left
    expect(style.left).toBe('50px')
    // Platform should be at position (400 - 25) = 375px from top
    expect(style.top).toBe('375px')
  })

  it('should set correct dimensions', () => {
    render(
      <Platform 
        platform={mockGrassPlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const platformElement = document.querySelector('.platform.grass')!
    const style = window.getComputedStyle(platformElement)
    
    expect(style.width).toBe('200px')
    expect(style.height).toBe('32px')
  })

  it('should render stone platform with correct class', () => {
    render(
      <Platform 
        platform={mockStonePlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const platformElement = document.querySelector('.platform.stone')
    expect(platformElement).toBeInTheDocument()
  })

  it('should render wood platform with correct class', () => {
    render(
      <Platform 
        platform={mockWoodPlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const platformElement = document.querySelector('.platform.wood')
    expect(platformElement).toBeInTheDocument()
  })

  it('should load grass sprites for grass platforms', () => {
    render(
      <Platform 
        platform={mockGrassPlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const grassSprite = screen.getByAltText('grass platform top')
    const soilSprite = screen.getByAltText('soil platform fill')
    
    expect(grassSprite).toBeInTheDocument()
    expect(soilSprite).toBeInTheDocument()
    
    // Sprites should be hidden (used for preloading)
    expect(grassSprite).toHaveStyle('display: none')
    expect(soilSprite).toHaveStyle('display: none')
  })

  it('should load single sprite for non-grass platforms', () => {
    render(
      <Platform 
        platform={mockStonePlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const stoneSprite = screen.getByAltText('stone platform')
    expect(stoneSprite).toBeInTheDocument()
    expect(stoneSprite).toHaveStyle('display: none')
  })

  it('should add has-svg-sprite class when sprite loads', () => {
    render(
      <Platform 
        platform={mockStonePlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const platformElement = document.querySelector('.platform.stone')!
    const stoneSprite = screen.getByAltText('stone platform')
    
    // Initially should not have the class
    expect(platformElement).not.toHaveClass('has-svg-sprite')
    
    // Simulate sprite load
    stoneSprite.dispatchEvent(new Event('load'))
    
    // Should now have the class
    expect(platformElement).toHaveClass('has-svg-sprite')
  })

  it('should handle ice platform type', () => {
    const icePlatform: PlatformType = {
      id: 'platform-ice',
      x: 100,
      y: 400,
      width: 200,
      height: 32,
      type: 'ice'
    }

    render(
      <Platform 
        platform={icePlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const platformElement = document.querySelector('.platform.ice')
    expect(platformElement).toBeInTheDocument()
  })

  it('should handle different platform dimensions', () => {
    const largePlatform: PlatformType = {
      id: 'platform-large',
      x: 0,
      y: 0,
      width: 500,
      height: 64,
      type: 'stone'
    }

    render(
      <Platform 
        platform={largePlatform}
        cameraOffset={{ x: 0, y: 0 }}
      />
    )

    const platformElement = document.querySelector('.platform.stone')!
    const style = window.getComputedStyle(platformElement)
    
    expect(style.width).toBe('500px')
    expect(style.height).toBe('64px')
  })
})
