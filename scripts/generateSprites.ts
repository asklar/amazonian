/**
 * Script to generate and save all SVG sprites to the file system
 */

import * as fs from 'fs';
import * as path from 'path';
import { SVGSpriteGenerator } from '../utils/svgSpriteGenerator';

// Ensure directory exists
function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Write SVG file
function writeSVGFile(filePath: string, content: string) {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  const dir = path.dirname(fullPath);
  ensureDirectoryExists(dir);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Generated: ${filePath}`);
}

// Generate all sprites
export async function generateAndSaveAllSprites(): Promise<void> {
  console.log('🎨 Starting SVG sprite generation...\n');

  const sprites = [
    // Player sprites - Idle
    { path: 'sprites/player/warrior_idle_01.svg', generator: () => SVGSpriteGenerator.generateWarriorIdle(1) },
    { path: 'sprites/player/warrior_idle_02.svg', generator: () => SVGSpriteGenerator.generateWarriorIdle(2) },
    { path: 'sprites/player/warrior_idle_03.svg', generator: () => SVGSpriteGenerator.generateWarriorIdle(1) },
    { path: 'sprites/player/warrior_idle_04.svg', generator: () => SVGSpriteGenerator.generateWarriorIdle(2) },
    
    // Player sprites - Running
    ...Array.from({ length: 8 }, (_, i) => ({
      path: `sprites/player/warrior_run_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateWarriorRun(i + 1)
    })),
    
    // Player sprites - Jumping
    ...Array.from({ length: 6 }, (_, i) => ({
      path: `sprites/player/warrior_jump_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateWarriorJump(i + 1)
    })),
    
    // Player sprites - Sword Attack
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `sprites/player/warrior_sword_attack_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateWarriorSwordAttack(i + 1)
    })),
    
    // Monster sprites - Goblin
    { path: 'sprites/monsters/goblin_idle_01.svg', generator: () => SVGSpriteGenerator.generateGoblinIdle(1) },
    { path: 'sprites/monsters/goblin_idle_02.svg', generator: () => SVGSpriteGenerator.generateGoblinIdle(2) },
    { path: 'sprites/monsters/goblin_idle_03.svg', generator: () => SVGSpriteGenerator.generateGoblinIdle(1) },
    { path: 'sprites/monsters/goblin_idle_04.svg', generator: () => SVGSpriteGenerator.generateGoblinIdle(2) },
    
    // Monster sprites - Goblin Walking
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `sprites/monsters/goblin_walk_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateGoblinWalk(i + 1)
    })),
    
    // Platform sprites
    { path: 'sprites/platforms/grass_left.svg', generator: () => SVGSpriteGenerator.generateGrassPlatform('left') },
    { path: 'sprites/platforms/grass_center.svg', generator: () => SVGSpriteGenerator.generateGrassPlatform('center') },
    { path: 'sprites/platforms/grass_right.svg', generator: () => SVGSpriteGenerator.generateGrassPlatform('right') },
    { path: 'sprites/platforms/wood_left.svg', generator: () => SVGSpriteGenerator.generateWoodPlatform() },
    { path: 'sprites/platforms/wood_center.svg', generator: () => SVGSpriteGenerator.generateWoodPlatform() },
    { path: 'sprites/platforms/wood_right.svg', generator: () => SVGSpriteGenerator.generateWoodPlatform() },
    { path: 'sprites/platforms/stone_left.svg', generator: () => SVGSpriteGenerator.generateStonePlatform() },
    { path: 'sprites/platforms/stone_center.svg', generator: () => SVGSpriteGenerator.generateStonePlatform() },
    { path: 'sprites/platforms/stone_right.svg', generator: () => SVGSpriteGenerator.generateStonePlatform() },
    
    // Loot sprites
    { path: 'sprites/loot/coin_01.svg', generator: () => SVGSpriteGenerator.generateCoin(1) },
    { path: 'sprites/loot/coin_02.svg', generator: () => SVGSpriteGenerator.generateCoin(2) },
    { path: 'sprites/loot/coin_03.svg', generator: () => SVGSpriteGenerator.generateCoin(3) },
    { path: 'sprites/loot/coin_04.svg', generator: () => SVGSpriteGenerator.generateCoin(4) },
    { path: 'sprites/loot/health_potion.svg', generator: () => SVGSpriteGenerator.generateHealthPotion() },
    { path: 'sprites/loot/magic_potion.svg', generator: () => SVGSpriteGenerator.generateMagicPotion() },
    
    // Magic effects
    ...Array.from({ length: 8 }, (_, i) => ({
      path: `sprites/magic/fireball_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateFireball(i + 1)
    })),
    
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `sprites/magic/quake_effect_${String(i + 1).padStart(2, '0')}.svg`,
      generator: () => SVGSpriteGenerator.generateQuakeEffect(i + 1)
    })),
  ];

  console.log(`📊 Total sprites to generate: ${sprites.length}\n`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const sprite of sprites) {
    try {
      const svgContent = sprite.generator();
      writeSVGFile(sprite.path, svgContent);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${sprite.path}:`, error);
      errorCount++;
    }
  }
  
  console.log(`\n🎯 Generation complete!`);
  console.log(`✅ Success: ${successCount} sprites`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} sprites`);
  }
  console.log(`\n🚀 All sprites are now available in the public/sprites/ directory!`);
}

// Run if called directly
if (require.main === module) {
  generateAndSaveAllSprites().catch(console.error);
}
