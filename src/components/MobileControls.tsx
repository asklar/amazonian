import React from 'react';
import type { WeaponType, MagicType } from './types';

interface MobileControlsProps {
  onAttack: () => void;
  onSwitchWeapon: (weapon: WeaponType) => void;
  onCastMagic: (spell: MagicType) => void;
  currentWeapon: WeaponType;
  isVisible: boolean;
}

const MobileControls: React.FC<MobileControlsProps> = ({
  onAttack,
  onSwitchWeapon,
  onCastMagic,
  currentWeapon,
  isVisible
}) => {
  if (!isVisible) return null;

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
