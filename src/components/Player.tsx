import React from 'react';
import type { Player as PlayerType, Position } from './types';

interface PlayerProps {
  player: PlayerType;
  cameraOffset: Position;
}

const Player: React.FC<PlayerProps> = ({ player, cameraOffset }) => {
  const style: React.CSSProperties = {
    left: player.position.x - cameraOffset.x,
    top: player.position.y - cameraOffset.y,
  };

  const getWeaponComponent = () => {
    if (!player.isAttacking) return null;

    const facingClass = player.facing === 'left' ? 'facing-left' : 'facing-right';

    switch (player.weapon) {
      case 'sword':
        return <div className={`weapon sword ${facingClass}`} />;
      case 'bow':
        return <div className={`weapon bow ${facingClass}`} />;
      case 'whip':
        return <div className={`weapon whip ${facingClass}`} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`player ${player.facing === 'left' ? 'facing-left' : ''} ${player.isAttacking ? 'attacking' : ''} ${!player.isOnGround ? 'jumping' : ''} ${player.isInvulnerable ? 'invulnerable' : ''}`}
      style={style}
    >
      {getWeaponComponent()}
    </div>
  );
};

export default Player;
