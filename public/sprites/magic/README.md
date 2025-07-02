# Magic Effects Sprites

## Magic Spell Types
Based on the game code: Quake, Blaze, and Cure spells

## General Specifications
- **Style**: 8-bit pixel art with glowing/animated effects
- **Size**: Varies by spell type and effect area
- **Colors**: Bright, contrasting colors for magical energy
- **Animation**: Most magic effects are animated sequences

---

## Quake Spell (Earth Magic)
**Effect**: Ground-based area damage with screen shake
**Color Scheme**: Brown, tan, yellow earth tones with energy

### Required Files
#### Casting Animation
- `quake_cast_01.png` - Energy gathering at hands
- `quake_cast_02.png` - Energy building
- `quake_cast_03.png` - Energy release downward

#### Ground Effect
- `quake_ground_01.png` - Initial ground crack (32x16)
- `quake_ground_02.png` - Cracks spreading (64x16)
- `quake_ground_03.png` - Wide crack pattern (96x16)
- `quake_ground_04.png` - Maximum crack spread (128x16)
- `quake_ground_05.png` - Cracks fading (96x16)
- `quake_ground_06.png` - Cracks closing (64x16)
- `quake_ground_07.png` - Final fade (32x16)

#### Rock/Debris Effects
- `quake_debris_01.png` - Small rocks flying up
- `quake_debris_02.png` - Rocks at peak height
- `quake_debris_03.png` - Rocks falling down
- `quake_dust_01.png` - Dust cloud rising
- `quake_dust_02.png` - Dust cloud spreading
- `quake_dust_03.png` - Dust cloud dissipating

#### Area of Effect Indicator
- `quake_aoe_warning.png` - Warning indicator before effect
- `quake_aoe_active.png` - Active damage area highlight

---

## Blaze Spell (Fire Magic)
**Effect**: Burning damage over time with fire particles
**Color Scheme**: Red, orange, yellow flames

### Required Files
#### Casting Animation
- `blaze_cast_01.png` - Fire gathering in hands
- `blaze_cast_02.png` - Flame intensifying
- `blaze_cast_03.png` - Fire release forward

#### Projectile/Fire Bolt
- `blaze_bolt_01.png` - Fire projectile frame 1
- `blaze_bolt_02.png` - Fire projectile frame 2
- `blaze_bolt_03.png` - Fire projectile frame 3
- `blaze_bolt_04.png` - Fire projectile frame 4

#### Impact and Burning
- `blaze_impact_01.png` - Initial fire explosion
- `blaze_impact_02.png` - Fire spread
- `blaze_impact_03.png` - Fire peak
- `blaze_impact_04.png` - Fire diminishing

#### Burning Status Effect (overlay on monsters)
- `burn_small_01.png` - Small flames on target
- `burn_small_02.png` - Small flames flickering
- `burn_small_03.png` - Small flames diminishing
- `burn_medium_01.png` - Medium flames on target
- `burn_medium_02.png` - Medium flames flickering
- `burn_medium_03.png` - Medium flames diminishing

#### Particle Effects
- `fire_particle_01.png` - Single fire spark
- `fire_particle_02.png` - Fire spark fading
- `fire_ember_01.png` - Glowing ember
- `fire_ember_02.png` - Ember cooling

---

## Cure Spell (Healing Magic)
**Effect**: Restores player health with healing particles
**Color Scheme**: Green, blue, white healing energy

### Required Files
#### Casting Animation
- `cure_cast_01.png` - Healing energy forming
- `cure_cast_02.png` - Energy swirling
- `cure_cast_03.png` - Energy release upward

#### Healing Effect on Player
- `cure_heal_01.png` - Initial healing glow around player
- `cure_heal_02.png` - Glow intensifying
- `cure_heal_03.png` - Peak healing energy
- `cure_heal_04.png` - Energy absorbing into player
- `cure_heal_05.png` - Final healing sparkles
- `cure_heal_06.png` - Effect fading

#### Healing Particles
- `heal_particle_01.png` - Single healing spark (8x8)
- `heal_particle_02.png` - Healing spark rising
- `heal_particle_03.png` - Healing spark fading
- `heal_orb_01.png` - Healing orb (12x12)
- `heal_orb_02.png` - Healing orb pulsing
- `heal_orb_03.png` - Healing orb absorbed

#### Status Indicators
- `heal_aura_01.png` - Healing aura frame 1 (player overlay)
- `heal_aura_02.png` - Healing aura frame 2
- `heal_aura_03.png` - Healing aura frame 3

---

## General Magic Effects

### Magic Energy/Mana
- `mana_particle_01.png` - Blue mana particle
- `mana_particle_02.png` - Mana particle movement
- `mana_particle_03.png` - Mana particle fade
- `magic_sparkle_01.png` - General magic sparkle
- `magic_sparkle_02.png` - Sparkle twinkle
- `magic_sparkle_03.png` - Sparkle fade

### Casting Circles/Runes
- `magic_circle_small.png` - Small casting circle (32x32)
- `magic_circle_medium.png` - Medium casting circle (48x48)
- `magic_circle_large.png` - Large casting circle (64x64)
- `rune_earth.png` - Earth magic rune
- `rune_fire.png` - Fire magic rune
- `rune_heal.png` - Healing magic rune

### Energy Beams/Waves
- `energy_wave_01.png` - Magic energy wave
- `energy_wave_02.png` - Energy wave expanding
- `energy_wave_03.png` - Energy wave dissipating
- `magic_beam_01.png` - Concentrated magic beam
- `magic_beam_02.png` - Beam at full power
- `magic_beam_03.png` - Beam fading

---

## Magic UI Elements
- `spell_icon_quake.png` - 16x16 quake spell icon
- `spell_icon_blaze.png` - 16x16 blaze spell icon
- `spell_icon_cure.png` - 16x16 cure spell icon
- `mana_orb_full.png` - Full mana indicator
- `mana_orb_half.png` - Half mana indicator
- `mana_orb_empty.png` - Empty mana indicator
- `spell_cooldown_overlay.png` - Cooldown timer overlay

## Animation Timing
- **Quake Effect**: 7 frames at 8 FPS (ground), particles at 12 FPS
- **Blaze Projectile**: 4 frames at 15 FPS (fast fire animation)
- **Blaze Burning**: 3 frames at 10 FPS (continuous loop)
- **Cure Healing**: 6 frames at 8 FPS (gentle, soothing)
- **Particles**: 3 frames at 12-15 FPS (quick, energetic)
- **Casting Circles**: Static or 3 frames at 6 FPS (slow, mystical)

## Color Palettes
### Quake (Earth)
- Primary: Browns (#8B4513, #A0522D)
- Accent: Yellow energy (#FFD700, #FFA500)
- Dust: Light brown (#DEB887)

### Blaze (Fire)
- Primary: Red/Orange (#FF4500, #FF6347, #FF8C00)
- Core: Bright yellow (#FFFF00)
- Smoke: Dark gray (#2F2F2F)

### Cure (Healing)
- Primary: Green (#00FF7F, #32CD32)
- Accent: Blue (#87CEEB, #4169E1)
- Glow: White (#FFFFFF, #F0F8FF)
