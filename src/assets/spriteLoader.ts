/**
 * Sprite Loading Utilities
 * 
 * Helper functions for loading and managing sprites in the game.
 * Provides fallback functionality when sprites are not yet created.
 */

import { debugLog } from '../utils/debugLogger';
import { 
  PLAYER_SPRITES, 
  MONSTER_SPRITES, 
  UI_SPRITES 
} from './spriteAssets';

// Cache for loaded images
const imageCache = new Map<string, HTMLImageElement>();

// Set to track failed loads to avoid repeated attempts
const failedLoads = new Set<string>();

/**
 * Load a sprite image with fallback to colored rectangle
 */
export async function loadSprite(
  path: string, 
  fallbackColor: string = '#ff00ff',
  width: number = 32,
  height: number = 32
): Promise<HTMLImageElement> {
  // Return cached image if available
  if (imageCache.has(path)) {
    return imageCache.get(path)!;
  }

  // Skip if we know this path failed before
  if (failedLoads.has(path)) {
    return createFallbackSprite(fallbackColor, width, height);
  }

  try {
    const img = new Image();
    
    // Create promise that resolves when image loads
    const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => {
        imageCache.set(path, img);
        resolve(img);
      };
      img.onerror = () => {
        failedLoads.add(path);
        reject(new Error(`Failed to load sprite: ${path}`));
      };
    });

    // Set the source to start loading
    img.src = path;
    
    // Wait for load to complete
    return await loadPromise;
    
  } catch (error) {
    console.warn(`Sprite not found: ${path}, using fallback`);
    return createFallbackSprite(fallbackColor, width, height);
  }
}

/**
 * Create a colored rectangle as fallback sprite
 */
function createFallbackSprite(color: string, width: number, height: number): HTMLImageElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Add a border to make it more visible
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
  
  // Convert canvas to image
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
}

/**
 * Sprite loader for player animations
 */
export class PlayerSpriteLoader {
  private sprites: Record<string, HTMLImageElement[]> = {};
  
  async loadAll(): Promise<void> {
    const spriteCategories = [
      { name: 'idle', paths: PLAYER_SPRITES.idle, color: '#4CAF50' },
      { name: 'run', paths: PLAYER_SPRITES.run, color: '#2196F3' },
      { name: 'jump', paths: PLAYER_SPRITES.jump, color: '#FF9800' },
      { name: 'swordAttack', paths: PLAYER_SPRITES.swordAttack, color: '#F44336' },
      { name: 'bowAttack', paths: PLAYER_SPRITES.bowAttack, color: '#9C27B0' },
      { name: 'whipAttack', paths: PLAYER_SPRITES.whipAttack, color: '#795548' },
      { name: 'magicCast', paths: PLAYER_SPRITES.magicCast, color: '#3F51B5' },
      { name: 'hit', paths: PLAYER_SPRITES.hit, color: '#FF5722' },
      { name: 'death', paths: PLAYER_SPRITES.death, color: '#607D8B' },
    ];

    for (const category of spriteCategories) {
      this.sprites[category.name] = await Promise.all(
        category.paths.map(path => loadSprite(path, category.color, 32, 48))
      );
    }
  }

  getSprite(animation: string, frame: number): HTMLImageElement | null {
    const sprites = this.sprites[animation];
    if (!sprites || sprites.length === 0) return null;
    return sprites[frame % sprites.length];
  }

  getAnimationLength(animation: string): number {
    return this.sprites[animation]?.length || 0;
  }
}

/**
 * Sprite loader for monsters
 */
export class MonsterSpriteLoader {
  private sprites: Record<string, Record<string, HTMLImageElement[]>> = {};
  
