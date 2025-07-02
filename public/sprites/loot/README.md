# Loot & Collectibles Sprites

## Loot Types
Based on the game code: Coins, Health, and Magic pickups

## General Specifications
- **Style**: 8-bit pixel art
- **Size**: 16x16 pixels for most items
- **Animation**: Subtle animations to attract player attention
- **Glow Effects**: Optional glow overlays for magical items

---

## Coins (Currency)
**Theme**: Ancient Amazonian gold coins
**Size**: 12x12 pixels
**Animation**: Spinning/rotating

### Required Files
#### Coin Animation Frames
- `coin_01.png` - Coin facing forward (full circle)
- `coin_02.png` - Coin at 30° rotation (slight oval)
- `coin_03.png` - Coin at 60° rotation (more oval)
- `coin_04.png` - Coin edge-on (thin line)
- `coin_05.png` - Coin at 120° rotation (oval, other side)
- `coin_06.png` - Coin at 150° rotation (slight oval)
- `coin_07.png` - Coin facing forward again
- `coin_08.png` - Coin at 210° rotation

#### Coin Variations
- `coin_bronze.png` - Bronze coin (lower value)
- `coin_silver.png` - Silver coin (medium value)
- `coin_gold.png` - Gold coin (high value)
- `coin_ancient.png` - Ancient coin with special markings

#### Coin Effects
- `coin_sparkle_01.png` - Small sparkle effect
- `coin_sparkle_02.png` - Sparkle at different position
- `coin_pickup_01.png` - Collection effect frame 1
- `coin_pickup_02.png` - Collection effect frame 2
- `coin_pickup_03.png` - Collection effect frame 3

### Coin Stack Variations (for multiple coins)
- `coin_stack_2.png` - Stack of 2 coins
- `coin_stack_3.png` - Stack of 3 coins
- `coin_stack_5.png` - Stack of 5 coins

---

## Health Pickups
**Theme**: Healing items (fruits, potions, hearts)
**Size**: 16x16 pixels
**Animation**: Gentle pulsing glow

### Required Files
#### Health Items
- `health_fruit_01.png` - Healing fruit (like mango)
- `health_fruit_02.png` - Different healing fruit
- `health_potion_small.png` - Small health potion (red)
- `health_potion_medium.png` - Medium health potion
- `health_potion_large.png` - Large health potion
- `health_heart.png` - Heart symbol for full health

#### Health Animation Frames
- `health_glow_01.png` - Subtle red glow around item
- `health_glow_02.png` - Glow slightly brighter
- `health_glow_03.png` - Glow at peak brightness
- `health_glow_04.png` - Glow dimming

#### Health Pickup Effects
- `health_pickup_01.png` - Red healing energy burst
- `health_pickup_02.png` - Energy dispersing
- `health_pickup_03.png` - Energy absorbed into player
- `health_restore_01.png` - Health restoration sparkles
- `health_restore_02.png` - Sparkles rising
- `health_restore_03.png` - Sparkles fading

### Health Value Indicators
- `health_plus_small.png` - "+5" indicator for small health
- `health_plus_medium.png` - "+15" indicator for medium health
- `health_plus_large.png` - "+30" indicator for large health

---

## Magic Pickups
**Theme**: Mana crystals and magical essences
**Size**: 16x16 pixels
**Animation**: Floating and glowing

### Required Files
#### Magic Items
- `magic_crystal_blue.png` - Blue mana crystal
- `magic_crystal_purple.png` - Purple mana crystal
- `magic_essence_01.png` - Swirling magic essence
- `magic_essence_02.png` - Different essence pattern
- `magic_orb.png` - Floating magic orb
- `magic_shard.png` - Crystal shard

#### Magic Animation Frames
- `magic_float_01.png` - Item at lowest position
- `magic_float_02.png` - Item rising
- `magic_float_03.png` - Item at highest position
- `magic_float_04.png` - Item descending

#### Magic Glow Effects
- `magic_glow_01.png` - Blue magical glow
- `magic_glow_02.png` - Glow pulsing brighter
- `magic_glow_03.png` - Glow at peak
- `magic_glow_04.png` - Glow dimming

#### Magic Pickup Effects
- `magic_pickup_01.png` - Blue energy absorption
- `magic_pickup_02.png` - Energy swirling into player
- `magic_pickup_03.png` - Energy fully absorbed
- `magic_restore_01.png` - Mana restoration effect
- `magic_restore_02.png` - Blue sparkles around player
- `magic_restore_03.png` - Effect completion

### Magic Value Indicators
- `magic_plus_small.png` - "+10" indicator for small mana
- `magic_plus_medium.png` - "+20" indicator for medium mana
- `magic_plus_large.png` - "+40" indicator for large mana

---

## Special/Rare Loot

### Power-ups
- `powerup_strength.png` - Temporary strength boost
- `powerup_speed.png` - Temporary speed boost
- `powerup_invulnerable.png` - Temporary invulnerability
- `powerup_double_jump.png` - Double jump ability

### Weapon Upgrades
- `upgrade_sword.png` - Sword enhancement gem
- `upgrade_bow.png` - Bow enhancement string
- `upgrade_whip.png` - Whip enhancement studs

### Rare Items
- `artifact_01.png` - Ancient artifact
- `artifact_02.png` - Different ancient artifact
- `treasure_chest.png` - Treasure chest (animated opening)
- `key_bronze.png` - Bronze key
- `key_silver.png` - Silver key
- `key_gold.png` - Gold key

---

## Loot Container Sprites

### Treasure Chests
- `chest_closed.png` - Closed treasure chest
- `chest_opening_01.png` - Chest starting to open
- `chest_opening_02.png` - Chest half open
- `chest_opening_03.png` - Chest fully open
- `chest_empty.png` - Empty chest after looting

### Pots and Urns
- `pot_small.png` - Small breakable pot
- `pot_large.png` - Large breakable pot
- `urn_ancient.png` - Ancient urn
- `pot_broken_01.png` - Pot breaking frame 1
- `pot_broken_02.png` - Pot breaking frame 2
- `pot_broken_03.png` - Pot shattered

### Hidden Caches
- `cache_bush.png` - Hidden cache in bush
- `cache_rock.png` - Hidden cache in rock
- `cache_tree.png` - Hidden cache in tree

---

## Collection UI Elements
- `coin_ui_icon.png` - Coin icon for UI counter
- `health_ui_icon.png` - Health icon for UI
- `magic_ui_icon.png` - Magic icon for UI
- `loot_collected_check.png` - Checkmark for collected items

## Animation Timing
- **Coin Rotation**: 8 frames at 12 FPS (continuous spin)
- **Health Pulsing**: 4 frames at 4 FPS (gentle pulse)
- **Magic Floating**: 4 frames at 6 FPS (slow float)
- **Pickup Effects**: 3 frames at 15 FPS (quick absorption)
- **Chest Opening**: 3 frames at 8 FPS
- **Pot Breaking**: 3 frames at 12 FPS

## Color Palettes
### Coins
- Bronze: (#CD7F32, #B87333)
- Silver: (#C0C0C0, #A9A9A9)
- Gold: (#FFD700, #FFA500)
- Ancient: (#DAA520, #B8860B)

### Health Items
- Fruits: Red/orange (#FF6347, #FF4500)
- Potions: Red (#DC143C, #B22222)
- Glow: Soft red (#FFB6C1, #FFA0A0)

### Magic Items
- Crystals: Blue (#4169E1, #1E90FF)
- Essence: Purple (#9370DB, #8A2BE2)
- Glow: Bright blue/white (#87CEEB, #F0F8FF)
