# Game 008: Maze Walker

## The Prompt
> "Create a maze navigation game"

## What Was Built
A grid-based maze game where players navigate from start to exit. Features 3 predefined levels of increasing difficulty, mobile D-pad controls, and time tracking with best times saved per level.

## Key Decisions

### Design Choices
- **Predefined mazes**: Hand-crafted for quality over random generation
- **Level progression**: Players can choose any unlocked level
- **Time-based scoring**: Encourages optimization and replayability

### Technical Approach
- **2D array maze data**: Numbers represent wall (1), path (0), start (2), exit (3)
- **Canvas rendering**: Smooth visuals with gradients and glow effects
- **Per-level localStorage**: Saves best time for each level independently

## Code Concepts

### Maze Data Structure
```javascript
const MAZES = {
    1: {
        width: 15, height: 11,
        data: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,0,0,0,1,0,0,0,0,0,0,0,0,1],  // 2 = start
            [1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
            // ... more rows
            [1,0,0,0,0,0,0,0,0,0,0,0,0,3,1],  // 3 = exit
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    }
};
```

### Movement with Collision Detection
```javascript
function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;
    
    if (newX >= 0 && newX < mazeWidth && 
        newY >= 0 && newY < mazeHeight) {
        if (maze[newY][newX] !== 1) {  // Not a wall
            playerX = newX;
            playerY = newY;
            
            if (playerX === exitX && playerY === exitY) {
                winLevel();
            }
        }
    }
}
```

### Responsive Canvas Sizing
```javascript
function resizeCanvas() {
    const maxWidth = Math.min(window.innerWidth - 20, MAX_CANVAS_SIZE);
    const currentMaze = MAZES[currentLevel];
    
    CELL_SIZE = Math.floor(maxWidth / currentMaze.width);
    CELL_SIZE = Math.min(CELL_SIZE, 30);  // Cap maximum
    CELL_SIZE = Math.max(CELL_SIZE, 15);  // Floor minimum
    
    canvas.width = currentMaze.width * CELL_SIZE;
    canvas.height = currentMaze.height * CELL_SIZE;
}
```

## Iterations
1. **v1**: Single maze with basic movement
2. **v2**: Multiple levels with progression tracking
3. **v3**: Mobile D-pad, time tracking, visual polish

## Bugs Encountered
- **Arrow keys scrolling page**: Prevented with `e.preventDefault()` on keydown
- **Canvas blurry on retina**: Needed to account for device pixel ratio (simplified by using consistent cell sizes)

## Lessons Learned
- Predefined levels allow for intentional difficulty progression
- Canvas redraws on every frame provide consistent visuals
- Mobile controls need dedicated touch targets, not just key mapping

## Time to Build
~45 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Procedural maze generation
- [ ] Collectible items within maze
- [ ] Enemy patrols
- [ ] Fog of war (limited visibility)

---
*Complexity: ⭐⭐ | Concepts: 2D arrays, grid movement, collision detection, canvas rendering, localStorage*
