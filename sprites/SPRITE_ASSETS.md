# Amazonian Adventure Platformer - Sprite Assets

This document defines all the sprite assets needed for the 8-bit Amazonian adventure platformer game.

## Asset Specifications
- **Style**: 8-bit pixel art
- **Format**: PNG with transparency
- **Color Palette**: Limited 16-color palette for authentic retro feel
- **Pixel Perfect**: All sprites should be pixel-perfect with no anti-aliasing
- **Size Guidelines**: Multiples of 16x16 pixels for consistency

## Directory Structure

```
public/sprites/
├── player/           # Amazonian warrior sprites
├── monsters/         # Enemy creature sprites  
├── weapons/          # Weapon and projectile sprites
├── magic/           # Magic effect sprites
├── platforms/       # Platform and terrain sprites
├── loot/           # Collectible item sprites
├── environment/    # Background and scenery sprites
└── ui/             # User interface sprites
```

## Asset Requirements by Category

### Player Character (Amazonian Warrior)
See: `player/README.md`

### Monsters
See: `monsters/README.md`

### Weapons & Projectiles
See: `weapons/README.md`

### Magic Effects
See: `magic/README.md`

### Platforms & Terrain
See: `platforms/README.md`

### Loot & Collectibles
See: `loot/README.md`

### Environment & Backgrounds
See: `environment/README.md`

### UI Elements
See: `ui/README.md`

## Implementation Notes

1. **Sprite Sheets**: Consider using sprite sheets for animations to reduce file count
2. **Naming Convention**: Use descriptive names with frame numbers (e.g., `warrior_run_01.png`)
3. **Animation Frames**: Most animations should be 4-8 frames for smooth 8-bit style
4. **Transparency**: Use PNG transparency for proper layering
5. **Consistency**: Maintain consistent lighting direction and pixel density across all assets

## Tools Recommended
- **Aseprite**: Professional pixel art tool
- **Piskel**: Free online pixel art editor
- **GraphicsGale**: Free pixel art software
- **Photoshop**: With pixel art techniques
