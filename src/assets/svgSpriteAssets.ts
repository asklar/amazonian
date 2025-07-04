/**
 * SVG Sprite Asset Manager for Amazonian Adventure Platformer
 * 
 * This file defines all SVG sprite paths and provides utilities for loading
 * and managing game assets using SVG format for scalable pixel art.
 */

// Base path for all sprites
export const SPRITE_BASE_PATH = './sprites';

// Player Character Sprites (SVG)
export const PLAYER_SPRITES_SVG = {
  // Idle Animation
  idle: [
    `${SPRITE_BASE_PATH}/player/warrior_idle_01.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_idle_02.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_idle_03.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_idle_04.svg`,
  ],
  
  // Running Animation
  run: [
    `${SPRITE_BASE_PATH}/player/warrior_run_01.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_run_02.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_run_03.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_run_04.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_run_05.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_run_06.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_run_07.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_run_08.svg`,
  ],
  
  // Jumping Animation
  jump: [
    `${SPRITE_BASE_PATH}/player/warrior_jump_01.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_02.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_03.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_04.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_05.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_06.svg`,
  ],
  
  // Combat Animations
  swordAttack: [
    `${SPRITE_BASE_PATH}/player/warrior_attack_01.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_sword_attack_02.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_sword_attack_03.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_sword_attack_04.svg`,
  ],
  
  bowAttack: [
    `${SPRITE_BASE_PATH}/player/warrior_bow_attack_01.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_bow_attack_02.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_bow_attack_03.svg`,
  ],
  
  whipAttack: [
    `${SPRITE_BASE_PATH}/player/warrior_whip_attack_01.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_whip_attack_02.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_whip_attack_03.svg`,
  ],
  
  // Magic Casting
  magicCast: [
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_01.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_02.svg`,
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_03.svg`,
  ],
} as const;

