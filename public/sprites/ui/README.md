# UI Elements Sprites

## User Interface Components
All UI elements for the Amazonian adventure platformer game

## General Specifications
- **Style**: 8-bit pixel art matching game aesthetic
- **Size**: Various sizes based on function
- **Colors**: High contrast for readability
- **Transparency**: PNG with alpha for overlays

---

## Health & Status Bars

### Health Bar
- `health_bar_bg.png` - Health bar background (empty)
- `health_bar_fill.png` - Health bar fill (red)
- `health_bar_frame.png` - Decorative frame around bar
- `health_icon.png` - Heart icon (16x16)

#### Health Bar Segments
- `health_segment_full.png` - Full health segment
- `health_segment_half.png` - Half health segment  
- `health_segment_empty.png` - Empty health segment
- `health_segment_critical.png` - Critical health (flashing)

### Magic/Mana Bar
- `mana_bar_bg.png` - Mana bar background
- `mana_bar_fill.png` - Mana bar fill (blue)
- `mana_bar_frame.png` - Decorative frame
- `mana_icon.png` - Magic crystal icon (16x16)

#### Mana Bar Segments
- `mana_segment_full.png` - Full mana segment
- `mana_segment_half.png` - Half mana segment
- `mana_segment_empty.png` - Empty mana segment
- `mana_segment_charging.png` - Mana recharging effect

### Experience/Level Bar (if applicable)
- `exp_bar_bg.png` - Experience bar background
- `exp_bar_fill.png` - Experience bar fill (yellow)
- `exp_bar_frame.png` - Decorative frame

---

## Inventory & Equipment

### Weapon Selection
- `weapon_slot_bg.png` - Weapon slot background
- `weapon_slot_selected.png` - Selected weapon highlight
- `weapon_slot_frame.png` - Slot border

#### Weapon Icons (24x24)
- `icon_sword.png` - Sword icon
- `icon_bow.png` - Bow icon
- `icon_whip.png` - Whip icon
- `icon_weapon_locked.png` - Locked weapon slot

### Magic Spells
- `spell_slot_bg.png` - Spell slot background
- `spell_slot_selected.png` - Selected spell highlight
- `spell_slot_cooldown.png` - Cooldown overlay

#### Spell Icons (24x24)
- `icon_quake.png` - Quake spell icon
- `icon_blaze.png` - Blaze spell icon
- `icon_cure.png` - Cure spell icon
- `icon_spell_locked.png` - Locked spell slot

### Item Slots
- `item_slot_bg.png` - General item slot
- `item_slot_highlight.png` - Highlighted slot
- `item_slot_empty.png` - Empty slot indicator

---

## HUD Elements

### Coin Counter
- `coin_counter_bg.png` - Background for coin display
- `coin_counter_icon.png` - Coin icon for counter
- `numbers_gold_0.png` through `numbers_gold_9.png` - Gold numbers

### Score Display
- `score_bg.png` - Score background panel
- `numbers_white_0.png` through `numbers_white_9.png` - White numbers
- `score_label.png` - "SCORE" text

### Level Indicator
- `level_bg.png` - Level display background
- `level_label.png` - "LEVEL" text
- `numbers_blue_0.png` through `numbers_blue_9.png` - Blue numbers

### Lives Counter (if applicable)
- `lives_bg.png` - Lives display background
- `lives_icon.png` - Life/warrior icon
- `lives_x.png` - "x" multiplier symbol

---

## Menu Interfaces

### Main Menu
- `menu_bg.png` - Main menu background
- `menu_title.png` - Game title graphic
- `menu_logo.png` - Game logo

#### Menu Buttons
- `button_play.png` - Play button
- `button_play_hover.png` - Play button highlighted
- `button_options.png` - Options button
- `button_options_hover.png` - Options highlighted
- `button_quit.png` - Quit button
- `button_quit_hover.png` - Quit highlighted

### Pause Menu
- `pause_overlay.png` - Semi-transparent pause overlay
- `pause_panel.png` - Pause menu panel
- `pause_title.png` - "PAUSED" text

#### Pause Buttons
- `button_resume.png` - Resume button
- `button_resume_hover.png` - Resume highlighted
- `button_restart.png` - Restart level button
- `button_restart_hover.png` - Restart highlighted
- `button_menu.png` - Return to menu button
- `button_menu_hover.png` - Menu highlighted

### Game Over Screen
- `gameover_bg.png` - Game over background
- `gameover_title.png` - "GAME OVER" text
- `gameover_panel.png` - Score display panel

