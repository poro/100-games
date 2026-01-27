# Game 029: Tetris Clone

## The Prompt
> "Build a Tetris clone with all 7 tetrominoes, rotation, line clearing, and increasing speed"

## Design Thinking

### The Core Systems

1. **Grid System**
   - 10 wide × 20 tall (standard Tetris dimensions)
   - Each cell: empty (0) or filled (color value)
   - Separate "active piece" from "locked pieces"

2. **Tetromino Data**
   - 7 shapes: I, O, T, S, Z, J, L
   - Each stored as 4x4 grid
   - 4 rotation states (or calculate via matrix rotation)

3. **Collision Detection**
   - Check before every move/rotation
   - Can piece fit at new position?
   - Wall kicks for rotation near edges

4. **Line Clearing**
   - After piece locks, scan for full rows
   - Remove full rows, shift above rows down
   - Award points (more for multiple lines)

5. **Game Flow**
   - Piece falls on timer
   - Speed increases with level
   - Game over when new piece can't spawn

### Key Design Decisions

**Rotation System?**
→ Simple rotation (90° clockwise). Skip SRS wall kicks for simplicity, but include basic wall kick.

**How to store tetrominoes?**
→ As 2D arrays. Rotation = array transformation. More intuitive than coordinate math.

**Soft vs Hard drop?**
→ Both! Down arrow = soft drop (faster fall), Space = hard drop (instant).

**Preview piece?**
→ Yes. Shows next piece - reduces frustration, adds strategy.

## Code Architecture

```
┌─────────────────────────────────────┐
│            GAME STATE               │
├─────────────────────────────────────┤
│ board[20][10] - locked pieces       │
│ currentPiece  - falling piece       │
│ nextPiece     - preview             │
│ position {x, y} - piece location    │
│ score, level, lines                 │
└─────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│          GAME LOOP (tick)           │
├─────────────────────────────────────┤
│ 1. Handle input (move/rotate)       │
│ 2. Apply gravity (move down)        │
│ 3. Check collision                  │
│ 4. Lock piece if landed             │
│ 5. Clear lines                      │
│ 6. Spawn new piece                  │
│ 7. Check game over                  │
│ 8. Render                           │
└─────────────────────────────────────┘
```

## Building Step by Step

### Step 1: Define the Pieces
```javascript
const PIECES = {
    I: [[0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]],
    O: [[1,1],
        [1,1]],
    T: [[0,1,0],
        [1,1,1],
        [0,0,0]],
    // ... etc
};
```

### Step 2: Rotation Function
```javascript
function rotate(matrix) {
    // Transpose and reverse rows = 90° clockwise
    const N = matrix.length;
    const rotated = matrix.map((row, i) =>
        row.map((_, j) => matrix[N - 1 - j][i])
    );
    return rotated;
}
```

### Step 3: Collision Check
```javascript
function isValidPosition(piece, x, y) {
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col]) {
                const newX = x + col;
                const newY = y + row;
                
                // Check bounds
                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return false;
                }
                
                // Check collision with locked pieces
                if (newY >= 0 && board[newY][newX]) {
                    return false;
                }
            }
        }
    }
    return true;
}
```

### Step 4: Line Clear Logic
```javascript
function clearLines() {
    let linesCleared = 0;
    
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== 0)) {
            // Remove this row
            board.splice(row, 1);
            // Add empty row at top
            board.unshift(new Array(COLS).fill(0));
            linesCleared++;
            row++; // Check same row again (shifted down)
        }
    }
    
    // Scoring: 100, 300, 500, 800 for 1-4 lines
    const points = [0, 100, 300, 500, 800];
    score += points[linesCleared] * level;
}
```

## Iterations

1. **v1**: Basic piece falling - but rotation broke at edges
   - Fix: Added wall kick (try shifting 1 cell if rotation fails)

2. **v2**: Line clearing worked but felt unsatisfying
   - Fix: Added flash animation before lines disappear

3. **v3**: Speed felt inconsistent
   - Fix: Used proper timer instead of frame counting

4. **v4**: No way to see upcoming piece
   - Fix: Added "Next" preview box

## Lessons Learned

1. **Grid-based games need clear coordinate systems** — Decided early: (0,0) is top-left, y increases downward.

2. **Rotation is trickier than it seems** — Matrix transposition works, but wall kicks are essential for playability.

3. **Tetris is all about timing** — Lock delay, spawn delay, input buffer. The feel comes from these timings.

4. **Classic games have subtle depth** — Tetris has "T-spins", "back-to-back", etc. Started simple, can add later.

## Time to Build
~35 minutes (with documentation)

---
*Complexity: ⭐⭐⭐ | Concepts: 2D arrays, matrix rotation, collision detection, state machines*
