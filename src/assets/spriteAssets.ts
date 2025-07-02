/**
 * Sprite Asset Manager for Amazonian Adventure Platformer
 * 
 * This file defines all sprite paths and provides utilities for loading
 * and managing game assets. Update paths here when sprites are added.
 */

// Base path for all sprites
export const SPRITE_BASE_PATH = '/sprites';

// Player Character Sprites
export const PLAYER_SPRITES = {
  // Idle Animation
  idle: [
    `${SPRITE_BASE_PATH}/player/warrior_idle_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_idle_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_idle_03.png`,
    `${SPRITE_BASE_PATH}/player/warrior_idle_04.png`,
  ],
  
  // Running Animation
  run: [
    `${SPRITE_BASE_PATH}/player/warrior_run_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_run_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_run_03.png`,
    `${SPRITE_BASE_PATH}/player/warrior_run_04.png`,
    `${SPRITE_BASE_PATH}/player/warrior_run_05.png`,
    `${SPRITE_BASE_PATH}/player/warrior_run_06.png`,
    `${SPRITE_BASE_PATH}/player/warrior_run_07.png`,
    `${SPRITE_BASE_PATH}/player/warrior_run_08.png`,
  ],
  
  // Jumping Animation
  jump: [
    `${SPRITE_BASE_PATH}/player/warrior_jump_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_03.png`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_04.png`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_05.png`,
    `${SPRITE_BASE_PATH}/player/warrior_jump_06.png`,
  ],
  
  // Combat Animations
  swordAttack: [
    `${SPRITE_BASE_PATH}/player/warrior_sword_attack_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_sword_attack_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_sword_attack_03.png`,
    `${SPRITE_BASE_PATH}/player/warrior_sword_attack_04.png`,
  ],
  
  bowAttack: [
    `${SPRITE_BASE_PATH}/player/warrior_bow_draw_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_bow_draw_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_bow_draw_03.png`,
    `${SPRITE_BASE_PATH}/player/warrior_bow_release_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_bow_release_02.png`,
  ],
  
  whipAttack: [
    `${SPRITE_BASE_PATH}/player/warrior_whip_wind_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_whip_wind_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_whip_strike_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_whip_strike_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_whip_return_01.png`,
  ],
  
  // Magic Casting
  magicCast: [
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_03.png`,
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_04.png`,
    `${SPRITE_BASE_PATH}/player/warrior_magic_cast_05.png`,
  ],
  
  // Damage and Death
  hit: [
    `${SPRITE_BASE_PATH}/player/warrior_hit_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_hit_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_hit_03.png`,
  ],
  
  death: [
    `${SPRITE_BASE_PATH}/player/warrior_death_01.png`,
    `${SPRITE_BASE_PATH}/player/warrior_death_02.png`,
    `${SPRITE_BASE_PATH}/player/warrior_death_03.png`,
    `${SPRITE_BASE_PATH}/player/warrior_death_04.png`,
  ],
} as const;

// Monster Sprites
export const MONSTER_SPRITES = {
  goblin: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_01.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_02.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_03.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_idle_04.png`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_01.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_02.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_03.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_walk_04.png`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/goblin_attack_01.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_attack_02.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_attack_03.png`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/goblin_hit_01.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_hit_02.png`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/goblin_death_01.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_death_02.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_death_03.png`,
      `${SPRITE_BASE_PATH}/monsters/goblin_death_04.png`,
    ],
  },
  
  orc: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/orc_idle_01.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_idle_02.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_idle_03.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_idle_04.png`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/orc_walk_01.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_walk_02.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_walk_03.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_walk_04.png`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/orc_attack_01.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_attack_02.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_attack_03.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_attack_04.png`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/orc_hit_01.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_hit_02.png`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/orc_death_01.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_death_02.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_death_03.png`,
      `${SPRITE_BASE_PATH}/monsters/orc_death_04.png`,
    ],
  },
  
  skeleton: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_01.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_02.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_03.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_idle_04.png`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_01.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_02.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_03.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_walk_04.png`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_attack_01.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_attack_02.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_attack_03.png`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_hit_01.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_hit_02.png`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/skeleton_death_01.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_death_02.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_death_03.png`,
      `${SPRITE_BASE_PATH}/monsters/skeleton_death_04.png`,
    ],
  },
  
  dragon: {
    idle: [
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_01.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_02.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_03.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_04.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_05.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_idle_06.png`,
    ],
    walk: [
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_01.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_02.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_03.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_04.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_05.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_walk_06.png`,
    ],
    attack: [
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_01.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_02.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_03.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_04.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_05.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_attack_06.png`,
    ],
    hit: [
      `${SPRITE_BASE_PATH}/monsters/dragon_hit_01.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_hit_02.png`,
    ],
    death: [
      `${SPRITE_BASE_PATH}/monsters/dragon_death_01.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_02.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_03.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_04.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_05.png`,
      `${SPRITE_BASE_PATH}/monsters/dragon_death_06.png`,
    ],
  },
} as const;

