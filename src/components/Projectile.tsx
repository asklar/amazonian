import React from 'react';
import type { Projectile as ProjectileType, Position } from './types';
import SpriteImage from './SpriteImage';
import { dataLoader } from '../services/DataLoader';

interface ProjectileProps {
  projectile: ProjectileType;
  cameraOffset: Position;
}

const Projectile: React.FC<ProjectileProps> = ({ projectile, cameraOffset }) => {
  if (!projectile.isActive) return null;

  const getProjectileConfig = () => {
    try {
      // Check if game config is available before trying to access it
      if (!dataLoader.isConfigLoaded()) {
        return null; // Gracefully handle when config is not loaded yet
      }
      
      const gameConfig = dataLoader.getGameConfig();
      
      if (projectile.type === 'arrow') {
        const bowConfig = gameConfig.weaponTypes.bow;
        return bowConfig?.projectile;
      }
      
      if (projectile.type === 'fire') {
        const fireConfig = gameConfig.weaponTypes.fire;
        return fireConfig?.projectile;
      }
      
      if (projectile.type === 'frost') {
        const frostConfig = gameConfig.weaponTypes.frost;
        return frostConfig?.projectile;
      }
      
      return null;
    } catch (error) {
      // Silent fallback when config is not available
      return null;
    }
  };

  const projectileConfig = getProjectileConfig();
  
  const style: React.CSSProperties = {
    left: projectile.position.x - cameraOffset.x,
    top: projectile.position.y - cameraOffset.y,
    // Flip projectile based on facing direction
    transform: projectile.facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
    // Set explicit size from config
    width: projectileConfig?.size?.width || (projectile.type === 'arrow' ? 16 : projectile.type === 'frost' ? 16 : 24),
    height: projectileConfig?.size?.height || (projectile.type === 'arrow' ? 4 : projectile.type === 'frost' ? 8 : 24),
    // Ensure projectiles render above other elements
    zIndex: 100,
    position: 'absolute',
  };

  const getProjectileSprite = (): string | undefined => {
    // Use sprite from config if available
    if (projectileConfig?.sprite) {
      return projectileConfig.sprite;
    }
    
    // Fallback sprites
    switch (projectile.type) {
      case 'arrow':
        return '/sprites/weapons/arrow.svg';
      case 'fire':
        return '/sprites/magic/fireball_new.svg';
      case 'frost':
        return '/sprites/weapons/frost_crystal.svg';
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
