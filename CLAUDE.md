# CLAUDE.md - 100 Days of AI-Made Games

## Overview

Collection of browser-based games built with pure HTML5 Canvas and vanilla JavaScript. No frameworks, no dependencies - just clean, portable game code. Each game is self-contained in its own directory.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Modern browsers (Chrome, Firefox, Safari, Edge) |
| Graphics | HTML5 Canvas API |
| Audio | Web Audio API |
| Storage | localStorage (high scores) |
| Styling | Inline CSS (self-contained) |
| Build | None (zero dependencies) |
| Deployment | Any static host (Vercel, Netlify, GitHub Pages) |

## Project Structure

```
/
├── 001-click-counter/     # Each game is self-contained
│   └── index.html         # Complete game in single file
├── 002-whack-a-mole/
│   └── index.html
├── ...
├── 031-2048/
│   └── index.html
├── tutorials/             # Learning resources
├── index.html             # Main gallery page
├── DEVLOG.md              # Development notes
├── _TEMPLATE_DEVLOG.md    # Template for new games
└── README.md              # Project overview
```

## Game Categories (31 games completed)

### Clicker/Reaction (001-006)
- Click Counter, Whack-a-Mole, Balloon Pop, Color Match, Speed Clicker, Target Practice

### Memory/Puzzle (007, 013, 030-031)
- Simon Says, Ice Sliding Puzzle, Memory Match, 2048

### Movement/Navigation (008-014)
- Maze Walker, Coin Collector, Dodge the Blocks, Snake Classic, Pac-Man Lite, Tank Patrol

### Physics/Sports (015-021)
- Pong, Breakout, Bouncing Balls, Air Hockey, Pinball, Pool Billiards, Gravity Golf

### Shooters (022-027)
- Space Invaders, Galaga Clone, Asteroid Shooter, Tower Defense, Duck Hunt, Zombie Wave

### Classics (028-031)
- Flappy Bird, Tetris, Memory Match, 2048

## Conventions

### Single-File Games
Each game is a complete `index.html` with:
- Embedded CSS in `<style>` tags
- Embedded JS in `<script>` tags
- No external dependencies
- Mobile-responsive design
- Touch controls where appropriate

### Code Structure Pattern
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Game Name</title>
    <style>/* All styles */</style>
</head>
<body>
    <div class="game-container">
        <!-- Game UI -->
        <canvas id="game-canvas"></canvas>
    </div>
    <script>
        // Game state
        // Init functions
        // Game loop
        // Input handlers
        // Audio (optional)
    </script>
</body>
</html>
```

### Mobile-First Design
- `-webkit-tap-highlight-color: transparent` (no tap highlight)
- `user-select: none` (prevent text selection)
- Touch event handlers alongside mouse events
- Responsive layouts with max-width containers

### Common Patterns

**Game Loop:**
```javascript
function gameLoop() {
    update();
    render();
    if (gameRunning) requestAnimationFrame(gameLoop);
}
```

**Touch Support:**
```javascript
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleInput(touch.clientX, touch.clientY);
});
```

**High Scores:**
```javascript
const highScore = localStorage.getItem('game-name-highscore') || 0;
localStorage.setItem('game-name-highscore', newScore);
```

## Adding New Games

1. Create directory: `XXX-game-name/`
2. Copy template structure from existing game
3. Implement game logic
4. Update `index.html` gallery
5. Update `README.md` table

## Development

No build step required! Just:
```bash
# Open any game directly
open 001-click-counter/index.html

# Or serve locally
python -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment

```bash
# Vercel (already configured)
vercel --prod

# Or any static host - just upload the files
```

## Gotchas

1. **Canvas Sizing**: Use CSS for display size, JS for resolution
2. **Mobile Safari**: Needs `-webkit-` prefixes for some animations
3. **Audio Autoplay**: Requires user interaction first on mobile
4. **Touch vs Mouse**: Always handle both event types
5. **High DPI**: Consider `devicePixelRatio` for crisp rendering

## Quality Checklist

For each game:
- [ ] Works on desktop (mouse/keyboard)
- [ ] Works on mobile (touch)
- [ ] High score persistence
- [ ] Responsive layout
- [ ] Clean visual design
- [ ] Smooth animations (60fps)
- [ ] No console errors