// Weapon Sprites
export const WEAPON_SPRITES = {
  sword: {
    item: `${SPRITE_BASE_PATH}/weapons/sword_item.png`,
    swing: [
      `${SPRITE_BASE_PATH}/weapons/sword_swing_01.png`,
      `${SPRITE_BASE_PATH}/weapons/sword_swing_02.png`,
      `${SPRITE_BASE_PATH}/weapons/sword_swing_03.png`,
      `${SPRITE_BASE_PATH}/weapons/sword_swing_04.png`,
    ],
    trail: [
      `${SPRITE_BASE_PATH}/weapons/sword_trail_01.png`,
      `${SPRITE_BASE_PATH}/weapons/sword_trail_02.png`,
      `${SPRITE_BASE_PATH}/weapons/sword_trail_03.png`,
    ],
    impact: `${SPRITE_BASE_PATH}/weapons/sword_impact_spark.png`,
  },
  
  bow: {
    item: `${SPRITE_BASE_PATH}/weapons/bow_item.png`,
    states: [
      `${SPRITE_BASE_PATH}/weapons/bow_idle.png`,
      `${SPRITE_BASE_PATH}/weapons/bow_draw_25.png`,
      `${SPRITE_BASE_PATH}/weapons/bow_draw_50.png`,
      `${SPRITE_BASE_PATH}/weapons/bow_draw_75.png`,
      `${SPRITE_BASE_PATH}/weapons/bow_draw_100.png`,
      `${SPRITE_BASE_PATH}/weapons/bow_release.png`,
    ],
  },
  
  arrow: {
    flying: `${SPRITE_BASE_PATH}/weapons/arrow_flying.png`,
    stuck: `${SPRITE_BASE_PATH}/weapons/arrow_stuck.png`,
    ground: `${SPRITE_BASE_PATH}/weapons/arrow_ground.png`,
    trail: `${SPRITE_BASE_PATH}/weapons/arrow_trail.png`,
    impact: [
      `${SPRITE_BASE_PATH}/weapons/arrow_impact_01.png`,
      `${SPRITE_BASE_PATH}/weapons/arrow_impact_02.png`,
      `${SPRITE_BASE_PATH}/weapons/arrow_impact_03.png`,
    ],
  },
  
  whip: {
    item: `${SPRITE_BASE_PATH}/weapons/whip_item.png`,
    extend: [
      `${SPRITE_BASE_PATH}/weapons/whip_coiled.png`,
      `${SPRITE_BASE_PATH}/weapons/whip_extend_01.png`,
      `${SPRITE_BASE_PATH}/weapons/whip_extend_02.png`,
      `${SPRITE_BASE_PATH}/weapons/whip_extend_03.png`,
      `${SPRITE_BASE_PATH}/weapons/whip_extend_04.png`,
    ],
    crack: `${SPRITE_BASE_PATH}/weapons/whip_crack.png`,
    return: [
      `${SPRITE_BASE_PATH}/weapons/whip_return_01.png`,
      `${SPRITE_BASE_PATH}/weapons/whip_return_02.png`,
      `${SPRITE_BASE_PATH}/weapons/whip_return_03.png`,
    ],
    impact: [
      `${SPRITE_BASE_PATH}/weapons/whip_impact_01.png`,
      `${SPRITE_BASE_PATH}/weapons/whip_impact_02.png`,
    ],
  },
} as const;