### Level Complete
- `levelcomplete_bg.png` - Level complete background
- `levelcomplete_title.png` - "LEVEL COMPLETE" text
- `levelcomplete_panel.png` - Stats display panel

---

## Status Effects & Indicators

### Player Status
- `status_invulnerable.png` - Invulnerability indicator
- `status_poisoned.png` - Poison effect indicator
- `status_burning.png` - Burning effect indicator
- `status_blessed.png` - Blessed/enhanced indicator

### Damage Numbers
- `damage_small.png` - Small damage number background
- `damage_medium.png` - Medium damage background
- `damage_large.png` - Large damage background
- `damage_critical.png` - Critical damage background
- `heal_number.png` - Healing number background

#### Number Sets for Damage
- `dmg_red_0.png` through `dmg_red_9.png` - Red damage numbers
- `dmg_yellow_0.png` through `dmg_yellow_9.png` - Critical damage
- `heal_green_0.png` through `heal_green_9.png` - Healing numbers

### Interaction Prompts
- `prompt_attack.png` - Attack prompt
- `prompt_jump.png` - Jump prompt
- `prompt_pickup.png` - Pickup item prompt
- `prompt_door.png` - Enter door prompt

---

## Progress & Navigation

### Minimap (if applicable)
- `minimap_bg.png` - Minimap background
- `minimap_frame.png` - Minimap border
- `minimap_player.png` - Player position dot
- `minimap_enemy.png` - Enemy position dot
- `minimap_treasure.png` - Treasure position dot
- `minimap_exit.png` - Level exit marker

### Progress Indicators
- `progress_bar_bg.png` - Generic progress bar background
- `progress_bar_fill.png` - Progress bar fill
- `progress_complete.png` - Completion checkmark

### Compass/Direction
- `compass_bg.png` - Compass background
- `compass_needle.png` - Compass needle
- `direction_arrow.png` - Direction indicator arrow

---

## Text & Typography

### Bitmap Fonts
Create bitmap font sets for consistent text rendering:

#### Font Set 1: UI Text (8x8 pixels per character)
- `font_ui_a.png` through `font_ui_z.png` - Lowercase letters
- `font_ui_A.png` through `font_ui_Z.png` - Uppercase letters
- `font_ui_0.png` through `font_ui_9.png` - Numbers
- `font_ui_space.png`, `font_ui_period.png`, etc. - Punctuation

#### Font Set 2: Large Text (16x16 pixels per character)
- `font_large_a.png` through `font_large_z.png`
- Numbers and punctuation in large format

### Text Backgrounds
- `text_box_bg.png` - Text box background
- `text_box_frame.png` - Decorative text frame
- `dialogue_arrow.png` - "Continue" arrow for text

---

## Special UI Effects

### Transitions
- `fade_overlay.png` - Screen fade overlay
- `swipe_left.png` - Left swipe transition
- `swipe_right.png` - Right swipe transition

### Borders & Frames
- `border_simple.png` - Simple UI border
- `border_ornate.png` - Decorative border
- `frame_ancient.png` - Ancient/mystical frame style

### Cursors & Pointers
- `cursor_default.png` - Default cursor
- `cursor_interact.png` - Interaction cursor
- `cursor_attack.png` - Attack targeting cursor

---

## Color Schemes

### Primary UI Palette
- Background: Dark blue/black (#1a1a2e, #16213e)
- Text: White/light gray (#ffffff, #e5e5e5)
- Accents: Gold/yellow (#ffd700, #ffb347)
- Health: Red (#dc3545, #ff6b6b)
- Mana: Blue (#007bff, #74b9ff)
- Success: Green (#28a745, #00b894)

### Secondary Palette
- Warning: Orange (#fd7e14, #fdcb6e)
- Danger: Dark red (#721c24, #d63031)
- Info: Light blue (#17a2b8, #74b9ff)
- Neutral: Gray (#6c757d, #b2bec3)

## Animation Notes
- **Health/Mana Bars**: Smooth fill/drain at 30 FPS
- **Button Hover**: Simple color shift or glow effect
- **Status Effects**: Gentle pulsing at 6 FPS
- **Damage Numbers**: Rise and fade over 1 second
- **Transitions**: 15-30 frame animations

## Implementation Tips
1. Use 9-slice sprites for scalable UI panels
2. Create hover states for all interactive elements
3. Ensure high contrast for accessibility
4. Test readability at different screen sizes
5. Use consistent spacing and alignment
6. Consider gamepad navigation highlighting
