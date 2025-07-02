# Amazonian Adventure - 8-bit Platformer Game

A classic 8-bit adventure platformer game built with React and TypeScript, inspired by Wonder Boy in Monster Land and Golden Axe.

## 🎮 Game Features

### Character
- **Amazonian Warrior** - A fierce warrior protagonist
- **Multiple Weapons**: Sword, Bow & Arrow, and Whip
- **Health and Magic Systems** with visual bars
- **Smooth 8-bit animations** and sprite-based movement

### Magic Spells
- **Quake** (Q) - Shakes the entire screen and damages all monsters (30 magic)
- **Blaze** (E) - Fire attacks that burn monsters over time (20 magic)
- **Cure** (R) - Restores player health (25 magic)

### Monsters
- **Goblins** - Small, fast enemies
- **Orcs** - Medium-sized, stronger enemies  
- **Skeletons** - Undead warriors
- **Dragons** - Large, powerful boss-type enemies

### Loot System
- **Coins** - Increase your score
- **Health Potions** - Restore health
- **Magic Scrolls** - Restore magic points

### Level Progression
- **3 Challenging Levels** with increasing difficulty
- **Castle Gates** that unlock when all monsters are defeated
- **Platform-based level design** with multiple layers

## 🎯 Controls

### Movement
- **WASD** or **Arrow Keys** - Move and jump
- **Spacebar** - Jump (alternative)

### Combat
- **X** or **Enter** - Attack with current weapon
- **1** - Switch to Sword (melee, high damage)
- **2** - Switch to Bow (ranged, moderate damage)
- **3** - Switch to Whip (medium range, moderate damage)

### Magic
- **Q** - Cast Quake spell
- **E** - Cast Blaze spell  
- **R** - Cast Cure spell

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## 🎨 Art Style
- **8-bit pixel art aesthetic** with crisp, pixelated graphics
- **Retro color palette** reminiscent of classic arcade games
- **Smooth CSS animations** for character and spell effects
- **Particle effects** for magic spells and combat

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
