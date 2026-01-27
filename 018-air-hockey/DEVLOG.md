# Game 018: Air Hockey

## The Prompt
> "Create an air hockey game"

## What Was Built
A 2-player (or vs AI) air hockey game with realistic puck physics. Features separate play areas for each player, touch controls for mobile, goal detection, and first-to-5 scoring.

## Key Decisions

### Design Choices
- **AI or 2-player**: Toggle between modes for accessibility
- **Confined paddles**: Each player stuck in their half (authentic)
- **Puck physics**: Momentum transfer from paddle movement

### Technical Approach
- **Separate touch tracking**: Each half responds to different fingers
- **Paddle velocity tracking**: Paddle speed affects puck on hit
- **Center line enforcement**: Paddles can't cross midfield

## Code Concepts

### Puck-Paddle Collision with Momentum Transfer
```javascript
function handlePaddleCollision(paddle) {
    const dx = puck.x - paddle.x;
    const dy = puck.y - paddle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = puck.radius + paddle.radius;

    if (dist < minDist) {
        // Normalize
        const nx = dx / dist;
        const ny = dy / dist;

        // Separate
        const overlap = minDist - dist;
        puck.x += nx * overlap;
        puck.y += ny * overlap;

        // Relative velocity
        const relVx = puck.vx - paddle.vx;
        const relVy = puck.vy - paddle.vy;
        const velAlongNormal = relVx * nx + relVy * ny;

        if (velAlongNormal < 0) {
            // Impulse with paddle momentum
            const impulse = -(1 + BOUNCE) * velAlongNormal;
            puck.vx += impulse * nx + paddle.vx * 0.5;
            puck.vy += impulse * ny + paddle.vy * 0.5;
        }
    }
}
```

### Multi-Touch Zone Detection
```javascript
canvas.addEventListener('touchstart', (e) => {
    for (const touch of e.changedTouches) {
        const pos = getTouchPosition(touch);
        
        if (pos.x < game.width / 2) {
            // Left half = Player 1
            touches.player1 = { id: touch.identifier, x: pos.x, y: pos.y };
        } else if (!game.isAI) {
            // Right half = Player 2 (if not AI)
            touches.player2 = { id: touch.identifier, x: pos.x, y: pos.y };
        }
    }
});
```

### Simple AI Behavior
```javascript
function updateAI() {
    // Track puck when it's coming toward AI
    let targetY = puck.y;
    if (puck.vx > 0) {
        // Predict where puck will be
        const timeToReach = (player2.x - puck.x) / puck.vx;
        targetY = puck.y + puck.vy * timeToReach * 0.7;
    }

    // Move toward prediction with limited speed
    const dx = (puck.x > game.width * 0.4 ? puck.x : game.width * 0.8) - player2.x;
    const dy = targetY - player2.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {
        const speed = Math.min(AI_SPEED, dist * 0.15);
        player2.vx = (dx / dist) * speed;
        player2.vy = (dy / dist) * speed;
    }
}
```

### Goal Detection
```javascript
// Left goal (Player 2 scores)
if (puck.x - puck.radius < goalDepth) {
    if (puck.y > goalTop && puck.y < goalBottom) {
        scoreGoal(2);
        return;
    }
}

// Right goal (Player 1 scores)  
if (puck.x + puck.radius > width - goalDepth) {
    if (puck.y > goalTop && puck.y < goalBottom) {
        scoreGoal(1);
        return;
    }
}
```

## Iterations
1. **v1**: Puck physics and wall bouncing
2. **v2**: Paddle movement and collision
3. **v3**: AI opponent, touch controls, scoring

## Bugs Encountered
- **Puck stuck in paddle**: Collision didn't separate → Added explicit separation
- **Touch zones overlapping**: Both players controlled by same finger → Track touch IDs

## Lessons Learned
- Paddle velocity matters for satisfying physics
- Multi-touch requires careful ID tracking
- AI prediction makes opponents feel smarter

## Time to Build
~60 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Power-ups (speed boost, larger paddle)
- [ ] Online multiplayer
- [ ] Different puck types (heavy, fast)
- [ ] Tournament mode

---
*Complexity: ⭐⭐⭐ | Concepts: momentum physics, multi-touch, AI prediction, zone-based controls*
