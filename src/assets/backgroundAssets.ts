/**
 * Background Asset Manager for Amazonian Adventure Platformer
 * 
 * Manages parallax background elements for different levels
 */

// Base path for background sprites
const BACKGROUND_BASE_PATH = '/sprites/backgrounds';

// Background element definitions
export const BACKGROUND_ELEMENTS = {
  mountains: {
    distant: [
      `${BACKGROUND_BASE_PATH}/mountains_distant.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_distant_2.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_distant_3.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_distant_4.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_distant_5.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_distant_6.svg`,
    ],
    mid: [
      `${BACKGROUND_BASE_PATH}/mountains_mid.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_mid_2.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_mid_3.svg`,
      `${BACKGROUND_BASE_PATH}/mountains_mid_4.svg`,
    ],
  },
  castle: {
    distant: `${BACKGROUND_BASE_PATH}/castle_distant.svg`,
  },
  forest: {
    distant: `${BACKGROUND_BASE_PATH}/forest_distant.svg`,
  },
  water: {
    distant: `${BACKGROUND_BASE_PATH}/water_distant.svg`,
  },
  village: {
    distant: `${BACKGROUND_BASE_PATH}/village_distant.svg`,
  },
  ruins: {
    distant: `${BACKGROUND_BASE_PATH}/ruins_distant.svg`,
  },
  clouds: [
    `${BACKGROUND_BASE_PATH}/clouds.svg`,
    `${BACKGROUND_BASE_PATH}/clouds_wispy.svg`,
  ],
};

// Level-specific background configurations
export interface BackgroundLayer {
  element: string | string[]; // Can be a single element or array for random selection
  parallaxSpeed: number; // Multiplier for camera movement (0 = static, 1 = moves with camera)
  scale: number;
  opacity: number;
  yOffset: number; // Vertical offset from bottom of screen
  repeat?: boolean; // Whether to repeat horizontally
}

export interface LevelBackground {
  skyGradient: {
    top: string;
    bottom: string;
  };
  layers: BackgroundLayer[];
}

// Helper function to get a random element from array or return single element
export const getRandomBackgroundElement = (element: string | string[]): string => {
  if (Array.isArray(element)) {
    return element[Math.floor(Math.random() * element.length)];
  }
  return element;
};

