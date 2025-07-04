/**
 * Browser-friendly sprite generator that creates and downloads SVG files
 */

import { SVGSpriteGenerator } from '../utils/svgSpriteGenerator';

// Browser-friendly file download function
function downloadSVG(filename: string, content: string) {
  const blob = new Blob([content], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Sprite generation data
const SPRITE_DEFINITIONS = [
  // Player sprites - Idle
  { filename: 'warrior_idle_01.svg', category: 'player', generator: () => SVGSpriteGenerator.generateWarriorIdle(1) },
  { filename: 'warrior_idle_02.svg', category: 'player', generator: () => SVGSpriteGenerator.generateWarriorIdle(2) },
  { filename: 'warrior_idle_03.svg', category: 'player', generator: () => SVGSpriteGenerator.generateWarriorIdle(1) },
  { filename: 'warrior_idle_04.svg', category: 'player', generator: () => SVGSpriteGenerator.generateWarriorIdle(2) },
  
  // Player sprites - Running
  ...Array.from({ length: 8 }, (_, i) => ({
    filename: `warrior_run_${String(i + 1).padStart(2, '0')}.svg`,
    category: 'player',
    generator: () => SVGSpriteGenerator.generateWarriorRun(i + 1)
  })),
  
  // Player sprites - Jumping
  ...Array.from({ length: 6 }, (_, i) => ({
    filename: `warrior_jump_${String(i + 1).padStart(2, '0')}.svg`,
    category: 'player',
    generator: () => SVGSpriteGenerator.generateWarriorJump(i + 1)
  })),
  
  // Player sprites - Sword Attack
  ...Array.from({ length: 4 }, (_, i) => ({
    filename: `warrior_sword_attack_${String(i + 1).padStart(2, '0')}.svg`,
    category: 'player',
    generator: () => SVGSpriteGenerator.generateWarriorSwordAttack(i + 1)
  })),
  
  // Monster sprites - Goblin
  { filename: 'goblin_idle_01.svg', category: 'monsters', generator: () => SVGSpriteGenerator.generateGoblinIdle(1) },
  { filename: 'goblin_idle_02.svg', category: 'monsters', generator: () => SVGSpriteGenerator.generateGoblinIdle(2) },
  { filename: 'goblin_idle_03.svg', category: 'monsters', generator: () => SVGSpriteGenerator.generateGoblinIdle(1) },
  { filename: 'goblin_idle_04.svg', category: 'monsters', generator: () => SVGSpriteGenerator.generateGoblinIdle(2) },
  
  // Monster sprites - Goblin Walking
  ...Array.from({ length: 4 }, (_, i) => ({
    filename: `goblin_walk_${String(i + 1).padStart(2, '0')}.svg`,
    category: 'monsters',
    generator: () => SVGSpriteGenerator.generateGoblinWalk(i + 1)
  })),
  
  // Platform sprites
  { filename: 'grass_left.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateGrassPlatform('left') },
  { filename: 'grass_center.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateGrassPlatform('center') },
  { filename: 'grass_right.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateGrassPlatform('right') },
  { filename: 'wood_left.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateWoodPlatform() },
  { filename: 'wood_center.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateWoodPlatform() },
  { filename: 'wood_right.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateWoodPlatform() },
  { filename: 'stone_left.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateStonePlatform() },
  { filename: 'stone_center.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateStonePlatform() },
  { filename: 'stone_right.svg', category: 'platforms', generator: () => SVGSpriteGenerator.generateStonePlatform() },
  
  // Loot sprites
  { filename: 'coin_01.svg', category: 'loot', generator: () => SVGSpriteGenerator.generateCoin(1) },
  { filename: 'coin_02.svg', category: 'loot', generator: () => SVGSpriteGenerator.generateCoin(2) },
  { filename: 'coin_03.svg', category: 'loot', generator: () => SVGSpriteGenerator.generateCoin(3) },
  { filename: 'coin_04.svg', category: 'loot', generator: () => SVGSpriteGenerator.generateCoin(4) },
  { filename: 'health_potion.svg', category: 'loot', generator: () => SVGSpriteGenerator.generateHealthPotion() },
  { filename: 'magic_potion.svg', category: 'loot', generator: () => SVGSpriteGenerator.generateMagicPotion() },
  
  // Magic effects
  ...Array.from({ length: 8 }, (_, i) => ({
    filename: `fireball_${String(i + 1).padStart(2, '0')}.svg`,
    category: 'magic',
    generator: () => SVGSpriteGenerator.generateFireball(i + 1)
  })),
  
  ...Array.from({ length: 4 }, (_, i) => ({
    filename: `quake_effect_${String(i + 1).padStart(2, '0')}.svg`,
    category: 'magic',
    generator: () => SVGSpriteGenerator.generateQuakeEffect(i + 1)
  })),
];

// Generate and save all sprites as individual downloads
export function downloadAllSprites() {
  console.log(`🎨 Starting to download ${SPRITE_DEFINITIONS.length} SVG sprites...`);
  
  SPRITE_DEFINITIONS.forEach((sprite, index) => {
    setTimeout(() => {
      try {
        const svgContent = sprite.generator();
        downloadSVG(sprite.filename, svgContent);
        console.log(`✓ Downloaded: ${sprite.filename}`);
      } catch (error) {
        console.error(`❌ Failed to generate ${sprite.filename}:`, error);
      }
    }, index * 100); // Stagger downloads to avoid browser limits
  });
  
  console.log('🚀 All downloads initiated!');
}

// Generate sprites as a ZIP file content (for batch download)
export function generateSpritesAsZip(): { [filename: string]: string } {
  const sprites: { [filename: string]: string } = {};
  
  SPRITE_DEFINITIONS.forEach(sprite => {
    try {
      const svgContent = sprite.generator();
      const fullPath = `sprites/${sprite.category}/${sprite.filename}`;
      sprites[fullPath] = svgContent;
    } catch (error) {
      console.error(`❌ Failed to generate ${sprite.filename}:`, error);
    }
  });
  
  return sprites;
}

// Generate specific sprite by name
export function generateSprite(category: string, filename: string): string | null {
  const sprite = SPRITE_DEFINITIONS.find(s => 
    s.category === category && s.filename === filename
  );
  
  if (!sprite) {
    console.warn(`Sprite not found: ${category}/${filename}`);
    return null;
  }
  
  try {
    return sprite.generator();
  } catch (error) {
    console.error(`Failed to generate ${category}/${filename}:`, error);
    return null;
  }
}

// Get available sprites by category
export function getAvailableSprites() {
  const categories: { [category: string]: string[] } = {};
  
  SPRITE_DEFINITIONS.forEach(sprite => {
    if (!categories[sprite.category]) {
      categories[sprite.category] = [];
    }
    categories[sprite.category].push(sprite.filename);
  });
  
  return categories;
}

// React component for sprite generation UI
export function SpriteGeneratorUI() {
  const availableSprites = getAvailableSprites();
  
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0f0f0', 
      border: '2px solid #333',
      margin: '20px',
      fontFamily: 'monospace'
    }}>
      <h2>🎨 SVG Sprite Generator</h2>
      <p>Generate programmatic 8-bit style sprites for the Amazonian Adventure game!</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={downloadAllSprites}
          style={{ 
            background: '#4CAF50', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          📦 Download All Sprites ({SPRITE_DEFINITIONS.length} files)
        </button>
        
        <button 
          onClick={() => console.log('Available sprites:', availableSprites)}
          style={{ 
            background: '#2196F3', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          📋 List All Sprites
        </button>
      </div>
      
      <div>
        <h3>📊 Available Sprite Categories:</h3>
        {Object.entries(availableSprites).map(([category, files]) => (
          <div key={category} style={{ marginBottom: '10px' }}>
            <strong>{category}:</strong> {files.length} files
            <br />
            <small style={{ color: '#666' }}>
              {files.slice(0, 3).join(', ')}{files.length > 3 ? `, ... +${files.length - 3} more` : ''}
            </small>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        💡 Tip: Check the browser console for download progress and any error messages.
      </div>
    </div>
  );
}
