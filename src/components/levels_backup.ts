import type { Monster, Platform, Loot, CastleGate } from './types';
import { GAME_CONSTANTS, createMonster } from './types';

interface Level {
  monsters: Monster[];
  platforms: Platform[];
  loot: Loot[];
  castleGate: CastleGate;
}

export const createLevel1 = (): Level => {
  return {
    monsters: [
      createMonster({
        id: 'goblin1',
        type: 'goblin',
        position: { x: 300, y: 420 },
        facing: 'right',
        patrolStart: 250,
        patrolEnd: 400
      }),
      createMonster({
        id: 'goblin2',
        type: 'goblin',
        position: { x: 800, y: 300 },
        facing: 'left',
        patrolStart: 750,
        patrolEnd: 900
      }),
      createMonster({
        id: 'orc1',
        type: 'orc',
        position: { x: 1200, y: 420 },
        facing: 'right',
        patrolStart: 1150,
        patrolEnd: 1300
      }),
      createMonster({
        id: 'goblin3',
        type: 'goblin',
        position: { x: 1600, y: 220 },
        facing: 'left',
        patrolStart: 1550,
        patrolEnd: 1700
      }),
      createMonster({
        id: 'skeleton1',
        type: 'skeleton',
        position: { x: 1900, y: 380 },
        facing: 'right',
        patrolStart: 1850,
        patrolEnd: 2000
      })
    ],
    platforms: [
      // Ground platforms
      { id: 'ground1', x: 0, y: 500, width: 2400, height: 100, type: 'grass' },
      
      // Lower platforms
      { id: 'platform1', x: 500, y: 400, width: 200, height: 20, type: 'stone' },
      { id: 'platform2', x: 250, y: 350, width: 150, height: 20, type: 'wood' },
      { id: 'platform3', x: 900, y: 350, width: 200, height: 20, type: 'stone' },
      
      // Mid-level platforms
      { id: 'platform4', x: 700, y: 280, width: 150, height: 20, type: 'wood' },
      { id: 'platform5', x: 1100, y: 250, width: 180, height: 20, type: 'stone' },
      { id: 'platform6', x: 1400, y: 320, width: 200, height: 20, type: 'grass' },
      
      // Higher platforms
      { id: 'platform7', x: 1550, y: 260, width: 200, height: 20, type: 'stone' },
      { id: 'platform8', x: 1800, y: 200, width: 150, height: 20, type: 'wood' },
      { id: 'platform9', x: 2000, y: 280, width: 180, height: 20, type: 'stone' },
      
      // Floating platforms for traversal
      { id: 'platform10', x: 400, y: 180, width: 100, height: 20, type: 'wood' },
      { id: 'platform11', x: 1000, y: 150, width: 120, height: 20, type: 'stone' },
      { id: 'platform12', x: 1650, y: 120, width: 100, height: 20, type: 'wood' },
    ],
    loot: [
      { id: 'coin1', type: 'coin', position: { x: 280, y: 320 }, collected: false },
      { id: 'health1', type: 'health', position: { x: 550, y: 370 }, collected: false },
      { id: 'coin2', type: 'coin', position: { x: 430, y: 150 }, collected: false },
      { id: 'magic1', type: 'magic', position: { x: 750, y: 250 }, collected: false },
      { id: 'coin3', type: 'coin', position: { x: 1050, y: 120 }, collected: false },
      { id: 'health2', type: 'health', position: { x: 1150, y: 220 }, collected: false },
      { id: 'coin4', type: 'coin', position: { x: 1450, y: 290 }, collected: false },
      { id: 'magic2', type: 'magic', position: { x: 1700, y: 90 }, collected: false },
      { id: 'coin5', type: 'coin', position: { x: 1850, y: 170 }, collected: false },
      { id: 'health3', type: 'health', position: { x: 2050, y: 250 }, collected: false },
    ],
    castleGate: {
      position: { x: 2200, y: 380 },
      isUnlocked: false,
    },
  };
};

