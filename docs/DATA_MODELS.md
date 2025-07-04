# Data Models Documentation

## Core Entity Types

### Player
```typescript
interface Player {
  position: Position;
  velocity: Position;
  health: number;
  maxHealth: number;
  magic: number;
  maxMagic: number;
  weapon: WeaponType;
  facing: 'left' | 'right';
  isOnGround: boolean;
  isAttacking: boolean;
  isCasting: boolean;
  invulnerabilityFrames: number;
  score: number;
  coins: number;
}
```

### Monster
```typescript
interface Monster {
  id: string;
  type: MonsterType;
  position: Position;
  velocity: Position;
  health: number;
  maxHealth: number;
  facing: 'left' | 'right';
  isAlive: boolean;
  patrolStart: number;
  patrolEnd: number;
  patrolArea?: Rectangle;
  lastShot: number;
  hitStunFrames: number;
  projectiles?: ProjectileConfig[];
}
```

### Platform
```typescript
interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'grass' | 'stone' | 'wood' | 'ice';
}
```

### Projectile
```typescript
interface Projectile {
  id: string;
  type: WeaponType;
  position: Position;
  velocity: Position;
  damage: number;
  isActive: boolean;
  source: 'player' | 'monster';
  width: number;
  height: number;
}
```

### Loot
```typescript
interface Loot {
  id: string;
  type: 'coin' | 'health' | 'magic';
  position: Position;
  collected: boolean;
}
```

## Configuration Types

### LevelData
```typescript
interface LevelData {
  id: number;
  name: string;
  width: number;
  background: BackgroundConfig;
  playerStartPosition: Position;
  platforms: PlatformData[];
  monsters: MonsterData[];
  loot: LootData[];
  castleGate: CastleGateData;
}
```

### MonsterTypeData
```typescript
interface MonsterTypeData {
  health: number;
  damage: number;
  speed: number;
  sprite: string;
  projectiles?: ProjectileConfig[];
}
```

### WeaponTypeData
```typescript
interface WeaponTypeData {
  damage: number;
  sprite: string;
  width: number;
  height: number;
}
```

### BackgroundConfig
```typescript
interface BackgroundConfig {
  skyGradient: {
    top: string;
    bottom: string;
  };
  layers: BackgroundLayer[];
}

interface BackgroundLayer {
  element: string | string[];
  parallaxSpeed: number;
  scale: number;
  opacity: number;
  yOffset: number;
  repeat?: boolean;
}
```

## Game State Types

### GameState
```typescript
interface GameState {
  player: Player;
  monsters: Monster[];
  platforms: Platform[];
  loot: Loot[];
  projectiles: Projectile[];
  magicEffects: MagicEffect[];
  castleGate: CastleGate;
  cameraOffset: Position;
  currentLevel: number;
  levelWidth: number;
  gameStatus: 'playing' | 'game-over' | 'victory' | 'level-complete';
  keys: Set<string>;
}
```
