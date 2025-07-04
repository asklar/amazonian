import { gameFactory, type GameLevel } from '../services/GameFactory';
import { dataLoader } from '../services/DataLoader';

// Data-driven level creation - automatically supports any levels defined in JSON
export const createLevel = (levelId: number): GameLevel => {
  return gameFactory.createLevel(levelId);
};

// Get all available level IDs from the JSON data
export const getAvailableLevels = (): number[] => {
  try {
    const gameConfig = dataLoader.getGameConfig();
    console.log('Available levels from JSON:', gameConfig.levels.map(level => level.id));
    return gameConfig.levels.map(level => level.id).sort((a, b) => a - b);
  } catch (error) {
    console.warn('Game config not loaded yet, returning default levels', error);
    return [1, 2, 3]; // Fallback for backward compatibility
  }
};

// Get the maximum level number available
export const getMaxLevel = (): number => {
  const levels = getAvailableLevels();
  return Math.max(...levels);
};

// Check if a level exists
export const levelExists = (levelId: number): boolean => {
  const levels = getAvailableLevels();
  return levels.includes(levelId);
};

// Re-export the GameLevel interface for backward compatibility
export type { GameLevel } from '../services/GameFactory';