export const createLevel2 = (): Level => {
  return {
    monsters: [
      {
        id: 'skeleton1',
        type: 'skeleton',
        position: { x: 400, y: 380 },
        velocity: { x: 1, y: 0 },
        health: 60,
        maxHealth: 60,
        facing: 'right',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 350,
        patrolEnd: 500,
      },
      {
        id: 'orc1',
        type: 'orc',
        position: { x: 750, y: 280 },
        velocity: { x: -1, y: 0 },
        health: 80,
        maxHealth: 80,
        facing: 'left',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 700,
        patrolEnd: 850,
      },
      {
        id: 'skeleton2',
        type: 'skeleton',
        position: { x: 1200, y: 180 },
        velocity: { x: 1, y: 0 },
        health: 60,
        maxHealth: 60,
        facing: 'right',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 1150,
        patrolEnd: 1300,
      },
      {
        id: 'dragon1',
        type: 'dragon',
        position: { x: 1600, y: 380 },
        velocity: { x: -1, y: 0 },
        health: 120,
        maxHealth: 120,
        facing: 'left',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 1550,
        patrolEnd: 1750,
      },
      {
        id: 'orc2',
        type: 'orc',
        position: { x: 2000, y: 220 },
        velocity: { x: 1, y: 0 },
        health: 80,
        maxHealth: 80,
        facing: 'right',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 1950,
        patrolEnd: 2100,
      },
    ],
    platforms: [
      // Ground platforms
      { id: 'ground2', x: 0, y: 500, width: 2400, height: 100, type: 'stone' },
      
      // Multi-level stone fortress design
      { id: 'platform4', x: 300, y: 420, width: 250, height: 20, type: 'stone' },
      { id: 'platform5', x: 650, y: 320, width: 300, height: 20, type: 'stone' },
      { id: 'platform6', x: 1050, y: 220, width: 350, height: 20, type: 'stone' },
      
      // Elevated platforms
      { id: 'platform7', x: 200, y: 280, width: 180, height: 20, type: 'stone' },
      { id: 'platform8', x: 500, y: 180, width: 200, height: 20, type: 'stone' },
      { id: 'platform9', x: 1500, y: 280, width: 300, height: 20, type: 'stone' },
      { id: 'platform10', x: 1900, y: 180, width: 250, height: 20, type: 'stone' },
      
      // High towers
      { id: 'platform11', x: 800, y: 120, width: 150, height: 20, type: 'stone' },
      { id: 'platform12', x: 1650, y: 120, width: 200, height: 20, type: 'stone' },
      
      // Connecting bridges
      { id: 'platform13', x: 1250, y: 380, width: 200, height: 20, type: 'wood' },
      { id: 'platform14', x: 1800, y: 320, width: 150, height: 20, type: 'wood' },
    ],
    loot: [
      { id: 'coin4', type: 'coin', position: { x: 350, y: 390 }, collected: false },
      { id: 'magic2', type: 'magic', position: { x: 550, y: 150 }, collected: false },
      { id: 'health2', type: 'health', position: { x: 800, y: 290 }, collected: false },
      { id: 'coin5', type: 'coin', position: { x: 1180, y: 190 }, collected: false },
      { id: 'magic3', type: 'magic', position: { x: 1700, y: 90 }, collected: false },
      { id: 'health3', type: 'health', position: { x: 1950, y: 150 }, collected: false },
      { id: 'coin6', type: 'coin', position: { x: 1300, y: 350 }, collected: false },
      { id: 'coin7', type: 'coin', position: { x: 850, y: 90 }, collected: false },
    ],
    castleGate: {
      position: { x: 2200, y: 380 },
      isUnlocked: false,
    },
  };
};

