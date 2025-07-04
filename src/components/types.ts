import Monster from "./Monster";

// Game types and interfaces
export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Player {
  position: Position;
  velocity: Velocity;
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
  coins: number;
  weapon: WeaponType;
  facing: 'left' | 'right';
  isAttacking: boolean;
  isCasting: boolean;
  isOnGround: boolean;
  isAlive: boolean;
  canJump: boolean;
  isInvulnerable: boolean;
  invulnerabilityTimer: number;
  isPermanentlyInvulnerable: boolean; // Debug mode permanent invulnerability
}

export interface Monster {
  id: string;
  type: MonsterType;
  position: Position;
  startingPosition: Position; // Store initial position for flying monster recovery
  velocity: Velocity;
  health: number;
  maxHealth: number;
  facing: 'left' | 'right';
  isAlive: boolean;
  isBurning: boolean;
  burnTimer: number;
  patrolStart: number;
  patrolEnd: number;
  // Optional rectangular patrol area for flying monsters
  patrolArea?: {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
  };
  isDying: boolean;
  deathTimer: number;
  damage: number;
  isHit: boolean;
  hitStunTimer: number;
  spriteType?: 'svg' | 'png';
  sprites?: { idle?: string; hit?: string; dying?: string; };
  size?: { width: number; height: number };
  isFlying?: boolean;
  // Monster shooting capabilities - moved to per-projectile basis
  shootTimer?: number;
  projectiles?: Array<{
    type: 'fire' | 'frost' | 'whirlwind';
    launchOffset: { x: number; y: number };
    weight: number;
    cooldown: number;
    range: number;
  }>;
  // Monster AI parameters
  ai?: {
    randomDirectionChangeChance?: number;
    speedBoostRange?: number;
    speedBoostMultiplier?: number;
    patrolOvershootRange?: number;
    speedVariationMin?: number;
    speedVariationMax?: number;
    turnTowardsPlayerChance?: number;
    requireFacingToShoot?: boolean;
    minMovementTime?: number;
  };
  // Movement timing state
  movementTimer?: number;
}

export interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'grass' | 'stone' | 'wood' | 'ice';
}

export interface Loot {
  id: string;
  type: LootType;
  position: Position;
  collected: boolean;
}

export interface Projectile {
  id: string;
  type: 'arrow' | 'fire' | 'frost' | 'whirlwind';
  position: Position;
  velocity: Velocity;
  damage: number;
  isActive: boolean;
  facing: 'left' | 'right';
  source: 'player' | 'monster'; // Track who shot the projectile
  ownerId?: string; // Track which monster shot it (if applicable)
}

export interface MagicEffect {
  id: string;
  type: MagicType;
  position: Position;
  duration: number;
  isActive: boolean;
}

export interface CastleGate {
  position: Position;
  isUnlocked: boolean;
}

export interface GameState {
  player: Player;
  monsters: Monster[];
  platforms: Platform[];
  loot: Loot[];
  projectiles: Projectile[];
  magicEffects: MagicEffect[];
  castleGate: CastleGate;
  currentLevel: number;
  gameStatus: 'playing' | 'game-over' | 'victory' | 'level-complete';
  cameraOffset: Position;
}

export type WeaponType = 'sword' | 'bow' | 'whip';
export type MonsterType = string; // Dynamic - loaded from JSON
export type LootType = 'coin' | 'health' | 'magic';
export type MagicType = 'quake' | 'blaze' | 'cure';

export interface GameConstants {
  GRAVITY: number;
  JUMP_FORCE: number;
  PLAYER_SPEED: number;
  ARROW_SPEED: number;
  GAME_WIDTH: number;
  GAME_HEIGHT: number;
  SCREEN_WIDTH: number;
  MAGIC_COSTS: Record<MagicType, number>;
  MAGIC_RANGES: Record<MagicType, number>;
  WEAPON_DAMAGE: Record<WeaponType, number>;
  MONSTER_DAMAGE: Record<MonsterType, number>;
  MONSTER_HEALTH: Record<MonsterType, number>;
  MONSTER_SPEED: Record<MonsterType, number>;
  PLATFORM_FRICTION: Record<'grass' | 'stone' | 'wood' | 'ice', number>;
}

// Game constants will be loaded from JSON at runtime
export let GAME_CONSTANTS: GameConstants;

// Function to initialize game constants from loaded JSON data
export const initializeGameConstants = (gameConstantsData: any, 
                                      monsterTypes: any, 
                                      weaponTypes: any, 
                                      platformTypes: any) => {
  GAME_CONSTANTS = {
    GRAVITY: gameConstantsData.physics.gravity,
    JUMP_FORCE: gameConstantsData.physics.jumpForce,
    PLAYER_SPEED: gameConstantsData.physics.playerSpeed,
    ARROW_SPEED: gameConstantsData.physics.arrowSpeed,
    GAME_WIDTH: gameConstantsData.world.gameWidth,
    GAME_HEIGHT: gameConstantsData.world.gameHeight,
    SCREEN_WIDTH: gameConstantsData.world.screenWidth,
    MAGIC_COSTS: gameConstantsData.magic.costs as Record<MagicType, number>,
    MAGIC_RANGES: gameConstantsData.magic.ranges as Record<MagicType, number>,
    WEAPON_DAMAGE: Object.fromEntries(
      Object.entries(weaponTypes).map(([key, data]: [string, any]) => [key, data.damage])
    ) as Record<WeaponType, number>,
    MONSTER_DAMAGE: Object.fromEntries(
      Object.entries(monsterTypes).map(([key, data]: [string, any]) => [key, data.damage])
    ) as Record<MonsterType, number>,
    MONSTER_HEALTH: Object.fromEntries(
      Object.entries(monsterTypes).map(([key, data]: [string, any]) => [key, data.health])
    ) as Record<MonsterType, number>,
    MONSTER_SPEED: Object.fromEntries(
      Object.entries(monsterTypes).map(([key, data]: [string, any]) => [key, data.speed])
    ) as Record<MonsterType, number>,
    PLATFORM_FRICTION: Object.fromEntries(
      Object.entries(platformTypes).map(([key, data]: [string, any]) => [key, data.friction])
    ) as Record<'grass' | 'stone' | 'wood' | 'ice', number>
  };
};

// Monster creation helper interface
export interface CreateMonsterOptions {
  id: string;
  type: MonsterType;
  position: Position;
  facing?: 'left' | 'right';
  patrolStart: number;
  patrolEnd: number;
}

// Factory function to create monsters with default values
export const createMonster = (options: CreateMonsterOptions): Monster => {
  const {
    id,
    type,
    position,
    facing = 'right',
    patrolStart,
    patrolEnd
  } = options;

  const health = GAME_CONSTANTS.MONSTER_HEALTH[type];
  const speed = GAME_CONSTANTS.MONSTER_SPEED[type];
  
  return {
    id,
    type,
    position,
    startingPosition: { ...position }, // Store a copy of the initial position
    velocity: { x: facing === 'right' ? speed : -speed, y: 0 },
    health,
    maxHealth: health,
    facing,
    isAlive: true,
    isBurning: false,
    burnTimer: 0,
    patrolStart,
    patrolEnd,
    isDying: false,
    deathTimer: 0,
    damage: GAME_CONSTANTS.MONSTER_DAMAGE[type],
    isHit: false,
    hitStunTimer: 0,
    spriteType: undefined, // Will be set by GameFactory
    sprites: undefined,    // Will be set by GameFactory
    size: undefined        // Will be set by GameFactory
  };
};
