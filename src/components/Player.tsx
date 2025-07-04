import React, { useEffect, useState } from 'react';
import type { Player as PlayerType, Position } from './types';
import SpriteImage from './SpriteImage';
import { useEntitySpriteAnimations } from '../hooks/useSpriteAnimation';

interface PlayerProps {
  player: PlayerType;
  cameraOffset: Position;
}

const Player: React.FC<PlayerProps> = ({ player, cameraOffset }) => {
  const [hasSvgSprite, setHasSvgSprite] = useState(false);
  
  const style: React.CSSProperties = {
    left: player.position.x - cameraOffset.x,
    top: player.position.y - cameraOffset.y,
    // Don't flip the entire player container, let individual elements handle their own flipping
  };

  // Define player animations
  const playerAnimations = useEntitySpriteAnimations({
    idle: {
      frames: [
        '/sprites/player/warrior_idle_01.svg',
        '/sprites/player/warrior_idle_02.svg',
      ],
      frameRate: 4,
      loop: true,
    },
    run: {
      frames: [
        '/sprites/player/warrior_run_01.svg',
        '/sprites/player/warrior_run_02.svg',
      ],
      frameRate: 8,
      loop: true,
    },
    jump: {
      frames: ['/sprites/player/warrior_jump_01.svg'],
      frameRate: 1,
      loop: false,
    },
    swordAttack: {
      frames: ['/sprites/player/warrior_attack_01.svg'],
      frameRate: 10,
      loop: false,
    },
    bowAttack: {
      frames: ['/sprites/player/warrior_bow_attack_01.svg'],
      frameRate: 10,
      loop: false,
    },
    whipAttack: {
      frames: ['/sprites/player/warrior_whip_attack_01.svg'],
      frameRate: 10,
      loop: false,
    },
    magicCast: {
      frames: ['/sprites/player/warrior_magic_cast_01.svg'],
      frameRate: 8,
      loop: false,
    },
  });

  // Update animation based on player state
  useEffect(() => {
    if (player.isCasting) {
      playerAnimations.playAnimation('magicCast');
    } else if (player.isAttacking) {
      // Choose animation based on weapon type
      switch (player.weapon) {
        case 'sword':
          playerAnimations.playAnimation('swordAttack');
          break;
        case 'bow':
          playerAnimations.playAnimation('bowAttack');
          break;
        case 'whip':
          playerAnimations.playAnimation('whipAttack');
          break;
        default:
          playerAnimations.playAnimation('swordAttack');
          break;
      }
    } else if (!player.isOnGround) {
      playerAnimations.playAnimation('jump');
    } else if (Math.abs(player.velocity.x) > 0.1) {
      playerAnimations.playAnimation('run');
    } else {
      playerAnimations.playAnimation('idle');
    }
  }, [player.isCasting, player.isAttacking, player.weapon, player.isOnGround, player.velocity.x, playerAnimations]);

  const getWeaponComponent = () => {
    if (!player.isAttacking) return null;

    const facingClass = player.facing === 'left' ? 'facing-left' : 'facing-right';
    const weaponStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 15,
      // Flip weapons when facing left
      transform: player.facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
    };

    switch (player.weapon) {
      case 'sword':
        return (
          <div className={`weapon sword ${facingClass}`} style={weaponStyle}>
            <SpriteImage
              src="./sprites/weapons/sword_horizontal.svg"
              fallbackClassName={`weapon sword ${facingClass}`}
              alt="sword"
            />
          </div>
        );
      case 'bow':
        return (
          <div className={`weapon bow ${facingClass}`} style={weaponStyle}>
            <SpriteImage
              src="./sprites/weapons/bow.svg"
              fallbackClassName={`weapon bow ${facingClass}`}
              alt="bow"
            />
          </div>
        );
      case 'whip':
        return (
          <div className={`weapon whip ${facingClass}`} style={weaponStyle}>
            <SpriteImage
              src="./sprites/weapons/whip.svg"
              fallbackClassName={`weapon whip ${facingClass}`}
              alt="whip"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const playerClassName = `player ${player.facing === 'left' ? 'facing-left' : ''} ${player.isAttacking ? 'attacking' : ''} ${!player.isOnGround ? 'jumping' : ''} ${player.isInvulnerable ? 'invulnerable' : ''} ${hasSvgSprite ? 'has-svg-sprite' : ''}`;

  return (
    <div 
      className={playerClassName}
      style={style}
    >
      <SpriteImage
        src={playerAnimations.getCurrentSprite()}
        fallbackClassName="player"
        className=""
        alt="Amazonian Warrior"
        onSpriteLoad={setHasSvgSprite}
        style={{
          transform: player.facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      />
      {getWeaponComponent()}
    </div>
  );
};

export default Player;
