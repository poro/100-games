# Game 003: Balloon Pop

## The Prompt
> "Create a balloon pop game"

## What Was Built
A satisfying clicker game where colorful balloons float upward and players must pop them before they escape. Features weighted random balloon types (rarer = more points), level progression, and particle burst effects.

## Key Decisions

### Design Choices
- **5 balloon types**: Different colors with weighted spawn rates (common → rare)
- **5 lives system**: Balloons that escape cost a life instead of instant game over
- **Wobble animation**: Balloons sway while rising for visual appeal

### Technical Approach
- **Weighted random selection**: Rarer balloons spawn less often
- **requestAnimationFrame loop**: Smooth balloon movement
- **CSS variables for particles**: Dynamic particle trajectories

## Code Concepts

### Weighted Random Selection
```javascript
const balloonTypes = [
    { color: '...', points: 10, weight: 35 },  // Common
    { color: '...', points: 50, weight: 5 }    // Rare
];

function getRandomBalloonType() {
    const totalWeight = balloonTypes.reduce((sum, b) => sum + b.weight, 0);
    let random = Math.random() * totalWeight;
    for (const type of balloonTypes) {
        random -= type.weight;
        if (random <= 0) return type;
    }
}
```

### Smooth Wobble Animation
```javascript
balloon.wobble += balloon.wobbleSpeed;
const wobbleX = Math.sin(balloon.wobble) * balloon.wobbleAmount;
balloon.element.style.transform = `translateX(${wobbleX}px)`;
```

### CSS Particle Explosion
```javascript
particle.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    --tx: ${tx}px;  /* CSS variable for end position */
    --ty: ${ty}px;
`;
// CSS uses: transform: translate(var(--tx), var(--ty))
```

## Iterations
1. **v1**: Basic floating balloons with click to pop
2. **v2**: Added weighted scoring and particle effects
3. **v3**: Level system with increasing speed and spawn rates

## Bugs Encountered
- **Click not registering**: Balloons moving meant click coordinates were off → Used `pointer-events: auto` on balloon, not parent
- **Memory leak**: Balloons not removed from array when escaped → Filter array by active state

## Lessons Learned
- Weighted random is more engaging than pure random
- CSS custom properties (`--var`) are great for dynamic animations
- Always clean up DOM elements AND array references

## Time to Build
~40 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Power-ups (freeze time, double points)
- [ ] Boss balloons that take multiple hits
- [ ] Wind mechanics affecting balloon drift
- [ ] Endless mode with high score chase

---
*Complexity: ⭐⭐ | Concepts: weighted random, requestAnimationFrame, CSS particles, game state management*
