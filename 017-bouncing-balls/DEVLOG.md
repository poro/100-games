# Game 017: Bouncing Balls

## The Prompt
> "Create a bouncing balls physics sandbox"

## What Was Built
An interactive physics sandbox where users click/drag to spawn balls that bounce realistically. Features gravity toggle, ball-to-ball collisions, and satisfying visual effects with glow and gradients.

## Key Decisions

### Design Choices
- **Sandbox, not game**: No win condition, pure physics playground
- **Drag to throw**: Intuitive control for setting initial velocity
- **Max 100 balls**: Performance limit for smooth 60fps

### Technical Approach
- **Realistic physics**: Gravity, friction, bounce damping
- **Ball-ball collisions**: Conservation of momentum
- **Visual flair**: Glow effects, rotation, size variation

## Code Concepts

### Ball-Ball Elastic Collision
```javascript
collideWith(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = this.radius + other.radius;

    if (dist < minDist && dist > 0) {
        // Normalize collision vector
        const nx = dx / dist;
        const ny = dy / dist;

        // Relative velocity
        const dvx = this.vx - other.vx;
        const dvy = this.vy - other.vy;

        // Relative velocity along collision normal
        const dvn = dvx * nx + dvy * ny;

        // Don't resolve if separating
        if (dvn > 0) return;

        // Calculate impulse (mass-weighted)
        const impulse = (2 * dvn) / (this.mass + other.mass);

        // Apply impulse
        this.vx -= impulse * other.mass * nx * BOUNCE;
        this.vy -= impulse * other.mass * ny * BOUNCE;
        other.vx += impulse * this.mass * nx * BOUNCE;
        other.vy += impulse * this.mass * ny * BOUNCE;

        // Separate to prevent overlap
        const overlap = (minDist - dist) / 2;
        this.x -= overlap * nx;
        this.y -= overlap * ny;
        other.x += overlap * nx;
        other.y += overlap * ny;
    }
}
```

### Drag-to-Throw Mechanic
```javascript
canvas.addEventListener('mouseup', (e) => {
    if (isDragging) {
        const dx = dragEnd.x - dragStart.x;
        const dy = dragEnd.y - dragStart.y;
        
        // Velocity = opposite of drag direction
        const vx = -dx * 0.15;
        const vy = -dy * 0.15;
        
        spawnBall(dragStart.x, dragStart.y, vx, vy);
        isDragging = false;
    }
});
```

### Gravity Toggle
```javascript
let gravityEnabled = true;

update() {
    if (gravityEnabled) {
        this.vy += GRAVITY;
    }
    
    this.vx *= FRICTION;
    this.vy *= FRICTION;
    
    this.x += this.vx;
    this.y += this.vy;
}
```

### Glow Effect with Gradients
```javascript
draw() {
    // Outer glow
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 1.5);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.5, this.color + '80');  // 50% alpha
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.globalAlpha = this.glowIntensity * 0.3;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 1.5, 0, Math.PI * 2);
    ctx.fill();
}
```

## Iterations
1. **v1**: Spawning balls with gravity
2. **v2**: Wall bouncing and friction
3. **v3**: Ball-ball collisions, visual effects, gravity toggle

## Bugs Encountered
- **Balls overlapping**: Collision didn't separate them → Added overlap separation
- **Balls stacking infinitely**: Bottom balls crushed → Ground friction helps

## Lessons Learned
- Elastic collision math is satisfying when implemented correctly
- Separation is as important as velocity exchange for collision
- Sandboxes are fun even without goals

## Time to Build
~50 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Different shapes (squares, triangles)
- [ ] Sticky/bouncy surface toggle
- [ ] Ball destruction on click
- [ ] Wind/force fields

---
*Complexity: ⭐⭐⭐ | Concepts: elastic collision, momentum conservation, physics simulation, drag interaction*
