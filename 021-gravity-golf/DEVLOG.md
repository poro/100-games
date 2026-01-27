# Game 021: Gravity Golf

## The Prompt
> "Create a gravity-defying golf game with planets"

## What Was Built
A physics-based golf game set in space where planetary gravity affects ball trajectory. Features drag-to-shoot mechanics, 3 unique levels with different gravitational bodies, and a par scoring system.

## Key Decisions

### Design Choices
- **Planetary gravity wells**: Each body attracts the ball with inverse-square falloff
- **Par scoring**: Adds competitive element beyond just completion
- **3 levels**: Increasing gravitational complexity

### Technical Approach
- **N-body gravity**: Ball affected by all planets simultaneously
- **Trajectory preview**: Shows predicted path before shot
- **Stroke limit**: Prevents infinite attempts

## Code Concepts

### Gravity Calculation (Inverse Square Law)
```javascript
function applyGravity() {
    for (const planet of planets) {
        const dx = planet.x - ball.x;
        const dy = planet.y - ball.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        if (dist < planet.radius) {
            // Ball hit planet surface
            resetBall();
            return;
        }

        // F = G * M / r²
        const force = planet.mass * GRAVITY_CONSTANT / distSq;
        
        // Apply force in direction of planet
        ball.vx += (dx / dist) * force;
        ball.vy += (dy / dist) * force;
    }
}
```

### Trajectory Prediction
```javascript
function drawTrajectory() {
    if (!isAiming) return;

    const power = Math.min(dragDistance, MAX_POWER);
    let simBall = {
        x: ball.x,
        y: ball.y,
        vx: -dragDx * power * 0.1,
        vy: -dragDy * power * 0.1
    };

    ctx.beginPath();
    ctx.moveTo(simBall.x, simBall.y);

    // Simulate 100 steps
    for (let i = 0; i < 100; i++) {
        // Apply gravity to simulation
        for (const planet of planets) {
            const dx = planet.x - simBall.x;
            const dy = planet.y - simBall.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const force = planet.mass * G / (dist * dist);
            simBall.vx += (dx / dist) * force;
            simBall.vy += (dy / dist) * force;
        }

        simBall.x += simBall.vx;
        simBall.y += simBall.vy;
        ctx.lineTo(simBall.x, simBall.y);

        // Stop if hits planet
        if (checkPlanetCollision(simBall)) break;
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.stroke();
}
```

### Level Design with Gravity Wells
```javascript
const LEVELS = [
    {
        start: { x: 50, y: 200 },
        hole: { x: 350, y: 200 },
        par: 2,
        planets: [
            { x: 200, y: 200, radius: 40, mass: 5000 }
        ]
    },
    {
        start: { x: 50, y: 100 },
        hole: { x: 350, y: 300 },
        par: 3,
        planets: [
            { x: 150, y: 150, radius: 35, mass: 4000 },
            { x: 250, y: 250, radius: 45, mass: 6000 }
        ]
    },
    // Level 3: Slingshot required
    {
        start: { x: 50, y: 200 },
        hole: { x: 50, y: 300 },  // Behind starting point!
        par: 4,
        planets: [
            { x: 300, y: 200, radius: 50, mass: 8000 }
        ]
    }
];
```

### Hole Detection with Velocity Check
```javascript
function checkHole() {
    const dx = ball.x - hole.x;
    const dy = ball.y - hole.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const speed = Math.sqrt(ball.vx² + ball.vy²);

    // Must be in hole AND moving slowly enough
    if (dist < HOLE_RADIUS && speed < MAX_CAPTURE_SPEED) {
        levelComplete();
        return true;
    }
    return false;
}
```

## Iterations
1. **v1**: Drag-to-shoot mechanics with single planet
2. **v2**: Multiple gravity wells and trajectory preview
3. **v3**: Level system, par scoring, visual polish

## Bugs Encountered
- **Ball stuck in orbit**: Could orbit forever → Added max time before reset
- **Trajectory too slow**: Calculating 500 points lagged → Reduced to 100 with early termination

## Lessons Learned
- Gravity slingshots are satisfying to execute
- Trajectory preview transforms frustration into strategy
- Simple physics (inverse square) creates emergent complexity

## Time to Build
~55 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Black holes (no escape!)
- [ ] Moving planets
- [ ] Wormhole portals
- [ ] Level editor with gravity painting

---
*Complexity: ⭐⭐⭐ | Concepts: gravity simulation, trajectory prediction, inverse-square law, orbital mechanics*
