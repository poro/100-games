# Game 015: Pong

## The Prompt
> "Create the classic Pong game"

## What Was Built
A polished recreation of the original Pong with single-player (vs AI) mode. Features paddle physics that affect ball angle, progressive speed increases, and a first-to-7 win condition.

## Key Decisions

### Design Choices
- **Single player vs AI**: More accessible than requiring two players
- **Speed escalation**: Ball gets faster with each paddle hit
- **Angled returns**: Hit position on paddle affects ball trajectory

### Technical Approach
- **Simple AI**: Tracks ball Y position with slight delay
- **Physics-based angles**: Where ball hits paddle determines bounce angle
- **Responsive canvas**: Maintains aspect ratio on any screen size

## Code Concepts

### Paddle Hit Angle Calculation
```javascript
// Where on paddle (0 to 1, 0.5 = center)
const hitPos = (ball.y - paddle.y) / paddle.height;

// Convert to angle (-63° to 63°)
const angle = (hitPos - 0.5) * Math.PI * 0.7;

// Apply to ball velocity
const speed = Math.sqrt(ball.dx² + ball.dy²);
ball.dx = speed * Math.sin(angle);  // Horizontal based on angle
ball.dy = -speed * Math.cos(angle); // Vertical based on angle
```

### Simple AI with Imperfection
```javascript
function updateAI() {
    const aiTarget = ball.y - cpu.height / 2;
    const aiDiff = aiTarget - cpu.y;
    
    // AI has delay - doesn't instantly track
    if (Math.abs(aiDiff) > 10) {
        cpu.y += Math.sign(aiDiff) * Math.min(Math.abs(aiDiff), AI_SPEED);
    }
    
    // Clamp to bounds
    cpu.y = Math.max(0, Math.min(canvas.height - cpu.height, cpu.y));
}
```

### Speed Escalation
```javascript
// On paddle hit:
if (speedMultiplier < MAX_SPEED_MULTIPLIER) {
    speedMultiplier += SPEED_INCREMENT;
}

// Ball movement uses multiplier:
ball.x += ball.dx * speedMultiplier;
ball.y += ball.dy * speedMultiplier;
```

### Touch Controls
```javascript
canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    touchY = e.touches[0].clientY - rect.top;
});

// In update:
if (touchY !== null) {
    const targetY = touchY - player.height / 2;
    const diff = targetY - player.y;
    player.y += Math.sign(diff) * Math.min(Math.abs(diff), PADDLE_SPEED * 1.5);
}
```

## Iterations
1. **v1**: Ball bouncing and paddle movement
2. **v2**: Scoring system and AI opponent
3. **v3**: Angle physics, speed scaling, touch controls

## Bugs Encountered
- **Ball stuck in paddle**: Could get trapped inside → Teleport ball to paddle edge on collision
- **AI too perfect**: Never missed → Added reaction delay and speed limit

## Lessons Learned
- Classic Pong physics are simpler than they seem
- AI imperfection makes games fun (beatable but challenging)
- Touch controls need different handling than keyboard

## Time to Build
~40 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Two-player local mode
- [ ] Power-ups (larger paddle, faster ball)
- [ ] Multiple balls
- [ ] Curved paddle for spin shots

---
*Complexity: ⭐⭐ | Concepts: basic physics, AI opponent, angle calculation, touch controls*
