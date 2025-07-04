# Amazonian Adventure Platformer - Project Architecture

## Overview
This is a classic 8-bit adventure platformer game built with React and TypeScript. The game features an Amazonian warrior protagonist with multiple weapons, magic spells, monsters, platform-based level design, and a complete loot system.

## Architecture Principles

### 1. Data-Driven Design
- All game configuration is stored in JSON files in `public/data/`
- Levels, monsters, weapons, and game constants are configurable
- No hardcoded game logic - everything is driven by data

### 2. Component-Based Architecture
- Each game entity is a React component (Player, Monster, Platform, etc.)
- Components are reusable and accept data through props
- Separation of concerns between rendering and game logic

### 3. Service Layer
- `DataLoader` service manages all data loading from JSON files
- `GameFactory` service creates game entities from data
- Services handle data transformation and validation

### 4. Type Safety
- Comprehensive TypeScript interfaces for all game entities
- Strict type checking prevents runtime errors
- Clear contracts between components

## Core Architecture Layers

```
┌─────────────────────────────────────────┐
│           React Components              │
│  (Player, Monster, Platform, etc.)     │
├─────────────────────────────────────────┤
│           Game Logic Layer              │
│    (Game.tsx - Main game loop)         │
├─────────────────────────────────────────┤
│            Service Layer                │
│   (DataLoader, GameFactory)            │
├─────────────────────────────────────────┤
│             Data Layer                  │
│  (JSON configs, sprites, assets)       │
└─────────────────────────────────────────┘
```

## Key Design Patterns

### Entity-Component-System (ECS) Inspired
- Entities have components (position, health, sprites)
- Systems operate on components (collision, movement, rendering)
- Promotes code reuse and maintainability

### Observer Pattern
- Game state changes trigger component re-renders
- Event-driven architecture for user input
- Decoupled communication between systems

### Factory Pattern
- GameFactory creates entities from data configurations
- Consistent entity creation with validation
- Easy to extend with new entity types

## Performance Considerations
- Efficient collision detection using spatial partitioning concepts
- Sprite preloading and caching
- Optimized rendering with React's virtual DOM
- Frame-rate independent game loop using requestAnimationFrame
