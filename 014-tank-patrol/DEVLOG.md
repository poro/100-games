# Game 014: Tank Patrol

## The Prompt
> "Create a tank maze navigation game"

## What Was Built
A top-down tank game where players navigate through mazes while avoiding mines. Features realistic tank controls (rotate + forward/backward), 3 levels, and obstacle collision detection.

## Key Decisions

### Design Choices
- **Tank controls**: Left/Right rotate, Up/Down move forward/back
- **Mines as hazards**: Instant death adds tension
- **3 levels**: Progressive maze complexity

### Technical Approach
- **Angle-based movement**: Tank moves in direction it's facing
- **Multi-point collision**: Checks multiple points around tank for walls
- **Canvas rotation**: Tank sprite rotates with player direction

## Code Concepts

### Tank Movement (Angle-Based)
```javascript
function updateTank() {
    // Rotation
    if (keys.left) tank.angle -= tank.rotationSpeed;
    if (keys.right) tank.angle += tank.rotationSpeed;

    // Movement in facing direction
    let newX = tank.x;
    let newY = tank.y;

    if (keys.up) {
        newX += Math.cos(tank.angle) * tank.speed;
        newY += Math.sin(tank.angle) * tank.speed;
    }
    if (keys.down) {
        newX -= Math.cos(tank.angle) * tank.speed * 0.6;  // Slower reverse
        newY -= Math.sin(tank.angle) * tank.speed * 0.6;
    }

    const collision = isCollision(newX, newY);
    if (!collision) {
        tank.x = newX;
        tank.y = newY;
    }
}
```

### Multi-Point Collision Detection
```javascript
function isCollision(x, y) {
    const checkRadius = tank.size * 0.35;
    const points = [
        { x: x, y: y },                      // Center
        { x: x + checkRadius, y: y },         // Right
        { x: x - checkRadius, y: y },         // Left
        { x: x, y: y + checkRadius },         // Bottom
        { x: x, y: y - checkRadius }          // Top
    ];

    for (const point of points) {
        const gridX = Math.floor(point.x / cellSize);
        const gridY = Math.floor(point.y / cellSize);
        
        const cell = grid[gridY]?.[gridX];
        if (cell === WALL) return 'wall';
        if (cell === MINE) return 'mine';
    }
    return null;
}
```

### Rotated Tank Drawing
```javascript
function drawTank() {
    ctx.save();
    ctx.translate(tank.x, tank.y);
    ctx.rotate(tank.angle);

    // Tank body
    ctx.fillStyle = '#4a7c59';
    ctx.fillRect(-w/2 + 2, -h/3, w - 4, h * 0.66);

    // Turret
    ctx.fillStyle = '#3a6c49';
    ctx.beginPath();
    ctx.arc(0, 0, h/3, 0, Math.PI * 2);
    ctx.fill();

    // Cannon (points in facing direction)
    ctx.fillRect(0, -h/10, w/2 + 5, h/5);

    ctx.restore();
}
```

## Iterations
1. **v1**: Tank movement and rotation
2. **v2**: Maze walls and collision detection
3. **v3**: Mines, multiple levels, exit detection

## Bugs Encountered
- **Tank clipping through corners**: Single-point collision failed at edges → Multi-point collision
- **Controls confusing**: Relative controls (turn + forward) take practice → Added clear instructions

## Lessons Learned
- Tank controls feel unique but have a learning curve
- Multi-point collision is essential for rotated hitboxes
- ctx.save()/restore() is crucial when doing transforms

## Time to Build
~55 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Enemy tanks that patrol
- [ ] Shooting mechanic
- [ ] Destructible walls
- [ ] Fog of war

---
*Complexity: ⭐⭐⭐ | Concepts: angle-based movement, canvas transforms, multi-point collision, grid-based levels*
