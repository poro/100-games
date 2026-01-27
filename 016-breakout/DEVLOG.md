# Game 016: Breakout

## The Prompt
> "Create the classic Breakout game"

## What Was Built
A brick-breaking game where players bounce a ball off a paddle to destroy bricks. Features multi-hit bricks, particle effects, multiple levels, and mouse/touch paddle control.

## Key Decisions

### Design Choices
- **6 rows × 10 columns**: Classic Breakout density
- **Multi-hit bricks**: Purple and silver bricks require 2 hits
- **3 lives**: Forgiving but creates tension
- **Level progression**: Ball speeds up each level

### Technical Approach
- **Scaled rendering**: Design at 600×700, scale to fit screen
- **Collision side detection**: Determines whether ball bounces X or Y
- **Particle system**: Burst effects on brick destruction

## Code Concepts

### Collision Side Detection
```javascript
function checkBrickCollision(ball, brick) {
    if (!rectCollision(ball, brick)) return;
    
    // Determine which side was hit
    const overlapLeft = ball.x + ball.radius - brick.x;
    const overlapRight = brick.x + brick.width - (ball.x - ball.radius);
    const overlapTop = ball.y + ball.radius - brick.y;
    const overlapBottom = brick.y + brick.height - (ball.y - ball.radius);
    
    const minOverlapX = Math.min(overlapLeft, overlapRight);
    const minOverlapY = Math.min(overlapTop, overlapBottom);
    
    if (minOverlapX < minOverlapY) {
        ball.dx = -ball.dx;  // Hit from side
    } else {
        ball.dy = -ball.dy;  // Hit from top/bottom
    }
}
```

### Paddle Angle Control
```javascript
// Ball hits paddle - angle based on position
const hitPos = (ball.x - paddle.x) / paddle.width;  // 0 to 1
const angle = (hitPos - 0.5) * Math.PI * 0.7;       // -63° to 63°

const speed = Math.sqrt(ball.dx² + ball.dy²);
ball.dx = speed * Math.sin(angle);
ball.dy = -speed * Math.cos(angle);  // Always bounces up
```

### Particle Burst Effect
```javascript
function createParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1,
            color: color,
            size: Math.random() * 4 + 2
        });
    }
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;  // Gravity
        p.life -= 0.02;
    });
    particles = particles.filter(p => p.life > 0);
}
```

### Scaled Canvas Rendering
```javascript
function resizeCanvas() {
    const maxWidth = Math.min(600, window.innerWidth - 20);
    scale = maxWidth / 600;  // Design width
    canvas.width = 600 * scale;
    canvas.height = 700 * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
}
```

## Iterations
1. **v1**: Ball, paddle, and basic brick grid
2. **v2**: Collision detection and brick destruction
3. **v3**: Multi-hit bricks, particles, levels

## Bugs Encountered
- **Ball tunneling through bricks**: High speed skipped collision → Check collision before moving
- **Wrong bounce direction**: Hit corner bounced wrong way → Overlap-based side detection

## Lessons Learned
- Collision side detection is crucial for correct bouncing
- Particles add satisfying feedback for minimal effort
- Scaling with ctx.setTransform() simplifies responsive design

## Time to Build
~55 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Power-up drops (multi-ball, laser, wide paddle)
- [ ] Moving bricks
- [ ] Boss bricks that shoot back
- [ ] Level editor

---
*Complexity: ⭐⭐⭐ | Concepts: collision detection, angle physics, particle systems, canvas scaling*
