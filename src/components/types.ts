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
}

export interface Monster {
  id: string;
  type: MonsterType;
  position: Position;
  velocity: Velocity;
  health: number;
  maxHealth: number;
  facing: 'left' | 'right';
  isAlive: boolean;
  isBurning: boolean;
  burnTimer: number;
  patrolStart: number;
  patrolEnd: number;
  isDying: boolean;
  deathTimer: number;
  damage: number;
  isHit: boolean;
  hitStunTimer: number;
}

export interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'grass' | 'stone' | 'wood';
}

export interface Loot {
  id: string;
  type: LootType;
  position: Position;
  collected: boolean;
}

export interface Projectile {
  id: string;
  type: 'arrow';
  position: Position;
  velocity: Velocity;
  damage: number;
  isActive: boolean;
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
export type MonsterType = 'goblin' | 'orc' | 'skeleton' | 'dragon';
export type LootType = 'coin' | 'health' | 'magic';
export type MagicType = 'quake' | 'blaze' | 'cure';

export interface GameConstants {
  GRAVITY: number;
  JUMP_FORCE: number;
  PLAYER_SPEED: number;
  MONSTER_SPEED: number;
  ARROW_SPEED: number;
  GAME_WIDTH: number;
  GAME_HEIGHT: number;
  SCREEN_WIDTH: number;
  MAGIC_COSTS: Record<MagicType, number>;
  MAGIC_RANGES: Record<MagicType, number>;
  WEAPON_DAMAGE: Record<WeaponType, number>;
  MONSTER_DAMAGE: Record<MonsterType, number>;
  MONSTER_HEALTH: Record<MonsterType, number>;
  MONSTER_SPEED_MULTIPLIER: Record<MonsterType, number>;
}

export const GAME_CONSTANTS: GameConstants = {
  GRAVITY: 0.25, // Even slower gravity for more frames
  JUMP_FORCE: -12, // Increased by 20% for more height
  PLAYER_SPEED: 2,
  MONSTER_SPEED: 1,
  ARROW_SPEED: 8,
  GAME_WIDTH: 2400, // Expanded from 800 for side-scrolling
  GAME_HEIGHT: 600,
  SCREEN_WIDTH: 800, // Actual viewport width
  MAGIC_COSTS: {
    quake: 30,
    blaze: 20,
    cure: 25
  },
  MAGIC_RANGES: {
    quake: -1, // Global range (affects all monsters)
    blaze: 120, // Short-range AoE
    cure: 0 // Self-target only
  },
  WEAPON_DAMAGE: {
    sword: 25,
    bow: 20,
    whip: 15
  },
  MONSTER_DAMAGE: {
    goblin: 10,
    orc: 15,
    skeleton: 12,
    dragon: 25
  },
  MONSTER_HEALTH: {
    goblin: 50,
    orc: 80,
    skeleton: 60,
    dragon: 120
  },
  MONSTER_SPEED_MULTIPLIER: {
    goblin: 1,
    orc: 0.8,
    skeleton: 1.2,
    dragon: 0.6
  }
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
  const speed = GAME_CONSTANTS.MONSTER_SPEED * GAME_CONSTANTS.MONSTER_SPEED_MULTIPLIER[type];
  
  return {
    id,
    type,
    position,
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
    hitStunTimer: 0
  };
};
