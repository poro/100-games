# Game 011: Snake Classic

## The Prompt
> "Create the classic Snake game"

## What Was Built
A faithful recreation of the classic Snake game with modern visual polish. The snake grows when eating food, dies on wall/self collision, and speeds up as it grows. Features swipe controls for mobile.

## Key Decisions

### Design Choices
- **Grid-based movement**: Classic Snake mechanics with discrete steps
- **Speed scaling**: Game gets faster as snake grows (increases challenge)
- **Visual gradient**: Snake body fades from head to tail

### Technical Approach
- **Array-based snake**: Head added to front, tail removed from back
- **Direction queuing**: Prevents 180° turns that would cause instant death
- **Responsive grid**: Canvas size adjusts to window, grid stays proportional

## Code Concepts

### Snake Movement with Array Operations
```javascript
function update() {
    // Calculate new head position
    const head = { 
        x: snake[0].x + direction.x, 
        y: snake[0].y + direction.y 
    };
    
    snake.unshift(head);  // Add new head
    
    if (head.x === food.x && head.y === food.y) {
        // Ate food - don't remove tail (snake grows)
        spawnFood();
        gameSpeed = Math.max(MIN_SPEED, gameSpeed - SPEED_DECREASE);
    } else {
        snake.pop();  // Remove tail (snake stays same length)
    }
}
```

### Preventing 180° Turns
```javascript
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
            break;
        // Can't go up if currently going down, etc.
    }
});
```

### Swipe Detection
```javascript
canvas.addEventListener('touchend', (e) => {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) < MIN_SWIPE && Math.abs(dy) < MIN_SWIPE) return;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0 && direction.x !== -1) nextDirection = { x: 1, y: 0 };
        else if (dx < 0 && direction.x !== 1) nextDirection = { x: -1, y: 0 };
    } else {
        // Vertical swipe
        // ... similar logic
    }
});
```

### Gradient Snake Body
```javascript
snake.forEach((segment, index) => {
    const progress = index / snake.length;
    // Gradient from head (bright) to tail (dim)
    const green = Math.floor(222 - progress * 100);
    ctx.fillStyle = `rgb(74, ${green}, 128)`;
});
```

## Iterations
1. **v1**: Basic snake movement and food collection
2. **v2**: Collision detection and game over state
3. **v3**: Speed scaling, swipe controls, visual polish

## Bugs Encountered
- **Instant death on reverse**: Could press opposite direction before next frame → Used `nextDirection` buffer
- **Food spawning on snake**: Random could place food inside snake → Loop until valid position found

## Lessons Learned
- Classic games have elegant, simple rules that are satisfying to implement
- Input buffering prevents frustrating "unfair" deaths
- Speed scaling creates natural difficulty progression

## Time to Build
~35 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Wrap-around walls mode
- [ ] Power-up foods (speed boost, invincibility)
- [ ] Obstacles/maze mode
- [ ] Two-player competitive

---
*Complexity: ⭐⭐ | Concepts: array manipulation, input buffering, swipe detection, grid-based movement*