// Magic Effect Sprites
export const MAGIC_SPRITES = {
  quake: {
    cast: [
      `${SPRITE_BASE_PATH}/magic/quake_cast_01.png`,
      `${SPRITE_BASE_PATH}/magic/quake_cast_02.png`,
      `${SPRITE_BASE_PATH}/magic/quake_cast_03.png`,
    ],
    ground: [
      `${SPRITE_BASE_PATH}/magic/quake_ground_01.png`,
      `${SPRITE_BASE_PATH}/magic/quake_ground_02.png`,
      `${SPRITE_BASE_PATH}/magic/quake_ground_03.png`,
      `${SPRITE_BASE_PATH}/magic/quake_ground_04.png`,
      `${SPRITE_BASE_PATH}/magic/quake_ground_05.png`,
      `${SPRITE_BASE_PATH}/magic/quake_ground_06.png`,
      `${SPRITE_BASE_PATH}/magic/quake_ground_07.png`,
    ],
    debris: [
      `${SPRITE_BASE_PATH}/magic/quake_debris_01.png`,
      `${SPRITE_BASE_PATH}/magic/quake_debris_02.png`,
      `${SPRITE_BASE_PATH}/magic/quake_debris_03.png`,
    ],
    dust: [
      `${SPRITE_BASE_PATH}/magic/quake_dust_01.png`,
      `${SPRITE_BASE_PATH}/magic/quake_dust_02.png`,
      `${SPRITE_BASE_PATH}/magic/quake_dust_03.png`,
    ],
  },
  
  blaze: {
    cast: [
      `${SPRITE_BASE_PATH}/magic/blaze_cast_01.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_cast_02.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_cast_03.png`,
    ],
    bolt: [
      `${SPRITE_BASE_PATH}/magic/blaze_bolt_01.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_bolt_02.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_bolt_03.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_bolt_04.png`,
    ],
    impact: [
      `${SPRITE_BASE_PATH}/magic/blaze_impact_01.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_impact_02.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_impact_03.png`,
      `${SPRITE_BASE_PATH}/magic/blaze_impact_04.png`,
    ],
    burn: [
      `${SPRITE_BASE_PATH}/magic/burn_small_01.png`,
      `${SPRITE_BASE_PATH}/magic/burn_small_02.png`,
      `${SPRITE_BASE_PATH}/magic/burn_small_03.png`,
    ],
  },
  
  cure: {
    cast: [
      `${SPRITE_BASE_PATH}/magic/cure_cast_01.png`,
      `${SPRITE_BASE_PATH}/magic/cure_cast_02.png`,
      `${SPRITE_BASE_PATH}/magic/cure_cast_03.png`,
    ],
    heal: [
      `${SPRITE_BASE_PATH}/magic/cure_heal_01.png`,
      `${SPRITE_BASE_PATH}/magic/cure_heal_02.png`,
      `${SPRITE_BASE_PATH}/magic/cure_heal_03.png`,
      `${SPRITE_BASE_PATH}/magic/cure_heal_04.png`,
      `${SPRITE_BASE_PATH}/magic/cure_heal_05.png`,
      `${SPRITE_BASE_PATH}/magic/cure_heal_06.png`,
    ],
    particles: [
      `${SPRITE_BASE_PATH}/magic/heal_particle_01.png`,
      `${SPRITE_BASE_PATH}/magic/heal_particle_02.png`,
      `${SPRITE_BASE_PATH}/magic/heal_particle_03.png`,
    ],
  },
} as const;

