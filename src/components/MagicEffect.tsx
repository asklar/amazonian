import React from 'react';
import type { MagicEffect as MagicEffectType, Position } from './types';
import { GAME_CONSTANTS } from './types';

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

  const renderEffect = () => {
    if (effect.type === 'blaze') {
      // Show AoE range indicator for blaze spell
      const rangeStyle: React.CSSProperties = {
        ...style,
        left: effect.position.x - cameraOffset.x - GAME_CONSTANTS.MAGIC_RANGES.blaze / 2,
        top: effect.position.y - cameraOffset.y - GAME_CONSTANTS.MAGIC_RANGES.blaze / 2,
      };

      return (
        <>
          {/* AoE Range Circle */}
          <div 
            className="magic-effect blaze-range-indicator"
            style={rangeStyle}
          />
          {/* Main Blaze Effect */}
          <div 
            className={getClassName()}
            style={style}
          />
        </>
      );
    }

    return (
      <div 
        className={getClassName()}
        style={style}
      />
    );
  };

  return renderEffect();
};

export default MagicEffect;
