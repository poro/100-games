# Game 024: Asteroid Shooter

## The Prompt
> "Create an Asteroids game with ship rotation, thrust, and asteroid splitting"

## Key Concepts

### Ship Rotation & Thrust
The player controls a ship with rotate + thrust (no direct movement):

```javascript
// Rotation
if (keys.left) ship.angle -= ROTATION_SPEED;
if (keys.right) ship.angle += ROTATION_SPEED;

// Thrust applies force in facing direction
if (keys.up) {
    ship.vx += Math.cos(ship.angle) * THRUST;
    ship.vy += Math.sin(ship.angle) * THRUST;
}

// Apply velocity
ship.x += ship.vx;
ship.y += ship.vy;

// Friction/drag in space (slight, for playability)
ship.vx *= 0.99;
ship.vy *= 0.99;
```

### Screen Wrapping
Objects that exit one side appear on the opposite:

```javascript
function wrapPosition(obj) {
    if (obj.x < 0) obj.x = canvas.width;
    if (obj.x > canvas.width) obj.x = 0;
    if (obj.y < 0) obj.y = canvas.height;
    if (obj.y > canvas.height) obj.y = 0;
}
```

### Asteroid Splitting
Large asteroids break into smaller ones:

```javascript
function destroyAsteroid(asteroid) {
    score += asteroid.points;
    
    if (asteroid.size > MIN_SIZE) {
        // Spawn 2 smaller asteroids
        for (let i = 0; i < 2; i++) {
            asteroids.push({
                x: asteroid.x,
                y: asteroid.y,
                size: asteroid.size / 2,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                points: asteroid.points * 2 // Smaller = more points
            });
        }
    }
    
    removeAsteroid(asteroid);
}
```

### Asteroid Shapes
Asteroids aren't circles — they're irregular polygons:

```javascript
function createAsteroidShape(radius) {
    const points = [];
    const numPoints = 8 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const variance = 0.7 + Math.random() * 0.6; // 70-130% of radius
        points.push({
            x: Math.cos(angle) * radius * variance,
            y: Math.sin(angle) * radius * variance
        });
    }
    return points;
}
```

### Ship Drawing
Classic triangle ship using canvas paths:

```javascript
function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    
    ctx.beginPath();
    ctx.moveTo(15, 0);      // Nose
    ctx.lineTo(-10, -10);   // Left wing
    ctx.lineTo(-5, 0);      // Rear indent
    ctx.lineTo(-10, 10);    // Right wing
    ctx.closePath();
    
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.restore();
}
```

## Lessons Learned
1. Momentum-based controls feel "floaty" but authentic
2. Screen wrapping creates infinite play space illusion
3. Procedural asteroid shapes add variety with little code
4. Splitting mechanics create exponential chaos

---
*Complexity: ⭐⭐⭐ | Concepts: thrust physics, screen wrapping, procedural shapes*
