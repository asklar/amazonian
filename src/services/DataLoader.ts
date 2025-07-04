// Data loading service for game configuration
export interface GameConfig {
  levels: LevelData[];
  monsterTypes: Record<string, MonsterTypeData>;
  weaponTypes: Record<string, WeaponTypeData>;
  platformTypes: Record<string, PlatformTypeData>;
  gameConstants: GameConstantsData;
}

export interface LevelData {
  id: number;
  name: string;
  playerStartPosition: { x: number; y: number };
  platforms: PlatformData[];
  monsters: MonsterData[];
  loot: LootData[];
  castleGate: CastleGateData;
}

export interface PlatformData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
}

export interface MonsterData {
  id: string;
  type: string;
  position: { x: number; y: number };
  facing: 'left' | 'right';
  patrolStart: number;
  patrolEnd: number;
  // Optional rectangular patrol area for flying monsters
  patrolArea?: {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
  };
}

export interface LootData {
  id: string;
  type: string;
  position: { x: number; y: number };
  collected: boolean;
}

export interface CastleGateData {
  position: { x: number; y: number };
  isUnlocked: boolean;
}

export interface MonsterTypeData {
  name: string;
  health: number;
  damage: number;
  speed: number;
  spriteType: 'svg' | 'png';
  sprites: { 
    idle?: string; 
    hit?: string; 
    dying?: string; 
  };
  size: { width: number; height: number };
  isFlying?: boolean;
  canShoot?: boolean;
  shootCooldown?: number;
  shootRange?: number;
  projectileType?: 'fire' | 'frost';
  projectileLaunchOffset?: { x: number; y: number };
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
  animations: {
    walk: { frames: number; duration: number };
    attack: { frames: number; duration: number };
    death: { frames: number; duration: number };
  };
}

export interface WeaponTypeData {
  name: string;
  damage: number;
  range: number;
  attackSpeed: number;
  type: 'melee' | 'ranged';
  sprite: string;
  projectile?: {
    type: string;
    speed: number;
    sprite: string;
    size: { width: number; height: number };
  } | null;
  description: string;
}

export interface PlatformTypeData {
  name: string;
  friction: number;
  sprite: string;
  color: string;
  description: string;
}

export interface GameConstantsData {
  physics: {
    gravity: number;
    jumpForce: number;
    playerSpeed: number;
    monsterSpeed: number;
    arrowSpeed: number;
  };
  world: {
    gameWidth: number;
    gameHeight: number;
    screenWidth: number;
  };
  magic: {
    costs: Record<string, number>;
    ranges: Record<string, number>;
    effects: Record<string, {
      damage?: number;
      healAmount?: number;
      screenShake?: boolean;
      duration: number;
      burnDuration?: number;
    }>;
  };
  combat: {
    invulnerabilityDuration: number;
    hitStunDuration: number;
    magicHitStunDuration: number;
    projectileHitStunDuration: number;
    deathAnimationDuration: number;
  };
  loot: Record<string, {
    value?: number;
    healAmount?: number;
    manaAmount?: number;
    sprite: string;
  }>;
}

class DataLoader {
  private static instance: DataLoader;
  private gameConfig: GameConfig | null = null;

  private constructor() {}

  public static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  public async loadGameConfig(): Promise<GameConfig> {
    if (this.gameConfig) {
      return this.gameConfig;
    }

    try {
      // Load all configuration files
      const [levels, monsters, weapons, platforms, gameConstants] = await Promise.all([
        fetch('/data/levels.json').then(res => res.json()),
        fetch('/data/monsters.json').then(res => res.json()),
        fetch('/data/weapons.json').then(res => res.json()),
        fetch('/data/platforms.json').then(res => res.json()),
        fetch('/data/gameConfig.json').then(res => res.json())
      ]);

      this.gameConfig = {
        levels: levels.levels,
        monsterTypes: monsters.monsterTypes,
        weaponTypes: weapons.weaponTypes,
        platformTypes: platforms.platformTypes,
        gameConstants: gameConstants.gameConstants
      };

      return this.gameConfig;
    } catch (error) {
      console.error('Failed to load game configuration:', error);
      throw new Error('Failed to load game data. Please check that all configuration files are available.');
    }
  }

  public async reloadGameConfig(): Promise<GameConfig> {
    console.log('Reloading game configuration from JSON files...');
    this.gameConfig = null; // Clear cached config
    return await this.loadGameConfig();
  }

  public getGameConfig(): GameConfig {
    if (!this.gameConfig) {
      throw new Error('Game configuration not loaded. Call loadGameConfig() first.');
    }
    return this.gameConfig;
  }

  public getLevelData(levelId: number): LevelData {
    const config = this.getGameConfig();
    const level = config.levels.find(l => l.id === levelId);
    if (!level) {
      throw new Error(`Level ${levelId} not found in configuration.`);
    }
    return level;
  }

  public getMonsterTypeData(monsterType: string): MonsterTypeData {
    const config = this.getGameConfig();
    const monsterData = config.monsterTypes[monsterType];
    if (!monsterData) {
      throw new Error(`Monster type '${monsterType}' not found in configuration.`);
    }
    return monsterData;
  }

  public getWeaponTypeData(weaponType: string): WeaponTypeData {
    const config = this.getGameConfig();
    const weaponData = config.weaponTypes[weaponType];
    if (!weaponData) {
      throw new Error(`Weapon type '${weaponType}' not found in configuration.`);
    }
    return weaponData;
  }

  public getPlatformTypeData(platformType: string): PlatformTypeData {
    const config = this.getGameConfig();
    const platformData = config.platformTypes[platformType];
    if (!platformData) {
      throw new Error(`Platform type '${platformType}' not found in configuration.`);
    }
    return platformData;
  }
}

export const dataLoader = DataLoader.getInstance();
