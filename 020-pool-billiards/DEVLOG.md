# Game 020: Pool (Billiards)

## The Prompt
> "Create a pool/billiards game"

## What Was Built
A classic 8-ball pool game with realistic physics. Features turn-based 2-player gameplay, cue stick aiming, power control, ball-ball collisions, and pocketing with proper rules.

## Key Decisions

### Design Choices
- **8-ball rules**: Solids/stripes assignment, 8-ball wins/loses
- **Drag-to-aim**: Intuitive cue stick control
- **6 pockets**: Traditional pool table layout
- **Friction decay**: Balls slow realistically

### Technical Approach
- **Full elastic collision**: Momentum conservation for all balls
- **Cue ball placement**: After scratch, click to place
- **Turn management**: Switch on miss, continue on pocket

## Code Concepts

### Pool Ball Collision Physics
```javascript
function collideBalls(b1, b2) {
    const dx = b2.x - b1.x;
    const dy = b2.y - b1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < BALL_RADIUS * 2 && dist > 0) {
        const nx = dx / dist;
        const ny = dy / dist;

        // Relative velocity
        const dvx = b1.vx - b2.vx;
        const dvy = b1.vy - b2.vy;
        const dvn = dvx * nx + dvy * ny;

        if (dvn > 0) return;  // Moving apart

        // Equal mass elastic collision
        b1.vx -= dvn * nx;
        b1.vy -= dvn * ny;
        b2.vx += dvn * nx;
        b2.vy += dvn * ny;

        // Separate balls
        const overlap = BALL_RADIUS * 2 - dist;
        b1.x -= overlap / 2 * nx;
        b1.y -= overlap / 2 * ny;
        b2.x += overlap / 2 * nx;
        b2.y += overlap / 2 * ny;
    }
}
```

### Cue Stick Aiming
```javascript
function drawCue() {
    if (!isAiming || cueBall.sunk) return;

    const dx = mouseX - cueBall.x;
    const dy = mouseY - cueBall.y;
    const angle = Math.atan2(dy, dx);
    const power = Math.min(Math.sqrt(dx*dx + dy*dy), MAX_POWER);

    ctx.save();
    ctx.translate(cueBall.x, cueBall.y);
    ctx.rotate(angle + Math.PI);  // Point away from mouse

    // Cue stick
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(BALL_RADIUS + power * 0.5, -3, CUE_LENGTH, 6);

    // Power indicator
    ctx.strokeStyle = `rgba(255, 0, 0, ${power / MAX_POWER})`;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(power * 3, 0);  // Aim line
    ctx.stroke();

    ctx.restore();
}
```

### Pocket Detection
```javascript
const POCKETS = [
    { x: 25, y: 25 },           // Top-left
    { x: WIDTH/2, y: 15 },      // Top-center
    { x: WIDTH - 25, y: 25 },   // Top-right
    { x: 25, y: HEIGHT - 25 },  // Bottom-left
    { x: WIDTH/2, y: HEIGHT - 15 }, // Bottom-center
    { x: WIDTH - 25, y: HEIGHT - 25 } // Bottom-right
];

function checkPockets(ball) {
    for (const pocket of POCKETS) {
        const dx = ball.x - pocket.x;
        const dy = ball.y - pocket.y;
        if (Math.sqrt(dx*dx + dy*dy) < POCKET_RADIUS) {
            return pocket;
        }
    }
    return null;
}
```

### Turn-Based Logic
```javascript
function handlePocketedBall(ball) {
    if (ball === cueBall) {
        // Scratch - other player places cue ball
        scratch = true;
        switchPlayer();
    } else if (ball.number === 8) {
        // 8-ball - win if all yours are gone, else lose
        if (player.ballsPocketed === 7) {
            gameWin(currentPlayer);
        } else {
            gameLose(currentPlayer);
        }
    } else {
        // Regular ball
        player.ballsPocketed++;
        pocketedThisTurn = true;
    }
}

function endTurn() {
    if (!pocketedThisTurn) {
        switchPlayer();
    }
    pocketedThisTurn = false;
}
```

## Iterations
1. **v1**: Ball physics and pocketing
2. **v2**: Cue stick aiming and shooting
3. **v3**: 8-ball rules, turn management, win conditions

## Bugs Encountered
- **Balls vibrating**: Multiple collisions per frame → Process all collisions then separate
- **Cue ball after scratch**: Placement allowed on balls → Check for overlaps on place

## Lessons Learned
- Pool physics are simpler than expected (equal mass elastic)
- Visual feedback (aim line, power indicator) is crucial
- Turn-based games need clear state management

## Time to Build
~75 minutes (prompt to playable)

## Ideas for Improvement
- [ ] AI opponent
- [ ] 9-ball variant
- [ ] Spin/english on cue ball
- [ ] Online multiplayer

---
*Complexity: ⭐⭐⭐⭐ | Concepts: elastic collision, aim/power mechanics, turn-based logic, rule implementation*
