import React, { useState, useEffect } from 'react';
import './SpriteShowcase.css';

// Import our sprite asset system
import { svgSpriteManager } from '../assets/svgSpriteAssets';

// Define our sprite categories and files
const SPRITE_SHOWCASE = {
  player: [
    '/sprites/player/warrior_idle_new.svg',
    '/sprites/player/warrior_idle_01.svg',
    '/sprites/player/warrior_idle_02.svg'
  ],
  monsters: [
    '/sprites/monsters/goblin_idle_new.svg',
    '/sprites/monsters/goblin_idle_01.svg'
  ],
  platforms: [
    '/sprites/platforms/grass_center_new.svg',
    '/sprites/platforms/grass_center.svg'
  ],
  loot: [
    '/sprites/loot/coin_new.svg',
    '/sprites/loot/coin_01.svg'
  ],
  magic: [
    '/sprites/magic/fireball_new.svg'
  ]
};

// SVG Sprite Display Component
interface SpriteDisplayProps {
  spritePath: string;
  scale?: number;
  animated?: boolean;
}

const SpriteDisplay: React.FC<SpriteDisplayProps> = ({ spritePath, scale = 4, animated = false }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadSprite = async () => {
      try {
        setLoading(true);
        setError('');
        const content = await svgSpriteManager.loadSprite(spritePath);
        setSvgContent(content);
      } catch (err) {
        setError(`Failed to load: ${spritePath}`);
        console.error('Sprite loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSprite();
  }, [spritePath]);

  if (loading) {
    return (
      <div className="sprite-placeholder">
        <div className="loading-spinner">⏳</div>
        <small>Loading...</small>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sprite-error">
        <div className="error-icon">❌</div>
        <small>{error}</small>
      </div>
    );
  }

  return (
    <div 
      className={`sprite-container ${animated ? 'animated' : ''}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top left'
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

// Main Sprite Showcase Component
export const SpriteShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof SPRITE_SHOWCASE>('player');
  const [animationEnabled, setAnimationEnabled] = useState(true);

  return (
    <div className="sprite-showcase">
      <header className="showcase-header">
        <h1>🎨 Amazonian Adventure - SVG Sprite Showcase</h1>
        <p>Programmatically generated 8-bit pixel art sprites using SVG technology</p>
        
        <div className="showcase-controls">
          <div className="category-selector">
            <label>Category:</label>
            {Object.keys(SPRITE_SHOWCASE).map((category) => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category as keyof typeof SPRITE_SHOWCASE)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="animation-toggle">
            <label>
              <input
                type="checkbox"
                checked={animationEnabled}
                onChange={(e) => setAnimationEnabled(e.target.checked)}
              />
              Enable Animations
            </label>
          </div>
        </div>
      </header>

      <main className="showcase-grid">
        {SPRITE_SHOWCASE[selectedCategory].map((spritePath) => (
          <div key={spritePath} className="sprite-item">
            <div className="sprite-display">
              <SpriteDisplay 
                spritePath={spritePath} 
                scale={6} 
                animated={animationEnabled}
              />
            </div>
            <div className="sprite-info">
              <h3>{spritePath.split('/').pop()?.replace('.svg', '')}</h3>
              <p className="sprite-path">{spritePath}</p>
              <div className="sprite-stats">
                <span className="stat">Category: {selectedCategory}</span>
                <span className="stat">Format: SVG</span>
                <span className="stat">Scale: 6x</span>
              </div>
            </div>
          </div>
        ))}
      </main>

      <section className="showcase-features">
        <h2>🚀 SVG Sprite System Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>🎯 Programmatic Generation</h3>
            <p>Sprites are created using code, ensuring consistency and allowing for easy variations</p>
          </div>
          <div className="feature">
            <h3>🔍 Perfect Scaling</h3>
            <p>SVG format allows for crisp pixel art at any scale without quality loss</p>
          </div>
          <div className="feature">
            <h3>🎨 8-bit Aesthetic</h3>
            <p>Carefully designed pixel art with authentic retro gaming visual style</p>
          </div>
          <div className="feature">
            <h3>⚡ Fast Loading</h3>
            <p>Lightweight SVG files with built-in caching for optimal performance</p>
          </div>
          <div className="feature">
            <h3>🔧 Easy Customization</h3>
            <p>Color palettes and sprite variations can be generated programmatically</p>
          </div>
          <div className="feature">
            <h3>📱 Browser Compatible</h3>
            <p>Works across all modern browsers with proper pixel-perfect rendering</p>
          </div>
        </div>
      </section>

      <section className="showcase-stats">
        <h2>📊 Current Sprite Library</h2>
        <div className="stats-grid">
          {Object.entries(SPRITE_SHOWCASE).map(([category, sprites]) => (
            <div key={category} className="stat-item">
              <div className="stat-number">{sprites.length}</div>
              <div className="stat-label">{category}</div>
            </div>
          ))}
          <div className="stat-item total">
            <div className="stat-number">
              {Object.values(SPRITE_SHOWCASE).reduce((total, sprites) => total + sprites.length, 0)}
            </div>
            <div className="stat-label">Total Sprites</div>
          </div>
        </div>
      </section>

      <footer className="showcase-footer">
        <p>✨ Sprites generated using the Amazonian Adventure SVG Sprite System</p>
        <p>🎮 Ready for integration into the platformer game engine</p>
      </footer>
    </div>
  );
};

export default SpriteShowcase;
