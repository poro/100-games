# Game 009: Coin Collector

## The Prompt
> "Create a coin collection game with different coin types"

## What Was Built
A 60-second arcade game where players control a character to collect coins of varying values while avoiding bombs. Features smooth 8-directional movement, auto-despawning collectibles, and detailed end-game statistics.

## Key Decisions

### Design Choices
- **3 coin tiers + bombs**: Gold (10), Silver (5), Bronze (1), Bomb (-20)
- **Weighted spawning**: Common coins appear more often than rare ones
- **Time limit**: 60 seconds creates urgency without being frustrating

### Technical Approach
- **Velocity-based movement**: Smooth diagonal movement with normalization
- **Circle collision**: Simple and effective for round objects
- **Floating text feedback**: Shows point gains/losses at collection point

## Code Concepts

### 8-Directional Movement with Normalization
```javascript
function updatePlayer() {
    player.dx = 0;
    player.dy = 0;

    if (keys['w'] || keys['arrowup']) player.dy = -player.speed;
    if (keys['s'] || keys['arrowdown']) player.dy = player.speed;
    if (keys['a'] || keys['arrowleft']) player.dx = -player.speed;
    if (keys['d'] || keys['arrowright']) player.dx = player.speed;

    // Normalize diagonal movement
    if (player.dx !== 0 && player.dy !== 0) {
        player.dx *= 0.707;  // 1/√2
        player.dy *= 0.707;
    }

    player.x += player.dx;
    player.y += player.dy;
}
```

### Circle-Circle Collision Detection
```javascript
function checkCollisions() {
    const playerCenterX = player.x + player.size / 2;
    const playerCenterY = player.y + player.size / 2;
    
    collectibles.forEach((c, i) => {
        const coinCenterX = c.x + c.size / 2;
        const coinCenterY = c.y + c.size / 2;
        
        const dx = playerCenterX - coinCenterX;
        const dy = playerCenterY - coinCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < (player.size + c.size) / 2 - 5) {
            // Collision!
            score = Math.max(0, score + c.value);
            collectibles.splice(i, 1);
        }
    });
}
```

### Pulsing Animation Effect
```javascript
function drawCollectibles() {
    collectibles.forEach(c => {
        c.pulse = (c.pulse + 0.1) % (Math.PI * 2);
        const pulseScale = 1 + Math.sin(c.pulse) * 0.1;
        const size = c.size * pulseScale;
        // Draw at animated size
    });
}
```

## Iterations
1. **v1**: Basic movement and single coin type
2. **v2**: Multiple coin types with weighted spawning
3. **v3**: Bombs, stats tracking, visual polish

## Bugs Encountered
- **Diagonal too fast**: Moving diagonally was √2 faster → Applied 0.707 multiplier
- **Coins spawning on player**: No spawn distance check → Added minimum distance from player

## Lessons Learned
- Diagonal normalization is essential for fair 8-directional movement
- Weighted spawning creates more interesting risk/reward decisions
- End-game stats make each run feel meaningful

## Time to Build
~40 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Power-ups (magnet, speed boost, shield)
- [ ] Enemy chasers
- [ ] Combo multiplier for quick collections
- [ ] Multiple arenas/themes

---
*Complexity: ⭐⭐ | Concepts: 8-directional movement, vector normalization, weighted random, collision detection*
