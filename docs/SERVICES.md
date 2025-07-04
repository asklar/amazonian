# Services Documentation

## DataLoader Service

**Purpose**: Centralized data loading and caching from JSON configuration files

**Key Methods**:
- `loadGameConfig()`: Loads and validates all game data
- `getGameConfig()`: Returns cached game configuration
- `getLevelData(levelId)`: Returns specific level data
- `getMonsterTypes()`: Returns monster type definitions
- `getWeaponTypes()`: Returns weapon configurations
- `getPlatformTypes()`: Returns platform type definitions
- `getGameConstants()`: Returns game physics and balance constants

**Data Sources**:
- `public/data/levels.json`: Level configurations
- `public/data/monsters.json`: Monster type definitions
- `public/data/weapons.json`: Weapon and projectile configs
- `public/data/gameConfig.json`: Physics and game constants

**Error Handling**:
- Validates JSON schema on load
- Provides fallback data for missing files
- Logs detailed error messages for debugging

## GameFactory Service

**Purpose**: Creates game entities from data configurations

**Key Methods**:
- `createLevel(levelId)`: Creates complete level with all entities
- `createMonsters(monsterData[])`: Creates monster entities
- `createPlatforms(platformData[])`: Creates platform entities
- `createLoot(lootData[])`: Creates loot entities
- `createCastleGate(gateData)`: Creates castle gate entity

**Entity Creation**:
- Applies default values from type definitions
- Validates entity data integrity
- Handles optional properties gracefully
- Provides type-safe entity creation

**Features**:
- Singleton pattern for consistent instance
- Lazy loading of configurations
- Automatic data validation
- Extensible for new entity types
