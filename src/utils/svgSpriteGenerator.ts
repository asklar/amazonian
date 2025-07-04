/**
 * SVG Sprite Generator for Amazonian Adventure Platformer
 * 
 * This utility programmatically generates SVG sprites with 8-bit pixel art styling.
 * Each sprite is designed using a grid-based approach to maintain consistency.
 */

// Color palette for 8-bit aesthetic
export const PALETTE = {
  // Player colors
  WARRIOR_SKIN: '#D2B48C',
  WARRIOR_HAIR: '#8B4513',
  WARRIOR_CLOTHES: '#4B0082',
  WARRIOR_METAL: '#C0C0C0',
  WARRIOR_LEATHER: '#8B4513',
  
  // Monster colors
  GOBLIN_SKIN: '#228B22',
  GOBLIN_EYES: '#FF0000',
  GOBLIN_CLOTHES: '#8B4513',
  
  ORC_SKIN: '#556B2F',
  ORC_ARMOR: '#696969',
  ORC_WEAPON: '#2F4F4F',
  
  SKELETON_BONE: '#F5F5DC',
  SKELETON_SHADOW: '#696969',
  
  DRAGON_SCALES: '#8B0000',
  DRAGON_BELLY: '#DC143C',
  DRAGON_EYES: '#FFD700',
  
  // Environment colors
  GRASS_LIGHT: '#32CD32',
  GRASS_DARK: '#228B22',
  WOOD_LIGHT: '#DEB887',
  WOOD_DARK: '#8B4513',
  STONE_LIGHT: '#D3D3D3',
  STONE_DARK: '#A9A9A9',
  
  // Loot colors
  COIN_GOLD: '#FFD700',
  COIN_SHADOW: '#DAA520',
  HEALTH_RED: '#FF6347',
  HEALTH_LIGHT: '#FFA07A',
  MAGIC_BLUE: '#4169E1',
  MAGIC_LIGHT: '#87CEEB',
  
  // Effects
  FIRE_RED: '#FF4500',
  FIRE_ORANGE: '#FF8C00',
  FIRE_YELLOW: '#FFD700',
  SPARK_WHITE: '#FFFFFF',
  
  // Common
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  TRANSPARENT: 'transparent'
};

// Grid-based sprite creation utility
class PixelGrid {
  private grid: string[][];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(null).map(() => Array(width).fill(PALETTE.TRANSPARENT));
  }

  setPixel(x: number, y: number, color: string) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = color;
    }
  }

  fillRect(x: number, y: number, width: number, height: number, color: string) {
    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        this.setPixel(x + dx, y + dy, color);
      }
    }
  }

  fillCircle(centerX: number, centerY: number, radius: number, color: string) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        if (distance <= radius) {
          this.setPixel(x, y, color);
        }
      }
    }
  }

  toSVG(): string {
    let svg = `<svg width="${this.width}" height="${this.height}" viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;">\n`;
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const color = this.grid[y][x];
        if (color !== PALETTE.TRANSPARENT) {
          svg += `  <rect x="${x}" y="${y}" width="1" height="1" fill="${color}"/>\n`;
        }
      }
    }
    
    svg += '</svg>';
    return svg;
  }
}

// Sprite generators
export class SVGSpriteGenerator {
  
  // Player Sprites
  static generateWarriorIdle(frame: number = 1): string {
    const grid = new PixelGrid(32, 48);
    
    // Head
    grid.fillRect(12, 8, 8, 8, PALETTE.WARRIOR_SKIN);
    grid.fillRect(10, 6, 12, 4, PALETTE.WARRIOR_HAIR);
    
    // Eyes
    grid.setPixel(14, 10, PALETTE.BLACK);
    grid.setPixel(18, 10, PALETTE.BLACK);
    
    // Body
    grid.fillRect(10, 16, 12, 16, PALETTE.WARRIOR_CLOTHES);
    
    // Arms
    grid.fillRect(6, 18, 4, 12, PALETTE.WARRIOR_SKIN);
    grid.fillRect(22, 18, 4, 12, PALETTE.WARRIOR_SKIN);
    
    // Legs
    grid.fillRect(12, 32, 4, 16, PALETTE.WARRIOR_SKIN);
    grid.fillRect(16, 32, 4, 16, PALETTE.WARRIOR_SKIN);
    
    // Slight animation variation
    if (frame === 2) {
      // Move arms slightly
      grid.fillRect(6, 19, 4, 12, PALETTE.WARRIOR_SKIN);
      grid.fillRect(22, 19, 4, 12, PALETTE.WARRIOR_SKIN);
    }
    
    return grid.toSVG();
  }