  async loadAll(): Promise<void> {
    const monsterTypes = [
      { name: 'goblin', sprites: MONSTER_SPRITES.goblin, color: '#4CAF50' },
      { name: 'orc', sprites: MONSTER_SPRITES.orc, color: '#795548' },
      { name: 'skeleton', sprites: MONSTER_SPRITES.skeleton, color: '#9E9E9E' },
      { name: 'dragon', sprites: MONSTER_SPRITES.dragon, color: '#F44336' },
    ];

    for (const monster of monsterTypes) {
      this.sprites[monster.name] = {};
      
      const animations = ['idle', 'walk', 'attack', 'hit', 'death'];
      for (const anim of animations) {
        const paths = monster.sprites[anim as keyof typeof monster.sprites] as readonly string[];
        this.sprites[monster.name][anim] = await Promise.all(
          paths.map(path => loadSprite(path, monster.color, 32, 32))
        );
      }
    }
  }

  getSprite(monsterType: string, animation: string, frame: number): HTMLImageElement | null {
    const sprites = this.sprites[monsterType]?.[animation];
    if (!sprites || sprites.length === 0) return null;
    return sprites[frame % sprites.length];
  }

  getAnimationLength(monsterType: string, animation: string): number {
    return this.sprites[monsterType]?.[animation]?.length || 0;
  }
}

/**
 * Sprite loader for UI elements
 */
export class UISpriteLoader {
  private sprites: Record<string, HTMLImageElement> = {};
  
  async loadAll(): Promise<void> {
    const uiSprites = [
      { name: 'healthBarBg', path: UI_SPRITES.healthBar.background, color: '#424242' },
      { name: 'healthBarFill', path: UI_SPRITES.healthBar.fill, color: '#F44336' },
      { name: 'healthIcon', path: UI_SPRITES.healthBar.icon, color: '#E91E63' },
      { name: 'manaBarBg', path: UI_SPRITES.manaBar.background, color: '#424242' },
      { name: 'manaBarFill', path: UI_SPRITES.manaBar.fill, color: '#2196F3' },
      { name: 'manaIcon', path: UI_SPRITES.manaBar.icon, color: '#3F51B5' },
      { name: 'swordIcon', path: UI_SPRITES.weaponIcons.sword, color: '#607D8B' },
      { name: 'bowIcon', path: UI_SPRITES.weaponIcons.bow, color: '#795548' },
      { name: 'whipIcon', path: UI_SPRITES.weaponIcons.whip, color: '#5D4037' },
    ];

    for (const sprite of uiSprites) {
      this.sprites[sprite.name] = await loadSprite(sprite.path, sprite.color, 24, 24);
    }
  }

  getSprite(name: string): HTMLImageElement | null {
    return this.sprites[name] || null;
  }
}

/**
 * Global sprite manager
 */
export class SpriteManager {
  private static instance: SpriteManager;
  
  public player: PlayerSpriteLoader;
  public monsters: MonsterSpriteLoader;
  public ui: UISpriteLoader;
  
  private constructor() {
    this.player = new PlayerSpriteLoader();
    this.monsters = new MonsterSpriteLoader();
    this.ui = new UISpriteLoader();
  }

  static getInstance(): SpriteManager {
    if (!SpriteManager.instance) {
      SpriteManager.instance = new SpriteManager();
    }
    return SpriteManager.instance;
  }

  async loadAllSprites(): Promise<void> {
    debugLog('Loading game sprites...');
    
    try {
      await Promise.all([
        this.player.loadAll(),
        this.monsters.loadAll(),
        this.ui.loadAll(),
      ]);
      
      debugLog('All sprites loaded successfully!');
    } catch (error) {
      console.warn('Some sprites failed to load, using fallbacks:', error);
    }
  }
}

// Convenience functions for quick sprite loading
export async function loadPlayerSprite(animation: string, frame: number): Promise<HTMLImageElement | null> {
  const manager = SpriteManager.getInstance();
  return manager.player.getSprite(animation, frame);
}

export async function loadMonsterSprite(type: string, animation: string, frame: number): Promise<HTMLImageElement | null> {
  const manager = SpriteManager.getInstance();
  return manager.monsters.getSprite(type, animation, frame);
}

export async function loadUISprite(name: string): Promise<HTMLImageElement | null> {
  const manager = SpriteManager.getInstance();
  return manager.ui.getSprite(name);
}

// Initialize sprite manager for global use
export const spriteManager = SpriteManager.getInstance();
