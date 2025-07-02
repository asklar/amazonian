import React, { useMemo } from 'react';
import type { Position } from './types';
import { getBackgroundForLevel, getRandomBackgroundElement, type BackgroundLayer } from '../assets/backgroundAssets';

interface BackgroundProps {
  cameraOffset: Position;
  currentLevel: number;
}

const Background: React.FC<BackgroundProps> = ({ cameraOffset, currentLevel }) => {
  // Memoize the resolved background layers to prevent strobing
  const { skyGradient, resolvedLayers } = useMemo(() => {
    const backgroundConfig = getBackgroundForLevel(currentLevel);
    const layers = backgroundConfig.layers.map(layer => ({
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
    const repetitions = layer.repeat ? Math.ceil((screenWidth + Math.abs(parallaxOffset)) / 200) + 2 : 1;
    
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
        {Array.from({ length: repetitions }, (_, repIndex) => (
          <img
            key={repIndex}
            src={layer.element}
            alt={`Background layer ${index}`}
            style={{
              position: 'absolute',
              left: layer.repeat ? repIndex * 200 - 200 : '50%',
              transform: layer.repeat ? 'none' : 'translateX(-50%)',
              bottom: 0,
              imageRendering: 'pixelated',
              display: 'block',
            }}
            onError={(e) => {
              console.warn(`Failed to load background element: ${layer.element}`);
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
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
      {resolvedLayers.map((layer, index) => renderBackgroundLayer(layer, index))}
    </div>
  );
};

export default Background;
