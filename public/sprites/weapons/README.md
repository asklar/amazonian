# Weapons & Projectiles Sprites

## Weapon Types
Based on the game code: Sword, Bow (with arrows), and Whip

## General Specifications
- **Style**: 8-bit pixel art
- **Size**: Varies by weapon type
- **Transparency**: PNG with alpha channel for proper layering

---

## Sword
**Size**: 24x6 pixels (horizontal), 6x24 pixels (vertical)
**Style**: Bronze/steel medieval sword

### Required Files
#### Sword Item/Pickup
- `sword_item.png` - Sword lying on ground for pickup

#### Sword in Hand (overlay sprites)
- `sword_hold_idle.png` - Sword at rest position
- `sword_hold_ready.png` - Sword raised for attack

#### Attack Animation Positions
- `sword_swing_01.png` - Start of swing
- `sword_swing_02.png` - Mid swing
- `sword_swing_03.png` - End of swing/impact
- `sword_swing_04.png` - Follow through

#### Special Effects
- `sword_trail_01.png` - Motion blur trail start
- `sword_trail_02.png` - Motion blur trail middle
- `sword_trail_03.png` - Motion blur trail end
- `sword_impact_spark.png` - Sparks when hitting enemy

---

## Bow & Arrows
**Bow Size**: 16x32 pixels
**Arrow Size**: 16x4 pixels

### Required Files
#### Bow Item/Pickup
- `bow_item.png` - Bow lying on ground

#### Bow States
- `bow_idle.png` - Bow at rest
- `bow_draw_25.png` - 25% drawn
- `bow_draw_50.png` - 50% drawn
- `bow_draw_75.png` - 75% drawn
- `bow_draw_100.png` - Fully drawn
- `bow_release.png` - Just released

#### Arrow Projectiles
- `arrow_flying.png` - Arrow in flight
- `arrow_stuck.png` - Arrow embedded in surface
- `arrow_ground.png` - Arrow on ground (pickup)

#### Arrow Effects
- `arrow_trail.png` - Motion trail behind flying arrow
- `arrow_impact_01.png` - Impact burst frame 1
- `arrow_impact_02.png` - Impact burst frame 2
- `arrow_impact_03.png` - Impact burst frame 3

---

## Whip
**Size**: Variable length, 8 pixels wide at base
**Style**: Leather whip with metal studs

### Required Files
#### Whip Item/Pickup
- `whip_item.png` - Coiled whip on ground

#### Whip Animation Frames
- `whip_coiled.png` - Whip at rest/coiled
- `whip_extend_01.png` - Starting to extend (25%)
- `whip_extend_02.png` - Extending further (50%)
- `whip_extend_03.png` - Nearly full extension (75%)
- `whip_extend_04.png` - Full extension (100%)
- `whip_crack.png` - Crack effect at tip
- `whip_return_01.png` - Starting to retract
- `whip_return_02.png` - Retracting
- `whip_return_03.png` - Nearly coiled

#### Whip Effects
- `whip_crack_spark.png` - Spark effect at whip tip
- `whip_impact_01.png` - Impact effect frame 1
- `whip_impact_02.png` - Impact effect frame 2

---

## Projectile Effects (General)

### Impact Effects
- `impact_small_01.png` - Small impact burst
- `impact_small_02.png` - Small impact fade
- `impact_medium_01.png` - Medium impact burst
- `impact_medium_02.png` - Medium impact fade
- `impact_large_01.png` - Large impact burst
- `impact_large_02.png` - Large impact fade

### Generic Projectile Trails
- `trail_fast_01.png` - Fast moving trail
- `trail_fast_02.png` - Fast moving trail fade
- `trail_slow_01.png` - Slow moving trail
- `trail_slow_02.png` - Slow moving trail fade

---

## Weapon Switching/Selection UI
- `weapon_icon_sword.png` - 16x16 sword icon
- `weapon_icon_bow.png` - 16x16 bow icon
- `weapon_icon_whip.png` - 16x16 whip icon
- `weapon_selected_border.png` - Border for currently selected weapon

## Directional Variants
Most weapon sprites need 8-directional variants:
- `_up`, `_down`, `_left`, `_right`
- `_up_left`, `_up_right`, `_down_left`, `_down_right`

Or use rotation/flipping in code for efficiency.

## Animation Timing
- **Sword Swing**: 4 frames at 15 FPS (fast attack)
- **Bow Draw**: 5 frames, timing varies with player input
- **Arrow Flight**: Moves based on physics, no frame animation
- **Whip Extend**: 4 frames at 12 FPS
- **Whip Return**: 3 frames at 10 FPS
- **Impact Effects**: 2-3 frames at 12 FPS

## Color Schemes
- **Sword**: Steel gray blade, brown/leather grip, gold crossguard
- **Bow**: Dark wood brown, sinew string
- **Arrows**: Wood shaft, metal tip, feather fletching
- **Whip**: Dark brown leather, silver studs
- **Effects**: Bright yellow/white for sparks, orange/red for impacts
