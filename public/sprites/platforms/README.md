# Platform & Terrain Sprites

## Platform Types
Based on the game code: Grass, Wood, and Stone platforms

## General Specifications
- **Style**: 8-bit pixel art
- **Tiling**: Most platforms are modular tiles that can be repeated
- **Base Tile Size**: 16x16 pixels for seamless tiling
- **Edge Treatment**: Proper edge tiles for platform ends

---

## Grass Platforms
**Theme**: Natural earth and grass surfaces
**Color Scheme**: Green grass, brown earth

### Required Files
#### Basic Tiles (16x16 each)
- `grass_center.png` - Center tile with grass on top, earth below
- `grass_left_edge.png` - Left edge with rounded grass
- `grass_right_edge.png` - Right edge with rounded grass
- `grass_left_corner.png` - Left corner piece
- `grass_right_corner.png` - Right corner piece

#### Special Grass Tiles
- `grass_slope_up_left.png` - Upward slope going left
- `grass_slope_up_right.png` - Upward slope going right
- `grass_slope_down_left.png` - Downward slope going left
- `grass_slope_down_right.png` - Downward slope going right

#### Grass Details (overlay tiles)
- `grass_flowers_01.png` - Small flowers on grass
- `grass_flowers_02.png` - Different flower pattern
- `grass_rocks_01.png` - Small rocks on grass
- `grass_roots.png` - Visible roots on earth edge

#### Grass Platform Variations
- `grass_thick_center.png` - Thicker grass platform center
- `grass_thick_left.png` - Thick platform left edge
- `grass_thick_right.png` - Thick platform right edge

---

## Wood Platforms
**Theme**: Wooden planks and logs
**Color Scheme**: Brown wood tones with metal reinforcements

### Required Files
#### Basic Wood Tiles (16x16 each)
- `wood_plank_01.png` - Horizontal wood plank
- `wood_plank_02.png` - Horizontal wood plank (variation)
- `wood_plank_03.png` - Horizontal wood plank (variation)
- `wood_left_edge.png` - Left edge with metal bracket
- `wood_right_edge.png` - Right edge with metal bracket

#### Wood Construction Details
- `wood_nail_01.png` - Nail detail overlay
- `wood_nail_02.png` - Different nail pattern
- `wood_bracket_left.png` - Metal support bracket left
- `wood_bracket_right.png` - Metal support bracket right
- `wood_rope_support.png` - Rope support detail

#### Weathered Wood Variations
- `wood_weathered_01.png` - Slightly worn wood
- `wood_weathered_02.png` - More worn wood
- `wood_cracked.png` - Cracked wood plank
- `wood_moss.png` - Moss growing on wood

#### Log Platforms
- `wood_log_center.png` - Tree log center section
- `wood_log_left.png` - Tree log left end
- `wood_log_right.png` - Tree log right end
- `wood_log_bark.png` - Bark texture overlay

---

## Stone Platforms
**Theme**: Carved stone blocks and natural rock
**Color Scheme**: Gray stone with darker mortar lines

### Required Files
#### Basic Stone Tiles (16x16 each)
- `stone_block_01.png` - Square stone block
- `stone_block_02.png` - Stone block variation
- `stone_block_03.png` - Stone block variation
- `stone_left_edge.png` - Finished left edge
- `stone_right_edge.png` - Finished right edge

#### Stone Details
- `stone_mortar_h.png` - Horizontal mortar line
- `stone_mortar_v.png` - Vertical mortar line
- `stone_mortar_cross.png` - Mortar intersection
- `stone_crack_01.png` - Small crack in stone
- `stone_crack_02.png` - Large crack in stone

#### Ancient Stone Variations
- `stone_carved_01.png` - Stone with carved patterns
- `stone_carved_02.png` - Different carved pattern
- `stone_rune_01.png` - Stone with rune carving
- `stone_rune_02.png` - Different rune pattern

#### Natural Rock Platforms
- `rock_natural_01.png` - Natural rock formation
- `rock_natural_02.png` - Rock formation variation
- `rock_crystal.png` - Crystal embedded in rock
- `rock_moss.png` - Moss on rock surface

---

## Platform Backgrounds/Supports

### Underground/Cave Supports
- `cave_stalactite_01.png` - Stalactite from ceiling
- `cave_stalactite_02.png` - Different stalactite
- `cave_stalagmite_01.png` - Stalagmite from floor
- `cave_stalagmite_02.png` - Different stalagmite

### Wooden Supports
- `wood_support_vertical.png` - Vertical wooden beam
- `wood_support_diagonal.png` - Diagonal support beam
- `wood_support_base.png` - Support base/foundation

### Stone Supports
- `stone_pillar_top.png` - Top of stone pillar
- `stone_pillar_middle.png` - Middle section (tileable)
- `stone_pillar_base.png` - Base of stone pillar

---

## Terrain Decorations

### Ground Level Details
- `ground_pebbles.png` - Small rocks scattered on ground
- `ground_leaves.png` - Fallen leaves
- `ground_mushroom_01.png` - Small mushroom
- `ground_mushroom_02.png` - Different mushroom
- `ground_vine.png` - Vine growing on platform

### Water Features (if needed)
- `water_surface.png` - Water surface tile (animated)
- `water_edge_left.png` - Water meeting platform left
- `water_edge_right.png` - Water meeting platform right
- `water_bubble_01.png` - Water bubble
- `water_bubble_02.png` - Water bubble variation

---

## Platform Assembly Examples

### Small Platform (3 tiles wide)
```
[grass_left_edge][grass_center][grass_right_edge]
```

### Medium Platform (5 tiles wide)
```
[grass_left_edge][grass_center][grass_center][grass_center][grass_right_edge]
```

### Large Platform (custom width)
```
[grass_left_edge][grass_center x N][grass_right_edge]
```

## Animation Notes
- **Static Tiles**: Most platform tiles are static
- **Animated Details**: Some decorative elements may have subtle animation
  - Grass swaying: 3 frames at 4 FPS
  - Water surface: 4 frames at 8 FPS
  - Crystal glow: 3 frames at 6 FPS

## Color Palettes
### Grass Platforms
- Grass: Various greens (#228B22, #32CD32, #7CFC00)
- Earth: Browns (#8B4513, #A0522D, #654321)
- Details: Yellow flowers (#FFD700), gray rocks (#696969)

### Wood Platforms
- Wood: Brown tones (#8B4513, #CD853F, #D2691E)
- Metal: Dark grays (#2F4F4F, #708090)
- Rope: Tan/beige (#F5DEB3, #D2B48C)

### Stone Platforms
- Stone: Grays (#778899, #708090, #696969)
- Mortar: Darker gray (#2F4F4F)
- Ancient: Blue-gray (#6A5ACD), purple accents (#9370DB)
