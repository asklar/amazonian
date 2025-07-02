import type { Monster, Platform, Loot, CastleGate } from './types';
import { createMonster } from './types';

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
      createMonster({
        id: 'skeleton1',
        type: 'skeleton',
        position: { x: 400, y: 380 },
        facing: 'right',
        patrolStart: 350,
        patrolEnd: 500
      }),
      createMonster({
        id: 'orc1',
        type: 'orc',
        position: { x: 750, y: 280 },
        facing: 'left',
        patrolStart: 700,
        patrolEnd: 850
      }),
      createMonster({
        id: 'skeleton2',
        type: 'skeleton',
        position: { x: 1200, y: 180 },
        facing: 'right',
        patrolStart: 1150,
        patrolEnd: 1300
      }),
      createMonster({
        id: 'dragon1',
        type: 'dragon',
        position: { x: 1600, y: 380 },
        facing: 'left',
        patrolStart: 1550,
        patrolEnd: 1700
      }),
      createMonster({
        id: 'orc2',
        type: 'orc',
        position: { x: 2000, y: 220 },
        facing: 'right',
        patrolStart: 1950,
        patrolEnd: 2100
      })
    ],
    platforms: [
      // Ground and elevated platforms
      { id: 'ground1', x: 0, y: 500, width: 800, height: 100, type: 'grass' },
      { id: 'platform1', x: 600, y: 320, width: 300, height: 20, type: 'stone' },
      { id: 'platform2', x: 1000, y: 220, width: 400, height: 20, type: 'wood' },
      { id: 'ground2', x: 1500, y: 420, width: 900, height: 80, type: 'grass' },
      { id: 'platform3', x: 1800, y: 260, width: 400, height: 20, type: 'stone' },
      
      // Additional traversal platforms
      { id: 'platform4', x: 300, y: 250, width: 150, height: 20, type: 'wood' },
      { id: 'platform5', x: 1250, y: 120, width: 200, height: 20, type: 'stone' },
      { id: 'platform6', x: 800, y: 180, width: 120, height: 20, type: 'wood' },
    ],
    loot: [
      { id: 'magic1', type: 'magic', position: { x: 350, y: 220 }, collected: false },
      { id: 'coin1', type: 'coin', position: { x: 750, y: 250 }, collected: false },
      { id: 'health1', type: 'health', position: { x: 1300, y: 90 }, collected: false },
      { id: 'coin2', type: 'coin', position: { x: 1200, y: 150 }, collected: false },
      { id: 'magic2', type: 'magic', position: { x: 1900, y: 230 }, collected: false },
      { id: 'coin3', type: 'coin', position: { x: 2100, y: 190 }, collected: false },
    ],
    castleGate: {
      position: { x: 2200, y: 320 },
      isUnlocked: false,
    },
  };
};

export const createLevel3 = (): Level => {
  return {
    monsters: [
      createMonster({
        id: 'dragon1',
        type: 'dragon',
        position: { x: 500, y: 380 },
        facing: 'right',
        patrolStart: 450,
        patrolEnd: 600
      }),
      createMonster({
        id: 'orc1',
        type: 'orc',
        position: { x: 900, y: 280 },
        facing: 'left',
        patrolStart: 850,
        patrolEnd: 1000
      }),
      createMonster({
        id: 'skeleton1',
        type: 'skeleton',
        position: { x: 1300, y: 180 },
        facing: 'right',
        patrolStart: 1250,
        patrolEnd: 1400
      }),
      createMonster({
        id: 'dragon2',
        type: 'dragon',
        position: { x: 1700, y: 280 },
        facing: 'left',
        patrolStart: 1650,
        patrolEnd: 1800
      }),
      createMonster({
        id: 'orc2',
        type: 'orc',
        position: { x: 2000, y: 120 },
        facing: 'right',
        patrolStart: 1950,
        patrolEnd: 2100
      }),
      createMonster({
        id: 'dragon3',
        type: 'dragon',
        position: { x: 1100, y: 120 },
        facing: 'left',
        patrolStart: 1050,
        patrolEnd: 1200
      })
    ],
    platforms: [
      // Complex multi-level platform layout
      { id: 'ground1', x: 0, y: 500, width: 800, height: 100, type: 'grass' },
      { id: 'platform1', x: 700, y: 320, width: 400, height: 20, type: 'stone' },
      { id: 'platform2', x: 1200, y: 220, width: 300, height: 20, type: 'wood' },
      { id: 'platform3', x: 1000, y: 160, width: 300, height: 20, type: 'stone' },
      { id: 'ground2', x: 1600, y: 320, width: 800, height: 80, type: 'grass' },
      
      // Challenging traversal platforms
      { id: 'platform4', x: 400, y: 250, width: 150, height: 20, type: 'wood' },
      { id: 'platform5', x: 600, y: 180, width: 120, height: 20, type: 'stone' },
      { id: 'platform6', x: 850, y: 120, width: 200, height: 20, type: 'wood' },
      { id: 'platform7', x: 1450, y: 160, width: 150, height: 20, type: 'stone' },
      { id: 'platform8', x: 1800, y: 200, width: 200, height: 20, type: 'wood' },
    ],
    loot: [
      { id: 'health1', type: 'health', position: { x: 450, y: 220 }, collected: false },
      { id: 'magic1', type: 'magic', position: { x: 650, y: 150 }, collected: false },
      { id: 'coin1', type: 'coin', position: { x: 950, y: 90 }, collected: false },
      { id: 'health2', type: 'health', position: { x: 1350, y: 150 }, collected: false },
      { id: 'magic2', type: 'magic', position: { x: 1500, y: 130 }, collected: false },
      { id: 'coin2', type: 'coin', position: { x: 1900, y: 170 }, collected: false },
      { id: 'magic3', type: 'magic', position: { x: 2050, y: 90 }, collected: false },
    ],
    castleGate: {
      position: { x: 2200, y: 240 },
      isUnlocked: false,
    },
  };
};

export const levels = [createLevel1, createLevel2, createLevel3];
