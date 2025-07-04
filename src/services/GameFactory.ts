import type { 
  Monster, 
  Platform, 
  Loot, 
  CastleGate,
  CreateMonsterOptions 
} from '../components/types';
import { createMonster } from '../components/types';
import { dataLoader, type MonsterData, type PlatformData, type LootData } from './DataLoader';
import { debugLog } from '../utils/debugLogger';

export interface GameLevel {
  id: number;
  name: string;
  width: number;
  background: {
    skyGradient: {
      top: string;
      bottom: string;
    };
    layers: Array<{
      element: string | string[];
      parallaxSpeed: number;
      scale: number;
      opacity: number;
      yOffset: number;
      repeat?: boolean;
    }>;
  };
  playerStartPosition: { x: number; y: number };
  monsters: Monster[];
  platforms: Platform[];
  loot: Loot[];
  castleGate: CastleGate;
}

class GameFactory {
  private static instance: GameFactory;

  private constructor() {}

  public static getInstance(): GameFactory {
    if (!GameFactory.instance) {
      GameFactory.instance = new GameFactory();
    }
    return GameFactory.instance;
  }

  public createLevel(levelId: number): GameLevel {
    const levelData = dataLoader.getLevelData(levelId);
    
    return {
      id: levelData.id,
      name: levelData.name,
      width: levelData.width,
      background: levelData.background,
      playerStartPosition: levelData.playerStartPosition,
      monsters: this.createMonsters(levelData.monsters),
      platforms: this.createPlatforms(levelData.platforms),
      loot: this.createLoot(levelData.loot),
      castleGate: this.createCastleGate(levelData.castleGate)
    };
  }

  private createMonsters(monsterDataList: MonsterData[]): Monster[] {
    return monsterDataList.map(monsterData => {
      const options: CreateMonsterOptions = {
        id: monsterData.id,
        type: monsterData.type as any, // Type assertion since we know it's valid
        position: monsterData.position,
        facing: monsterData.facing,
        patrolStart: monsterData.patrolStart,
        patrolEnd: monsterData.patrolEnd
      };

      const monster = createMonster(options);
      
      // Add patrol area if specified (for flying monsters)
      if (monsterData.patrolArea) {
        monster.patrolArea = monsterData.patrolArea;
      }
      
      // Add sprite and size information from monster configuration
      try {
        const monsterConfig = dataLoader.getMonsterTypeData(monsterData.type);
        if (monsterConfig) {
          monster.spriteType = monsterConfig.spriteType;
          monster.sprites = monsterConfig.sprites;
          monster.size = monsterConfig.size;
          monster.isFlying = monsterConfig.isFlying;
          monster.projectiles = monsterConfig.projectiles; // Use new projectiles array
          monster.shootTimer = 0; // Initialize shoot timer
          monster.ai = monsterConfig.ai; // Add AI parameters
          monster.movementTimer = 0; // Initialize movement timer
          
          // Debug output for ice dragons
          if (monsterData.type === 'ice_dragon') {
            debugLog(`Ice dragon ${monsterData.id} created with projectiles:`, {
              projectiles: monster.projectiles,
              ai: monster.ai
            });
            debugLog(`Monster config data:`, monsterConfig);
          }
        }
      } catch (error) {
        console.warn(`Could not load sprite config for monster type: ${monsterData.type}`, error);
      }
      
      return monster;
    });
  }

  private createPlatforms(platformDataList: PlatformData[]): Platform[] {
    return platformDataList.map(platformData => ({
      id: platformData.id,
      x: platformData.x,
      y: platformData.y,
      width: platformData.width,
      height: platformData.height,
      type: platformData.type as 'grass' | 'stone' | 'wood' | 'ice' // Type assertion
    }));
  }

  private createLoot(lootDataList: LootData[]): Loot[] {
    return lootDataList.map(lootData => ({
      id: lootData.id,
      type: lootData.type as 'coin' | 'health' | 'magic', // Type assertion
      position: lootData.position,
      collected: lootData.collected
    }));
  }

  private createCastleGate(castleGateData: { position: { x: number; y: number }; isUnlocked: boolean }): CastleGate {
    return {
      position: castleGateData.position,
      isUnlocked: castleGateData.isUnlocked
    };
  }

  // Utility methods to get configuration data
  public getWeaponDamage(weaponType: string): number {
    const weaponData = dataLoader.getWeaponTypeData(weaponType);
    return weaponData.damage;
  }

  public getWeaponRange(weaponType: string): number {
    const weaponData = dataLoader.getWeaponTypeData(weaponType);
    return weaponData.range;
  }

  public getMonsterHealth(monsterType: string): number {
    const monsterData = dataLoader.getMonsterTypeData(monsterType);
    return monsterData.health;
  }

  public getMonsterDamage(monsterType: string): number {
    const monsterData = dataLoader.getMonsterTypeData(monsterType);
    return monsterData.damage;
  }

  public getMonsterSpeed(monsterType: string): number {
    const monsterData = dataLoader.getMonsterTypeData(monsterType);
    return monsterData.speed;
  }

  public getPlatformFriction(platformType: string): number {
    const platformData = dataLoader.getPlatformTypeData(platformType);
    return platformData.friction;
  }

  public getGameConstants() {
    return dataLoader.getGameConfig().gameConstants;
  }
}

export const gameFactory = GameFactory.getInstance();
