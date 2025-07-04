import React from 'react';
import type { WeaponType, MagicType } from './types';

interface MobileControlsProps {
  onMove: (direction: 'left' | 'right' | null) => void;
  onJump: (pressed: boolean) => void;
  onAttack: () => void;
  onSwitchWeapon: (weapon: WeaponType) => void;
  onCastMagic: (spell: MagicType) => void;
  currentWeapon: WeaponType;
  isVisible: boolean;
}

const MobileControls: React.FC<MobileControlsProps> = ({
  onMove,
  onJump,
  onAttack,
  onSwitchWeapon,
  onCastMagic,
  currentWeapon,
  isVisible
}) => {
  if (!isVisible) return null;

  const handleMoveStart = (direction: 'left' | 'right') => (e: React.TouchEvent) => {
    e.preventDefault();
    console.log('Touch move start:', direction);
    onMove(direction);
  };

  const handleMoveEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    console.log('Touch move end');
    onMove(null);
  };

  const handleMouseMoveStart = (direction: 'left' | 'right') => (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Mouse move start:', direction);
    onMove(direction);
  };

  const handleMouseMoveEnd = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Mouse move end');
    onMove(null);
  };

  const handleJumpStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    console.log('Jump start');
    onJump(true);
  };

  const handleJumpEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    console.log('Jump end');
    onJump(false);
  };

  const handleAttackClick = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    console.log('Attack clicked');
    onAttack();
  };

  const handleWeaponClick = (weapon: WeaponType) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    console.log('Weapon clicked:', weapon);
    onSwitchWeapon(weapon);
  };

  const handleMagicClick = (spell: MagicType) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    console.log('Magic clicked:', spell);
    onCastMagic(spell);
  };

  return (
    <div className="mobile-controls">
      {/* Movement Controls */}
      <div className="movement-section">
        <div className="dpad">
          <button
            className="dpad-btn left"
            onTouchStart={handleMoveStart('left')}
            onTouchEnd={handleMoveEnd}
            onTouchCancel={handleMoveEnd}
            onMouseDown={handleMouseMoveStart('left')}
            onMouseUp={handleMouseMoveEnd}
            onMouseLeave={handleMouseMoveEnd}
          >
            ←
          </button>
          <button
            className="dpad-btn right"
            onTouchStart={handleMoveStart('right')}
            onTouchEnd={handleMoveEnd}
            onTouchCancel={handleMoveEnd}
            onMouseDown={handleMouseMoveStart('right')}
            onMouseUp={handleMouseMoveEnd}
            onMouseLeave={handleMouseMoveEnd}
          >
            →
          </button>
        </div>
        <button
          className="jump-btn"
          onTouchStart={handleJumpStart}
          onTouchEnd={handleJumpEnd}
          onTouchCancel={handleJumpEnd}
          onMouseDown={handleJumpStart}
          onMouseUp={handleJumpEnd}
          onMouseLeave={handleJumpEnd}
        >
          JUMP
        </button>
      </div>

      {/* Action Controls */}
      <div className="action-section">
        <button
          className="attack-btn"
          onTouchStart={handleAttackClick}
          onMouseDown={handleAttackClick}
        >
          ATTACK
        </button>
        
        {/* Weapon Selection */}
        <div className="weapon-section">
          <div className="weapon-label">Weapon:</div>
          <div className="weapon-buttons">
            <button
              className={`weapon-btn ${currentWeapon === 'sword' ? 'active' : ''}`}
              onTouchStart={handleWeaponClick('sword')}
              onMouseDown={handleWeaponClick('sword')}
            >
              ⚔️
            </button>
            <button
              className={`weapon-btn ${currentWeapon === 'bow' ? 'active' : ''}`}
              onTouchStart={handleWeaponClick('bow')}
              onMouseDown={handleWeaponClick('bow')}
            >
              🏹
            </button>
            <button
              className={`weapon-btn ${currentWeapon === 'whip' ? 'active' : ''}`}
              onTouchStart={handleWeaponClick('whip')}
              onMouseDown={handleWeaponClick('whip')}
            >
              🔗
            </button>
          </div>
        </div>

        {/* Magic Controls */}
        <div className="magic-section">
          <div className="magic-label">Magic:</div>
          <div className="magic-buttons">
            <button
              className="magic-btn quake"
              onTouchStart={handleMagicClick('quake')}
              onMouseDown={handleMagicClick('quake')}
            >
              🌍
            </button>
            <button
              className="magic-btn blaze"
              onTouchStart={handleMagicClick('blaze')}
              onMouseDown={handleMagicClick('blaze')}
            >
              🔥
            </button>
            <button
              className="magic-btn cure"
              onTouchStart={handleMagicClick('cure')}
              onMouseDown={handleMagicClick('cure')}
            >
              💚
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
