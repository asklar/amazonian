import { useState, useEffect, useCallback, useRef } from 'react';
import type { 
  GameState, 
  Position, 
  WeaponType,
  MagicType 
} from './types';
import { GAME_CONSTANTS } from './types';
import Player from './Player.tsx';
import MonsterComponent from './Monster.tsx';
import PlatformComponent from './Platform.tsx';
import LootComponent from './Loot.tsx';
import ProjectileComponent from './Projectile.tsx';
import MagicEffectComponent from './MagicEffect.tsx';
import CastleGateComponent from './CastleGate.tsx';
import GameUI from './GameUI.tsx';
import Background from './Background.tsx';
import { createLevel1, createLevel2, createLevel3 } from './levels';

const Game: React.FC = () => {
  const [screenShake, setScreenShake] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const gameLoopRef = useRef<number | undefined>(undefined);
  const keysRef = useRef<Set<string>>(new Set());

  const [gameState, setGameState] = useState<GameState>(() => {
    const level1 = createLevel1();
    return {
      player: {
        position: { x: 50, y: 452 }, // Position player on top of ground platform
        velocity: { x: 0, y: 0 },
        health: 100,
        maxHealth: 100,
        magic: 100,
        maxMagic: 100,
        coins: 0,
        weapon: 'sword',
        facing: 'right',
        isAttacking: false,
        isOnGround: true, // Start on ground
        isAlive: true,
        canJump: true,
        isInvulnerable: false,
        invulnerabilityTimer: 0,
      },
      monsters: level1.monsters,
      platforms: level1.platforms,
      loot: level1.loot,
      projectiles: [],
      magicEffects: [],
      castleGate: level1.castleGate,
      currentLevel: 1,
      gameStatus: 'playing',
      cameraOffset: { x: 0, y: 0 },
    };
  });

  // Keyboard input handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Collision detection utilities
  const checkCollision = useCallback((pos1: Position, size1: { width: number, height: number }, pos2: Position, size2: { width: number, height: number }): boolean => {
    return (
      pos1.x < pos2.x + size2.width &&
      pos1.x + size1.width > pos2.x &&
      pos1.y < pos2.y + size2.height &&
      pos1.y + size1.height > pos2.y
    );
  }, []);

  const checkPlatformCollision = useCallback((position: Position, velocity: { x: number, y: number }): { position: Position, onGround: boolean } => {
    let newPosition = { ...position };
    let onGround = false;
    
    gameState.platforms.forEach(platform => {
      // Check if player is colliding with platform
      if (checkCollision(
        { x: newPosition.x, y: newPosition.y + velocity.y },
        { width: 32, height: 48 },
        { x: platform.x, y: platform.y },
        { width: platform.width, height: platform.height }
      )) {
        if (velocity.y > 0) { // Falling down - land on top of platform
          newPosition.y = platform.y - 48;
          onGround = true;
        } else if (velocity.y < 0) { // Jumping up - hit bottom of platform
          newPosition.y = platform.y + platform.height;
        }
      }
    });

    return { position: newPosition, onGround };
  }, [gameState.platforms, checkCollision]);

  // Attack handling
  const handleAttack = useCallback(() => {
    if (gameState.player.isAttacking) return;

    setGameState(prev => {
      const newState = { ...prev };
      newState.player = { ...prev.player, isAttacking: true };

      // Create projectile for bow
      if (prev.player.weapon === 'bow') {
        const arrowId = `arrow_${Date.now()}`;
        const direction = prev.player.facing === 'right' ? 1 : -1;
        newState.projectiles = [...prev.projectiles, {
          id: arrowId,
          type: 'arrow',
          position: { 
            x: prev.player.position.x + (direction > 0 ? 32 : -16), 
            y: prev.player.position.y + 20 
          },
          velocity: { x: GAME_CONSTANTS.ARROW_SPEED * direction, y: 0 },
          damage: GAME_CONSTANTS.WEAPON_DAMAGE.bow,
          isActive: true,
        }];
      }

      // Check for monster hits with melee weapons
      if (prev.player.weapon === 'sword' || prev.player.weapon === 'whip') {
        const attackRange = prev.player.weapon === 'sword' ? 40 : 60;
        const direction = prev.player.facing === 'right' ? 1 : -1;
        const attackX = prev.player.position.x + (direction > 0 ? 32 : -attackRange);
        
        newState.monsters = prev.monsters.map(monster => {
          if (monster.isAlive && checkCollision(
            { x: attackX, y: prev.player.position.y },
            { width: attackRange, height: 48 },
            monster.position,
            { width: 32, height: 40 }
          )) {
            const newHealth = monster.health - GAME_CONSTANTS.WEAPON_DAMAGE[prev.player.weapon];
            const shouldDie = newHealth <= 0;
            return {
              ...monster,
              health: Math.max(0, newHealth),
              isAlive: !shouldDie,
              isDying: shouldDie && !monster.isDying,
              deathTimer: shouldDie && !monster.isDying ? 60 : monster.deathTimer, // 1 second at 60fps
              isHit: !shouldDie, // Only apply hit stun if monster doesn't die
              hitStunTimer: !shouldDie ? 30 : monster.hitStunTimer, // 0.5 seconds at 60fps, preserve existing timer if dying
            };
          }
          return monster;
        });
      }

      // Reset attack state after animation
      setTimeout(() => {
        setGameState(current => ({
          ...current,
          player: { ...current.player, isAttacking: false }
        }));
      }, 300);

      return newState;
    });
  }, [gameState.player.isAttacking, gameState.player.weapon, gameState.player.facing, gameState.player.position, checkCollision]);

  // Magic casting
  const castMagic = useCallback((spellType: MagicType) => {
    setGameState(prev => {
      if (prev.player.magic < GAME_CONSTANTS.MAGIC_COSTS[spellType]) return prev;

      const newState = { ...prev };
      newState.player = {
        ...prev.player,
        magic: prev.player.magic - GAME_CONSTANTS.MAGIC_COSTS[spellType]
      };

      const effectId = `magic_${Date.now()}`;
      const effect = {
        id: effectId,
        type: spellType,
        position: spellType === 'quake' ? { x: 0, y: 0 } : { ...prev.player.position },
        duration: spellType === 'quake' ? 1000 : spellType === 'blaze' ? 1500 : 1000,
        isActive: true,
      };

      newState.magicEffects = [...prev.magicEffects, effect];

      // Add screen shake for quake spell
      if (spellType === 'quake') {
        setScreenShake({ x: 8, y: 8 });
        // Create intense screen shake animation
        let shakeCount = 0;
        const shakeInterval = setInterval(() => {
          setScreenShake({ 
            x: (Math.random() - 0.5) * 16, 
            y: (Math.random() - 0.5) * 16 
          });
          shakeCount++;
          if (shakeCount > 20) {
            clearInterval(shakeInterval);
            setScreenShake({ x: 0, y: 0 });
          }
        }, 50);
      }

      // Apply magic effects
      if (spellType === 'quake' || spellType === 'blaze') {
        newState.monsters = prev.monsters.map(monster => {
          if (!monster.isAlive) return monster;
          
          let damage = 0;
          if (spellType === 'quake') {
            damage = 40;
          } else if (spellType === 'blaze') {
            damage = 30;
            const newHealth = monster.health - damage;
            const shouldDie = newHealth <= 0;
            return {
              ...monster,
              health: Math.max(0, newHealth),
              isAlive: !shouldDie,
              isDying: shouldDie && !monster.isDying,
              deathTimer: shouldDie && !monster.isDying ? 60 : monster.deathTimer,
              isBurning: true,
              burnTimer: 3000,
              isHit: !shouldDie,
              hitStunTimer: !shouldDie ? 45 : monster.hitStunTimer, // Longer stun for magic
            };
          }
          
          const newHealth = monster.health - damage;
          const shouldDie = newHealth <= 0;
          return {
            ...monster,
            health: Math.max(0, newHealth),
            isAlive: !shouldDie,
            isDying: shouldDie && !monster.isDying,
            deathTimer: shouldDie && !monster.isDying ? 60 : monster.deathTimer,
            isHit: !shouldDie,
            hitStunTimer: !shouldDie ? 45 : monster.hitStunTimer, // Longer stun for magic
          };
        });
      } else if (spellType === 'cure') {
        newState.player.health = Math.min(newState.player.maxHealth, newState.player.health + 50);
      }

      // Remove effect after duration
      setTimeout(() => {
        setGameState(current => ({
          ...current,
          magicEffects: current.magicEffects.filter(e => e.id !== effectId)
        }));
      }, effect.duration);

      return newState;
    });
  }, []);

  // Weapon switching
  const switchWeapon = useCallback((weapon: WeaponType) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, weapon }
    }));
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;

    setGameState(prev => {
      const newState = { ...prev };
      const keys = keysRef.current;

      // Player movement
      let newPlayerVelocity = { ...prev.player.velocity };
      let newPlayerPosition = { ...prev.player.position };

      // Horizontal movement
      if (keys.has('a') || keys.has('arrowleft')) {
        newPlayerVelocity.x = -GAME_CONSTANTS.PLAYER_SPEED;
        newState.player.facing = 'left';
      } else if (keys.has('d') || keys.has('arrowright')) {
        newPlayerVelocity.x = GAME_CONSTANTS.PLAYER_SPEED;
        newState.player.facing = 'right';
      } else {
        newPlayerVelocity.x = 0;
      }

      // Jumping - only allow jumping if canJump is true
      const jumpKeys = keys.has('w') || keys.has('arrowup') || keys.has(' ');
      if (jumpKeys && prev.player.isOnGround && prev.player.canJump) {
        newPlayerVelocity.y = GAME_CONSTANTS.JUMP_FORCE;
        newState.player.isOnGround = false;
        newState.player.canJump = false; // Prevent jumping until key is released
      }
      
      // Reset canJump when jump key is released
      if (!jumpKeys && prev.player.isOnGround) {
        newState.player.canJump = true;
      }

      // Apply gravity
      newPlayerVelocity.y += GAME_CONSTANTS.GRAVITY;

      // Update position
      newPlayerPosition.x += newPlayerVelocity.x;
      newPlayerPosition.y += newPlayerVelocity.y;

      // Platform collision
      const collisionResult = checkPlatformCollision(newPlayerPosition, newPlayerVelocity);
      newPlayerPosition = collisionResult.position;
      newState.player.isOnGround = collisionResult.onGround;
      
      // Only reset velocity when landing on ground, not when hitting platforms from below
      if (collisionResult.onGround && newPlayerVelocity.y > 0) {
        newPlayerVelocity.y = 0;
      }

      // Boundary checking
      newPlayerPosition.x = Math.max(0, Math.min(GAME_CONSTANTS.GAME_WIDTH - 32, newPlayerPosition.x));
      if (newPlayerPosition.y > GAME_CONSTANTS.GAME_HEIGHT) {
        newState.player.health -= 20;
        newPlayerPosition = { x: 50, y: 452 }; // Respawn on ground
        newPlayerVelocity = { x: 0, y: 0 };
        newState.player.isOnGround = true;
      }

      newState.player.position = newPlayerPosition;
      newState.player.velocity = newPlayerVelocity;

      // Update camera to follow player
      const targetCameraX = newPlayerPosition.x - GAME_CONSTANTS.SCREEN_WIDTH / 2;
      const clampedCameraX = Math.max(0, Math.min(GAME_CONSTANTS.GAME_WIDTH - GAME_CONSTANTS.SCREEN_WIDTH, targetCameraX));
      newState.cameraOffset = { x: clampedCameraX, y: 0 };

      // Update projectiles
      newState.projectiles = prev.projectiles.map(projectile => {
        if (!projectile.isActive) return projectile;

        const newProjectilePosition = {
          x: projectile.position.x + projectile.velocity.x,
          y: projectile.position.y + projectile.velocity.y
        };

        // Check boundaries
        if (newProjectilePosition.x < 0 || newProjectilePosition.x > GAME_CONSTANTS.GAME_WIDTH) {
          return { ...projectile, isActive: false };
        }

        return { ...projectile, position: newProjectilePosition };
      }).filter(projectile => projectile.isActive);

      // Update monsters
      newState.monsters = prev.monsters.map(monster => {
        if (!monster.isAlive) return monster;

        // Handle hit stun timer
        let hitStunTimer = monster.hitStunTimer;
        let isHit = monster.isHit;
        if (hitStunTimer > 0) {
          hitStunTimer--;
          if (hitStunTimer <= 0) {
            isHit = false;
          }
        }

        // AI movement (only if not in hit stun)
        let newMonsterVelocity = { ...monster.velocity };
        let newMonsterPosition = { ...monster.position };

        if (!isHit && !monster.isDying) {
          // Simple patrol AI - check boundaries and reverse direction if needed
          if (monster.position.x <= monster.patrolStart && monster.velocity.x < 0) {
            // Hit left boundary while moving left - turn right
            newMonsterVelocity.x = GAME_CONSTANTS.MONSTER_SPEED * GAME_CONSTANTS.MONSTER_SPEED_MULTIPLIER[monster.type];
            monster.facing = 'right';
          } else if (monster.position.x >= monster.patrolEnd && monster.velocity.x > 0) {
            // Hit right boundary while moving right - turn left
            newMonsterVelocity.x = -GAME_CONSTANTS.MONSTER_SPEED * GAME_CONSTANTS.MONSTER_SPEED_MULTIPLIER[monster.type];
            monster.facing = 'left';
          } else {
            // Continue moving in current direction
            if (monster.facing === 'right') {
              newMonsterVelocity.x = GAME_CONSTANTS.MONSTER_SPEED * GAME_CONSTANTS.MONSTER_SPEED_MULTIPLIER[monster.type];
            } else {
              newMonsterVelocity.x = -GAME_CONSTANTS.MONSTER_SPEED * GAME_CONSTANTS.MONSTER_SPEED_MULTIPLIER[monster.type];
            }
          }
        } else {
          // Stop movement during hit stun or death
          newMonsterVelocity.x = 0;
        }

        // Apply gravity to monsters
        newMonsterVelocity.y += GAME_CONSTANTS.GRAVITY;
        newMonsterPosition.x += newMonsterVelocity.x;
        newMonsterPosition.y += newMonsterVelocity.y;

        // Platform collision for monsters
        const monsterCollision = checkPlatformCollision(newMonsterPosition, newMonsterVelocity);
        if (monsterCollision.position.y !== newMonsterPosition.y + newMonsterVelocity.y) {
          newMonsterVelocity.y = 0;
        }
        newMonsterPosition = monsterCollision.position;

        // Boundary checking for monsters
        newMonsterPosition.x = Math.max(0, Math.min(GAME_CONSTANTS.GAME_WIDTH - 32, newMonsterPosition.x));

        // Handle burning
        let updatedMonster = {
          ...monster,
          position: newMonsterPosition,
          velocity: newMonsterVelocity,
          isHit,
          hitStunTimer,
        };

        if (monster.isBurning && monster.burnTimer > 0) {
          updatedMonster.burnTimer = monster.burnTimer - 16; // Assuming 60fps
          if (updatedMonster.burnTimer <= 0) {
            updatedMonster.isBurning = false;
            const newHealth = Math.max(0, updatedMonster.health - 15);
            const shouldDie = newHealth <= 0;
            updatedMonster.health = newHealth;
            updatedMonster.isAlive = !shouldDie;
            if (shouldDie && !updatedMonster.isDying) {
              updatedMonster.isDying = true;
              updatedMonster.deathTimer = 60;
            }
          }
        }

        // Handle death animation timer
        if (updatedMonster.isDying && updatedMonster.deathTimer > 0) {
          updatedMonster.deathTimer = updatedMonster.deathTimer - 1;
          if (updatedMonster.deathTimer <= 0) {
            updatedMonster.isDying = false; // Animation complete
          }
        }

        return updatedMonster;
      });

      // Check projectile-monster collisions
      newState.projectiles.forEach(projectile => {
        if (!projectile.isActive) return;

        newState.monsters = newState.monsters.map(monster => {
          if (!monster.isAlive) return monster;

          if (checkCollision(
            projectile.position,
            { width: 16, height: 2 },
            monster.position,
            { width: 32, height: 40 }
          )) {
            // Mark projectile as inactive
            projectile.isActive = false;
            
            // Damage monster
            const newHealth = monster.health - projectile.damage;
            const shouldDie = newHealth <= 0;
            return {
              ...monster,
              health: Math.max(0, newHealth),
              isAlive: !shouldDie,
              isDying: shouldDie && !monster.isDying,
              deathTimer: shouldDie && !monster.isDying ? 60 : monster.deathTimer,
              isHit: !shouldDie,
              hitStunTimer: !shouldDie ? 20 : monster.hitStunTimer, // Shorter stun for projectiles
            };
          }
          return monster;
        });
      });

      // Update invulnerability timer
      if (prev.player.isInvulnerable && prev.player.invulnerabilityTimer > 0) {
        newState.player.invulnerabilityTimer = prev.player.invulnerabilityTimer - 1;
        if (newState.player.invulnerabilityTimer <= 0) {
          newState.player.isInvulnerable = false;
        }
      }

      // Check player-monster collisions
      newState.monsters.forEach(monster => {
        if (!monster.isAlive || newState.player.isInvulnerable) return;

        if (checkCollision(
          newState.player.position,
          { width: 32, height: 48 },
          monster.position,
          { width: 32, height: 40 }
        )) {
          newState.player.health = Math.max(0, newState.player.health - monster.damage);
          // Start invulnerability period (2 seconds at 60fps)
          newState.player.isInvulnerable = true;
          newState.player.invulnerabilityTimer = 120;
        }
      });

      // Check player-loot collisions
      newState.loot = prev.loot.map(loot => {
        if (loot.collected) return loot;

        if (checkCollision(
          newState.player.position,
          { width: 32, height: 48 },
          loot.position,
          { width: 16, height: 16 }
        )) {
          switch (loot.type) {
            case 'coin':
              newState.player.coins += 10;
              break;
            case 'health':
              newState.player.health = Math.min(newState.player.maxHealth, newState.player.health + 25);
              break;
            case 'magic':
              newState.player.magic = Math.min(newState.player.maxMagic, newState.player.magic + 30);
              break;
          }
          return { ...loot, collected: true };
        }
        return loot;
      });

      // Check if all monsters are defeated
      const aliveMonsters = newState.monsters.filter(m => m.isAlive);
      if (aliveMonsters.length === 0 && !newState.castleGate.isUnlocked) {
        newState.castleGate.isUnlocked = true;
      }

      // Check player-castle gate collision for level completion
      if (newState.castleGate.isUnlocked && checkCollision(
        newState.player.position,
        { width: 32, height: 48 },
        newState.castleGate.position,
        { width: 80, height: 120 }
      )) {
        if (newState.currentLevel === 3) {
          newState.gameStatus = 'victory';
        } else {
          newState.gameStatus = 'level-complete';
        }
      }

      // Check game over
      if (newState.player.health <= 0) {
        newState.gameStatus = 'game-over';
        newState.player.isAlive = false;
      }

      return newState;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.gameStatus, checkPlatformCollision, checkCollision]);

  // Start game loop
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop, gameState.gameStatus]);

  // Handle input for attacks and magic
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      switch (key) {
        case 'x':
        case 'enter':
          handleAttack();
          break;
        case '1':
          switchWeapon('sword');
          break;
        case '2':
          switchWeapon('bow');
          break;
        case '3':
          switchWeapon('whip');
          break;
        case 'q':
          castMagic('quake');
          break;
        case 'b':
          castMagic('blaze');
          break;
        case 'e':
          castMagic('cure');
          break;
        case 'r':
          restartGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleAttack, switchWeapon, castMagic]);

  // Level progression
  const nextLevel = useCallback(() => {
    const nextLevelNum = gameState.currentLevel + 1;
    let newLevel;
    
    switch (nextLevelNum) {
      case 2:
        newLevel = createLevel2();
        break;
      case 3:
        newLevel = createLevel3();
        break;
      default:
        return;
    }

    setGameState(prev => ({
      ...prev,
      currentLevel: nextLevelNum,
      monsters: newLevel.monsters,
      platforms: newLevel.platforms,
      loot: newLevel.loot,
      castleGate: newLevel.castleGate,
      gameStatus: 'playing',
      player: {
        ...prev.player,
        position: { x: 50, y: 452 }, // Position player on top of ground platform
        velocity: { x: 0, y: 0 },
        isOnGround: true,
        canJump: true,
      },
      projectiles: [],
      magicEffects: [],
    }));
  }, [gameState.currentLevel]);

  const restartGame = useCallback(() => {
    const level1 = createLevel1();
    setGameState({
      player: {
        position: { x: 50, y: 452 }, // Position player on top of ground platform
        velocity: { x: 0, y: 0 },
        health: 100,
        maxHealth: 100,
        magic: 100,
        maxMagic: 100,
        coins: 0,
        weapon: 'sword',
        facing: 'right',
        isAttacking: false,
        isOnGround: true, // Start on ground
        isAlive: true,
        canJump: true,
        isInvulnerable: false,
        invulnerabilityTimer: 0,
      },
      monsters: level1.monsters,
      platforms: level1.platforms,
      loot: level1.loot,
      projectiles: [],
      magicEffects: [],
      castleGate: level1.castleGate,
      currentLevel: 1,
      gameStatus: 'playing',
      cameraOffset: { x: 0, y: 0 },
    });
  }, []);

  return (
    <div 
      className="game-container"
      style={{
        transform: `translate(${screenShake.x}px, ${screenShake.y}px)`,
        transition: screenShake.x === 0 && screenShake.y === 0 ? 'transform 0.1s ease-out' : 'none'
      }}
    >
      <Background 
        cameraOffset={gameState.cameraOffset}
      />
      
      <GameUI 
        player={gameState.player} 
        currentLevel={gameState.currentLevel}
      />
      
      <Player 
        player={gameState.player}
        cameraOffset={gameState.cameraOffset}
      />
      
      {gameState.monsters.map(monster => (
        <MonsterComponent 
          key={monster.id}
          monster={monster}
          cameraOffset={gameState.cameraOffset}
        />
      ))}
      
      {gameState.platforms.map(platform => (
        <PlatformComponent 
          key={platform.id}
          platform={platform}
          cameraOffset={gameState.cameraOffset}
        />
      ))}
      
      {gameState.loot.filter(loot => !loot.collected).map(loot => (
        <LootComponent 
          key={loot.id}
          loot={loot}
          cameraOffset={gameState.cameraOffset}
        />
      ))}
      
      {gameState.projectiles.filter(projectile => projectile.isActive).map(projectile => (
        <ProjectileComponent 
          key={projectile.id}
          projectile={projectile}
          cameraOffset={gameState.cameraOffset}
        />
      ))}
      
      {gameState.magicEffects.filter(effect => effect.isActive).map(effect => (
        <MagicEffectComponent 
          key={effect.id}
          effect={effect}
          cameraOffset={gameState.cameraOffset}
        />
      ))}
      
      <CastleGateComponent 
        castleGate={gameState.castleGate}
        cameraOffset={gameState.cameraOffset}
      />

      {gameState.gameStatus === 'game-over' && (
        <div className="game-screen">
          <h2>Game Over!</h2>
          <p>The Amazonian warrior has fallen...</p>
          <button onClick={restartGame}>Try Again</button>
        </div>
      )}

      {gameState.gameStatus === 'victory' && (
        <div className="game-screen">
          <h2>Victory!</h2>
          <p>The Amazonian warrior has conquered all!</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}

      {gameState.gameStatus === 'level-complete' && (
        <div className="game-screen">
          <h2>Level Complete!</h2>
          <p>Proceed to the next challenge!</p>
          <button onClick={nextLevel}>Next Level</button>
        </div>
      )}
    </div>
  );
};

export default Game;
