# Game 010: Dodge the Blocks

## The Prompt
> "Create a dodging game where blocks fall from above"

## What Was Built
A survival game where players control a spaceship dodging falling blocks. Features progressive difficulty, particle effects, tilt controls on mobile, and a persistent high score system.

## Key Decisions

### Design Choices
- **Endless survival**: No win condition, just survive as long as possible
- **Time-based scoring**: Survival time = score (encourages risk avoidance)
- **Multi-input support**: Keyboard, touch, and device tilt

### Technical Approach
- **Delta time physics**: Frame-rate independent movement
- **Difficulty scaling**: Block speed and spawn rate increase over time
- **Particle system**: Explosion effects on collision

## Code Concepts

### Delta Time Movement
```javascript
function update(dt) {
    // dt = seconds since last frame
    player.x += player.velocityX * dt;
    
    blocks.forEach(block => {
        block.y += block.speed * dt;
    });
    
    score += dt;  // Score = survival time
}
```

### Device Orientation (Tilt) Controls
```javascript
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null) {
            tiltX = e.gamma;  // -90 to 90 degrees
        }
    });
}

// In update:
if (Math.abs(tiltX) > 5) {  // Dead zone
    moveDirection += tiltX / 30;  // Sensitivity
}
```

### Progressive Difficulty
```javascript
function update(dt) {
    difficulty = 1 + score / 10;  // Increases every 10 seconds
    
    const currentSpawnRate = Math.max(minSpawnRate, baseSpawnRate / difficulty);
    
    blockSpawnTimer += dt * 1000;
    if (blockSpawnTimer >= currentSpawnRate) {
        spawnBlock();
        blockSpawnTimer = 0;
    }
}
```

### Smaller Hitbox for Fairness
```javascript
function checkCollision(rect1, rect2) {
    const shrink = 5;  // Forgiveness pixels
    return rect1.x + shrink < rect2.x + rect2.width - shrink &&
           rect1.x + rect1.width - shrink > rect2.x + shrink &&
           // ... y checks
}
```

## Iterations
1. **v1**: Basic falling blocks with keyboard controls
2. **v2**: Added touch and tilt controls
3. **v3**: Particle effects, difficulty scaling, visual polish

## Bugs Encountered
- **Tilt too sensitive**: Small movements caused big reactions → Added dead zone and sensitivity divisor
- **iOS tilt permission**: Required explicit permission request → Added permission request on game start

## Lessons Learned
- Delta time ensures consistent gameplay across frame rates
- Tilt controls need dead zones and sensitivity tuning
- Slightly smaller hitboxes feel more fair to players

## Time to Build
~45 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Power-ups (shield, slow-mo, shrink)
- [ ] Different block types (following, exploding)
- [ ] Multiple lanes/confined movement
- [ ] Boss blocks that take up half the screen

---
*Complexity: ⭐⭐ | Concepts: delta time, device orientation API, progressive difficulty, particle systems*
