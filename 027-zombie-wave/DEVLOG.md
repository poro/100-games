# Game 027: Zombie Wave

## The Prompt
> "Create a zombie survival shooter"

## What Was Built
A top-down survival shooter where endless waves of zombies approach from all directions. Features auto-aim shooting, multiple weapon types, XP/leveling system, and roguelike upgrade choices on level-up.

## Key Decisions

### Design Choices
- **Auto-aim**: Player focuses on movement, gun aims at nearest zombie
- **Wave scaling**: More zombies, tougher types as time passes
- **Roguelike upgrades**: Choose 1 of 3 random upgrades on level-up
- **No health pickups**: Survive as long as possible (pure skill)

### Technical Approach
- **Quadtree for collision**: Efficient with hundreds of zombies
- **Object pooling**: Reuse bullet/zombie objects
- **Delta-time physics**: Consistent gameplay at any framerate

## Code Concepts

### Auto-Aim Toward Nearest Enemy
```javascript
function findNearestZombie() {
    let nearest = null;
    let nearestDist = Infinity;

    for (const zombie of zombies) {
        const dist = distance(player, zombie);
        if (dist < nearestDist) {
            nearest = zombie;
            nearestDist = dist;
        }
    }

    return nearest;
}

function updatePlayer() {
    // ... movement code ...

    // Auto-aim
    const target = findNearestZombie();
    if (target) {
        player.aimAngle = Math.atan2(
            target.y - player.y,
            target.x - player.x
        );
    }

    // Auto-fire
    if (target && player.fireTimer <= 0) {
        shoot(player.aimAngle);
        player.fireTimer = player.fireRate;
    }
    player.fireTimer -= dt;
}
```

### Wave Spawning System
```javascript
function spawnWave() {
    const elapsed = gameTime;
    
    // Calculate difficulty
    const baseCount = 5 + Math.floor(elapsed / 10) * 2;
    const speedMult = 1 + elapsed / 60;
    const healthMult = 1 + elapsed / 45;

    // Spawn from edges
    for (let i = 0; i < baseCount; i++) {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        
        switch(side) {
            case 0: x = -30; y = Math.random() * HEIGHT; break;  // Left
            case 1: x = WIDTH + 30; y = Math.random() * HEIGHT; break; // Right
            case 2: x = Math.random() * WIDTH; y = -30; break;  // Top
            case 3: x = Math.random() * WIDTH; y = HEIGHT + 30; break; // Bottom
        }

        // Occasionally spawn special zombie
        const type = Math.random() < 0.1 ? 'runner' : 
                     Math.random() < 0.05 ? 'tank' : 'basic';

        zombies.push(createZombie(x, y, type, speedMult, healthMult));
    }
}
```

### Roguelike Upgrade System
```javascript
const UPGRADES = [
    { name: 'Damage+', effect: () => player.damage *= 1.2 },
    { name: 'Fire Rate+', effect: () => player.fireRate *= 0.85 },
    { name: 'Speed+', effect: () => player.speed *= 1.15 },
    { name: 'Piercing', effect: () => player.piercing++ },
    { name: 'Multi-shot', effect: () => player.bullets++ },
    { name: 'Health Regen', effect: () => player.regen += 0.5 },
    { name: 'Bigger Bullets', effect: () => player.bulletSize *= 1.3 },
    { name: 'Knockback', effect: () => player.knockback *= 1.5 }
];

function levelUp() {
    paused = true;
    
    // Pick 3 random upgrades
    const choices = shuffleArray([...UPGRADES]).slice(0, 3);
    
    showUpgradeUI(choices, (selected) => {
        selected.effect();
        player.level++;
        player.xpToNext = Math.floor(player.xpToNext * 1.5);
        paused = false;
    });
}
```

### XP and Leveling
```javascript
function killZombie(zombie) {
    player.xp += zombie.xpValue;
    player.kills++;

    // Check level up
    while (player.xp >= player.xpToNext) {
        player.xp -= player.xpToNext;
        levelUp();
    }

    // Drop XP gem
    xpGems.push({
        x: zombie.x,
        y: zombie.y,
        value: zombie.xpValue,
        magnetRange: 50
    });
}

// XP gems get sucked toward player
function updateXPGems() {
    for (const gem of xpGems) {
        const dist = distance(player, gem);
        
        // Magnetic pull when close
        if (dist < gem.magnetRange + player.pickupRange) {
            const pull = 1 - (dist / (gem.magnetRange + player.pickupRange));
            gem.x += (player.x - gem.x) * pull * 0.2;
            gem.y += (player.y - gem.y) * pull * 0.2;
        }

        // Collect when touching
        if (dist < player.size) {
            player.xp += gem.value;
            gem.collected = true;
        }
    }
    xpGems = xpGems.filter(g => !g.collected);
}
```

## Iterations
1. **v1**: Player movement with zombie spawning
2. **v2**: Auto-aim, shooting, and wave scaling
3. **v3**: XP system, roguelike upgrades, special zombie types

## Bugs Encountered
- **Too many zombies lagging**: Hundreds on screen → Object pooling + quadtree
- **Upgrades stacking incorrectly**: Multipliers compounding wrong → Test each upgrade

## Lessons Learned
- Auto-aim makes twin-stick shooters accessible on touch devices
- Roguelike upgrades add replayability to simple mechanics
- Wave scaling needs careful tuning (too fast = frustrating, too slow = boring)

## Time to Build
~90 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Different weapons (shotgun, laser, flamethrower)
- [ ] Passive abilities (damage aura, orbital shields)
- [ ] Boss zombies every 5 minutes
- [ ] Meta-progression (permanent upgrades)

---
*Complexity: ⭐⭐⭐⭐ | Concepts: auto-aim, wave spawning, roguelike upgrades, XP systems, object pooling*
