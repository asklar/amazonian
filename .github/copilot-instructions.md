# Copilot Instructions for Amazonian Adventure Platformer

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a classic 8-bit adventure platformer game built with React and TypeScript. The game features:

- An Amazonian warrior protagonist with multiple weapons (sword, bow, whip)
- Magic spells with visual effects (quake, blaze, cure)
- Multiple monster types with animations
- Platform-based level design
- Loot system (coins, health, magic)
- Castle gates that unlock when all monsters are defeated
- 8-bit pixel art style graphics

## Code Style Guidelines
- Use TypeScript for type safety
- Implement game logic with React hooks (useState, useEffect, useCallback)
- Create reusable components for game entities (Player, Monster, Platform, etc.)
- Use CSS modules or styled-components for 8-bit styled graphics
- Implement sprite-based animations using CSS animations
- Follow the Entity-Component-System pattern where appropriate
- Use requestAnimationFrame for smooth game loop

## Game Architecture
- Main Game component manages overall game state
- Player component handles movement, combat, and animations
- Monster components with different behaviors and sprites
- Platform components for level geometry
- Magic system with visual effect components
- Level progression system with castle gates
- Inventory and stats management

## Sprite and Animation Guidelines
- Use CSS pixel art techniques (image-rendering: pixelated)
- Implement sprite sheets for character animations
- Use CSS transforms for movement and effects
- Create particle effects for magic spells
- Maintain consistent 8-bit aesthetic throughout
