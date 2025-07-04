import { useState, useEffect, useCallback, useRef } from 'react';
import type { 
  GameState, 
  Position, 
  Platform,
  WeaponType,
  MagicType,
  Projectile
} from './types';
import { GAME_CONSTANTS, initializeGameConstants } from './types';
import { dataLoader } from '../services/DataLoader';
import { debugLogger, debugLog } from '../utils/debugLogger';
import { useIsMobile } from '../hooks/useIsMobile';
import Player from './Player.tsx';
import MonsterComponent from './Monster.tsx';
import PlatformComponent from './Platform.tsx';
import LootComponent from './Loot.tsx';
import ProjectileComponent from './Projectile.tsx';
import MagicEffectComponent from './MagicEffect.tsx';
import CastleGateComponent from './CastleGate.tsx';
import GameUI from './GameUI.tsx';
import Background from './Background.tsx';
import MobileControls from './MobileControls.tsx';
import TouchOverlay from './TouchOverlay.tsx';
import { createLevel, getMaxLevel, levelExists } from './levels';

const Game: React.FC = () => {
  const [screenShake, setScreenShake] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [debugMode, setDebugMode] = useState<boolean>(false); // Disable debug by default for performance
  const [isPaused, setIsPaused] = useState<boolean>(false); // Pause state for debugging
  const [mobileEmulation, setMobileEmulation] = useState<boolean>(false); // Debug mobile emulation
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false); // Fullscreen state
  const [gameDataLoaded, setGameDataLoaded] = useState<boolean>(false);
  const [gameDataError, setGameDataError] = useState<string | null>(null);
  
  const gameLoopRef = useRef<number | undefined>(undefined);
  const keysRef = useRef<Set<string>>(new Set());
  // Modified mobile detection: preserve mobile emulation even when debug mode is off
  const isMobile = useIsMobile(mobileEmulation ? true : undefined);
  
  // Mobile scaling helper function
  const calculateMobileScale = useCallback(() => {
    if (!isMobile) return 1;
    
    const gameWidth = 800;
    const gameHeight = 600;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate scale to fit the entire game area within the viewport
    const scaleX = viewportWidth / gameWidth;
    const scaleY = viewportHeight / gameHeight;
    
    // Use the smaller scale to ensure everything fits, but prioritize fitting the full height
    // on mobile landscape (which is the typical gaming orientation)
    return Math.min(scaleX, scaleY);
  }, [isMobile]);
  
  // Mobile control states (movement is handled by TouchOverlay)
  
  // Remove frame rate limiting for now to fix broken functionality

  // Sync debug mode with logger
  useEffect(() => {
    debugLogger.setDebugMode(debugMode);
  }, [debugMode]);

  // Initialize game data on component mount
  useEffect(() => {
    const initializeGameData = async () => {
      try {
        const gameConfig = await dataLoader.loadGameConfig();
        
        // Initialize the game constants from JSON data
        initializeGameConstants(
          gameConfig.gameConstants,
          gameConfig.monsterTypes,
          gameConfig.weaponTypes,
          gameConfig.platformTypes
        );

        setGameDataLoaded(true);
      } catch (error) {
        console.error('Failed to load game data:', error);
        setGameDataError(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    };

    initializeGameData();
  }, []);

  const [gameState, setGameState] = useState<GameState>(() => {
    // Initialize with a safe placeholder state that doesn't use GAME_CONSTANTS
    return {        player: {
          position: { x: 50, y: 452 },
          velocity: { x: 0, y: 0 },
          health: 100,
          maxHealth: 100,
          magic: 100,
          maxMagic: 100,
          coins: 0,
          weapon: 'sword',
          facing: 'right',
          isAttacking: false,
          isCasting: false,
          isOnGround: true,
          isAlive: true,
          canJump: true,
          isInvulnerable: false,
          invulnerabilityTimer: 0,
          isPermanentlyInvulnerable: false,
          isJumping: false,
          jumpStartTime: 0,
          jumpHeldTime: 0,
        },
      monsters: [],
      platforms: [],
      loot: [],
      projectiles: [],
      magicEffects: [],
      castleGate: { position: { x: 0, y: 0 }, isUnlocked: false },
      currentLevel: 1,
      levelWidth: 2400, // Default width
      gameStatus: 'playing',
      cameraOffset: { x: 0, y: 0 },
    };
  });

  // Initialize game state once data is loaded
  useEffect(() => {
    if (gameDataLoaded) {
      const level1 = createLevel(1);
      setGameState({
        player: {
          position: level1.playerStartPosition || { x: 50, y: 452 },
          velocity: { x: 0, y: 0 },
          health: 100,
          maxHealth: 100,
          magic: 100,
          maxMagic: 100,
          coins: 0,
          weapon: 'sword',
          facing: 'right',
          isAttacking: false,
          isCasting: false,
          isOnGround: true,
          isAlive: true,
          canJump: true,
          isInvulnerable: false,
          invulnerabilityTimer: 0,
          isPermanentlyInvulnerable: false,
          isJumping: false,
          jumpStartTime: 0,
          jumpHeldTime: 0,
        },
        monsters: level1.monsters,
        platforms: level1.platforms,
        loot: level1.loot,
        projectiles: [],
        magicEffects: [],
        castleGate: level1.castleGate,
        currentLevel: 1,
        levelWidth: level1.width,
        gameStatus: 'playing',
        cameraOffset: { x: 0, y: 0 },
      });
    }
  }, [gameDataLoaded]);

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

  // Get actual collision size for a monster (accounting for PNG scaling)
  const getMonsterCollisionSize = useCallback((monster: { spriteType?: 'svg' | 'png', size?: { width: number, height: number } }): { width: number, height: number } => {
    const baseWidth = monster.size?.width || 32;
    const baseHeight = monster.size?.height || 40;
    
    // PNG sprites are scaled 2x in rendering, so use 2x size for collision detection
    if (monster.spriteType === 'png') {
      return { width: baseWidth * 2, height: baseHeight * 2 };
    }
    
    // SVG sprites use their base size
    return { width: baseWidth, height: baseHeight };
  }, []);

  // Check if player is behind an unopened castle gate (protected from monster damage)
  const isPlayerProtectedByGate = useCallback((playerPos: Position, monsterPos: Position, castleGate: { position: Position, isUnlocked: boolean }): boolean => {
    if (castleGate.isUnlocked) return false; // Gate is open, no protection
    
    const gateLeft = castleGate.position.x;
    const gateRight = castleGate.position.x + 80; // Gate width is 80
    
    // Player must be behind (to the right of) the gate, and monster must be in front of (to the left of) the gate
    const playerBehindGate = playerPos.x >= gateRight; // Player is behind/to the right of the gate
    const monsterInFrontOfGate = monsterPos.x <= gateLeft; // Monster is in front of/to the left of the gate
    
    const isProtected = playerBehindGate && monsterInFrontOfGate;
    
    if (isProtected) {
      console.log(`Player protected by gate: playerX=${playerPos.x}, monsterX=${monsterPos.x}, gateLeft=${gateLeft}, gateRight=${gateRight}`);
    }
    
    return isProtected;
  }, []);

  // Distance calculation utility
  const getDistance = useCallback((pos1: Position, pos2: Position): number => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Check if a monster is within blaze spell range
  const isWithinBlazeRange = useCallback((playerPos: Position, monsterPos: Position): boolean => {
    if (!GAME_CONSTANTS) return false;
    const BLAZE_RANGE = GAME_CONSTANTS.MAGIC_RANGES.blaze;
    return getDistance(playerPos, monsterPos) <= BLAZE_RANGE;
  }, [getDistance]);

  const checkPlatformCollision = useCallback((position: Position, velocity: { x: number, y: number }): { position: Position, onGround: boolean, groundPlatform: Platform | null } => {
    let newPosition = { ...position };
    let onGround = false;
    let groundPlatform: Platform | null = null;
    
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
          groundPlatform = platform;
        } else if (velocity.y < 0) { // Jumping up - hit bottom of platform
          newPosition.y = platform.y + platform.height;
        }
      }
    });

    return { position: newPosition, onGround, groundPlatform };
  }, [gameState.platforms, checkCollision]);

  // Attack handling
  const handleAttack = useCallback(() => {
    if (gameState.player.isAttacking || !gameDataLoaded || !GAME_CONSTANTS) return;

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
          facing: prev.player.facing, // Store the facing direction
          source: 'player'
        }];
      }

      // Check for monster hits with melee weapons
      if (prev.player.weapon === 'sword' || prev.player.weapon === 'whip') {
        const attackRange = prev.player.weapon === 'sword' ? 40 : 60;
        const direction = prev.player.facing === 'right' ? 1 : -1;
        const attackX = prev.player.position.x + (direction > 0 ? 32 : -attackRange);
        
        newState.monsters = prev.monsters.map(monster => {
          if (!monster.isAlive) return monster;
          
          const monsterCollisionSize = getMonsterCollisionSize(monster);
          
          if (checkCollision(
            { x: attackX, y: prev.player.position.y },
            { width: attackRange, height: 48 },
            monster.position,
            monsterCollisionSize
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
  }, [gameState.player.isAttacking, gameState.player.weapon, gameState.player.facing, gameState.player.position, gameDataLoaded, checkCollision]);

  // Magic casting
  const castMagic = useCallback((spellType: MagicType) => {
    if (!gameDataLoaded || !GAME_CONSTANTS) return;
    
    setGameState(prev => {
      if (prev.player.magic < GAME_CONSTANTS.MAGIC_COSTS[spellType] || prev.player.isCasting) return prev;

      const newState = { ...prev };
      newState.player = {
        ...prev.player,
        magic: prev.player.magic - GAME_CONSTANTS.MAGIC_COSTS[spellType],
        isCasting: true
      };

      // Set casting duration and reset after animation
      setTimeout(() => {
        setGameState(current => ({
          ...current,
          player: {
            ...current.player,
            isCasting: false
          }
        }));
      }, 800); // Casting animation duration

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
          
          // For blaze spell, check if monster is within range
          if (spellType === 'blaze' && !isWithinBlazeRange(prev.player.position, monster.position)) {
            return monster; // Skip monsters outside blaze range
          }
          
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
  }, [gameDataLoaded, isWithinBlazeRange]);

  // Weapon switching
  const switchWeapon = useCallback((weapon: WeaponType) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, weapon }
    }));
  }, []);

  // Mobile control handlers (movement is handled by TouchOverlay)
  const handleTouchMove = useCallback((direction: 'left' | 'right' | null) => {
    console.log('Touch move called:', direction);
    debugLog('Touch move called:', direction);
    // Directly manipulate keyboard state for consistency with desktop
    const keys = keysRef.current;
    keys.delete('arrowleft');
    keys.delete('arrowright');
    if (direction === 'left') {
      keys.add('arrowleft');
    } else if (direction === 'right') {
      keys.add('arrowright');
    }
  }, []);

  const handleTouchJump = useCallback((pressed: boolean) => {
    console.log('Touch jump called:', pressed);
    debugLog('Touch jump called:', pressed);
    // Directly manipulate keyboard state for consistency with desktop
    const keys = keysRef.current;
    if (pressed) {
      keys.add(' ');
    } else {
      keys.delete(' ');
    }
  }, []);

  const handleMobileAttack = useCallback(() => {
    handleAttack();
  }, [handleAttack]);

  const handleMobileSwitchWeapon = useCallback((weapon: WeaponType) => {
    switchWeapon(weapon);
  }, [switchWeapon]);

  const handleMobileCastMagic = useCallback((spell: MagicType) => {
    castMagic(spell);
  }, [castMagic]);

  // Update body class for mobile mode
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('mobile-game-active');
      
      // Add special class for desktop mobile emulation (whether debug mode is on or off)
      if (mobileEmulation) {
        document.body.classList.add('desktop-mobile-emulation');
      } else {
        document.body.classList.remove('desktop-mobile-emulation');
      }
    } else {
      document.body.classList.remove('mobile-game-active');
      document.body.classList.remove('desktop-mobile-emulation');
    }

    return () => {
      document.body.classList.remove('mobile-game-active');
      document.body.classList.remove('desktop-mobile-emulation');
    };
  }, [isMobile, mobileEmulation]);

  // Handle orientation for mobile devices
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientationChange = () => {
      // Skip orientation handling for desktop mobile emulation
      if (mobileEmulation) {
        // Desktop mobile emulation - always assume landscape
        document.body.classList.add('landscape-mode');
        document.body.classList.remove('portrait-mode');
        return;
      }

      // For real mobile devices, detect orientation using multiple methods
      let isLandscape = false;
      
      console.log('Checking orientation...');
      console.log('window.orientation:', window.orientation);
      console.log('screen.orientation:', screen.orientation);
      console.log('innerWidth:', window.innerWidth, 'innerHeight:', window.innerHeight);
      
      // Method 1: Use screen.orientation API if available (most reliable)
      if (screen.orientation) {
        const angle = screen.orientation.angle;
        isLandscape = angle === 90 || angle === -90 || angle === 270;
        console.log('Using screen.orientation.angle:', angle, 'isLandscape:', isLandscape);
      } 
      // Method 2: Use window.orientation if available (iOS Safari and older browsers)
      else if (typeof window.orientation !== 'undefined') {
        const angle = window.orientation;
        isLandscape = Math.abs(angle) === 90;
        console.log('Using window.orientation:', angle, 'isLandscape:', isLandscape);
      }
      // Method 3: Fallback to window dimensions (with delay for mobile browsers)
      else {
        // Add small delay to allow browser to update dimensions after rotation
        setTimeout(() => {
          isLandscape = window.innerWidth > window.innerHeight;
          console.log('Using dimensions (delayed):', 'width:', window.innerWidth, 'height:', window.innerHeight, 'isLandscape:', isLandscape);
          
          if (isLandscape) {
            document.body.classList.add('landscape-mode');
            document.body.classList.remove('portrait-mode');
            console.log('Applied landscape-mode class');
          } else {
            document.body.classList.add('portrait-mode');
            document.body.classList.remove('landscape-mode');
            console.log('Applied portrait-mode class');
          }
        }, 200); // Increased delay for mobile browsers
        return; // Exit early since we're using setTimeout
      }

      // Apply orientation classes for methods 1 and 2
      if (isLandscape) {
        document.body.classList.add('landscape-mode');
        document.body.classList.remove('portrait-mode');
        console.log('Applied landscape-mode class');
      } else {
        document.body.classList.add('portrait-mode');
        document.body.classList.remove('landscape-mode');
        console.log('Applied portrait-mode class');
      }

      // Try to lock to landscape orientation if possible (real mobile devices only)
      if (screen.orientation && 'lock' in screen.orientation) {
        (screen.orientation as any).lock('landscape').catch((error: any) => {
          console.log('Orientation lock failed:', error);
        });
      }
    };

    // Try to lock orientation on mount
    handleOrientationChange();

    // Listen for orientation changes (real mobile devices only)
    if (!mobileEmulation) {
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);
      
      // Also listen for screen orientation change event if available
      if (screen.orientation) {
        screen.orientation.addEventListener('change', handleOrientationChange);
      }
    }
    
    // Prevent zoom on mobile
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchstart', preventZoom, { passive: false });

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      if (screen.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange);
      }
      document.removeEventListener('touchstart', preventZoom);
      document.body.classList.remove('landscape-mode', 'portrait-mode');
    };
  }, [isMobile, mobileEmulation]);

  // Handle fullscreen for mobile devices
  useEffect(() => {
    if (!isMobile) return;

    let fullscreenRequested = false;

    const requestFullscreen = async () => {
      if (fullscreenRequested) return;
      
      try {
        // Skip fullscreen for desktop mobile emulation
        if (mobileEmulation) {
          console.log('Skipping fullscreen for desktop mobile emulation');
          return;
        }

        console.log('Attempting to request fullscreen...');
        
        // Check if we're already in fullscreen
        if (document.fullscreenElement) {
          console.log('Already in fullscreen');
          return;
        }

        // Try multiple fullscreen methods for better browser compatibility
        const element = document.documentElement;
        
        if (element.requestFullscreen) {
          await element.requestFullscreen();
          fullscreenRequested = true;
          console.log('Fullscreen requested via requestFullscreen');
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen();
          fullscreenRequested = true;
          console.log('Fullscreen requested via webkitRequestFullscreen');
        } else if ((element as any).mozRequestFullScreen) {
          await (element as any).mozRequestFullScreen();
          fullscreenRequested = true;
          console.log('Fullscreen requested via mozRequestFullScreen');
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen();
          fullscreenRequested = true;
          console.log('Fullscreen requested via msRequestFullscreen');
        } else {
          console.log('No fullscreen API available');
        }
      } catch (error) {
        console.log('Could not enter fullscreen:', error);
      }
      
      // Fallback: try to hide address bar by scrolling (iOS Safari)
      try {
        window.scrollTo(0, 1);
        setTimeout(() => window.scrollTo(0, 1), 100);
        console.log('Attempted address bar hiding via scroll');
      } catch (error) {
        console.log('Could not scroll to hide address bar:', error);
      }
    };

    // Try on first user interaction (required by most browsers)
    const handleFirstInteraction = (e: Event) => {
      console.log('First user interaction detected:', e.type);
      requestFullscreen();
    };

    // Add listeners for first interaction
    document.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    // Also try after page load (some browsers allow this)
    const timer = setTimeout(() => {
      if (!fullscreenRequested) {
        console.log('Trying fullscreen after page load...');
        requestFullscreen();
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      window.removeEventListener('resize', handleViewportResize);
      window.removeEventListener('orientationchange', handleViewportResize);
    };
  }, [isMobile, mobileEmulation]);

  // Handle mobile viewport and address bar hiding
  useEffect(() => {
    if (!isMobile) return;

    // Skip for desktop mobile emulation
    if (mobileEmulation) {
      return;
    }

    // Set viewport meta tag for mobile
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }

    // Store original viewport content
    const originalViewport = viewportMeta.content;

    // Set mobile-optimized viewport
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

    // Add iOS-specific meta tags for fullscreen-like experience
    const addMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
      return meta;
    };

    addMetaTag('apple-mobile-web-app-capable', 'yes');
    addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    addMetaTag('mobile-web-app-capable', 'yes');

    // Hide address bar by scrolling (works on many mobile browsers)
    const hideAddressBar = () => {
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 100);
    };

    // Hide address bar on page load and orientation change
    hideAddressBar();
    window.addEventListener('orientationchange', hideAddressBar);
    window.addEventListener('resize', hideAddressBar);

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      // Restore original settings
      viewportMeta.content = originalViewport;
      window.removeEventListener('orientationchange', hideAddressBar);
      window.removeEventListener('resize', hideAddressBar);
      
      // Restore body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isMobile, mobileEmulation]);

  // Handle fullscreen change events
  const handleFullscreenChange = () => {
    const isFullscreen = !!(document.fullscreenElement || 
                            (document as any).webkitFullscreenElement || 
                            (document as any).mozFullScreenElement || 
                            (document as any).msFullscreenElement);
    
    console.log('Fullscreen changed:', isFullscreen);
    setIsFullscreen(isFullscreen);
    
    // Force a layout recalculation
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  // Handle viewport resize for mobile browsers
  const handleViewportResize = () => {
    console.log('Viewport resized:', window.innerWidth, 'x', window.innerHeight);
    
    // Update CSS custom properties for dynamic viewport
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
  };

  // Add fullscreen event listeners
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);
  
  // Add viewport resize listener
  window.addEventListener('resize', handleViewportResize);
  window.addEventListener('orientationchange', handleViewportResize);
  
  // Initial viewport setup
  handleViewportResize();

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || !gameDataLoaded || !GAME_CONSTANTS || isPaused) return;

    setGameState(prev => {
      const newState = { ...prev };
      const keys = keysRef.current;

      // Player movement
      let newPlayerVelocity = { ...prev.player.velocity };
      let newPlayerPosition = { ...prev.player.position };

      // Horizontal movement (keyboard only - mobile uses TouchOverlay)
      const movingLeft = keys.has('arrowleft');
      const movingRight = keys.has('arrowright');
      
      if (movingLeft) {
        newPlayerVelocity.x = -GAME_CONSTANTS.PLAYER_SPEED;
        newState.player.facing = 'left';
      } else if (movingRight) {
        newPlayerVelocity.x = GAME_CONSTANTS.PLAYER_SPEED;
        newState.player.facing = 'right';
      } else {
        // Apply friction based on platform when no movement keys are pressed
        // Only apply friction if player is on ground
        if (prev.player.isOnGround) {
          // Default friction for when player is not on a specific platform (shouldn't happen, but safety)
          let frictionCoeff = 0.9;
          
          // Find which platform the player is currently standing on
          const playerFootY = prev.player.position.y + 48; // Bottom of player
          const standingPlatform = prev.platforms.find(platform => {
            return prev.player.position.x + 16 >= platform.x && // Player center X is within platform
                   prev.player.position.x + 16 <= platform.x + platform.width &&
                   Math.abs(playerFootY - platform.y) < 5; // Player is standing on top of platform
          });
          
          if (standingPlatform) {
            frictionCoeff = GAME_CONSTANTS.PLATFORM_FRICTION[standingPlatform.type];
          }
          
          // Apply friction to horizontal velocity with enhanced ice physics
          if (standingPlatform?.type === 'ice') {
            // Ice: much more gradual deceleration
            newPlayerVelocity.x *= frictionCoeff;
          } else {
            // Other surfaces: standard friction
            newPlayerVelocity.x *= frictionCoeff;
          }
          
          // Stop very small movements to prevent floating point precision issues
          // Make the threshold much smaller for ice to allow more sliding
          const stopThreshold = standingPlatform?.type === 'ice' ? 0.05 : 0.15;
          if (Math.abs(newPlayerVelocity.x) < stopThreshold) {
            newPlayerVelocity.x = 0;
          }
        } else {
          // In air - no friction, maintain momentum
          // newPlayerVelocity.x remains unchanged
        }
      }
      
      // Apply momentum-based movement for ice platforms even when pressing movement keys
      if (prev.player.isOnGround && (movingLeft || movingRight)) {
        const playerFootY = prev.player.position.y + 48;
        const standingPlatform = prev.platforms.find(platform => {
          return prev.player.position.x + 16 >= platform.x && 
                 prev.player.position.x + 16 <= platform.x + platform.width &&
                 Math.abs(playerFootY - platform.y) < 5;
        });
        
        if (standingPlatform?.type === 'ice') {
          // On ice: blend current velocity with intended direction for momentum feel
          const targetVelocity = movingLeft ? -GAME_CONSTANTS.PLAYER_SPEED : GAME_CONSTANTS.PLAYER_SPEED;
          const momentum = 0.7; // How much previous velocity affects movement
          newPlayerVelocity.x = newPlayerVelocity.x * momentum + targetVelocity * (1 - momentum);
        }
      }

      // Jumping - keyboard only (mobile uses TouchOverlay) - Variable height jump system
      const jumpKeys = keys.has('arrowup') || keys.has(' ');
      const currentTime = Date.now();
      
      if (jumpKeys && prev.player.isOnGround && prev.player.canJump) {
        // Start jump
        newPlayerVelocity.y = GAME_CONSTANTS.JUMP_FORCE * 0.6; // Initial smaller jump force
        newState.player.isOnGround = false;
        newState.player.canJump = false; // Prevent jumping until key is released
        newState.player.isJumping = true;
        newState.player.jumpStartTime = currentTime;
        newState.player.jumpHeldTime = 0;
      } else if (jumpKeys && prev.player.isJumping && !prev.player.isOnGround) {
        // Continue jump - increase velocity while held (up to max time)
        const maxJumpHoldTime = 300; // 300ms max hold time for full jump
        newState.player.jumpHeldTime = currentTime - prev.player.jumpStartTime;
        
        if (newState.player.jumpHeldTime < maxJumpHoldTime && newPlayerVelocity.y < 0) {
          // Add additional upward force while jump is held
          const jumpBoost = -0.4; // Additional upward force per frame
          newPlayerVelocity.y += jumpBoost;
          
          // Cap the maximum upward velocity to full jump force
          const maxUpwardVelocity = GAME_CONSTANTS.JUMP_FORCE;
          if (newPlayerVelocity.y < maxUpwardVelocity) {
            newPlayerVelocity.y = maxUpwardVelocity;
          }
        }
      } else if (!jumpKeys && prev.player.isJumping && !prev.player.isOnGround) {
        // Jump key released while in air - stop adding upward force
        newState.player.isJumping = false;
        // If moving upward slowly, reduce velocity for quicker fall
        if (newPlayerVelocity.y < -2) {
          newPlayerVelocity.y *= 0.5; // Cut upward momentum when key released
        }
      }
      
      // Reset canJump and jumping state when on ground
      if (prev.player.isOnGround) {
        if (!jumpKeys) {
          newState.player.canJump = true;
        }
        if (newState.player.isJumping) {
          newState.player.isJumping = false;
          newState.player.jumpStartTime = 0;
          newState.player.jumpHeldTime = 0;
        }
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
      newPlayerPosition.x = Math.max(0, Math.min(newState.levelWidth - 32, newPlayerPosition.x));
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
      const clampedCameraX = Math.max(0, Math.min(newState.levelWidth - GAME_CONSTANTS.SCREEN_WIDTH, targetCameraX));
      newState.cameraOffset = { x: clampedCameraX, y: 0 };

      // Update projectiles
      newState.projectiles = prev.projectiles.map(projectile => {
        if (!projectile.isActive) return projectile;

        const newProjectilePosition = {
          x: projectile.position.x + projectile.velocity.x,
          y: projectile.position.y + projectile.velocity.y
        };

        // Check boundaries - deactivate if projectile goes off screen
        if (newProjectilePosition.x < 0 || newProjectilePosition.x > newState.levelWidth ||
            newProjectilePosition.y < 0 || newProjectilePosition.y > GAME_CONSTANTS.GAME_HEIGHT) {
          return { ...projectile, isActive: false };
        }

        // Check castle gate collision - projectiles should vanish when hitting the gate
        if (!newState.castleGate.isUnlocked && checkCollision(
          newProjectilePosition,
          { width: 16, height: 2 }, // Projectile size
          newState.castleGate.position,
          { width: 80, height: 120 } // Castle gate size
        )) {
          return { ...projectile, isActive: false };
        }

        // Check platform collision - projectiles should vanish when hitting platforms
        for (const platform of newState.platforms) {
          if (checkCollision(
            newProjectilePosition,
            { width: 16, height: 2 }, // Projectile size
            { x: platform.x, y: platform.y },
            { width: platform.width, height: platform.height }
          )) {
            return { ...projectile, isActive: false };
          }
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
          // Check if monster has rectangular patrol area (for flying monsters)
          if (monster.patrolArea) {
            // Rectangular patrol logic for flying monsters
            const ai = monster.ai || {};
            const randomFactor = Math.random();
            const distanceToPlayer = Math.abs(monster.position.x - newState.player.position.x);
            
            // Update movement timer
            const movementTimer = (monster.movementTimer || 0) + 1;
            const minMovementTime = ai.minMovementTime || 0;
            
            // Chance to randomly change direction even if not at boundaries
            const randomChangeChance = ai.randomDirectionChangeChance || 0.01;
            if (randomFactor < randomChangeChance && movementTimer >= minMovementTime) {
              monster.facing = monster.facing === 'right' ? 'left' : 'right';
              monster.movementTimer = 0;
            } else {
              monster.movementTimer = movementTimer;
            }
            
            // Speed calculations
            let speedMultiplier = 1.0;
            const speedBoostRange = ai.speedBoostRange || 150;
            const speedBoostMultiplier = ai.speedBoostMultiplier || 1.2;
            if (distanceToPlayer < speedBoostRange) {
              speedMultiplier = speedBoostMultiplier;
            }
            
            const baseSpeed = GAME_CONSTANTS.MONSTER_SPEED[monster.type];
            
            // Boundary checking for rectangular patrol area
            const patrolArea = monster.patrolArea;
            const overshootRange = ai.patrolOvershootRange || 10;
            const overshoot = Math.random() * overshootRange;
            
            // Horizontal boundaries
            if (monster.position.x <= patrolArea.xStart - overshoot && monster.velocity.x < 0) {
              newMonsterVelocity.x = baseSpeed * speedMultiplier;
              monster.facing = 'right';
              monster.movementTimer = 0;
            } else if (monster.position.x >= patrolArea.xEnd + overshoot && monster.velocity.x > 0) {
              newMonsterVelocity.x = -baseSpeed * speedMultiplier;
              monster.facing = 'left';
              monster.movementTimer = 0;
            } else {
              // Normal movement with speed variation
              const speedVariationMin = ai.speedVariationMin || 0.9;
              const speedVariationMax = ai.speedVariationMax || 1.1;
              const speedVariation = speedVariationMin + (Math.random() * (speedVariationMax - speedVariationMin));
              if (monster.facing === 'right') {
                newMonsterVelocity.x = baseSpeed * speedMultiplier * speedVariation;
              } else {
                newMonsterVelocity.x = -baseSpeed * speedMultiplier * speedVariation;
              }
            }
            
            // Vertical boundaries (unique to flying monsters)
            if (monster.position.y <= patrolArea.yStart && monster.velocity.y < 0) {
              newMonsterVelocity.y = Math.abs(newMonsterVelocity.y); // Reverse to go down
            } else if (monster.position.y >= patrolArea.yEnd && monster.velocity.y > 0) {
              newMonsterVelocity.y = -Math.abs(newMonsterVelocity.y); // Reverse to go up
            } else {
              // Add slight vertical movement for floating effect
              if (Math.random() < 0.02) { // 2% chance per frame to change vertical direction
                newMonsterVelocity.y = (Math.random() - 0.5) * 2; // Random vertical movement between -1 and 1
              }
            }
          }
          // Advanced AI for monsters with ai parameters (non-rectangular patrol)
          else if (monster.ai) {
            const ai = monster.ai;
            const randomFactor = Math.random();
            const distanceToPlayer = Math.abs(monster.position.x - newState.player.position.x);
            
            // Update movement timer
            const movementTimer = (monster.movementTimer || 0) + 1;
            const minMovementTime = ai.minMovementTime || 0;
            
            // Chance to randomly change direction even if not at patrol boundary
            // Only allow direction change if minimum movement time has passed
            const randomChangeChance = ai.randomDirectionChangeChance || 0.01;
            if (randomFactor < randomChangeChance && movementTimer >= minMovementTime) {
              monster.facing = monster.facing === 'right' ? 'left' : 'right';
              monster.movementTimer = 0; // Reset movement timer on direction change
            } else {
              monster.movementTimer = movementTimer;
            }
            
            // Speed boost when player is close
            let speedMultiplier = 1.0;
            const speedBoostRange = ai.speedBoostRange || 150;
            const speedBoostMultiplier = ai.speedBoostMultiplier || 1.2;
            if (distanceToPlayer < speedBoostRange) {
              speedMultiplier = speedBoostMultiplier;
            }
            
            // Get base speed for this monster type
            const baseSpeed = GAME_CONSTANTS.MONSTER_SPEED[monster.type];
            
            // Boundary checking with random overshoot
            const overshootRange = ai.patrolOvershootRange || 10;
            const overshoot = Math.random() * overshootRange;
            if (monster.position.x <= monster.patrolStart - overshoot && monster.velocity.x < 0) {
              newMonsterVelocity.x = baseSpeed * speedMultiplier;
              monster.facing = 'right';
              monster.movementTimer = 0; // Reset movement timer on boundary hit
            } else if (monster.position.x >= monster.patrolEnd + overshoot && monster.velocity.x > 0) {
              newMonsterVelocity.x = -baseSpeed * speedMultiplier;
              monster.facing = 'left';
              monster.movementTimer = 0; // Reset movement timer on boundary hit
            } else {
              // Add speed variation
              const speedVariationMin = ai.speedVariationMin || 0.9;
              const speedVariationMax = ai.speedVariationMax || 1.1;
              const speedVariation = speedVariationMin + (Math.random() * (speedVariationMax - speedVariationMin));
              if (monster.facing === 'right') {
                newMonsterVelocity.x = baseSpeed * speedMultiplier * speedVariation;
              } else {
                newMonsterVelocity.x = -baseSpeed * speedMultiplier * speedVariation;
              }
            }
          } else {
            // Standard patrol AI for other monsters
            const baseSpeed = GAME_CONSTANTS.MONSTER_SPEED[monster.type];
            if (monster.position.x <= monster.patrolStart && monster.velocity.x < 0) {
              // Hit left boundary while moving left - turn right
              newMonsterVelocity.x = baseSpeed;
              monster.facing = 'right';
            } else if (monster.position.x >= monster.patrolEnd && monster.velocity.x > 0) {
              // Hit right boundary while moving right - turn left
              newMonsterVelocity.x = -baseSpeed;
              monster.facing = 'left';
            } else {
              // Continue moving in current direction
              if (monster.facing === 'right') {
                newMonsterVelocity.x = baseSpeed;
              } else {
                newMonsterVelocity.x = -baseSpeed;
              }
            }
          }
        } else {
          // Stop movement during hit stun or death
          newMonsterVelocity.x = 0;
        }

        // Apply gravity to monsters (but not to flying monsters with patrol areas)
        if (!monster.patrolArea) {
          newMonsterVelocity.y += GAME_CONSTANTS.GRAVITY;
        }
        newMonsterPosition.x += newMonsterVelocity.x;
        newMonsterPosition.y += newMonsterVelocity.y;

        // Platform collision for monsters (only for ground-based monsters)
        if (!monster.patrolArea) {
          const monsterCollision = checkPlatformCollision(newMonsterPosition, newMonsterVelocity);
          if (monsterCollision.position.y !== newMonsterPosition.y + newMonsterVelocity.y) {
            newMonsterVelocity.y = 0;
          }
          newMonsterPosition = monsterCollision.position;
        }

        // Boundary checking for monsters
        newMonsterPosition.x = Math.max(0, Math.min(newState.levelWidth - 32, newMonsterPosition.x));

        // Handle burning
        let updatedMonster = {
          ...monster,
          position: newMonsterPosition,
          velocity: newMonsterVelocity,
          isHit,
          hitStunTimer,
        };

        // Debug logging for Elite Wyvern only
        const isEliteWyvern = debugMode && monster.type === 'wyvern_elite';

        // Handle monster shooting (for dragons and other shooters)
        if (monster.isAlive && !monster.isDying && !isHit && monster.projectiles && monster.projectiles.length > 0) {
          // Select a projectile to check for shooting (use first one for timing)
          const primaryProjectile = monster.projectiles[0];
          const shootCooldown = primaryProjectile.cooldown || 120;
          const shootRange = primaryProjectile.range || 300;
          
          const shootTimer = (monster.shootTimer || 0) + 1;
          updatedMonster.shootTimer = shootTimer;
          
          if (isEliteWyvern) {
            debugLog(`🔍 Elite Wyvern ${monster.id}: Shoot timer: ${shootTimer}/${shootCooldown}`);
          }
          
          if (shootTimer >= shootCooldown) {
            // Check if player is within range
            const distanceToPlayer = Math.abs(updatedMonster.position.x - newState.player.position.x);
            
            if (isEliteWyvern) {
              debugLog(`🔍 Elite Wyvern ${monster.id}: Player distance: ${distanceToPlayer}, shoot range: ${shootRange}`);
            }
            
            if (distanceToPlayer <= shootRange) {
              if (isEliteWyvern) {
                debugLog(`🎯 Elite Wyvern ${monster.id}: Player in range, attempting to shoot`);
              }
              
              // Advanced AI shooting behavior
              if (monster.ai) {
                const playerDirection = newState.player.position.x > updatedMonster.position.x ? 'right' : 'left';
                const turnChance = monster.ai.turnTowardsPlayerChance || 0.3;
                
                if (isEliteWyvern) {
                  debugLog(`🔍 Elite Wyvern ${monster.id}: Player direction: ${playerDirection}, wyvern facing: ${updatedMonster.facing}`);
                }
                
                // If not facing player, have a chance to turn towards player
                if (updatedMonster.facing !== playerDirection && Math.random() < turnChance) {
                  updatedMonster.facing = playerDirection;
                  // Adjust velocity to match new facing direction
                  const baseSpeed = GAME_CONSTANTS.MONSTER_SPEED[monster.type];
                  const speedBoostRange = monster.ai.speedBoostRange || 150;
                  const speedBoostMultiplier = monster.ai.speedBoostMultiplier || 1.2;
                  const distanceToPlayerForSpeed = Math.abs(monster.position.x - newState.player.position.x);
                  const speedBoost = distanceToPlayerForSpeed < speedBoostRange ? speedBoostMultiplier : 1.0;
                  newMonsterVelocity.x = playerDirection === 'right' ? 
                    baseSpeed * speedBoost :
                    -baseSpeed * speedBoost;
                }
                
                // Check shooting conditions - for flying monsters, allow angular shooting
                let canShoot = true;
                let shootFailReason = '';
                
                if (monster.ai.requireFacingToShoot) {
                  if (monster.isFlying) {
                    // Flying monsters can shoot at angles as long as player is in the forward direction
                    const playerInForwardDirection = (updatedMonster.facing === 'right' && newState.player.position.x > updatedMonster.position.x) ||
                                                   (updatedMonster.facing === 'left' && newState.player.position.x < updatedMonster.position.x);
                    canShoot = playerInForwardDirection;
                    if (!canShoot) {
                      shootFailReason = `player not in forward direction (facing ${updatedMonster.facing}, player at x=${newState.player.position.x}, wyvern at x=${updatedMonster.position.x})`;
                    }
                  } else {
                    // Ground monsters require exact facing
                    const facingPlayer = (updatedMonster.facing === 'right' && newState.player.position.x > updatedMonster.position.x) ||
                                       (updatedMonster.facing === 'left' && newState.player.position.x < updatedMonster.position.x);
                    canShoot = facingPlayer;
                    if (!canShoot) {
                      shootFailReason = `not facing player exactly (facing ${updatedMonster.facing}, player at x=${newState.player.position.x}, wyvern at x=${updatedMonster.position.x})`;
                    }
                  }
                  
                  if (!canShoot && isEliteWyvern) {
                    debugLog(`❌ Elite Wyvern ${monster.id}: NOT shooting - ${shootFailReason}`);
                    return updatedMonster;
                  }
                }
              }
              
              // Get projectile configuration from weapons.json
              try {
                if (isEliteWyvern) {
                  debugLog(`🔍 Elite Wyvern ${monster.id}: Trying to load projectile config for monster projectiles:`, monster.projectiles);
                }
                
                // Check if game config is loaded before trying to access it
                if (!dataLoader.isConfigLoaded()) {
                  if (isEliteWyvern) {
                    debugLog(`❌ Elite Wyvern ${monster.id}: NOT shooting - game configuration not loaded yet`);
                  }
                  return updatedMonster;
                }
                
                const gameConfig = dataLoader.getGameConfig();
                
                if (isEliteWyvern) {
                  debugLog(`🔍 Elite Wyvern ${monster.id}: Game config loaded, checking weaponTypes:`, Object.keys(gameConfig.weaponTypes));
                }
                
                // Select a projectile from the projectiles array (could be random based on weight)
                let selectedProjectile = monster.projectiles[0]; // Default to first projectile
                
                // If multiple projectiles, select based on weight (simple random selection for now)
                if (monster.projectiles.length > 1) {
                  const totalWeight = monster.projectiles.reduce((sum, proj) => sum + proj.weight, 0);
                  let random = Math.random() * totalWeight;
                  
                  for (const projectile of monster.projectiles) {
                    random -= projectile.weight;
                    if (random <= 0) {
                      selectedProjectile = projectile;
                      break;
                    }
                  }
                }
                
                const weaponConfig = gameConfig.weaponTypes[selectedProjectile.type];
                
                if (isEliteWyvern) {
                  debugLog(`🔍 Elite Wyvern ${monster.id}: Selected projectile '${selectedProjectile.type}', weapon config:`, weaponConfig);
                }
                
                if (weaponConfig?.projectile) {
                  if (isEliteWyvern) {
                    debugLog(`🎯 Elite Wyvern ${monster.id}: FIRING ${selectedProjectile.type} projectile!`);
                  }
                  
                  const projectileConfig = weaponConfig.projectile;
                  
                  // Calculate launch position using offset from selected projectile
                  const launchOffset = selectedProjectile.launchOffset || { x: 0.5, y: 0.5 };
                  const spriteWidth = monster.size?.width || 32;
                  const spriteHeight = monster.size?.height || 40;
                  
                  // For PNG sprites, we scale them 2x, so adjust calculations
                  const actualWidth = monster.spriteType === 'png' ? spriteWidth * 2 : spriteWidth;
                  const actualHeight = monster.spriteType === 'png' ? spriteHeight * 2 : spriteHeight;
                  
                  const launchX = updatedMonster.position.x + (launchOffset.x * actualWidth);
                  const launchY = updatedMonster.position.y + (launchOffset.y * actualHeight);
                  
                  // Calculate projectile velocity
                  let projectileVelX, projectileVelY;
                  
                  if (monster.isFlying) {
                    // Flying monsters shoot at an angle towards the player
                    const deltaX = newState.player.position.x + 16 - launchX; // Target player center
                    const deltaY = newState.player.position.y + 24 - launchY; // Target player center
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    
                    // Normalize the direction vector and apply projectile speed
                    const normalizedX = deltaX / distance;
                    const normalizedY = deltaY / distance;
                    
                    projectileVelX = normalizedX * projectileConfig.speed;
                    projectileVelY = normalizedY * projectileConfig.speed;
                  } else {
                    // Ground monsters shoot horizontally
                    const direction = updatedMonster.facing === 'right' ? 1 : -1;
                    projectileVelX = direction * projectileConfig.speed;
                    projectileVelY = 0;
                  }
                  
                  const newProjectile: Projectile = {
                    id: `${projectileConfig.type}_${monster.id}_${Date.now()}`,
                    type: projectileConfig.type as 'arrow' | 'fire' | 'frost' | 'whirlwind',
                    position: {
                      x: launchX,
                      y: launchY
                    },
                    velocity: { 
                      x: projectileVelX, 
                      y: projectileVelY 
                    },
                    damage: weaponConfig.damage,
                    isActive: true,
                    facing: updatedMonster.facing, // Preserve facing for sprite rendering
                    source: 'monster',
                    ownerId: monster.id
                  };
                  
                  newState.projectiles = [...newState.projectiles, newProjectile];
                  updatedMonster.shootTimer = 0; // Reset cooldown
                  
                  if (isEliteWyvern) {
                    debugLog(`✅ Elite Wyvern ${monster.id}: Projectile created and added to game state`);
                  }
                } else {
                  if (isEliteWyvern) {
                    debugLog(`❌ Elite Wyvern ${monster.id}: NOT shooting - no projectile config found for ${selectedProjectile.type}. WeaponConfig:`, weaponConfig);
                  }
                }
              } catch (error) {
                if (isEliteWyvern) {
                  debugLog(`❌ Elite Wyvern ${monster.id}: NOT shooting - error loading projectile config:`, error);
                  if (error instanceof Error) {
                    debugLog(`❌ Elite Wyvern ${monster.id}: Error details:`, {
                      name: error.name,
                      message: error.message,
                      stack: error.stack
                    });
                  }
                }
              }
            } else {
              if (isEliteWyvern) {
                debugLog(`❌ Elite Wyvern ${monster.id}: NOT shooting - player out of range (distance: ${distanceToPlayer}, range: ${shootRange})`);
              }
            }
          } else {
            // Elite Wyvern cooldown check - only log every 60 frames to avoid spam
            if (isEliteWyvern && shootTimer % 60 === 0) {
              debugLog(`⏳ Elite Wyvern ${monster.id}: Cooldown not ready (${shootTimer}/${shootCooldown})`);
            }
          }
        } else {
          // Check why Elite Wyvern can't shoot at all
          if (isEliteWyvern) {
            const reasons = [];
            if (!monster.isAlive) reasons.push('not alive');
            if (monster.isDying) reasons.push('dying');
            if (isHit) reasons.push('hit stunned');
            if (!monster.projectiles || monster.projectiles.length === 0) reasons.push('no projectiles');
            
            if (reasons.length > 0) {
              debugLog(`❌ Elite Wyvern ${monster.id}: Cannot shoot - ${reasons.join(', ')}`);
            }
          }
        }

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
          
          // Skip collision if projectile was fired by this monster
          if (projectile.source === 'monster' && projectile.ownerId === monster.id) {
            return monster;
          }
          
          // Skip collision if projectile is from monster and this is a different monster
          if (projectile.source === 'monster' && projectile.ownerId !== monster.id) {
            return monster;
          }
          
          // Only player projectiles should hit monsters
          if (projectile.source !== 'player') {
            return monster;
          }

          const monsterCollisionSize = getMonsterCollisionSize(monster);

          if (checkCollision(
            projectile.position,
            { width: 16, height: 2 },
            monster.position,
            monsterCollisionSize
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

      // Check projectile-player collisions (for monster projectiles)
      newState.projectiles.forEach(projectile => {
        if (!projectile.isActive || projectile.source !== 'monster') return;

        // Check if player is protected by castle gate
        if (isPlayerProtectedByGate(newState.player.position, projectile.position, newState.castleGate)) {
          return; // Player is protected, skip collision
        }

        if (checkCollision(
          projectile.position,
          { width: 16, height: 2 },
          newState.player.position,
          { width: 32, height: 48 }
        )) {
          // Mark projectile as inactive
          projectile.isActive = false;
          
          // Damage player if not invulnerable (regular or permanent)
          if (!newState.player.isInvulnerable && !newState.player.isPermanentlyInvulnerable) {
            const newHealth = Math.max(0, newState.player.health - projectile.damage);
            newState.player = {
              ...newState.player,
              health: newHealth,
              isInvulnerable: true,
              invulnerabilityTimer: 120 // 2 seconds at 60fps
            };
          }
        }
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
        if (!monster.isAlive || newState.player.isInvulnerable || newState.player.isPermanentlyInvulnerable) return;

        // Check if player is protected by castle gate
        if (isPlayerProtectedByGate(newState.player.position, monster.position, newState.castleGate)) {
          return; // Player is protected, skip collision
        }

        const monsterCollisionSize = getMonsterCollisionSize(monster);

        if (checkCollision(
          newState.player.position,
          { width: 32, height: 48 },
          monster.position,
          monsterCollisionSize
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
        if (newState.currentLevel === getMaxLevel()) {
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

      // Filter out inactive projectiles
      newState.projectiles = newState.projectiles.filter(projectile => projectile.isActive);

      return newState;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.gameStatus, gameDataLoaded, checkPlatformCollision, checkCollision, isPaused]);

  // Start game loop
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && gameDataLoaded) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop, gameState.gameStatus, gameDataLoaded, isPaused]);

  // JSON reload function for debug mode
  const reloadGameConfiguration = useCallback(async () => {
    if (!debugMode) return;
    
    try {
      debugLog('Reloading game configuration...');
      const gameConfig = await dataLoader.reloadGameConfig();
      
      // Reinitialize the game constants from reloaded JSON data
      initializeGameConstants(
        gameConfig.gameConstants,
        gameConfig.monsterTypes,
        gameConfig.weaponTypes,
        gameConfig.platformTypes
      );
      
      debugLog('Game configuration reloaded successfully!');
      
      // Optionally reload the current level with new data
      setGameState(prev => {
        const currentLevel = createLevel(prev.currentLevel);
        return {
          ...prev,
          levelWidth: currentLevel.width,
          monsters: currentLevel.monsters,
          platforms: currentLevel.platforms,
          loot: currentLevel.loot,
          castleGate: currentLevel.castleGate,
          // Clear active projectiles and effects since they might use old config
          projectiles: [],
          magicEffects: []
        };
      });
      
    } catch (error) {
      console.error('Failed to reload game configuration:', error);
    }
  }, [debugMode]);

  // Handle input for attacks and magic
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      switch (key) {
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
        case 'c':
          castMagic('cure');
          break;
        case 'x':
          if (debugMode) {
            nextLevel();
          }
          break;
        case 'i':
          if (debugMode) {
            // Toggle permanent invulnerability in debug mode
            setGameState(prev => ({
              ...prev,
              player: {
                ...prev.player,
                isPermanentlyInvulnerable: !prev.player.isPermanentlyInvulnerable
              }
            }));
          }
          break;
        case 'j':
          if (debugMode) {
            // Reload JSON configuration in debug mode
            reloadGameConfiguration();
          }
          break;
        case 'd':
          // Toggle debug mode with D key
          setDebugMode(prev => !prev);
          break;
        case 'p':
          if (debugMode) {
            // Toggle pause in debug mode
            setIsPaused(prev => !prev);
          }
          break;
        case 'm':
          if (debugMode) {
            // Refill MP to max in debug mode
            setGameState(prev => ({
              ...prev,
              player: {
                ...prev.player,
                magic: prev.player.maxMagic
              }
            }));
          }
          break;
        case 'o':
          if (debugMode) {
            // Toggle mobile emulation in debug mode
            setMobileEmulation(prev => !prev);
          }
          break;
        case 'r':
          restartGame();
          break;
        case 'f':
          if (debugMode) {
            // Toggle fullscreen mode
            if (document.fullscreenElement) {
              document.exitFullscreen().catch(console.error);
            } else {
              document.documentElement.requestFullscreen().catch(console.error);
            }
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleAttack, switchWeapon, castMagic, reloadGameConfiguration]);

  // Level progression
  const nextLevel = useCallback(() => {
    debugLog('nextLevel called, gameDataLoaded:', gameDataLoaded);
    if (!gameDataLoaded) return;
    
    setGameState(prev => {
      if (!prev) return prev;
      
      const nextLevelNum = prev.currentLevel + 1;
      const maxLevel = getMaxLevel();
      
      debugLog('Current level:', prev.currentLevel, 'Next level:', nextLevelNum, 'Max level:', maxLevel);
      
      // Check if next level exists
      if (nextLevelNum > maxLevel) {
        debugLog('No more levels available');
        return prev; // No more levels
      }
      
      if (!levelExists(nextLevelNum)) {
        console.warn(`Level ${nextLevelNum} not found in configuration`);
        return prev;
      }

      debugLog('Creating level:', nextLevelNum);
      const newLevel = createLevel(nextLevelNum);

      return {
        ...prev,
        currentLevel: nextLevelNum,
        levelWidth: newLevel.width,
        monsters: newLevel.monsters,
        platforms: newLevel.platforms,
        loot: newLevel.loot,
        castleGate: newLevel.castleGate,
        gameStatus: 'playing',
        player: {
          ...prev.player,
          position: newLevel.playerStartPosition || { x: 50, y: 452 },
          velocity: { x: 0, y: 0 },
          isOnGround: true,
          canJump: true,
          isJumping: false,
          jumpStartTime: 0,
          jumpHeldTime: 0,
        },
        projectiles: [],
        magicEffects: [],
      };
    });
  }, [gameDataLoaded]);

  const restartGame = useCallback(() => {
    if (!gameDataLoaded) return;
    
    // Preserve debug state
    const preserveDebugMode = debugMode;
    const preserveInvulnerability = gameState.player.isPermanentlyInvulnerable;
    
    const level1 = createLevel(1);
    setGameState({
      player: {
        position: level1.playerStartPosition || { x: 50, y: 452 },
        velocity: { x: 0, y: 0 },
        health: 100,
        maxHealth: 100,
        magic: 100,
        maxMagic: 100,
        coins: 0,
        weapon: 'sword',
        facing: 'right',
        isAttacking: false,
        isCasting: false,
        isOnGround: true,
        isAlive: true,
        canJump: true,
        isInvulnerable: false,
        invulnerabilityTimer: 0,
        isPermanentlyInvulnerable: preserveInvulnerability, // Preserve debug invulnerability
        isJumping: false,
        jumpStartTime: 0,
        jumpHeldTime: 0,
      },
      monsters: level1.monsters,
      platforms: level1.platforms,
      loot: level1.loot,
      projectiles: [],
      magicEffects: [],
      castleGate: level1.castleGate,
      currentLevel: 1,
      levelWidth: level1.width,
      gameStatus: 'playing',
      cameraOffset: { x: 0, y: 0 },
    });
    
    // Restore debug mode state
    setDebugMode(preserveDebugMode);
  }, [gameDataLoaded, debugMode, gameState.player.isPermanentlyInvulnerable]);

  return (
    <>
      {/* Loading state */}
      {!gameDataLoaded && !gameDataError && (
        <div className="game-loading">
          <h2>Loading Game Data...</h2>
          <p>Please wait while we load the game configuration.</p>
        </div>
      )}

      {/* Error state */}
      {gameDataError && (
        <div className="game-error">
          <h2>Failed to Load Game</h2>
          <p>{gameDataError}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {/* Game content - only render when data is loaded and game state is initialized */}
      {gameDataLoaded && !gameDataError && (
        <div 
          className={`game-container ${isMobile ? 'mobile' : ''}`}
          style={{
            transform: isMobile 
              ? `translate(-50%, -50%) scale(${calculateMobileScale()}) translate(${screenShake.x}px, ${screenShake.y}px)`
              : `translate(${screenShake.x}px, ${screenShake.y}px)`,
            transition: screenShake.x === 0 && screenShake.y === 0 ? 'transform 0.1s ease-out' : 'none',
            transformOrigin: 'center center'
          }}
        >
      <Background 
        cameraOffset={gameState.cameraOffset}
        currentLevel={gameState.currentLevel}
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

      {isPaused && debugMode && (
        <div className="pause-overlay" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 1000
        }}>
          PAUSED
          <div style={{ fontSize: '14px', marginTop: '10px' }}>Press P to resume</div>
        </div>
      )}

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

      {debugMode && (
        <div className="debug-info">
          <div>DEBUG MODE - D to toggle | {isPaused ? 'PAUSED' : 'RUNNING'}</div>
          <div>X = Skip Level | C = Cure | I = Toggle Invulnerability | J = Reload JSON | P = Pause | M = Refill MP | O = Mobile Emulation | F = Fullscreen | Current Level: {gameState.currentLevel}</div>
          <div>Player Velocity: X={gameState.player.velocity.x.toFixed(2)}, Y={gameState.player.velocity.y.toFixed(2)}</div>
          <div>Permanent Invulnerability: {gameState.player.isPermanentlyInvulnerable ? 'ON' : 'OFF'}</div>
          <div>Mobile Mode: {isMobile ? 'ON' : 'OFF'} {mobileEmulation ? '(EMULATED)' : ''}</div>
          {isMobile && <div>Orientation: {document.body.classList.contains('landscape-mode') ? 'LANDSCAPE' : document.body.classList.contains('portrait-mode') ? 'PORTRAIT' : 'UNKNOWN'} | Fullscreen: {isFullscreen ? 'YES' : 'NO'}</div>}
          {isMobile && <div>Touch Controls: Tap left/right quarters to move, double-tap to jump</div>}
          <div>Projectiles: {gameState.projectiles.length} | Monsters: {gameState.monsters.filter(m => m.isAlive).length}</div>
          <div>Ice Dragons: {gameState.monsters.filter(m => m.type === 'ice_dragon' && m.isAlive).length}</div>
          <div>Debug state preserved on restart: YES</div>
          <div>
            Platform Friction: {(() => {
              const playerFootY = gameState.player.position.y + 48;
              const standingPlatform = gameState.platforms.find(platform => {
                return gameState.player.position.x + 16 >= platform.x && 
                       gameState.player.position.x + 16 <= platform.x + platform.width &&
                       Math.abs(playerFootY - platform.y) < 5;
              });
              return standingPlatform ? `${standingPlatform.type} (${GAME_CONSTANTS.PLATFORM_FRICTION[standingPlatform.type]})` : 'none (airborne)';
            })()}
          </div>
        </div>
      )}

      {/* Pause overlay */}
      {isPaused && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '20px',
          borderRadius: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 1000
        }}>
          GAME PAUSED
          <div style={{ fontSize: '14px', marginTop: '10px' }}>
            Press P to resume
          </div>
        </div>
      )}
        </div>
      )}

      {/* Touch Overlay for mobile navigation */}
      <TouchOverlay
        onMove={handleTouchMove}
        onJump={handleTouchJump}
        isVisible={isMobile && gameDataLoaded && !gameDataError && gameState.gameStatus === 'playing'}
      />

      {/* Mobile Controls */}
      <MobileControls
        onAttack={handleMobileAttack}
        onSwitchWeapon={handleMobileSwitchWeapon}
        onCastMagic={handleMobileCastMagic}
        currentWeapon={gameState.player.weapon}
        isVisible={isMobile && gameDataLoaded && !gameDataError && gameState.gameStatus === 'playing'}
      />

      {/* Orientation Message for Mobile Portrait Mode */}
      {isMobile && !mobileEmulation && (
        <div className="orientation-message">
          <div>Please rotate your device to landscape mode for the best gaming experience!</div>
          <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
            This game is optimized for landscape orientation.
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
