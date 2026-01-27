# Game 019: Pinball Simple

## The Prompt
> "Create a simple pinball game"

## What Was Built
A vertical pinball machine with bumpers, targets, and flippers. Features classic pinball physics, combo scoring, ball saver grace period, and 3 balls per game.

## Key Decisions

### Design Choices
- **Vertical layout**: Classic pinball orientation
- **3 bumpers + 3 targets**: Enough variety without clutter
- **3 balls**: Standard pinball rules
- **Ball saver**: 3-second grace period after launch

### Technical Approach
- **Flipper rotation physics**: Angular velocity affects ball on contact
- **Bumper impulse**: Instant velocity boost on contact
- **Tilt detection**: Penalty for too much shaking

## Code Concepts

### Flipper Physics
```javascript
class Flipper {
    constructor(x, y, side) {
        this.pivotX = x;
        this.pivotY = y;
        this.length = 50;
        this.angle = side === 'left' ? 0.4 : Math.PI - 0.4;
        this.targetAngle = this.angle;
        this.angularVelocity = 0;
    }

    flip() {
        this.targetAngle = this.side === 'left' ? -0.5 : Math.PI + 0.5;
    }

    update() {
        // Spring physics toward target
        const diff = this.targetAngle - this.angle;
        this.angularVelocity += diff * FLIPPER_SPRING;
        this.angularVelocity *= FLIPPER_DAMPING;
        this.angle += this.angularVelocity;
    }
}
```

### Ball-Flipper Collision
```javascript
function handleFlipperCollision(ball, flipper) {
    const tipX = flipper.pivotX + Math.cos(flipper.angle) * flipper.length;
    const tipY = flipper.pivotY + Math.sin(flipper.angle) * flipper.length;

    // Project ball onto flipper line
    const closestPoint = projectPointOnLine(ball, flipper.pivot, tip);
    
    if (distanceTo(ball, closestPoint) < ball.radius + FLIPPER_WIDTH) {
        // Normal from flipper surface
        const normal = getNormal(flipper.angle);
        
        // Add flipper angular velocity to ball
        const impactPoint = distanceTo(ball, flipper.pivot);
        const flipperVel = flipper.angularVelocity * impactPoint;
        
        // Bounce with flipper contribution
        ball.vx = -ball.vx * BOUNCE + normal.x * flipperVel;
        ball.vy = -ball.vy * BOUNCE + normal.y * flipperVel;
    }
}
```

### Bumper Impulse
```javascript
function handleBumperCollision(ball, bumper) {
    const dx = ball.x - bumper.x;
    const dy = ball.y - bumper.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = ball.radius + bumper.radius;

    if (dist < minDist) {
        // Normalize direction
        const nx = dx / dist;
        const ny = dy / dist;

        // Push ball away with fixed impulse
        ball.vx = nx * BUMPER_FORCE;
        ball.vy = ny * BUMPER_FORCE;

        // Activate bumper visual
        bumper.active = true;
        setTimeout(() => bumper.active = false, 100);

        addScore(100);
    }
}
```

### Ball Saver System
```javascript
let ballSaverActive = false;

function launchBall() {
    ball.x = LAUNCH_X;
    ball.y = LAUNCH_Y;
    ball.vx = 0;
    ball.vy = -LAUNCH_FORCE;

    ballSaverActive = true;
    setTimeout(() => ballSaverActive = false, 3000);
}

function checkBallLost() {
    if (ball.y > DRAIN_Y) {
        if (ballSaverActive) {
            launchBall();  // Save the ball
            playSound('saved');
        } else {
            balls--;
            if (balls > 0) launchBall();
            else gameOver();
        }
    }
}
```

## Iterations
1. **v1**: Ball physics with gravity and walls
2. **v2**: Flippers with rotation physics
3. **v3**: Bumpers, targets, scoring, ball saver

## Bugs Encountered
- **Ball through flipper**: High speed clipped → Increased collision radius and used continuous detection
- **Flipper jitter**: Spring physics oscillated → Added damping factor

## Lessons Learned
- Flipper physics are surprisingly complex (rotation + collision)
- Ball saver prevents frustration on launch
- Bumpers should have fixed impulse, not momentum-based

## Time to Build
~70 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Multi-ball mode
- [ ] Ramps and rails
- [ ] Skill shot from launcher
- [ ] Jackpot accumulator

---
*Complexity: ⭐⭐⭐⭐ | Concepts: angular physics, line collision, impulse forces, ball saver mechanic*
