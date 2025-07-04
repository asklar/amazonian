import React, { useMemo } from 'react';
import type { Position } from './types';
import { dataLoader } from '../services/DataLoader';

interface BackgroundLayer {
  element: string | string[];
  parallaxSpeed: number;
  scale: number;
  opacity: number;
  yOffset: number;
  repeat?: boolean;
}

interface BackgroundProps {
  cameraOffset: Position;
  currentLevel: number;
}

// Helper function to get a random element from array or return single element
const getRandomBackgroundElement = (element: string | string[]): string => {
  if (Array.isArray(element)) {
    return element[Math.floor(Math.random() * element.length)];
  }
  return element;
};



const Background: React.FC<BackgroundProps> = ({ cameraOffset, currentLevel }) => {
  // Memoize the resolved background layers to prevent strobing
  const { skyGradient, resolvedLayers } = useMemo(() => {
    const levelData = dataLoader.getLevelData(currentLevel);
    const backgroundConfig = levelData.background;
    const layers = backgroundConfig.layers.map((layer: BackgroundLayer) => ({
      ...layer,
      element: getRandomBackgroundElement(layer.element)
    }));
    
    return {
      skyGradient: backgroundConfig.skyGradient,
      resolvedLayers: layers
    };
  }, [currentLevel]); // Only recalculate when level changes

  const renderBackgroundLayer = (layer: BackgroundLayer & { element: string }, index: number) => {
    const parallaxOffset = -cameraOffset.x * layer.parallaxSpeed;
    const screenWidth = 800; // Game viewport width
    
    // Calculate how many repetitions we need for repeating layers
    const repetitions = layer.repeat ? Math.ceil((screenWidth + Math.abs(parallaxOffset)) / 200) + 3 : 1;
    
    // Create seeded random for consistent spacing per layer
    const seed = currentLevel * 1000 + index;
    const random = (i: number) => {
      const x = Math.sin(seed + i * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    
    return (
      <div
        key={index}
        className="background-layer"
        style={{
          position: 'absolute',
          bottom: layer.yOffset,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: layer.opacity,
          transform: `translateX(${parallaxOffset}px) scale(${layer.scale})`,
          transformOrigin: 'bottom left',
          zIndex: index,
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: repetitions }, (_, repIndex) => {
          // Add randomized spacing and flipping for mountains
          const isFlipped = layer.element.includes('mountain') && random(repIndex) > 0.5;
          const spacingVariation = layer.repeat ? random(repIndex + 100) * 100 - 50 : 0; // ±50px variation
          const basePosition = layer.repeat ? repIndex * 200 - 200 : 0;
          const finalPosition = basePosition + spacingVariation;
          
          // Add base path for background sprites
          const elementPath = `./sprites/backgrounds/${layer.element}`;
          
          return (
            <img
              key={repIndex}
              src={elementPath}
              alt={`Background layer ${index}`}
              style={{
                position: 'absolute',
                left: layer.repeat ? finalPosition : '50%',
                transform: layer.repeat 
                  ? (isFlipped ? 'scaleX(-1)' : 'none')
                  : 'translateX(-50%)',
                bottom: 0,
                imageRendering: 'pixelated',
                display: 'block',
              }}
              onError={(e) => {
                console.warn(`Failed to load background element: ${elementPath}`);
                e.currentTarget.style.display = 'none';
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="background-container">
      {/* Sky gradient */}
      <div 
        className="background-layer sky"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, ${skyGradient.top}, ${skyGradient.bottom})`,
          zIndex: -1,
        }}
      />
      
      {/* Render all background layers from back to front */}
      {resolvedLayers.map((layer: BackgroundLayer & { element: string }, index: number) => renderBackgroundLayer(layer, index))}
    </div>
  );
};

export default Background;
