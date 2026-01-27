# Game 025: Tower Defense Lite

## The Prompt
> "Create a simple tower defense game"

## What Was Built
A path-based tower defense game where enemies follow a winding route and players place towers to stop them. Features 3 tower types (basic, sniper, splash), upgrade system, wave-based gameplay, and lives/money economy.

## Key Decisions

### Design Choices
- **Predefined path**: Enemies follow set route, simplifies pathfinding
- **3 tower types**: Different strategies (fast/weak, slow/strong, AOE)
- **Upgrade system**: Each tower can be upgraded twice
- **10 waves**: Clear progression with boss wave at end

### Technical Approach
- **Waypoint-based movement**: Enemies move toward sequential checkpoints
- **Targeting priority**: Towers target furthest-along enemy in range
- **Projectile system**: Bullets travel to target, don't instant-hit

## Code Concepts

### Waypoint Path Following
```javascript
class Enemy {
    constructor(path) {
        this.path = path;
        this.pathIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;
    }

    update() {
        const target = this.path[this.pathIndex];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 5) {
            // Reached waypoint
            this.pathIndex++;
            if (this.pathIndex >= this.path.length) {
                // Reached end - damage player
                lives--;
                this.dead = true;
            }
        } else {
            // Move toward waypoint
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }

    // Progress for targeting priority
    get progress() {
        return this.pathIndex + (distance to next waypoint);
    }
}
```

### Tower Targeting (Furthest First)
```javascript
class Tower {
    findTarget() {
        let bestTarget = null;
        let bestProgress = -1;

        for (const enemy of enemies) {
            const dist = distance(this, enemy);
            if (dist <= this.range && enemy.progress > bestProgress) {
                bestTarget = enemy;
                bestProgress = enemy.progress;
            }
        }

        return bestTarget;
    }

    update() {
        this.cooldown--;
        if (this.cooldown <= 0) {
            const target = this.findTarget();
            if (target) {
                this.shoot(target);
                this.cooldown = this.fireRate;
            }
        }
    }
}
```

### Different Tower Types
```javascript
const TOWER_TYPES = {
    basic: {
        cost: 50,
        range: 80,
        damage: 10,
        fireRate: 30,
        color: '#4a7'
    },
    sniper: {
        cost: 100,
        range: 150,
        damage: 50,
        fireRate: 90,
        color: '#47a'
    },
    splash: {
        cost: 75,
        range: 60,
        damage: 15,
        fireRate: 45,
        splashRadius: 40,
        color: '#a74'
    }
};

// Splash damage on hit
if (this.type === 'splash') {
    for (const enemy of enemies) {
        if (distance(target, enemy) < this.splashRadius) {
            enemy.takeDamage(this.damage * 0.5);  // Half damage to splash targets
        }
    }
}
```

### Wave Spawning System
```javascript
const WAVES = [
    { count: 5, type: 'basic', delay: 1000 },
    { count: 8, type: 'basic', delay: 800 },
    { count: 5, type: 'fast', delay: 600 },
    { count: 10, type: 'basic', delay: 500 },
    // ... more waves
    { count: 1, type: 'boss', delay: 0 }  // Wave 10: Boss
];

function spawnWave(waveIndex) {
    const wave = WAVES[waveIndex];
    let spawned = 0;

    const interval = setInterval(() => {
        spawnEnemy(wave.type);
        spawned++;
        if (spawned >= wave.count) {
            clearInterval(interval);
        }
    }, wave.delay);
}
```

### Upgrade System
```javascript
function upgradeTower(tower) {
    if (tower.level >= 3) return;
    
    const cost = tower.baseCost * tower.level;
    if (money < cost) return;

    money -= cost;
    tower.level++;

    // Scale stats
    tower.damage *= 1.5;
    tower.range *= 1.1;
    tower.fireRate = Math.floor(tower.fireRate * 0.85);

    // Visual indicator
    tower.color = shadeColor(tower.color, tower.level * 20);
}
```

## Iterations
1. **v1**: Path, enemies, and single tower type
2. **v2**: Multiple tower types and targeting
3. **v3**: Wave system, upgrades, economy balance

## Bugs Encountered
- **Towers shooting dead enemies**: Target reference persisted → Check `target.dead` before shooting
- **Path not visible**: Hard to know where to place → Draw path clearly with dotted line

## Lessons Learned
- Tower defense is about economy management as much as placement
- "Furthest first" targeting is intuitive and strategic
- Wave pacing matters - too fast = overwhelming, too slow = boring

## Time to Build
~80 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Multiple paths / branching
- [ ] Tower selling (50% refund)
- [ ] Special abilities (freeze all, damage boost)
- [ ] Endless mode with scaling difficulty

---
*Complexity: ⭐⭐⭐⭐ | Concepts: waypoint pathfinding, targeting systems, economy design, wave spawning*
