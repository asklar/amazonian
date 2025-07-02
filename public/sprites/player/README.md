# Player Character Sprites - Amazonian Warrior

## Character Design
- **Theme**: Amazonian warrior woman
- **Style**: 8-bit pixel art
- **Size**: 32x48 pixels (2x3 tiles)
- **Clothing**: Tribal/jungle attire with armor pieces

## Required Sprite Files

### Basic Animations

#### Idle/Standing
- `warrior_idle_01.png` - Base standing pose
- `warrior_idle_02.png` - Slight breathing animation
- `warrior_idle_03.png` - Hair/clothing sway
- `warrior_idle_04.png` - Return to base pose

#### Running/Walking
- `warrior_run_01.png` - Left foot forward
- `warrior_run_02.png` - Both feet together
- `warrior_run_03.png` - Right foot forward  
- `warrior_run_04.png` - Both feet together
- `warrior_run_05.png` - Left foot forward (high step)
- `warrior_run_06.png` - Air time
- `warrior_run_07.png` - Right foot forward (high step)
- `warrior_run_08.png` - Air time

#### Jumping
- `warrior_jump_01.png` - Crouch before jump
- `warrior_jump_02.png` - Launch pose
- `warrior_jump_03.png` - Ascending
- `warrior_jump_04.png` - Peak/floating
- `warrior_jump_05.png` - Descending
- `warrior_jump_06.png` - Landing crouch

#### Combat Animations

##### Sword Attacks
- `warrior_sword_attack_01.png` - Wind up
- `warrior_sword_attack_02.png` - Mid swing
- `warrior_sword_attack_03.png` - Full extension
- `warrior_sword_attack_04.png` - Follow through

##### Bow Attacks
- `warrior_bow_draw_01.png` - Raising bow
- `warrior_bow_draw_02.png` - Drawing string
- `warrior_bow_draw_03.png` - Full draw
- `warrior_bow_release_01.png` - Release moment
- `warrior_bow_release_02.png` - Follow through

##### Whip Attacks
- `warrior_whip_wind_01.png` - Wind up
- `warrior_whip_wind_02.png` - Mid wind
- `warrior_whip_strike_01.png` - Strike forward
- `warrior_whip_strike_02.png` - Full extension
- `warrior_whip_return_01.png` - Whip returning

#### Magic Casting
- `warrior_magic_cast_01.png` - Gathering energy
- `warrior_magic_cast_02.png` - Hands glowing
- `warrior_magic_cast_03.png` - Casting pose
- `warrior_magic_cast_04.png` - Release energy
- `warrior_magic_cast_05.png` - Recovery

#### Taking Damage
- `warrior_hit_01.png` - Impact moment
- `warrior_hit_02.png` - Recoil back
- `warrior_hit_03.png` - Recovery stance

#### Death Animation
- `warrior_death_01.png` - Hit/stagger
- `warrior_death_02.png` - Falling backward
- `warrior_death_03.png` - On ground
- `warrior_death_04.png` - Fading/disappearing

### Directional Variants
Each animation should have left and right facing versions:
- Add `_left` or `_right` suffix to filenames
- Or use sprite flipping in code

### Weapon Overlay Sprites
Separate weapon sprites that overlay on the character:
- `sword_overlay_01.png` through `sword_overlay_04.png`
- `bow_overlay_01.png` through `bow_overlay_04.png`  
- `whip_overlay_01.png` through `whip_overlay_04.png`

## Color Palette Suggestions
- **Skin**: Tan/bronze tones
- **Hair**: Dark brown/black
- **Clothing**: Earth tones (brown, green, gold)
- **Armor**: Bronze/copper metallic
- **Accent Colors**: Bright red, turquoise for tribal elements

## Animation Timing
- **Idle**: 8 frames at 8 FPS (1 second loop)
- **Running**: 8 frames at 12 FPS 
- **Jumping**: 6 frames, variable timing based on physics
- **Sword**: 4 frames at 15 FPS (fast attack)
- **Bow**: 5 frames total, variable timing for charging
- **Whip**: 5 frames at 12 FPS
- **Magic**: 5 frames at 10 FPS
- **Hit**: 3 frames at 10 FPS
- **Death**: 4 frames at 6 FPS
