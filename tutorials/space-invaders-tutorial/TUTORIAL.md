# Space Invaders Tutorial 👾

Learn to build the classic Space Invaders arcade game!

## What You'll Learn

1. **Player ship** - Drawing and moving the player
2. **Shooting mechanics** - Creating and managing bullets
3. **Alien formations** - Grid-based enemy patterns
4. **Alien movement** - The classic side-to-side descent
5. **Collision detection** - Bullets hitting aliens
6. **Wave system** - Increasing difficulty
7. **Polish** - Score, lives, game over

## Step Progression

| Step | File | Concept | What's New |
|------|------|---------|------------|
| 1 | `step1.html` | Player Ship | Draw and move the player |
| 2 | `step2.html` | Shooting | Fire bullets upward |
| 3 | `step3.html` | Alien Grid | Create formation of aliens |
| 4 | `step4.html` | Alien Movement | Side-to-side, then down |
| 5 | `step5.html` | Collision | Bullets destroy aliens |
| 6 | `step6.html` | Alien Attack | Aliens shoot back! |
| 7 | `step7.html` | Complete Game | Waves, score, lives |

## Key Concepts

### Grid-Based Formations
Aliens are stored in a 2D array (rows and columns). Each alien has:
- Position (x, y)
- Status (alive/dead)
- Type (determines appearance and points)

### The Formation Movement Pattern
Space Invaders' iconic movement:
1. All aliens move right together
2. When the rightmost alien hits the edge, ALL aliens:
   - Move down one row
   - Change direction to left
3. Repeat forever, getting faster as fewer remain

### Bullet Management
Both player and aliens can shoot. We track bullets in arrays:
- Player bullets move up (negative Y velocity)
- Alien bullets move down (positive Y velocity)
- Remove bullets that go off-screen or hit something

### Progressive Difficulty
- Fewer aliens = faster movement
- Higher waves = faster bullets, more aggressive shooting
- This creates natural tension as you thin the herd

## Why Space Invaders is Perfect for Learning

- **Grid systems**: Core pattern in many games
- **Projectile management**: Spawning, moving, destroying objects
- **Group behavior**: All aliens move as one formation
- **State management**: Tracking many entities (aliens, bullets)
- **Classic mechanics**: Timeless, satisfying gameplay

## Historical Note

Space Invaders (1978) was one of the first "shoot 'em up" games and helped establish video gaming as a global industry. The aliens move faster as you kill them because the original hardware could process fewer sprites more quickly - a bug that became a beloved feature!

## Try These Challenges After Completing

1. Add defensive barriers that get destroyed
2. Mystery ship that flies across the top
3. Power-ups (rapid fire, shield, multi-shot)
4. Different alien behaviors (diving attacks)
5. Two-player cooperative mode

Happy coding! 🎮
