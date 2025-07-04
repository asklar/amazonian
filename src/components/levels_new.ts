import { gameFactory, type GameLevel } from '../services/GameFactory';

// Legacy level creation functions for backward compatibility
// These now use the data-driven factory to create levels from JSON

export const createLevel1 = (): GameLevel => {
  return gameFactory.createLevel(1);
};

export const createLevel2 = (): GameLevel => {
  return gameFactory.createLevel(2);
};

export const createLevel3 = (): GameLevel => {
  return gameFactory.createLevel(3);
};

// Re-export the GameLevel interface for backward compatibility
export type { GameLevel } from '../services/GameFactory';