  static generateWarriorRun(frame: number): string {
    const grid = new PixelGrid(32, 48);
    
    // Basic body structure
    grid.fillRect(12, 8, 8, 8, PALETTE.WARRIOR_SKIN);
    grid.fillRect(10, 6, 12, 4, PALETTE.WARRIOR_HAIR);
    grid.setPixel(14, 10, PALETTE.BLACK);
    grid.setPixel(18, 10, PALETTE.BLACK);
    grid.fillRect(10, 16, 12, 16, PALETTE.WARRIOR_CLOTHES);
    
    // Animated running poses
    const legOffset = Math.sin(frame * 0.5) * 2;
    const armOffset = Math.cos(frame * 0.5) * 2;
    
    // Arms (swinging)
    grid.fillRect(6 + armOffset, 18, 4, 12, PALETTE.WARRIOR_SKIN);
    grid.fillRect(22 - armOffset, 18, 4, 12, PALETTE.WARRIOR_SKIN);
    
    // Legs (running)
    grid.fillRect(12 + legOffset, 32, 4, 16, PALETTE.WARRIOR_SKIN);
    grid.fillRect(16 - legOffset, 32, 4, 16, PALETTE.WARRIOR_SKIN);
    
    return grid.toSVG();
  }

  static generateWarriorJump(_frame: number): string {
    const grid = new PixelGrid(32, 48);
    
    // Head
    grid.fillRect(12, 6, 8, 8, PALETTE.WARRIOR_SKIN);
    grid.fillRect(10, 4, 12, 4, PALETTE.WARRIOR_HAIR);
    grid.setPixel(14, 8, PALETTE.BLACK);
    grid.setPixel(18, 8, PALETTE.BLACK);
    
    // Body
    grid.fillRect(10, 14, 12, 16, PALETTE.WARRIOR_CLOTHES);
    
    // Arms (spread out for jumping)
    grid.fillRect(4, 16, 4, 12, PALETTE.WARRIOR_SKIN);
    grid.fillRect(24, 16, 4, 12, PALETTE.WARRIOR_SKIN);
    
    // Legs (bent for jumping)
    grid.fillRect(12, 30, 4, 12, PALETTE.WARRIOR_SKIN);
    grid.fillRect(16, 30, 4, 12, PALETTE.WARRIOR_SKIN);
    
    return grid.toSVG();
  }

  static generateWarriorSwordAttack(_frame: number): string {
    const grid = new PixelGrid(32, 48);
    
    // Basic body
    grid.fillRect(12, 8, 8, 8, PALETTE.WARRIOR_SKIN);
    grid.fillRect(10, 6, 12, 4, PALETTE.WARRIOR_HAIR);
    grid.setPixel(14, 10, PALETTE.BLACK);
    grid.setPixel(18, 10, PALETTE.BLACK);
    grid.fillRect(10, 16, 12, 16, PALETTE.WARRIOR_CLOTHES);
    
    // Sword arm (attacking position)
    grid.fillRect(22, 14, 6, 4, PALETTE.WARRIOR_SKIN);
    grid.fillRect(26, 8, 2, 8, PALETTE.WARRIOR_METAL); // Sword blade
    grid.fillRect(26, 16, 2, 2, PALETTE.WARRIOR_LEATHER); // Sword handle
    
    // Other arm
    grid.fillRect(6, 18, 4, 12, PALETTE.WARRIOR_SKIN);
    
    // Legs
    grid.fillRect(12, 32, 4, 16, PALETTE.WARRIOR_SKIN);
    grid.fillRect(16, 32, 4, 16, PALETTE.WARRIOR_SKIN);
    
    return grid.toSVG();
  }

