# Game 022: Space Invaders

## The Prompt
> "Create a Space Invaders clone with alien formations, player ship, and shooting mechanics"

## Key Concepts

### Enemy Formation Grid
Aliens arranged in rows and columns, moving as a unit:

```javascript
const ROWS = 5;
const COLS = 11;
const enemies = [];

for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
        enemies.push({
            x: startX + col * spacing,
            y: startY + row * spacing,
            type: row, // Different alien types per row
            alive: true
        });
    }
}
```

### Formation Movement Pattern
The classic back-and-forth descent:

```javascript
// Move horizontally
formation.x += formation.direction * SPEED;

// Hit edge? Reverse and descend
if (formation hits wall) {
    formation.direction *= -1;
    formation.y += DESCENT_AMOUNT;
}

// Apply formation offset to each enemy
enemies.forEach(e => {
    e.screenX = formation.x + e.x;
    e.screenY = formation.y + e.y;
});
```

### Shooting Cooldown
Player can only shoot so fast (prevents bullet spam):

```javascript
const FIRE_COOLDOWN = 300; // ms
let lastFire = 0;

function shoot() {
    const now = Date.now();
    if (now - lastFire > FIRE_COOLDOWN) {
        bullets.push({ x: player.x, y: player.y });
        lastFire = now;
    }
}
```

### Enemy Shooting
Random enemies fire periodically:

```javascript
if (Math.random() < ENEMY_FIRE_CHANCE) {
    const shooter = aliveEnemies[randomIndex];
    enemyBullets.push({ x: shooter.x, y: shooter.y });
}
```

## Visual Style
- Classic green-on-black CRT aesthetic
- `text-shadow: 0 0 10px #0f0` for glow effect
- Pulse animation on title text
- Pixelated enemies using simple shapes

## Lessons Learned
1. Formation-based movement is cleaner than individual enemy AI
2. Fire cooldowns prevent gameplay exploits
3. Retro aesthetics are achieved with color + glow, not complex graphics

---
*Complexity: ⭐⭐⭐ | Concepts: grid formations, cooldown timers, retro styling*
