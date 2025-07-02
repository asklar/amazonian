import React from 'react';
import type { Player } from './types';
import { GAME_CONSTANTS } from './types';

interface GameUIProps {
  player: Player;
  currentLevel: number;
}

const GameUI: React.FC<GameUIProps> = ({ player, currentLevel }) => {
  const healthPercentage = (player.health / player.maxHealth) * 100;
  const magicPercentage = (player.magic / player.maxMagic) * 100;

  const canCastQuake = player.magic >= GAME_CONSTANTS.MAGIC_COSTS.quake;
  const canCastBlaze = player.magic >= GAME_CONSTANTS.MAGIC_COSTS.blaze;
  const canCastCure = player.magic >= GAME_CONSTANTS.MAGIC_COSTS.cure;

  return (
    <div className="game-ui">
      <div>Level: {currentLevel}</div>
      <div>Coins: {player.coins}</div>
      <div>Weapon: {player.weapon.toUpperCase()}</div>
      
      <div>Health:</div>
      <div className="health-bar">
        <div 
          className="health-fill" 
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
      
      <div>Magic:</div>
      <div className="magic-bar">
        <div 
          className="magic-fill" 
          style={{ width: `${magicPercentage}%` }}
        />
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '12px' }}>
        <div>Controls:</div>
        <div>WASD/Arrows: Move</div>
        <div>Z/Enter: Attack</div>
        <div>1/2/3: Switch Weapon</div>
        <div className={canCastQuake ? '' : 'disabled-spell'}>
          Q: Quake ({GAME_CONSTANTS.MAGIC_COSTS.quake}MP) - All enemies
        </div>
        <div className={canCastBlaze ? '' : 'disabled-spell'}>
          B: Blaze ({GAME_CONSTANTS.MAGIC_COSTS.blaze}MP) - Short range
        </div>
        <div className={canCastCure ? '' : 'disabled-spell'}>
          C: Cure ({GAME_CONSTANTS.MAGIC_COSTS.cure}MP)
        </div>
        <div>
          R: Restart Game
        </div>
      </div>
    </div>
  );
};

export default GameUI;