// Platform Sprites
export const PLATFORM_SPRITES = {
  grass: {
    center: `${SPRITE_BASE_PATH}/platforms/grass_center.png`,
    leftEdge: `${SPRITE_BASE_PATH}/platforms/grass_left_edge.png`,
    rightEdge: `${SPRITE_BASE_PATH}/platforms/grass_right_edge.png`,
    leftCorner: `${SPRITE_BASE_PATH}/platforms/grass_left_corner.png`,
    rightCorner: `${SPRITE_BASE_PATH}/platforms/grass_right_corner.png`,
  },
  
  wood: {
    plank: [
      `${SPRITE_BASE_PATH}/platforms/wood_plank_01.png`,
      `${SPRITE_BASE_PATH}/platforms/wood_plank_02.png`,
      `${SPRITE_BASE_PATH}/platforms/wood_plank_03.png`,
    ],
    leftEdge: `${SPRITE_BASE_PATH}/platforms/wood_left_edge.png`,
    rightEdge: `${SPRITE_BASE_PATH}/platforms/wood_right_edge.png`,
  },
  
  stone: {
    block: [
      `${SPRITE_BASE_PATH}/platforms/stone_block_01.png`,
      `${SPRITE_BASE_PATH}/platforms/stone_block_02.png`,
      `${SPRITE_BASE_PATH}/platforms/stone_block_03.png`,
    ],
    leftEdge: `${SPRITE_BASE_PATH}/platforms/stone_left_edge.png`,
    rightEdge: `${SPRITE_BASE_PATH}/platforms/stone_right_edge.png`,
  },
} as const;

// Loot Sprites
export const LOOT_SPRITES = {
  coin: [
    `${SPRITE_BASE_PATH}/loot/coin_01.png`,
    `${SPRITE_BASE_PATH}/loot/coin_02.png`,
    `${SPRITE_BASE_PATH}/loot/coin_03.png`,
    `${SPRITE_BASE_PATH}/loot/coin_04.png`,
    `${SPRITE_BASE_PATH}/loot/coin_05.png`,
    `${SPRITE_BASE_PATH}/loot/coin_06.png`,
    `${SPRITE_BASE_PATH}/loot/coin_07.png`,
    `${SPRITE_BASE_PATH}/loot/coin_08.png`,
  ],
  
  health: {
    fruit: [
      `${SPRITE_BASE_PATH}/loot/health_fruit_01.png`,
      `${SPRITE_BASE_PATH}/loot/health_fruit_02.png`,
    ],
    potion: [
      `${SPRITE_BASE_PATH}/loot/health_potion_small.png`,
      `${SPRITE_BASE_PATH}/loot/health_potion_medium.png`,
      `${SPRITE_BASE_PATH}/loot/health_potion_large.png`,
    ],
    heart: `${SPRITE_BASE_PATH}/loot/health_heart.png`,
    glow: [
      `${SPRITE_BASE_PATH}/loot/health_glow_01.png`,
      `${SPRITE_BASE_PATH}/loot/health_glow_02.png`,
      `${SPRITE_BASE_PATH}/loot/health_glow_03.png`,
      `${SPRITE_BASE_PATH}/loot/health_glow_04.png`,
    ],
  },
  
  magic: {
    crystal: [
      `${SPRITE_BASE_PATH}/loot/magic_crystal_blue.png`,
      `${SPRITE_BASE_PATH}/loot/magic_crystal_purple.png`,
    ],
    essence: [
      `${SPRITE_BASE_PATH}/loot/magic_essence_01.png`,
      `${SPRITE_BASE_PATH}/loot/magic_essence_02.png`,
    ],
    orb: `${SPRITE_BASE_PATH}/loot/magic_orb.png`,
    float: [
      `${SPRITE_BASE_PATH}/loot/magic_float_01.png`,
      `${SPRITE_BASE_PATH}/loot/magic_float_02.png`,
      `${SPRITE_BASE_PATH}/loot/magic_float_03.png`,
      `${SPRITE_BASE_PATH}/loot/magic_float_04.png`,
    ],
  },
} as const;

