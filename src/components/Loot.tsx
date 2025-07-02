import React from 'react';
import type { Loot as LootType, Position } from './types';

interface LootProps {
  loot: LootType;
  cameraOffset: Position;
}

const Loot: React.FC<LootProps> = ({ loot, cameraOffset }) => {
  if (loot.collected) return null;

  const style: React.CSSProperties = {
    left: loot.position.x - cameraOffset.x,
    top: loot.position.y - cameraOffset.y,
  };

  const getClassName = () => {
    switch (loot.type) {
      case 'coin':
        return 'loot coin';
      case 'health':
        return 'loot health-potion';
      case 'magic':
        return 'loot magic-scroll';
      default:
        return 'loot';
    }
  };

  return (
    <div 
      className={getClassName()}
      style={style}
    />
  );
};

export default Loot;
