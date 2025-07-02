import React from 'react';
import type { CastleGate as CastleGateType, Position } from './types';

interface CastleGateProps {
  castleGate: CastleGateType;
  cameraOffset: Position;
}

const CastleGate: React.FC<CastleGateProps> = ({ castleGate, cameraOffset }) => {
  const style: React.CSSProperties = {
    left: castleGate.position.x - cameraOffset.x,
    top: castleGate.position.y - cameraOffset.y,
  };

  return (
    <div 
      className={`castle-gate ${castleGate.isUnlocked ? 'unlocked' : ''}`}
      style={style}
    />
  );
};

export default CastleGate;