// Background configurations for each level
export const LEVEL_BACKGROUNDS: Record<number, LevelBackground> = {
  1: {
    skyGradient: {
      top: '#87CEEB', // Sky blue
      bottom: '#FFA07A', // Light salmon (dawn)
    },
    layers: [
      {
        element: BACKGROUND_ELEMENTS.clouds,
        parallaxSpeed: 0.05,
        scale: 1.4,
        opacity: 0.4,
        yOffset: 220,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.1,
        scale: 1.8,
        opacity: 0.6,
        yOffset: 180,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.15,
        scale: 1.5,
        opacity: 0.7,
        yOffset: 160,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.mid,
        parallaxSpeed: 0.25,
        scale: 1.2,
        opacity: 0.8,
        yOffset: 120,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.forest.distant,
        parallaxSpeed: 0.4,
        scale: 1.0,
        opacity: 0.9,
        yOffset: 80,
        repeat: true,
      },
    ],
  },
  
  2: {
    skyGradient: {
      top: '#4169E1', // Royal blue
      bottom: '#FF6347', // Tomato (sunset)
    },
    layers: [
      {
        element: BACKGROUND_ELEMENTS.clouds,
        parallaxSpeed: 0.08,
        scale: 1.3,
        opacity: 0.5,
        yOffset: 240,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.12,
        scale: 1.9,
        opacity: 0.5,
        yOffset: 200,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.castle.distant,
        parallaxSpeed: 0.18,
        scale: 1.6,
        opacity: 0.7,
        yOffset: 180,
        repeat: false,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.22,
        scale: 1.4,
        opacity: 0.8,
        yOffset: 160,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.mid,
        parallaxSpeed: 0.35,
        scale: 1.1,
        opacity: 0.9,
        yOffset: 100,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.forest.distant,
        parallaxSpeed: 0.5,
        scale: 0.9,
        opacity: 0.8,
        yOffset: 60,
        repeat: true,
      },
    ],
  },
  
  3: {
    skyGradient: {
      top: '#2F4F4F', // Dark slate gray
      bottom: '#8B0000', // Dark red (ominous)
    },
    layers: [
      {
        element: BACKGROUND_ELEMENTS.clouds,
        parallaxSpeed: 0.05,
        scale: 1.8,
        opacity: 0.3,
        yOffset: 260,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.1,
        scale: 2.2,
        opacity: 0.4,
        yOffset: 220,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.castle.distant,
        parallaxSpeed: 0.15,
        scale: 1.8,
        opacity: 0.6,
        yOffset: 190,
        repeat: false,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.25,
        scale: 1.6,
        opacity: 0.7,
        yOffset: 160,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.mid,
        parallaxSpeed: 0.4,
        scale: 1.3,
        opacity: 0.8,
        yOffset: 120,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.mid,
        parallaxSpeed: 0.6,
        scale: 1.0,
        opacity: 0.9,
        yOffset: 80,
        repeat: true,
      },
    ],
  },
  
  4: {
    skyGradient: {
      top: '#87CEEB', // Sky blue
      bottom: '#F0E68C', // Khaki (lakeside atmosphere)
    },
    layers: [
      {
        element: BACKGROUND_ELEMENTS.clouds,
        parallaxSpeed: 0.08,
        scale: 1.2,
        opacity: 0.5,
        yOffset: 280,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.15,
        scale: 1.6,
        opacity: 0.7,
        yOffset: 200,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.village.distant,
        parallaxSpeed: 0.25,
        scale: 1.3,
        opacity: 0.8,
        yOffset: 160,
        repeat: false,
      },
      {
        element: BACKGROUND_ELEMENTS.water.distant,
        parallaxSpeed: 0.4,
        scale: 1.1,
        opacity: 0.9,
        yOffset: 80,
        repeat: true,
      },
    ],
  },
  
  5: {
    skyGradient: {
      top: '#696969', // Dim gray
      bottom: '#A0522D', // Sienna (dusty ruins)
    },
    layers: [
      {
        element: BACKGROUND_ELEMENTS.clouds,
        parallaxSpeed: 0.06,
        scale: 1.8,
        opacity: 0.3,
        yOffset: 260,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.2,
        scale: 1.5,
        opacity: 0.6,
        yOffset: 190,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.ruins.distant,
        parallaxSpeed: 0.35,
        scale: 1.4,
        opacity: 0.9,
        yOffset: 140,
        repeat: false,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.mid,
        parallaxSpeed: 0.5,
        scale: 1.1,
        opacity: 0.7,
        yOffset: 100,
        repeat: true,
      },
    ],
  },
  
  6: {
    skyGradient: {
      top: '#228B22', // Forest green
      bottom: '#ADFF2F', // Green yellow (lush valley)
    },
    layers: [
      {
        element: BACKGROUND_ELEMENTS.clouds,
        parallaxSpeed: 0.1,
        scale: 1.3,
        opacity: 0.6,
        yOffset: 270,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.mountains.distant,
        parallaxSpeed: 0.18,
        scale: 1.7,
        opacity: 0.8,
        yOffset: 220,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.forest.distant,
        parallaxSpeed: 0.3,
        scale: 1.5,
        opacity: 0.9,
        yOffset: 150,
        repeat: true,
      },
      {
        element: BACKGROUND_ELEMENTS.village.distant,
        parallaxSpeed: 0.4,
        scale: 1.2,
        opacity: 0.7,
        yOffset: 120,
        repeat: false,
      },
      {
        element: BACKGROUND_ELEMENTS.forest.distant,
        parallaxSpeed: 0.6,
        scale: 1.0,
        opacity: 0.8,
        yOffset: 60,
        repeat: true,
      },
    ],
  },
};

// Utility function to get background for current level
export const getBackgroundForLevel = (levelNumber: number): LevelBackground => {
  return LEVEL_BACKGROUNDS[levelNumber] || LEVEL_BACKGROUNDS[1];
};
