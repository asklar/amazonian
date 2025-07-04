/**
 * High-Performance Game Engine
 * 
 * Optimized for 60 FPS performance by separating game logic from React rendering.
 * Uses efficient state management and minimal DOM updates.
 */

import type { GameState, Position } from '../components/types';

export class GameEngine {
  private static instance: GameEngine;
  private gameState: GameState | null = null;
  private lastUpdateTime: number = 0;
  private frameCount: number = 0;
  private renderCallback: ((state: GameState) => void) | null = null;
  
  // Performance optimization: batch updates
  private pendingUpdates: Partial<GameState> = {};
  private updateScheduled: boolean = false;

  private constructor() {}

  public static getInstance(): GameEngine {
    if (!GameEngine.instance) {
      GameEngine.instance = new GameEngine();
    }
    return GameEngine.instance;
  }

  public setGameState(state: GameState): void {
    this.gameState = { ...state };
  }

  public getGameState(): GameState | null {
    return this.gameState;
  }

  public setRenderCallback(callback: (state: GameState) => void): void {
    this.renderCallback = callback;
  }

  // Efficient state updates - batch multiple changes
  public updateState(updates: Partial<GameState>): void {
    Object.assign(this.pendingUpdates, updates);
    
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      // Use microtask to batch updates within the same frame
      queueMicrotask(() => {
        this.flushUpdates();
      });
    }
  }

  private flushUpdates(): void {
    if (this.gameState && Object.keys(this.pendingUpdates).length > 0) {
      this.gameState = { ...this.gameState, ...this.pendingUpdates };
      
      // Notify React to re-render only once per batch
      if (this.renderCallback) {
        this.renderCallback(this.gameState);
      }
    }
    
    this.pendingUpdates = {};
    this.updateScheduled = false;
  }

  // Optimized player movement - minimal calculations
  public updatePlayerPosition(deltaTime: number, keys: Set<string>): void {
    if (!this.gameState) return;

    const player = this.gameState.player;
    const SPEED = 4; // Reduced for better control
    const GRAVITY = 0.8;
    const JUMP_FORCE = -12;

    let newVelX = player.velocity.x;
    let newVelY = player.velocity.y;

    // Horizontal movement
    if (keys.has('arrowleft') || keys.has('a')) {
      newVelX = -SPEED;
      this.updateState({ 
        player: { 
          ...player, 
          facing: 'left', 
          velocity: { x: newVelX, y: newVelY } 
        } 
      });
    } else if (keys.has('arrowright') || keys.has('d')) {
      newVelX = SPEED;
      this.updateState({ 
        player: { 
          ...player, 
          facing: 'right', 
          velocity: { x: newVelX, y: newVelY } 
        } 
      });
    } else {
      newVelX *= 0.8; // Friction
    }

    // Jumping
    if ((keys.has('arrowup') || keys.has('w') || keys.has(' ')) && player.isOnGround) {
      newVelY = JUMP_FORCE;
      this.updateState({ 
        player: { 
          ...player, 
          isOnGround: false, 
          velocity: { x: newVelX, y: newVelY } 
        } 
      });
    }

    // Apply gravity
    if (!player.isOnGround) {
      newVelY += GRAVITY;
    }

    // Update position
    const newX = Math.max(0, Math.min(
      (this.gameState.levelWidth || 2400) - 32, 
      player.position.x + newVelX
    ));
    const newY = Math.max(0, player.position.y + newVelY);

    // Simple ground collision (optimize platform collision separately)
    let onGround = false;
    if (newY >= 452) { // Ground level
      onGround = true;
      newVelY = 0;
    }

    this.updateState({
      player: {
        ...player,
        position: { x: newX, y: onGround ? 452 : newY },
        velocity: { x: newVelX, y: newVelY },
        isOnGround: onGround
      }
    });
  }

  // Simplified monster AI - only update every few frames
  public updateMonsters(): void {
    if (!this.gameState || this.frameCount % 3 !== 0) return; // Update every 3rd frame

    const monsters = this.gameState.monsters.map(monster => {
      if (!monster.isAlive) return monster;

      const speed = 1;
      let newX = monster.position.x;

      // Simple patrol AI
      if (monster.position.x <= monster.patrolStart && monster.velocity.x <= 0) {
        newX += speed;
        monster.facing = 'right';
      } else if (monster.position.x >= monster.patrolEnd && monster.velocity.x >= 0) {
        newX -= speed;
        monster.facing = 'left';
      } else {
        newX += monster.facing === 'right' ? speed : -speed;
      }

      return {
        ...monster,
        position: { x: newX, y: monster.position.y },
        velocity: { x: monster.facing === 'right' ? speed : -speed, y: monster.velocity.y }
      };
    });

    this.updateState({ monsters });
  }

  // Efficient collision detection - spatial partitioning
  public checkCollisions(): void {
    if (!this.gameState || this.frameCount % 2 !== 0) return; // Check every 2nd frame

    const player = this.gameState.player;
    
    // Only check collisions for nearby entities (within screen bounds)
    const screenLeft = this.gameState.cameraOffset?.x || 0;
    const screenRight = screenLeft + 800;
    
    // Monster collisions
    const nearbyMonsters = this.gameState.monsters.filter(m => 
      m.isAlive && 
      m.position.x >= screenLeft - 100 && 
      m.position.x <= screenRight + 100
    );

    let playerHit = false;
    nearbyMonsters.forEach(monster => {
      const dx = Math.abs(player.position.x - monster.position.x);
      const dy = Math.abs(player.position.y - monster.position.y);
      
      if (dx < 32 && dy < 40 && !player.isInvulnerable) {
        playerHit = true;
      }
    });

    if (playerHit) {
      this.updateState({
        player: {
          ...player,
          health: Math.max(0, player.health - 10),
          isInvulnerable: true,
          invulnerabilityTimer: 120
        }
      });
    }
  }

  // Update camera efficiently
  public updateCamera(): void {
    if (!this.gameState) return;

    const targetX = this.gameState.player.position.x - 400;
    const clampedX = Math.max(0, Math.min((this.gameState.levelWidth || 2400) - 800, targetX));
    
    // Only update if camera actually moved
    if (Math.abs(clampedX - (this.gameState.cameraOffset?.x || 0)) > 1) {
      this.updateState({
        cameraOffset: { x: clampedX, y: 0 }
      });
    }
  }

  // Main game loop - much more efficient
  public update(deltaTime: number, keys: Set<string>): void {
    if (!this.gameState) return;

    this.frameCount++;

    // Always update player for responsive controls
    this.updatePlayerPosition(deltaTime, keys);
    
    // Update camera only when needed
    if (this.frameCount % 1 === 0) { // Every frame for smooth camera
      this.updateCamera();
    }
    
    // Update monsters less frequently for performance
    if (this.frameCount % 4 === 0) { // Every 4th frame = 15fps monster AI
      this.updateMonsters();
    }
    
    // Check collisions less frequently
    if (this.frameCount % 3 === 0) { // Every 3rd frame = 20fps collision detection
      this.checkCollisions();
    }

    // Update timers every frame but batch the updates
    this.updateTimers();
  }

  // Separate timer updates for better performance
  private updateTimers(): void {
    if (!this.gameState) return;

    const player = this.gameState.player;
    
    // Update invulnerability timer
    if (player.isInvulnerable && player.invulnerabilityTimer > 0) {
      const newTimer = player.invulnerabilityTimer - 1;
      this.updateState({
        player: {
          ...player,
          invulnerabilityTimer: newTimer,
          isInvulnerable: newTimer > 0
        }
      });
    }
  }
}

export const gameEngine = GameEngine.getInstance();
