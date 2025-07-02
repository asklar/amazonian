import React from 'react';
import type { Monster as MonsterType, Position } from './types';

interface MonsterProps {
  monster: MonsterType;
  cameraOffset: Position;
}

const Monster: React.FC<MonsterProps> = ({ monster, cameraOffset }) => {
  // Don't render if completely dead (after animation)
  if (!monster.isAlive && !monster.isDying) return null;

  const style: React.CSSProperties = {
    left: monster.position.x - cameraOffset.x,
    top: monster.position.y - cameraOffset.y,
  };

  const className = `monster ${monster.type} ${monster.facing === 'left' ? 'facing-left' : ''} ${monster.isBurning ? 'burning' : ''} ${monster.isDying ? 'dying' : ''} ${monster.isHit ? 'hit' : ''}`;

  return (
    <div 
      className={className}
      style={style}
    />
  );
};

export default Monster;