  // Monster Sprites
  static generateGoblinIdle(frame: number = 1): string {
    const grid = new PixelGrid(24, 32);
    
    // Head
    grid.fillRect(8, 6, 8, 6, PALETTE.GOBLIN_SKIN);
    
    // Eyes (red and menacing)
    grid.setPixel(10, 8, PALETTE.GOBLIN_EYES);
    grid.setPixel(14, 8, PALETTE.GOBLIN_EYES);
    
    // Body
    grid.fillRect(6, 12, 12, 12, PALETTE.GOBLIN_CLOTHES);
    
    // Arms
    grid.fillRect(2, 14, 4, 8, PALETTE.GOBLIN_SKIN);
    grid.fillRect(18, 14, 4, 8, PALETTE.GOBLIN_SKIN);
    
    // Legs
    grid.fillRect(8, 24, 3, 8, PALETTE.GOBLIN_SKIN);
    grid.fillRect(13, 24, 3, 8, PALETTE.GOBLIN_SKIN);
    
    // Slight breathing animation
    if (frame === 2) {
      // Move body slightly up
      grid.fillRect(6, 11, 12, 12, PALETTE.GOBLIN_CLOTHES);
    }
    
    return grid.toSVG();
  }

  static generateGoblinWalk(frame: number): string {
    const grid = new PixelGrid(24, 32);
    
    // Head
    grid.fillRect(8, 6, 8, 6, PALETTE.GOBLIN_SKIN);
    grid.setPixel(10, 8, PALETTE.GOBLIN_EYES);
    grid.setPixel(14, 8, PALETTE.GOBLIN_EYES);
    
    // Body
    grid.fillRect(6, 12, 12, 12, PALETTE.GOBLIN_CLOTHES);
    
    // Animated walking
    const legOffset = Math.sin(frame * 0.3) * 1;
    const armOffset = Math.cos(frame * 0.3) * 1;
    
    // Arms
    grid.fillRect(2 + armOffset, 14, 4, 8, PALETTE.GOBLIN_SKIN);
    grid.fillRect(18 - armOffset, 14, 4, 8, PALETTE.GOBLIN_SKIN);
    
    // Legs
    grid.fillRect(8 + legOffset, 24, 3, 8, PALETTE.GOBLIN_SKIN);
    grid.fillRect(13 - legOffset, 24, 3, 8, PALETTE.GOBLIN_SKIN);
    
    return grid.toSVG();
  }

  // Platform Sprites
  static generateGrassPlatform(type: 'left' | 'center' | 'right'): string {
    const grid = new PixelGrid(16, 16);
    
    // Base grass color
    grid.fillRect(0, 0, 16, 16, PALETTE.GRASS_LIGHT);
    
    // Darker edges for depth
    grid.fillRect(0, 14, 16, 2, PALETTE.GRASS_DARK);
    
    // Side variations
    if (type === 'left') {
      grid.fillRect(0, 0, 2, 16, PALETTE.GRASS_DARK);
    } else if (type === 'right') {
      grid.fillRect(14, 0, 2, 16, PALETTE.GRASS_DARK);
    }
    
    // Grass texture details
    for (let i = 0; i < 8; i++) {
      const x = Math.floor(Math.random() * 16);
      const y = Math.floor(Math.random() * 4);
      grid.setPixel(x, y, PALETTE.GRASS_DARK);
    }
    
    return grid.toSVG();
  }

  static generateWoodPlatform(): string {
    const grid = new PixelGrid(16, 16);
    
    // Base wood color
    grid.fillRect(0, 0, 16, 16, PALETTE.WOOD_LIGHT);
    
    // Wood grain lines
    grid.fillRect(0, 4, 16, 1, PALETTE.WOOD_DARK);
    grid.fillRect(0, 8, 16, 1, PALETTE.WOOD_DARK);
    grid.fillRect(0, 12, 16, 1, PALETTE.WOOD_DARK);
    
    // Edge shading
    grid.fillRect(0, 15, 16, 1, PALETTE.WOOD_DARK);
    grid.fillRect(15, 0, 1, 16, PALETTE.WOOD_DARK);
    
    return grid.toSVG();
  }

