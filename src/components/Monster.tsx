import React, { useState } from 'react';
import type { Monster as MonsterType, Position } from './types';
import SpriteImage from './SpriteImage';

interface MonsterProps {
  monster: MonsterType;
  cameraOffset: Position;
}

const Monster: React.FC<MonsterProps> = React.memo(({ monster, cameraOffset }) => {
  const [hasSvgSprite, setHasSvgSprite] = useState(false);
  
  // Don't render if completely dead (after animation)
  if (!monster.isAlive && !monster.isDying) return null;

  const style: React.CSSProperties = {
    left: monster.position.x - cameraOffset.x,
    top: monster.position.y - cameraOffset.y,
    transform: monster.facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
    // Scale PNG sprites to 2x size
    width: monster.spriteType === 'png' ? (monster.size?.width || 32) * 2 : (monster.size?.width || undefined),
    height: monster.spriteType === 'png' ? (monster.size?.height || 40) * 2 : (monster.size?.height || undefined),
  };

  // Determine which sprite to use based on monster state and type
  const getMonsterSprite = (): string | undefined => {
    // Use sprite information from monster configuration if available
    if (monster.sprites) {
      if (monster.isDying && monster.sprites.dying) {
        return monster.sprites.dying;
      } else if (monster.isHit && monster.sprites.hit) {
        return monster.sprites.hit;
      } else if (monster.sprites.idle) {
        return monster.sprites.idle;
      }
    }
    
    // Fallback to SVG sprites for backward compatibility
    const basePath = `/sprites/monsters`;
    
    if (monster.isDying) {
      return `${basePath}/${monster.type}_dying_01.svg`;
    } else if (monster.isHit) {
      return `${basePath}/${monster.type}_hit_01.svg`;
    } else {
      // Use available idle sprites
      if (monster.type === 'goblin') {
        return `${basePath}/goblin_idle_new.svg`; // Use the newer version if available
      }
      return `${basePath}/${monster.type}_idle_01.svg`;
    }
  };

  const className = `monster ${monster.type} ${monster.facing === 'left' ? 'facing-left' : ''} ${monster.isBurning ? 'burning' : ''} ${monster.isDying ? 'dying' : ''} ${monster.isHit ? 'hit' : ''} ${hasSvgSprite ? 'has-svg-sprite' : ''}`;

  return (
    <div 
      className={className}
      style={style}
    >
      <SpriteImage
        src={getMonsterSprite()}
        fallbackClassName={`monster ${monster.type}`}
        className=""
        alt={`${monster.type} monster`}
        onSpriteLoad={setHasSvgSprite}
      />
    </div>
  );
});

export default Monster;