// Monster Sprites (SVG)
export const MONSTER_SPRITES_SVG = {
  goblin: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_04.svg`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_04.svg`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/goblin_attack_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_attack_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_attack_03.svg`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/goblin_hit_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_hit_02.svg`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/goblin_dying_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_death_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_death_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/goblin_death_04.svg`,
    ],
  },
  
  orc: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/orc_idle_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_idle_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_idle_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_idle_04.svg`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/orc_walk_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_walk_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_walk_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_walk_04.svg`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/orc_attack_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_attack_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_attack_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_attack_04.svg`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/orc_hit_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_hit_02.svg`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/orc_dying_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_death_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_death_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/orc_death_04.svg`,
    ],
  },
  
  skeleton: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_04.svg`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_04.svg`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_attack_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_attack_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_attack_03.svg`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_hit_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_hit_02.svg`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_dying_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_death_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_death_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_death_04.svg`,
    ],
  },
  
  dragon: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_04.svg`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_04.svg`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_04.svg`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/dragon_hit_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_hit_02.svg`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/dragon_dying_01.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_02.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_03.svg`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_04.svg`,
    ],
  },
} as const;

// Platform Sprites (SVG)
export const PLATFORM_SPRITES_SVG = {
  grass: {
    center: `${SPRITE_BASE_PATH}/platforms/grass_center.svg`,
    leftEdge: `${SPRITE_BASE_PATH}/platforms/grass_left_edge.svg`,
    rightEdge: `${SPRITE_BASE_PATH}/platforms/grass_right_edge.svg`,
    leftCorner: `${SPRITE_BASE_PATH}/platforms/grass_left_corner.svg`,
    rightCorner: `${SPRITE_BASE_PATH}/platforms/grass_right_corner.svg`,
  },
  
  soil: {
    center: `${SPRITE_BASE_PATH}/platforms/soil_center.svg`,
  },
  
  wood: {
    plank: [
      `${SPRITE_BASE_PATH}/platforms/wood_plank_01.svg`,
      `${SPRITE_BASE_PATH}/platforms/wood_plank_02.svg`,
      `${SPRITE_BASE_PATH}/platforms/wood_plank_03.svg`,
    ],
    leftEdge: `${SPRITE_BASE_PATH}/platforms/wood_left_edge.svg`,
    rightEdge: `${SPRITE_BASE_PATH}/platforms/wood_right_edge.svg`,
  },
  
  stone: {
    block: [
      `${SPRITE_BASE_PATH}/platforms/stone_block_01.svg`,
      `${SPRITE_BASE_PATH}/platforms/stone_block_02.svg`,
      `${SPRITE_BASE_PATH}/platforms/stone_block_03.svg`,
    ],
    leftEdge: `${SPRITE_BASE_PATH}/platforms/stone_left_edge.svg`,
    rightEdge: `${SPRITE_BASE_PATH}/platforms/stone_right_edge.svg`,
  },
} as const;

// Loot Sprites (SVG)
export const LOOT_SPRITES_SVG = {
  coin: [
    `${SPRITE_BASE_PATH}/loot/coin_01.svg`,
    `${SPRITE_BASE_PATH}/loot/coin_02.svg`,
    `${SPRITE_BASE_PATH}/loot/coin_03.svg`,
    `${SPRITE_BASE_PATH}/loot/coin_04.svg`,
    `${SPRITE_BASE_PATH}/loot/coin_05.svg`,
    `${SPRITE_BASE_PATH}/loot/coin_06.svg`,
    `${SPRITE_BASE_PATH}/loot/coin_07.svg`,
    `${SPRITE_BASE_PATH}/loot/coin_08.svg`,
  ],
  
  health: {
    fruit: [
      `${SPRITE_BASE_PATH}/loot/health_fruit_01.svg`,
      `${SPRITE_BASE_PATH}/loot/health_fruit_02.svg`,
    ],
    potion: [
      `${SPRITE_BASE_PATH}/loot/health_potion_small.svg`,
      `${SPRITE_BASE_PATH}/loot/health_potion_medium.svg`,
      `${SPRITE_BASE_PATH}/loot/health_potion_large.svg`,
    ],
    heart: `${SPRITE_BASE_PATH}/loot/health_heart_3d.svg`,
  },
  
  magic: {
    crystal: [
      `${SPRITE_BASE_PATH}/loot/magic_crystal_blue.svg`,
      `${SPRITE_BASE_PATH}/loot/magic_crystal_purple.svg`,
    ],
    orb: `${SPRITE_BASE_PATH}/loot/magic_orb.svg`,
    potion: [
      `${SPRITE_BASE_PATH}/loot/magic_potion_01.svg`,
      `${SPRITE_BASE_PATH}/loot/magic_potion_02.svg`,
    ],
  },
} as const;

// SVG Sprite Loader Class
export class SVGSpriteLoader {
  private cache = new Map<string, string>();
  
  async loadSprite(path: string): Promise<string> {
    if (this.cache.has(path)) {
      return this.cache.get(path)!;
    }
    
    try {
      const response = await fetch(path);
      const svgContent = await response.text();
      this.cache.set(path, svgContent);
      return svgContent;
    } catch (error) {
      console.warn(`Failed to load SVG sprite: ${path}`);
      return this.createFallbackSVG(path);
    }
  }
  
  private createFallbackSVG(path: string): string {
    // Create a simple colored rectangle as fallback
    const filename = path.split('/').pop()?.replace('.svg', '') || 'unknown';
    const color = this.getColorForSprite(filename);
    const size = this.getSizeForSprite(filename);
    
    return `<svg width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}" xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated;">
      <rect width="${size.width}" height="${size.height}" fill="${color}"/>
      <text x="${size.width/2}" y="${size.height/2}" text-anchor="middle" dominant-baseline="middle" font-family="monospace" font-size="8" fill="white">${filename}</text>
    </svg>`;
  }
  
  private getColorForSprite(filename: string): string {
    if (filename.includes('warrior')) return '#8B4513';
    if (filename.includes('goblin')) return '#228B22';
    if (filename.includes('orc')) return '#696969';
    if (filename.includes('skeleton')) return '#F5F5DC';
    if (filename.includes('dragon')) return '#8B0000';
    if (filename.includes('grass')) return '#32CD32';
    if (filename.includes('wood')) return '#8B4513';
    if (filename.includes('stone')) return '#708090';
    if (filename.includes('coin')) return '#FFD700';
    if (filename.includes('health')) return '#FF6347';
    if (filename.includes('magic')) return '#4169E1';
    return '#DDA0DD';
  }
  
  private getSizeForSprite(filename: string): {width: number, height: number} {
    if (filename.includes('warrior')) return {width: 32, height: 48};
    if (filename.includes('goblin')) return {width: 24, height: 32};
    if (filename.includes('orc')) return {width: 32, height: 40};
    if (filename.includes('skeleton')) return {width: 28, height: 40};
    if (filename.includes('dragon')) return {width: 64, height: 48};
    if (filename.includes('platform') || filename.includes('grass') || filename.includes('wood') || filename.includes('stone')) return {width: 16, height: 16};
    if (filename.includes('coin')) return {width: 12, height: 12};
    if (filename.includes('health') || filename.includes('magic')) return {width: 16, height: 16};
    return {width: 32, height: 32};
  }
}

// React Hook for using SVG sprites
export function useSVGSprite(_path: string) {
  // This hook would be implemented in a separate React component file
  // For now, returning basic structure for type safety
  return { svgContent: '', loading: true };
}

// Global sprite manager instance
export const svgSpriteManager = new SVGSpriteLoader();

// Weapon Sprites (SVG)
export const WEAPON_SPRITES_SVG = {
  sword: {
    horizontal: `${SPRITE_BASE_PATH}/weapons/sword_horizontal.svg`,
    vertical: `${SPRITE_BASE_PATH}/weapons/sword_vertical.svg`,
    diagonal: `${SPRITE_BASE_PATH}/weapons/sword_diagonal.svg`,
  },
  bow: {
    idle: `${SPRITE_BASE_PATH}/weapons/bow.svg`,
    drawn: `${SPRITE_BASE_PATH}/weapons/bow_drawn.svg`,
  },
  whip: {
    coiled: `${SPRITE_BASE_PATH}/weapons/whip.svg`,
    extended: `${SPRITE_BASE_PATH}/weapons/whip_extended.svg`,
  },
  arrow: {
    normal: `${SPRITE_BASE_PATH}/weapons/arrow.svg`,
    fire: `${SPRITE_BASE_PATH}/weapons/arrow_fire.svg`,
  },
} as const;