export const createLevel3 = (): Level => {
  return {
    monsters: [
      {
        id: 'dragon1',
        type: 'dragon',
        position: { x: 500, y: 380 },
        velocity: { x: 1, y: 0 },
        health: 120,
        maxHealth: 120,
        facing: 'right',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 450,
        patrolEnd: 650,
      },
      {
        id: 'orc1',
        type: 'orc',
        position: { x: 900, y: 280 },
        velocity: { x: -1, y: 0 },
        health: 80,
        maxHealth: 80,
        facing: 'left',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 850,
        patrolEnd: 1000,
      },
      {
        id: 'skeleton1',
        type: 'skeleton',
        position: { x: 1300, y: 180 },
        velocity: { x: 1, y: 0 },
        health: 60,
        maxHealth: 60,
        facing: 'right',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 1250,
        patrolEnd: 1400,
      },
      {
        id: 'dragon2',
        type: 'dragon',
        position: { x: 1700, y: 280 },
        velocity: { x: -1, y: 0 },
        health: 120,
        maxHealth: 120,
        facing: 'left',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 1650,
        patrolEnd: 1850,
      },
      {
        id: 'orc2',
        type: 'orc',
        position: { x: 2000, y: 120 },
        velocity: { x: 1, y: 0 },
        health: 80,
        maxHealth: 80,
        facing: 'right',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 1950,
        patrolEnd: 2100,
      },
      {
        id: 'dragon3',
        type: 'dragon',
        position: { x: 1100, y: 120 },
        velocity: { x: -1, y: 0 },
        health: 120,
        maxHealth: 120,
        facing: 'left',
        isAlive: true,
        isBurning: false,
        burnTimer: 0,
        patrolStart: 1050,
        patrolEnd: 1200,
      },
    ],
    platforms: [
      // Ground platforms
      { id: 'ground3', x: 0, y: 500, width: 2400, height: 100, type: 'stone' },
      
      // Complex multi-tier castle design
      { id: 'platform8', x: 400, y: 420, width: 300, height: 20, type: 'stone' },
      { id: 'platform9', x: 800, y: 320, width: 350, height: 20, type: 'stone' },
      { id: 'platform10', x: 1200, y: 220, width: 400, height: 20, type: 'stone' },
      { id: 'platform11', x: 1050, y: 160, width: 300, height: 20, type: 'stone' },
      { id: 'platform12', x: 1650, y: 320, width: 250, height: 20, type: 'stone' },
      
      // High towers and challenging jumps
      { id: 'platform13', x: 250, y: 280, width: 120, height: 20, type: 'stone' },
      { id: 'platform14', x: 550, y: 200, width: 150, height: 20, type: 'stone' },
      { id: 'platform15', x: 750, y: 120, width: 180, height: 20, type: 'stone' },
      { id: 'platform16', x: 1950, y: 160, width: 200, height: 20, type: 'stone' },
      
      // Narrow bridges for precision jumping
      { id: 'platform17', x: 720, y: 260, width: 60, height: 20, type: 'wood' },
      { id: 'platform18', x: 1170, y: 380, width: 80, height: 20, type: 'wood' },
      { id: 'platform19', x: 1500, y: 180, width: 100, height: 20, type: 'wood' },
      { id: 'platform20', x: 1850, y: 260, width: 80, height: 20, type: 'wood' },
    ],
    loot: [
      { id: 'coin6', type: 'coin', position: { x: 480, y: 390 }, collected: false },
      { id: 'health3', type: 'health', position: { x: 770, y: 90 }, collected: false },
      { id: 'magic4', type: 'magic', position: { x: 930, y: 290 }, collected: false },
      { id: 'coin7', type: 'coin', position: { x: 1320, y: 190 }, collected: false },
      { id: 'health4', type: 'health', position: { x: 1730, y: 290 }, collected: false },
      { id: 'magic5', type: 'magic', position: { x: 1200, y: 130 }, collected: false },
      { id: 'coin8', type: 'coin', position: { x: 1980, y: 130 }, collected: false },
      { id: 'magic6', type: 'magic', position: { x: 580, y: 170 }, collected: false },
      { id: 'health5', type: 'health', position: { x: 1520, y: 150 }, collected: false },
    ],
    castleGate: {
      position: { x: 2200, y: 380 },
      isUnlocked: false,
    },
  };
};
