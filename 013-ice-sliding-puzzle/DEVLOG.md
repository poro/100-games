# Game 013: Ice Sliding Puzzle

## The Prompt
> "Create an ice sliding puzzle game"

## What Was Built
A puzzle game where a penguin slides on ice until hitting an obstacle or wall. Players must navigate through 5 increasingly complex levels to reach the goal. Features smooth slide animations and rock obstacles.

## Key Decisions

### Design Choices
- **Slide until blocked**: Core mechanic that makes planning essential
- **5 hand-crafted levels**: Progressive difficulty with new obstacle patterns
- **Move counter**: Encourages optimization

### Technical Approach
- **Level data arrays**: Walls (1), Ice (0), Start (2), Goal (3), Rock (4)
- **Animated sliding**: Smooth interpolation during movement
- **Touch swipe + keyboard**: Both input methods supported

## Code Concepts

### Slide Until Blocked Mechanic
```javascript
function move(dx, dy) {
    if (isMoving) return;
    
    let newX = playerPos.x;
    let newY = playerPos.y;
    let moved = false;
    
    // Keep moving until hitting obstacle
    while (true) {
        const nextX = newX + dx;
        const nextY = newY + dy;
        
        // Check bounds
        if (nextY < 0 || nextY >= grid.length || 
            nextX < 0 || nextX >= grid[0].length) break;
        
        // Check for wall or rock
        const cellType = grid[nextY][nextX];
        if (cellType === WALL || cellType === ROCK) break;
        
        newX = nextX;
        newY = nextY;
        moved = true;
    }
    
    if (moved) {
        moves++;
        animateMove(playerPos.x, playerPos.y, newX, newY);
    }
}
```

### Smooth Slide Animation
```javascript
function animateMove(fromX, fromY, toX, toY) {
    const duration = 200;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const currentX = fromX + (toX - fromX) * eased;
        const currentY = fromY + (toY - fromY) * eased;
        
        // Draw at interpolated position
        drawPlayerAt(currentX, currentY);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            playerPos = { x: toX, y: toY };
            isMoving = false;
            checkWin();
        }
    }
    
    isMoving = true;
    requestAnimationFrame(animate);
}
```

### Swipe Detection with Threshold
```javascript
gameContainer.addEventListener('touchend', (e) => {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    const dt = touchEndTime - touchStartTime;
    
    // Must be quick swipe with minimum distance
    if (dt < 500 && (Math.abs(dx) > 30 || Math.abs(dy) > 30)) {
        if (Math.abs(dx) > Math.abs(dy)) {
            move(dx > 0 ? 1 : -1, 0);  // Horizontal
        } else {
            move(0, dy > 0 ? 1 : -1);  // Vertical
        }
    }
});
```

## Iterations
1. **v1**: Basic sliding mechanics with single level
2. **v2**: Multiple levels with rocks as obstacles
3. **v3**: Animation, move counter, level unlock system

## Bugs Encountered
- **Stuck in walls**: Could slide into walls → Check collision BEFORE moving to next cell
- **Animation jitter**: Multiple inputs during animation → Lock input with `isMoving` flag

## Lessons Learned
- "Slide until blocked" creates interesting puzzles with minimal rules
- Easing functions make animations feel polished
- Hand-crafted levels allow precise difficulty tuning

## Time to Build
~50 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Undo button
- [ ] Procedural level generation
- [ ] Ice breaking after sliding over it twice
- [ ] Multiple characters to control

---
*Complexity: ⭐⭐⭐ | Concepts: slide mechanics, animation interpolation, level design, swipe detection*