  static generateStonePlatform(): string {
    const grid = new PixelGrid(16, 16);
    
    // Base stone color
    grid.fillRect(0, 0, 16, 16, PALETTE.STONE_LIGHT);
    
    // Stone texture
    grid.fillRect(2, 2, 4, 4, PALETTE.STONE_DARK);
    grid.fillRect(8, 6, 3, 3, PALETTE.STONE_DARK);
    grid.fillRect(12, 1, 2, 2, PALETTE.STONE_DARK);
    grid.fillRect(1, 10, 3, 2, PALETTE.STONE_DARK);
    
    // Edge shading
    grid.fillRect(0, 15, 16, 1, PALETTE.STONE_DARK);
    grid.fillRect(15, 0, 1, 16, PALETTE.STONE_DARK);
    
    return grid.toSVG();
  }

  // Loot Sprites
  static generateCoin(frame: number = 1): string {
    const grid = new PixelGrid(12, 12);
    
    // Coin base
    grid.fillCircle(6, 6, 5, PALETTE.COIN_GOLD);
    
    // Inner details
    grid.fillCircle(6, 6, 3, PALETTE.COIN_SHADOW);
    grid.fillCircle(6, 6, 1, PALETTE.COIN_GOLD);
    
    // Spinning animation effect
    if (frame % 4 < 2) {
      // Narrow the coin for spinning effect
      grid.fillRect(4, 2, 4, 8, PALETTE.COIN_GOLD);
      grid.fillRect(5, 3, 2, 6, PALETTE.COIN_SHADOW);
    }
    
    return grid.toSVG();
  }

  static generateHealthPotion(): string {
    const grid = new PixelGrid(16, 16);
    
    // Bottle
    grid.fillRect(6, 4, 4, 10, PALETTE.HEALTH_RED);
    grid.fillRect(7, 2, 2, 2, PALETTE.STONE_LIGHT); // Cork
    
    // Bottle highlight
    grid.fillRect(7, 5, 1, 8, PALETTE.HEALTH_LIGHT);
    
    // Cross symbol
    grid.fillRect(7, 7, 2, 1, PALETTE.WHITE);
    grid.fillRect(7, 8, 1, 2, PALETTE.WHITE);
    
    return grid.toSVG();
  }

  static generateMagicPotion(): string {
    const grid = new PixelGrid(16, 16);
    
    // Bottle
    grid.fillRect(6, 4, 4, 10, PALETTE.MAGIC_BLUE);
    grid.fillRect(7, 2, 2, 2, PALETTE.STONE_LIGHT); // Cork
    
    // Bottle highlight
    grid.fillRect(7, 5, 1, 8, PALETTE.MAGIC_LIGHT);
    
    // Magic sparkle
    grid.setPixel(8, 7, PALETTE.SPARK_WHITE);
    grid.setPixel(7, 9, PALETTE.SPARK_WHITE);
    grid.setPixel(9, 10, PALETTE.SPARK_WHITE);
    
    return grid.toSVG();
  }

  // Magic Effect Sprites
  static generateFireball(frame: number): string {
    const grid = new PixelGrid(16, 16);
    
    // Fire core
    grid.fillCircle(8, 8, 4, PALETTE.FIRE_YELLOW);
    grid.fillCircle(8, 8, 6, PALETTE.FIRE_ORANGE);
    grid.fillCircle(8, 8, 8, PALETTE.FIRE_RED);
    
    // Animated flames
    const flameOffset = Math.sin(frame * 0.3) * 2;
    grid.setPixel(8 + flameOffset, 4, PALETTE.FIRE_YELLOW);
    grid.setPixel(6 - flameOffset, 6, PALETTE.FIRE_ORANGE);
    grid.setPixel(10 + flameOffset, 10, PALETTE.FIRE_ORANGE);
    
    return grid.toSVG();
  }

