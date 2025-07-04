# Game Components Documentation

## Core Game Components

### Game.tsx
**Purpose**: Main game controller and state manager
**Responsibilities**:
- Game loop management using requestAnimationFrame
- Player input handling (keyboard events)
- Collision detection between all entities
- Game state management (playing, paused, game-over, etc.)
- Level progression and transitions
- Monster AI and movement
- Projectile physics and lifecycle
- Magic effects system

**Key State**:
- Player position, health, magic, weapons
- Monster positions and health
- Platform collision data
- Active projectiles and magic effects
- Camera offset for scrolling
- Current level and game status

**Props**: None (root component)

### Player.tsx
**Purpose**: Renders the player character with animations
**Responsibilities**:
- Player sprite rendering
- Animation state management (idle, running, jumping, attacking)
- Weapon sprite overlay
- Health and magic bar display
- Visual feedback for player states

**Props**:
- `player`: Player entity data
- `cameraOffset`: For screen positioning
- `isDebug`: Debug mode visualization

### Monster.tsx
**Purpose**: Renders individual monsters with AI behaviors
**Responsibilities**:
- Monster sprite rendering based on type
- Health bar display
- Animation state management
- Visual damage feedback
- Death animations

**Props**:
- `monster`: Monster entity data
- `cameraOffset`: For screen positioning

### Platform.tsx
**Purpose**: Renders level platforms with different materials
**Responsibilities**:
- Platform sprite rendering
- Material-based visual styling (grass, stone, wood, ice)
- Collision boundary visualization in debug mode

**Props**:
- `platform`: Platform entity data
- `cameraOffset`: For screen positioning
- `isDebug`: Debug visualization

### Projectile.tsx
**Purpose**: Renders projectiles (arrows, fireballs, etc.)
**Responsibilities**:
- Projectile sprite rendering
- Animation and rotation effects
- Data-driven sizing and appearance

**Props**:
- `projectile`: Projectile entity data
- `cameraOffset`: For screen positioning

### Loot.tsx
**Purpose**: Renders collectible items
**Responsibilities**:
- Loot sprite rendering (coins, health hearts, magic potions)
- Collection animations
- Type-based visual styling

**Props**:
- `loot`: Loot entity data
- `cameraOffset`: For screen positioning

### CastleGate.tsx
**Purpose**: Renders level exit gates
**Responsibilities**:
- Castle gate sprite rendering
- Locked/unlocked state visualization
- Unlock animations

**Props**:
- `castleGate`: Gate entity data
- `cameraOffset`: For screen positioning

### Background.tsx
**Purpose**: Renders parallax background layers
**Responsibilities**:
- Data-driven background layer rendering
- Parallax scrolling effects
- Sky gradient rendering
- Random element selection for variation

**Props**:
- `cameraOffset`: For parallax calculations
- `currentLevel`: For level-specific backgrounds

### MagicEffect.tsx
**Purpose**: Renders magical spell effects
**Responsibilities**:
- Visual effect rendering (quake, blaze, cure)
- Animation lifecycle management
- Screen effects (camera shake for quake)

**Props**:
- `effect`: Magic effect data
- `cameraOffset`: For screen positioning

### GameUI.tsx
**Purpose**: Renders game user interface
**Responsibilities**:
- Player stats display (health, magic, score)
- Current weapon indicator
- Level information
- Pause screen
- Debug information overlay

**Props**:
- `player`: For stats display
- `currentLevel`: Level information
- `isPaused`: Pause state
- `debugMode`: Debug info toggle
