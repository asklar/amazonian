import React from 'react';
import type { Loot as LootType, Position } from './types';
import SpriteImage from './SpriteImage';

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

  // Determine which sprite to use based on loot type
  const getLootSprite = (): string | undefined => {
    const basePath = '/sprites/loot';
    
    switch (loot.type) {
      case 'coin':
        return `${basePath}/coin_01.svg`;
      case 'health':
        return `${basePath}/health_potion_01.svg`;
      case 'magic':
        return `${basePath}/magic_potion_01.svg`;
      default:
        return undefined;
    }
  };

  const getClassName = () => {
    switch (loot.type) {
      case 'coin':
        return 'loot coin';
      case 'health':
        return 'loot health-potion';
      case 'magic':
        return 'loot magic-potion';
      default:
        return 'loot';
    }
  };

  return (
    <div 
      className={getClassName()}
      style={style}
    >
      <SpriteImage
        src={getLootSprite()}
        fallbackClassName={getClassName()}
        className=""
        alt={`${loot.type} loot`}
      />
    </div>
  );
};

export default Loot;
