# Game 031: 2048

## The Prompt
> "Build 2048 - slide tiles, merge same numbers, reach 2048 to win"

## Design Thinking

### Core Mechanics
1. 4x4 grid with numbered tiles
2. Swipe/arrow keys slide all tiles in direction
3. Same numbers merge (2+2=4, 4+4=8, etc.)
4. New tile (2 or 4) spawns after each move
5. Win at 2048, game over when no moves left

### The Tricky Part: Merging Logic
When sliding left: [2,2,4,4] → [4,8,0,0]
- Process from slide direction
- Each tile can only merge once per move
- Empty spaces must be filled

```javascript
// Slide a single row left
function slideRow(row) {
    // Remove zeros
    let tiles = row.filter(x => x !== 0);
    
    // Merge adjacent same values
    for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] === tiles[i + 1]) {
            tiles[i] *= 2;
            tiles.splice(i + 1, 1);
            score += tiles[i];
        }
    }
    
    // Pad with zeros
    while (tiles.length < 4) tiles.push(0);
    return tiles;
}
```

### Movement in All Directions
Instead of writing 4 different slide functions:
1. For up: transpose → slide left → transpose back
2. For down: transpose → reverse → slide left → reverse → transpose
3. For right: reverse → slide left → reverse

```javascript
function move(direction) {
    let moved = false;
    let newGrid = copyGrid(grid);
    
    // Transform based on direction
    if (direction === 'up' || direction === 'down') {
        newGrid = transpose(newGrid);
    }
    if (direction === 'down' || direction === 'right') {
        newGrid = newGrid.map(row => row.reverse());
    }
    
    // Slide all rows left
    newGrid = newGrid.map(row => {
        const slid = slideRow(row);
        if (slid.toString() !== row.toString()) moved = true;
        return slid;
    });
    
    // Reverse transformations
    if (direction === 'down' || direction === 'right') {
        newGrid = newGrid.map(row => row.reverse());
    }
    if (direction === 'up' || direction === 'down') {
        newGrid = transpose(newGrid);
    }
    
    if (moved) {
        grid = newGrid;
        spawnTile();
    }
}
```

## Iterations
1. **v1**: Merge logic merged too many tiles (2,2,2,2 → 8 instead of 4,4)
   - Fix: Track "already merged" tiles per move
   
2. **v2**: New tiles appeared on occupied spaces
   - Fix: Filter empty cells before random selection
   
3. **v3**: Game over detected incorrectly
   - Fix: Check both horizontal AND vertical merge possibilities

## Lessons Learned
- Matrix transformations (transpose, reverse) simplify directional logic
- Visual feedback (animations) crucial for tile game feel
- 2048 is surprisingly algorithmic for such a simple concept

---
*Complexity: ⭐⭐⭐ | Concepts: matrix operations, merge algorithms, swipe gestures*
