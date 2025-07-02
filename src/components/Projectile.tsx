import React from 'react';
import type { Projectile as ProjectileType, Position } from './types';
import SpriteImage from './SpriteImage';

interface ProjectileProps {
  projectile: ProjectileType;
  cameraOffset: Position;
}

const Projectile: React.FC<ProjectileProps> = ({ projectile, cameraOffset }) => {
  if (!projectile.isActive) return null;

  const style: React.CSSProperties = {
    left: projectile.position.x - cameraOffset.x,
    top: projectile.position.y - cameraOffset.y,
  };

  const getProjectileSprite = (): string | undefined => {
    switch (projectile.type) {
      case 'arrow':
        return '/sprites/weapons/arrow.svg';
      default:
        return undefined;
    }
  };

  return (
    <div 
      className={`projectile ${projectile.type}`}
      style={style}
    >
      <SpriteImage
        src={getProjectileSprite()}
        fallbackClassName={`projectile ${projectile.type}`}
        alt={`${projectile.type} projectile`}
      />
    </div>
  );
};

export default Projectile;
