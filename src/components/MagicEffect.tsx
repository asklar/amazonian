import React from 'react';
import type { MagicEffect as MagicEffectType, Position } from './types';

interface MagicEffectProps {
  effect: MagicEffectType;
  cameraOffset: Position;
}

const MagicEffect: React.FC<MagicEffectProps> = ({ effect, cameraOffset }) => {
  if (!effect.isActive) return null;

  const style: React.CSSProperties = {
    left: effect.position.x - cameraOffset.x,
    top: effect.position.y - cameraOffset.y,
  };

  const getClassName = () => {
    switch (effect.type) {
      case 'quake':
        return 'magic-effect quake-effect';
      case 'blaze':
        return 'magic-effect blaze-effect';
      case 'cure':
        return 'magic-effect cure-effect';
      default:
        return 'magic-effect';
    }
  };

  return (
    <div 
      className={getClassName()}
      style={style}
    />
  );
};

export default MagicEffect;
