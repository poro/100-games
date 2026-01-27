# Game 028: Flappy Bird Clone

## The Prompt
> "Create a Flappy Bird clone - tap/click to flap, avoid pipes, score by passing through gaps"

## Design Thinking (Real-Time)

### Core Mechanics Breakdown
Before writing code, I identify the essential systems:

1. **Bird Physics**
   - Gravity pulls bird down (constant acceleration)
   - Tap applies upward velocity (impulse)
   - Bird rotates based on velocity (visual polish)

2. **Pipe System**
   - Pipes spawn off-screen right
   - Move left at constant speed
   - Random gap position (within playable bounds)
   - Despawn when off-screen left

3. **Collision Detection**
   - Bird vs pipes (rectangle collision)
   - Bird vs ground/ceiling (boundary check)

4. **Scoring**
   - +1 when bird passes pipe center
   - Track high score in localStorage

### Technical Decisions

**Canvas vs DOM?**
→ Canvas. Smoother animation, easier collision math, better for physics-based games.

**Fixed vs Variable Timestep?**
→ Fixed with deltaTime compensation. Prevents physics breaking on slow devices.

**How to detect "passed pipe"?**
→ Flag each pipe, mark as scored when bird.x > pipe.x + pipe.width/2

## Building Step by Step

### Step 1: Basic Canvas Setup
First, just get a bird on screen that falls with gravity.

```javascript
// Core game state
const bird = { x: 100, y: 200, vy: 0, radius: 15 };
const GRAVITY = 0.5;
const FLAP_FORCE = -8;

function update() {
    bird.vy += GRAVITY;  // Accelerate downward
    bird.y += bird.vy;   // Apply velocity
}
```

### Step 2: Add Flap Input
Tap anywhere to flap.

```javascript
canvas.addEventListener('click', () => {
    if (gameState === 'playing') {
        bird.vy = FLAP_FORCE;  // Instant velocity change
    }
});
```

Why instant velocity, not acceleration? Because flapping should feel **responsive**. Real physics would have the bird "charge up" but that feels laggy in a game.

### Step 3: Pipe Generation
Spawn pipes at intervals with random gaps.

```javascript
function spawnPipe() {
    const gapY = Math.random() * (canvas.height - GAP_HEIGHT - 100) + 50;
    pipes.push({
        x: canvas.width,
        gapY: gapY,
        scored: false
    });
}
```

The `scored` flag prevents counting the same pipe multiple times.

### Step 4: Collision Detection
Rectangle vs circle (bird is circle, pipes are rectangles).

```javascript
function checkCollision(bird, pipe) {
    // Check against top pipe
    if (bird.x + bird.radius > pipe.x && 
        bird.x - bird.radius < pipe.x + PIPE_WIDTH) {
        if (bird.y - bird.radius < pipe.gapY || 
            bird.y + bird.radius > pipe.gapY + GAP_HEIGHT) {
            return true;
        }
    }
    return false;
}
```

### Step 5: Polish
- Bird rotation based on velocity
- Particle effect on death
- Sound effects (flap, score, hit)
- Smooth animations

## The Final Code
See `index.html` - fully commented.

## Iterations During Development

1. **v1**: Bird falls, can flap - but gravity felt wrong
   - Fix: Adjusted GRAVITY from 0.3 to 0.5, FLAP_FORCE from -6 to -8
   
2. **v2**: Pipes spawn but gaps too hard
   - Fix: Increased GAP_HEIGHT from 100 to 120 pixels

3. **v3**: Collision felt unfair (dying when looked safe)
   - Fix: Reduced bird hitbox radius from 20 to 15 (smaller than visual)

4. **v4**: Game too monotonous
   - Fix: Added progressive speed increase (pipes move faster over time)

## Lessons Learned

1. **"Game feel" is in the numbers** — Gravity, flap force, gap size. Tiny changes = huge feel difference.

2. **Forgiving hitboxes** — Make collision boxes smaller than visuals. Players remember unfair deaths.

3. **Simple core, polish matters** — Flappy Bird is 3 mechanics (gravity, flap, pipes) but the *tuning* makes it addictive.

4. **Progressive difficulty** — Start easy, ramp up. Keeps both new and experienced players engaged.

## Time to Build
~20 minutes (with documentation)

---
*Complexity: ⭐⭐ | Concepts: gravity physics, collision detection, procedural spawning, game feel tuning*
