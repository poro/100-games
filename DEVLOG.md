# 100 Games Development Log

A learning resource showing how each game was created with AI assistance.

## Structure

Each game folder contains:
- `index.html` — The playable game
- `DEVLOG.md` — Creation story: prompt, iterations, lessons learned

## Games Index

| # | Game | Complexity | Key Concepts |
|---|------|------------|--------------|
| 001 | Click Counter | ⭐ | DOM events, state management |
| 002 | Whack-a-Mole | ⭐⭐ | Timers, randomization, CSS animations |
| 003 | Balloon Pop | ⭐ | Click events, dynamic element creation |
| 004 | Color Match | ⭐⭐ | Color theory, user input validation |
| 005 | Speed Clicker | ⭐ | Timing, performance measurement |
| 006 | Target Practice | ⭐⭐ | Mouse tracking, collision detection |
| 007 | Simon Says | ⭐⭐ | Sequences, audio feedback, memory |
| 008 | Maze Walker | ⭐⭐⭐ | Maze generation, pathfinding, keyboard input |
| 009 | Coin Collector | ⭐⭐ | Player movement, collision, scoring |
| 010 | Dodge the Blocks | ⭐⭐ | Obstacle spawning, difficulty scaling |
| 011 | Snake Classic | ⭐⭐⭐ | Game loop, grid movement, self-collision |
| 012 | Pac-Man Lite | ⭐⭐⭐ | Tile maps, AI patterns, power-ups |
| 013 | Ice Sliding Puzzle | ⭐⭐⭐ | Momentum physics, level design |
| 014 | Tank Patrol | ⭐⭐⭐ | Rotation, projectiles, enemy AI |
| 015 | Pong | ⭐⭐ | Ball physics, paddle AI, 2-player |
| 016 | Breakout | ⭐⭐⭐ | Brick destruction, angle reflection |
| 017 | Bouncing Balls | ⭐⭐ | Physics simulation, energy conservation |
| 018 | Air Hockey | ⭐⭐⭐ | Momentum transfer, friction |
| 019 | Pinball Simple | ⭐⭐⭐⭐ | Complex physics, flippers, bumpers |
| 020 | Pool Billiards | ⭐⭐⭐⭐ | Ball-to-ball collision, friction |
| 021 | Gravity Golf | ⭐⭐⭐ | Gravitational forces, orbital mechanics |
| 022 | Space Invaders | ⭐⭐⭐ | Wave patterns, shooting mechanics |
| 023 | Galaga Clone | ⭐⭐⭐ | Enemy formations, dive patterns |
| 024 | Asteroid Shooter | ⭐⭐⭐ | Rotation, thrust, screen wrapping |
| 025 | Tower Defense Lite | ⭐⭐⭐⭐ | Pathfinding, tower placement, waves |
| 026 | Duck Hunt | ⭐⭐⭐ | Click accuracy, movement patterns |
| 027 | Zombie Wave | ⭐⭐⭐ | Survival mechanics, spawning systems |

## Common Patterns

### Game Loop
```javascript
function gameLoop() {
    update();    // Physics, AI, input
    render();    // Draw everything
    requestAnimationFrame(gameLoop);
}
```

### Collision Detection (Circle)
```javascript
function circlesCollide(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    return dist < a.radius + b.radius;
}
```

### Collision Detection (Rectangle)
```javascript
function rectsCollide(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
}
```

## Prompting Lessons

### What Works Well
- Start with the core mechanic: "Make a game where..."
- Specify the input method: "Use arrow keys" / "Click to shoot"
- Request specific visual style: "Retro pixel art" / "Neon glow"
- Ask for progressive difficulty

### Common Issues & Fixes
- **Game too fast/slow**: Specify frame rate or speed values
- **Controls feel sluggish**: Ask for "responsive" or "tight" controls
- **Too easy/hard**: Request difficulty tuning with specific numbers
- **Boring visuals**: Ask for juice (particles, screen shake, sound)

---

*Individual game DEVLOGs coming soon...*
