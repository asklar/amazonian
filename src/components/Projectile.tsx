import React from 'react';
import type { Projectile as ProjectileType, Position } from './types';

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

  return (
    <div 
      className={`${projectile.type}`}
      style={style}
    />
  );
};

export default Projectile;
