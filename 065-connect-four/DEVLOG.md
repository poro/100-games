# Game 065: Connect Four

## The Prompt
> "Create a simplified version of the game Connect Four for two players."

## Design Thinking

### Core Mechanics
1.  A 6x7 grid represents the game board.
2.  Two players take turns dropping their colored discs into one of the seven columns.
3.  The first player to get four of their discs in a row (horizontally, vertically, or diagonally) wins.
4.  The game ends in a draw if the board is filled without a winner.

### Implementation Details
The game board is represented by a 2D array in JavaScript. The UI is created using CSS Grid. When a player clicks on a column, the `placePiece()` function finds the lowest available row in that column and updates the board array. After each move, the `checkWin()` function is called to see if the current player has won. This function checks for four in a row in all four possible directions (horizontal, vertical, and both diagonals) from the last placed piece.

### Code Snippet
```javascript
function checkWin(row, col) {
    const player = board[row][col];
    // Check horizontal, vertical, and both diagonals
    const directions = [
        { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }, { r: 1, c: -1 }
    ];
    for (const dir of directions) {
        let count = 1;
        for (let i = 1; i < 4; i++) {
            const r = row + dir.r * i;
            const c = col + dir.c * i;
            if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 4; i++) {
            const r = row - dir.r * i;
            const c = col - dir.c * i;
            if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }
        if (count >= 4) return true;
    }
    return false;
}
```

## Lessons Learned
*   Checking for a win condition in Connect Four is a good exercise in algorithmic thinking. Starting the check from the last placed piece is more efficient than checking the entire board every time.
*   CSS Grid is a powerful tool for creating grid-based layouts like the Connect Four board.

---
*Complexity: ⭐⭐ | Concepts: 2D arrays, game state management, win condition checking*
