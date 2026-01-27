# Game 023: Galaga Clone

## The Prompt
> "Build a Galaga-style shooter with diving enemies and formation patterns"

## What Makes Galaga Different from Space Invaders?

1. **Enemies dive at player** (not just march down)
2. **Enemies return to formation** after diving
3. **More dynamic movement patterns**
4. **Tractor beam / capture mechanic** (optional)

## Key Concepts

### Enemy States
Each enemy has a state machine:

```javascript
const ENEMY_STATES = {
    FORMING: 'forming',    // Flying into position
    IN_FORMATION: 'in_formation',
    DIVING: 'diving',      // Attacking player
    RETURNING: 'returning' // Flying back to position
};
```

### Dive Attack Pattern
Enemies follow curved paths when diving:

```javascript
function updateDivingEnemy(enemy) {
    // Follow a bezier curve toward player
    enemy.t += 0.02; // Progress along path
    
    if (enemy.t < 0.5) {
        // First half: curve down
        enemy.x += Math.sin(enemy.t * Math.PI) * 2;
        enemy.y += 4;
    } else {
        // Second half: curve back up
        enemy.y -= 2;
        // Head toward formation slot
    }
    
    if (enemy reaches formation) {
        enemy.state = 'in_formation';
    }
}
```

### Wave System
New enemies fly in at the start of each wave:

```javascript
function startWave(waveNum) {
    // Spawn enemies that fly in from top
    const entranceDelay = 100; // ms between each enemy
    
    formationSlots.forEach((slot, i) => {
        setTimeout(() => {
            spawnEnemy(slot, entrancePath);
        }, i * entranceDelay);
    });
}
```

### Double Ship Mechanic
In real Galaga, captured ships can be rescued for dual firepower. Simplified version:

```javascript
if (player.hasDouble) {
    // Fire two bullets
    bullets.push({ x: player.x - 10, y: player.y });
    bullets.push({ x: player.x + 10, y: player.y });
}
```

## Visual Polish
- Neon glow effects with `text-shadow`
- Star field background (parallax scrolling)
- Ship explosion particles
- Smooth sprite-like shapes with clip-path

## Lessons Learned
1. State machines make complex AI manageable
2. Bezier curves create smooth, organic movement
3. Wave-based spawning creates rhythm and pacing

---
*Complexity: ⭐⭐⭐ | Concepts: state machines, bezier curves, wave spawning*