  static generateQuakeEffect(frame: number): string {
    const grid = new PixelGrid(32, 8);
    
    // Ground crack lines
    grid.fillRect(0, 4, 32, 1, PALETTE.BLACK);
    grid.fillRect(8, 3, 1, 3, PALETTE.BLACK);
    grid.fillRect(16, 2, 1, 4, PALETTE.BLACK);
    grid.fillRect(24, 3, 1, 3, PALETTE.BLACK);
    
    // Dust particles
    for (let i = 0; i < 16; i++) {
      const x = i * 2 + Math.sin(frame * 0.2 + i) * 2;
      const y = 1 + Math.random() * 2;
      grid.setPixel(Math.floor(x), Math.floor(y), PALETTE.STONE_LIGHT);
    }
    
    return grid.toSVG();
  }
}

// Batch sprite generation function
export async function generateAllSprites(): Promise<void> {
  const sprites = [
    // Player sprites
    { path: '/sprites/player/warrior_idle_01.svg', generator: () => SVGSpriteGenerator.generateWarriorIdle(1) },
    { path: '/sprites/player/warrior_idle_02.svg', generator: () => SVGSpriteGenerator.generateWarriorIdle(2) },
    
    // Generate running animation frames
    ...Array.from({ length: 8 }, (_, i) => ({
      path: `/sprites/player/warrior_run_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateWarriorRun(i + 1)
    })),
    
    // Generate jumping animation frames
    ...Array.from({ length: 6 }, (_, i) => ({
      path: `/sprites/player/warrior_jump_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateWarriorJump(i + 1)
    })),
    
    // Generate sword attack frames
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `/sprites/player/warrior_sword_attack_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateWarriorSwordAttack(i + 1)
    })),
    
    // Monster sprites
    { path: '/sprites/monsters/goblin_idle_01.svg', generator: () => SVGSpriteGenerator.generateGoblinIdle(1) },
    { path: '/sprites/monsters/goblin_idle_02.svg', generator: () => SVGSpriteGenerator.generateGoblinIdle(2) },
    
    // Generate goblin walking frames
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `/sprites/monsters/goblin_walk_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateGoblinWalk(i + 1)
    })),
    
    // Platform sprites
    { path: '/sprites/platforms/grass_left.svg', generator: () => SVGSpriteGenerator.generateGrassPlatform('left') },
    { path: '/sprites/platforms/grass_center.svg', generator: () => SVGSpriteGenerator.generateGrassPlatform('center') },
    { path: '/sprites/platforms/grass_right.svg', generator: () => SVGSpriteGenerator.generateGrassPlatform('right') },
    { path: '/sprites/platforms/wood_center.svg', generator: () => SVGSpriteGenerator.generateWoodPlatform() },
    { path: '/sprites/platforms/stone_center.svg', generator: () => SVGSpriteGenerator.generateStonePlatform() },
    
    // Loot sprites
    { path: '/sprites/loot/coin_01.svg', generator: () => SVGSpriteGenerator.generateCoin(1) },
    { path: '/sprites/loot/coin_02.svg', generator: () => SVGSpriteGenerator.generateCoin(2) },
    { path: '/sprites/loot/health_potion.svg', generator: () => SVGSpriteGenerator.generateHealthPotion() },
    { path: '/sprites/loot/magic_potion.svg', generator: () => SVGSpriteGenerator.generateMagicPotion() },
    
    // Magic effects
    ...Array.from({ length: 8 }, (_, i) => ({
      path: `/sprites/magic/fireball_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateFireball(i + 1)
    })),
    
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `/sprites/magic/quake_effect_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateQuakeEffect(i + 1)
    })),
  ];

  console.log(`Generating ${sprites.length} SVG sprites...`);
  
  for (const sprite of sprites) {
    try {
      const svgContent = sprite.generator();
      // Store generated content for browser usage
      console.log(`Generated: ${sprite.path}`);
      // In browser environment, we can return the content for use
    } catch (error) {
      console.error(`Failed to generate ${sprite.path}:`, error);
    }
  }
  
  console.log('All sprites generated successfully!');
}
