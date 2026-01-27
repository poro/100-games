# Game 012: Pac-Man Lite

## The Prompt
> "Create a simplified Pac-Man game"

## What Was Built
A tribute to the classic Pac-Man with a hand-crafted maze, 3 ghost enemies with basic AI, and dot collection. Features smooth movement, ghost eye tracking, and win/lose conditions.

## Key Decisions

### Design Choices
- **15x15 maze**: Small enough to fit mobile, complex enough to be interesting
- **3 ghosts**: Enough challenge without overwhelming
- **Simple AI**: Ghosts chase player with 70% probability, 30% random movement

### Technical Approach
- **Tile-based map**: 2D array with 0=empty, 1=wall, 2=dot
- **Turn queuing**: Player inputs desired direction, executed when possible
- **Interval-based movement**: Separate timers for player and ghost movement

## Code Concepts

### Maze Data Structure
```javascript
const mazeTemplate = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],  // 2 = dot
    [1,2,1,1,2,1,2,1,2,1,2,1,1,2,1],
    // ... more rows
];
```

### Movement with Turn Queuing
```javascript
function movePlayer() {
    // Try queued direction first
    if (canMove(player.x, player.y, player.nextDir)) {
        player.dir = { ...player.nextDir };
    }
    
    // Move in current direction
    if (canMove(player.x, player.y, player.dir)) {
        player.x += player.dir.x;
        player.y += player.dir.y;
        
        // Wrap around (tunnel)
        if (player.x < 0) player.x = COLS - 1;
        if (player.x >= COLS) player.x = 0;
    }
}
```

### Simple Ghost AI
```javascript
function moveGhosts() {
    for (let ghost of ghosts) {
        const directions = [up, down, left, right];
        const validDirs = directions.filter(d => canMove(ghost.x, ghost.y, d));
        
        let chosenDir;
        if (Math.random() < 0.7) {
            // Chase player - pick direction that gets closest
            validDirs.sort((a, b) => {
                const distA = Math.abs(ghost.x + a.x - player.x) + 
                              Math.abs(ghost.y + a.y - player.y);
                const distB = Math.abs(ghost.x + b.x - player.x) + 
                              Math.abs(ghost.y + b.y - player.y);
                return distA - distB;
            });
            chosenDir = validDirs[0];
        } else {
            // Random movement
            chosenDir = validDirs[Math.floor(Math.random() * validDirs.length)];
        }
        
        ghost.x += chosenDir.x;
        ghost.y += chosenDir.y;
    }
}
```

### Ghost Eyes Follow Player
```javascript
function drawGhost(ghost) {
    // Pupils look toward player
    const dx = Math.sign(player.x - ghost.x) * radius * 0.1;
    const dy = Math.sign(player.y - ghost.y) * radius * 0.1;
    
    ctx.fillStyle = '#00f';
    ctx.arc(px - radius*0.3 + dx, py - radius*0.2 + dy, ...);
    ctx.arc(px + radius*0.3 + dx, py - radius*0.2 + dy, ...);
}
```

## Iterations
1. **v1**: Maze rendering and player movement
2. **v2**: Dot collection and ghost spawning
3. **v3**: Ghost AI, win/lose conditions, D-pad controls

## Bugs Encountered
- **Ghost stuck in walls**: AI could choose invalid direction → Filter valid directions first
- **Player eating through walls**: Movement not checking collision → Added `canMove()` check

## Lessons Learned
- Turn queuing makes grid-based movement feel responsive
- Simple AI (70/30 chase/random) creates unpredictable but fair behavior
- Small details like eye tracking add personality

## Time to Build
~60 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Power pellets that let player eat ghosts
- [ ] Different ghost personalities (Blinky, Pinky, etc.)
- [ ] Multiple levels with different mazes
- [ ] Fruit bonus items

---
*Complexity: ⭐⭐⭐ | Concepts: tile-based movement, simple AI, turn queuing, interval timing*
