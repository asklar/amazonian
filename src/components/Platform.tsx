import React, { useState } from 'react';
import type { Platform as PlatformType, Position } from './types';
import { PLATFORM_SPRITES_SVG } from '../assets/svgSpriteAssets';

interface PlatformProps {
  platform: PlatformType;
  cameraOffset: Position;
}

const Platform: React.FC<PlatformProps> = React.memo(({ platform, cameraOffset }) => {
  const [hasSvgSprite, setHasSvgSprite] = useState(false);
  
  const style: React.CSSProperties = {
    left: platform.x - cameraOffset.x,
    top: platform.y - cameraOffset.y,
    width: platform.width,
    height: platform.height,
  };

  // Get the appropriate sprite paths based on platform type
  const getSpritePaths = () => {
    switch (platform.type) {
      case 'grass':
        const grassPath = PLATFORM_SPRITES_SVG.grass.center;
        const soilPath = PLATFORM_SPRITES_SVG.soil.center;
        console.log(`Grass platform sprite paths: grass=${grassPath}, soil=${soilPath}`);
        return { grass: grassPath, soil: soilPath };
      case 'stone':
        return { main: './sprites/platforms/stone_center.svg' }; // Fallback to CSS if SVG doesn't exist
      case 'wood':
        return { main: './sprites/platforms/wood_center.svg' }; // Fallback to CSS if SVG doesn't exist
      case 'ice':
        return { main: './sprites/platforms/ice_center.svg' }; // Ice platform sprite
      default:
        return {};
    }
  };

  const spritePaths = getSpritePaths();

  const platformStyle: React.CSSProperties = {
    ...style,
    ...(platform.type === 'grass' && spritePaths.grass && spritePaths.soil && hasSvgSprite ? {
      // For grass platforms: grass on top, soil below
      backgroundImage: `url(${spritePaths.grass}), url(${spritePaths.soil})`,
      backgroundSize: '16px 16px, 16px 16px',
      backgroundRepeat: 'repeat-x, repeat',
      backgroundPosition: 'top, 16px 0',
      imageRendering: 'pixelated',
    } : spritePaths.main && hasSvgSprite ? {
      // For other platforms: simple tile repeat
      backgroundImage: `url(${spritePaths.main})`,
      backgroundSize: '16px 16px',
      backgroundRepeat: 'repeat',
      imageRendering: 'pixelated',
    } : {})
  };

  return (
    <div 
      className={`platform ${platform.type}${hasSvgSprite ? ' has-svg-sprite' : ''}`}
      style={platformStyle}
    >
      {/* Load grass sprite for grass platforms */}
      {platform.type === 'grass' && spritePaths.grass && (
        <>
          <img 
            src={spritePaths.grass} 
            alt="grass platform top"
            onLoad={() => setHasSvgSprite(true)}
            onError={(e) => {
              console.error(`Failed to load grass sprite: ${spritePaths.grass}`, e);
              setHasSvgSprite(false);
            }}
            style={{ display: 'none' }}
          />
          <img 
            src={spritePaths.soil} 
            alt="soil platform fill"
            onError={(e) => {
              console.error(`Failed to load soil sprite: ${spritePaths.soil}`, e);
            }}
            style={{ display: 'none' }}
          />
        </>
      )}
      {/* Load single sprite for other platform types */}
      {platform.type !== 'grass' && spritePaths.main && (
        <img 
          src={spritePaths.main} 
          alt={`${platform.type} platform`}
          onLoad={() => setHasSvgSprite(true)}
          onError={(e) => {
            console.error(`Failed to load platform sprite: ${spritePaths.main}`, e);
            setHasSvgSprite(false);
          }}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
});

export default Platform;