// Environment Sprites
export const ENVIRONMENT_SPRITES = {
  backgrounds: {
    sky: [
      `${SPRITE_BASE_PATH}/environment/sky_day_clear.png`,
      `${SPRITE_BASE_PATH}/environment/sky_day_clouds.png`,
      `${SPRITE_BASE_PATH}/environment/sky_sunset.png`,
      `${SPRITE_BASE_PATH}/environment/sky_night.png`,
    ],
    mountains: [
      `${SPRITE_BASE_PATH}/environment/mountains_01.png`,
      `${SPRITE_BASE_PATH}/environment/mountains_02.png`,
    ],
    forest: [
      `${SPRITE_BASE_PATH}/environment/forest_canopy_01.png`,
      `${SPRITE_BASE_PATH}/environment/forest_canopy_02.png`,
      `${SPRITE_BASE_PATH}/environment/jungle_trees_01.png`,
      `${SPRITE_BASE_PATH}/environment/jungle_trees_02.png`,
    ],
  },
  
  castleGate: {
    closed: `${SPRITE_BASE_PATH}/environment/castle_gate_closed.png`,
    opening: [
      `${SPRITE_BASE_PATH}/environment/castle_gate_opening_01.png`,
      `${SPRITE_BASE_PATH}/environment/castle_gate_opening_02.png`,
    ],
    open: `${SPRITE_BASE_PATH}/environment/castle_gate_open.png`,
    wall: {
      left: `${SPRITE_BASE_PATH}/environment/castle_wall_left.png`,
      right: `${SPRITE_BASE_PATH}/environment/castle_wall_right.png`,
    },
  },
} as const;

// UI Sprites
export const UI_SPRITES = {
  healthBar: {
    background: `${SPRITE_BASE_PATH}/ui/health_bar_bg.png`,
    fill: `${SPRITE_BASE_PATH}/ui/health_bar_fill.png`,
    frame: `${SPRITE_BASE_PATH}/ui/health_bar_frame.png`,
    icon: `${SPRITE_BASE_PATH}/ui/health_icon.png`,
  },
  
  manaBar: {
    background: `${SPRITE_BASE_PATH}/ui/mana_bar_bg.png`,
    fill: `${SPRITE_BASE_PATH}/ui/mana_bar_fill.png`,
    frame: `${SPRITE_BASE_PATH}/ui/mana_bar_frame.png`,
    icon: `${SPRITE_BASE_PATH}/ui/mana_icon.png`,
  },
  
  weaponIcons: {
    sword: `${SPRITE_BASE_PATH}/ui/icon_sword.png`,
    bow: `${SPRITE_BASE_PATH}/ui/icon_bow.png`,
    whip: `${SPRITE_BASE_PATH}/ui/icon_whip.png`,
  },
  
  spellIcons: {
    quake: `${SPRITE_BASE_PATH}/ui/icon_quake.png`,
    blaze: `${SPRITE_BASE_PATH}/ui/icon_blaze.png`,
    cure: `${SPRITE_BASE_PATH}/ui/icon_cure.png`,
  },
} as const;

// Utility type for extracting sprite paths
export type SpritePath = string;
export type SpriteArray = readonly string[];
export type SpriteAnimation = readonly string[];

// Helper function to get random sprite from an array
export function getRandomSprite(sprites: SpriteArray): string {
  return sprites[Math.floor(Math.random() * sprites.length)];
}

// Helper function to preload images
export async function preloadSprite(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = path;
  });
}

// Helper function to preload all sprites in a category
export async function preloadSpriteCategory(sprites: Record<string, any>): Promise<HTMLImageElement[]> {
  const paths: string[] = [];
  
  function collectPaths(obj: any) {
    for (const value of Object.values(obj)) {
      if (typeof value === 'string') {
        paths.push(value);
      } else if (Array.isArray(value)) {
        paths.push(...value);
      } else if (typeof value === 'object') {
        collectPaths(value);
      }
    }
  }
  
  collectPaths(sprites);
  return Promise.all(paths.map(preloadSprite));
}

// Helper function to preload all game sprites
export async function preloadAllSprites(): Promise<void> {
  const categories = [
    PLAYER_SPRITES,
    MONSTER_SPRITES,
    WEAPON_SPRITES,
    MAGIC_SPRITES,
    PLATFORM_SPRITES,
    LOOT_SPRITES,
    ENVIRONMENT_SPRITES,
    UI_SPRITES,
  ];
  
  await Promise.all(categories.map(preloadSpriteCategory));
  console.log('All sprites preloaded successfully!');
}

// All exports are already declared above with export const
