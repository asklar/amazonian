import React from 'react';
import type { CastleGate as CastleGateType, Position } from './types';
import SpriteImage from './SpriteImage';

interface CastleGateProps {
  castleGate: CastleGateType;
  cameraOffset: Position;
}

const CastleGate: React.FC<CastleGateProps> = ({ castleGate, cameraOffset }) => {
  const style: React.CSSProperties = {
    left: castleGate.position.x - cameraOffset.x,
    top: castleGate.position.y - cameraOffset.y,
    width: 80,
    height: 120,
    position: 'absolute',
    zIndex: 50, // Ensure gate renders above platforms but below UI
  };

  return (
    <div 
      className={`castle-gate ${castleGate.isUnlocked ? 'unlocked' : ''}`}
      style={style}
    >
      <SpriteImage
        src="/sprites/objects/castle_gate.svg"
        fallbackClassName="castle-gate-sprite"
        alt="Castle Gate"
        style={{
          width: '100%',
          height: '100%',
          filter: castleGate.isUnlocked ? 'brightness(1.2) hue-rotate(90deg)' : 'none',
          transition: 'filter 0.3s ease-in-out'
        }}
      />
      {castleGate.isUnlocked && (
        <div 
          className="gate-glow"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.6)',
            pointerEvents: 'none',
            borderRadius: '8px'
          }}
        />
      )}
    </div>
  );
};

export default CastleGate;
