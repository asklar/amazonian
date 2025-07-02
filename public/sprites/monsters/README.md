# Monster Sprites

## Monster Types
Based on the game code, we need sprites for: Goblin, Orc, Skeleton, and Dragon

## General Specifications
- **Size**: 32x32 pixels for small monsters, 48x48 for large monsters
- **Style**: 8-bit pixel art
- **Animations**: Idle, Walk, Attack, Hit, Death

---

## Goblin (Small, Fast Enemy)
**Size**: 24x32 pixels
**Color Scheme**: Green skin, brown/leather clothing

### Required Files
#### Idle Animation
- `goblin_idle_01.png` - Standing alert
- `goblin_idle_02.png` - Slight movement
- `goblin_idle_03.png` - Head turn
- `goblin_idle_04.png` - Return to alert

#### Walking/Patrol
- `goblin_walk_01.png` - Left foot forward
- `goblin_walk_02.png` - Mid stride
- `goblin_walk_03.png` - Right foot forward
- `goblin_walk_04.png` - Mid stride

#### Attack
- `goblin_attack_01.png` - Wind up with crude weapon
- `goblin_attack_02.png` - Strike forward
- `goblin_attack_03.png` - Recovery

#### Hit/Stun
- `goblin_hit_01.png` - Impact reaction
- `goblin_hit_02.png` - Stagger back

#### Death
- `goblin_death_01.png` - Fatal hit
- `goblin_death_02.png` - Falling
- `goblin_death_03.png` - On ground
- `goblin_death_04.png` - Disappearing

---

## Orc (Medium Strength Enemy)
**Size**: 32x40 pixels
**Color Scheme**: Gray-green skin, metal armor pieces

### Required Files
#### Idle Animation
- `orc_idle_01.png` - Menacing stance
- `orc_idle_02.png` - Breathing
- `orc_idle_03.png` - Weapon adjustment
- `orc_idle_04.png` - Return to stance

#### Walking/Patrol
- `orc_walk_01.png` - Heavy left step
- `orc_walk_02.png` - Weight shift
- `orc_walk_03.png` - Heavy right step
- `orc_walk_04.png` - Weight shift

#### Attack
- `orc_attack_01.png` - Raise weapon overhead
- `orc_attack_02.png` - Mid swing
- `orc_attack_03.png` - Impact/follow through
- `orc_attack_04.png` - Recovery

#### Hit/Stun
- `orc_hit_01.png` - Taking damage
- `orc_hit_02.png` - Stagger/recoil

#### Death
- `orc_death_01.png` - Mortal blow
- `orc_death_02.png` - Stumbling
- `orc_death_03.png` - Falling
- `orc_death_04.png` - Final collapse

---

## Skeleton (Undead Enemy)
**Size**: 28x40 pixels
**Color Scheme**: Bone white, dark eye sockets, tattered remains

### Required Files
#### Idle Animation
- `skeleton_idle_01.png` - Eerie stillness
- `skeleton_idle_02.png` - Bone rattle
- `skeleton_idle_03.png` - Head turn
- `skeleton_idle_04.png` - Return to stillness

#### Walking/Patrol
- `skeleton_walk_01.png` - Jerky left step
- `skeleton_walk_02.png` - Bone adjustment
- `skeleton_walk_03.png` - Jerky right step
- `skeleton_walk_04.png` - Bone adjustment

#### Attack
- `skeleton_attack_01.png` - Claw ready
- `skeleton_attack_02.png` - Swipe across
- `skeleton_attack_03.png` - Follow through

#### Hit/Stun
- `skeleton_hit_01.png` - Bones rattling from impact
- `skeleton_hit_02.png` - Bones separating slightly

#### Death
- `skeleton_death_01.png` - Bones starting to separate
- `skeleton_death_02.png` - Partial collapse
- `skeleton_death_03.png` - Bones scattering
- `skeleton_death_04.png` - Pile of bones

---

## Dragon (Boss-level Enemy)
**Size**: 64x48 pixels
**Color Scheme**: Dark red/purple scales, glowing eyes

### Required Files
#### Idle Animation
- `dragon_idle_01.png` - Powerful stance
- `dragon_idle_02.png` - Wing adjustment
- `dragon_idle_03.png` - Head movement
- `dragon_idle_04.png` - Tail swish
- `dragon_idle_05.png` - Breathing
- `dragon_idle_06.png` - Return to stance

#### Walking/Patrol
- `dragon_walk_01.png` - Left claw forward
- `dragon_walk_02.png` - Body movement
- `dragon_walk_03.png` - Right claw forward
- `dragon_walk_04.png` - Body movement
- `dragon_walk_05.png` - Wing flap
- `dragon_walk_06.png` - Tail adjustment

#### Attack
- `dragon_attack_01.png` - Rear back
- `dragon_attack_02.png` - Prepare fire breath
- `dragon_attack_03.png` - Breathing fire
- `dragon_attack_04.png` - Fire continuing
- `dragon_attack_05.png` - Fire ending
- `dragon_attack_06.png` - Recovery

#### Hit/Stun
- `dragon_hit_01.png` - Recoil from impact
- `dragon_hit_02.png` - Angry reaction

#### Death
- `dragon_death_01.png` - Mortal wound
- `dragon_death_02.png` - Staggering
- `dragon_death_03.png` - Falling forward
- `dragon_death_04.png` - Collapse
- `dragon_death_05.png` - Final breath
- `dragon_death_06.png` - Still

## Directional Variants
All monsters need left and right facing versions:
- Use `_left` and `_right` suffixes
- Or implement sprite flipping in code

## Special Effects
### Burning Animation (overlay)
- `monster_burn_01.png` - Small flames
- `monster_burn_02.png` - Medium flames  
- `monster_burn_03.png` - Large flames
- `monster_burn_04.png` - Diminishing flames

### Hit Flash Effect (overlay)
- `monster_hit_flash.png` - White/red overlay for hit feedback

## Animation Timing
- **Idle**: 4-6 frames at 6-8 FPS
- **Walking**: 4-6 frames at 8-10 FPS
- **Attack**: 3-6 frames at 10-12 FPS
- **Hit**: 2 frames at 10 FPS
- **Death**: 4-6 frames at 6-8 FPS
- **Burning**: 4 frames at 12 FPS (loops)
