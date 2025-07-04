# Game Systems Documentation

## Core Game Systems

### 1. Movement System
**Location**: `Game.tsx` - player and monster update logic
**Purpose**: Handles entity movement and physics

**Features**:
- Gravity application
- Ground collision detection
- Velocity-based movement
- Platform friction effects
- Boundary checking

**Key Functions**:
- Player movement with arrow keys
- Monster patrol behaviors
- Jumping mechanics
- Friction and momentum

### 2. Collision Detection System
**Location**: `Game.tsx` - collision checking functions
**Purpose**: Detects and resolves collisions between entities

**Collision Types**:
- Player ↔ Platform (landing, side collision)
- Player ↔ Monster (damage dealing)
- Projectile ↔ Monster (damage dealing)
- Player ↔ Loot (collection)
- Player ↔ Castle Gate (level completion)

**Algorithm**: AABB (Axis-Aligned Bounding Box) collision detection

### 3. Combat System
**Location**: `Game.tsx` - attack and magic handling
**Purpose**: Manages all combat interactions

**Components**:
- Melee attacks (sword, whip)
- Ranged attacks (bow with arrows)
- Projectile weapons (monster attacks)
- Magic spells (quake, blaze, cure)
- Damage calculation and application

**Features**:
- Invulnerability frames
- Hit stun mechanics
- Visual feedback
- Death animations

### 4. Input System
**Location**: `Game.tsx` - keyboard event handling
**Purpose**: Processes player input

**Controls**:
- Arrow keys: Movement
- Spacebar: Jump
- Z: Attack
- X: Cycle weapons
- Q/W/E: Magic spells
- P: Pause
- Debug keys: I, M, C, J, X

### 5. Animation System
**Location**: Individual component files
**Purpose**: Manages sprite animations

**Features**:
- State-based animations (idle, running, attacking)
- CSS animations for smooth transitions
- Sprite sheet support
- Animation timing and loops

### 6. Camera System
**Location**: `Game.tsx` - camera offset calculation
**Purpose**: Follows player and manages viewport

**Features**:
- Smooth player following
- Boundary clamping
- Level width aware
- Parallax background support

### 7. Level Progression System
**Location**: `Game.tsx` - level transition logic
**Purpose**: Manages level completion and progression

**Features**:
- Monster defeat tracking
- Castle gate unlocking
- Level transition animations
- Data-driven level loading

### 8. Loot System
**Location**: `Game.tsx` - loot collection
**Purpose**: Handles item collection and effects

**Loot Types**:
- Coins: Increase score
- Health: Restore health points
- Magic: Restore magic points

### 9. Background Rendering System
**Location**: `Background.tsx`
**Purpose**: Renders parallax backgrounds

**Features**:
- Multiple parallax layers
- Data-driven configuration
- Random element selection
- Sky gradient rendering
- Repeating background elements

### 10. Magic Effect System
**Location**: `MagicEffect.tsx` and `Game.tsx`
**Purpose**: Handles spell effects and animations

**Spells**:
- **Quake**: Area damage + screen shake
- **Blaze**: Ranged fire damage over time
- **Cure**: Player healing

**Features**:
- Visual effect rendering
- Timed effect duration
- Screen effects (camera shake)
- Magic point consumption
