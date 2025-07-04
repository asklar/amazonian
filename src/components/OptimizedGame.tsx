import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState } from './types';
import { initializeGameConstants } from './types';
import { dataLoader } from '../services/DataLoader';
import { gameEngine } from '../engine/GameEngine';
import { debugLogger } from '../utils/debugLogger';
import { performanceMonitor } from '../utils/performanceMonitor';
import Player from './Player.tsx';
import MonsterComponent from './Monster.tsx';
import PlatformComponent from './Platform.tsx';
import LootComponent from './Loot.tsx';
import GameUI from './GameUI.tsx';
import Background from './Background.tsx';
import { createLevel } from './levels';

const OptimizedGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [debugMode, setDebugMode] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameDataLoaded, setGameDataLoaded] = useState<boolean>(false);
  const [gameDataError, setGameDataError] = useState<string | null>(null);

  const gameLoopRef = useRef<number | undefined>(undefined);
  const keysRef = useRef<Set<string>>(new Set());
  const lastFrameTimeRef = useRef<number>(0);

  // Sync debug mode with logger and performance monitor
  useEffect(() => {
    debugLogger.setDebugMode(debugMode);
    performanceMonitor.enable(debugMode);
  }, [debugMode]);

  // Initialize game data
  useEffect(() => {
    const initializeGameData = async () => {
      try {
        const gameConfig = await dataLoader.loadGameConfig();
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

  // Initialize game state once data is loaded
  useEffect(() => {
    if (gameDataLoaded) {
      const level1 = createLevel(1);
      const initialState: GameState = {
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
      };
      
      setGameState(initialState);
      gameEngine.setGameState(initialState);
      gameEngine.setRenderCallback(setGameState);
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

  // Optimized game loop - much simpler
  const gameLoop = useCallback((currentTime: number) => {
    if (!gameDataLoaded || isPaused || !gameState) {
      if (gameState?.gameStatus === 'playing') {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      }
      return;
    }

    // Calculate delta time
    const deltaTime = currentTime - lastFrameTimeRef.current;
    lastFrameTimeRef.current = currentTime;

    // Run optimized game engine update
    gameEngine.update(deltaTime, keysRef.current);

    // Update performance monitor
    performanceMonitor.update();

    // Continue loop
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameDataLoaded, isPaused, gameState]);

  // Start game loop
  useEffect(() => {
    if (gameState?.gameStatus === 'playing' && gameDataLoaded) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop, gameState?.gameStatus, gameDataLoaded]);

  // Debug controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      switch (key) {
        case 'd':
          setDebugMode(prev => !prev);
          break;
        case 'p':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!gameDataLoaded && !gameDataError) {
    return (
      <div className="game-loading">
        <h2>Loading Game Data...</h2>
        <p>Please wait while we load the game configuration.</p>
      </div>
    );
  }

  if (gameDataError) {
    return (
      <div className="game-error">
        <h2>Failed to Load Game</h2>
        <p>{gameDataError}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!gameState) {
    return <div>Initializing game...</div>;
  }

  return (
    <div className="game-container">
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
      
      {/* Only render visible monsters for performance */}
      {gameState.monsters
        .filter(monster => {
          const screenLeft = gameState.cameraOffset.x;
          const screenRight = screenLeft + 800;
          return monster.position.x >= screenLeft - 100 && monster.position.x <= screenRight + 100;
        })
        .map(monster => (
          <MonsterComponent 
            key={monster.id}
            monster={monster}
            cameraOffset={gameState.cameraOffset}
          />
        ))
      }
      
      {/* Only render visible platforms */}
      {gameState.platforms
        .filter(platform => {
          const screenLeft = gameState.cameraOffset.x;
          const screenRight = screenLeft + 800;
          return platform.x + platform.width >= screenLeft && platform.x <= screenRight;
        })
        .map(platform => (
          <PlatformComponent 
            key={platform.id}
            platform={platform}
            cameraOffset={gameState.cameraOffset}
          />
        ))
      }
      
      {/* Only render uncollected loot */}
      {gameState.loot
        .filter(loot => !loot.collected)
        .filter(loot => {
          const screenLeft = gameState.cameraOffset.x;
          const screenRight = screenLeft + 800;
          return loot.position.x >= screenLeft - 100 && loot.position.x <= screenRight + 100;
        })
        .map(loot => (
          <LootComponent 
            key={loot.id}
            loot={loot}
            cameraOffset={gameState.cameraOffset}
          />
        ))
      }

      {/* Debug overlay */}
      {debugMode && (
        <div className="debug-info" style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '10px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          <div>DEBUG MODE - D to toggle | P to pause</div>
          <div>FPS: {performanceMonitor.getFPS()} (avg: {performanceMonitor.getAverageFPS()}) - {performanceMonitor.getPerformanceReport().status}</div>
          <div>Player: X={Math.round(gameState.player.position.x)}, Y={Math.round(gameState.player.position.y)}</div>
          <div>Monsters visible: {gameState.monsters.filter(m => {
            const screenLeft = gameState.cameraOffset.x;
            const screenRight = screenLeft + 800;
            return m.position.x >= screenLeft - 100 && m.position.x <= screenRight + 100;
          }).length}</div>
          <div>Camera: X={Math.round(gameState.cameraOffset.x)}</div>
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
  );
};

export default OptimizedGame;
