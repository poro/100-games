# CLAUDE.md - 100 Days of AI-Made Games

## Overview

A collection of browser-based games created entirely with AI assistance. Each game is a standalone HTML file with embedded CSS and JavaScript—no build tools, no dependencies, no npm.

**Live Site:** Deployed on Vercel (static hosting)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | Vanilla JavaScript (ES6+) |
| Graphics | HTML5 Canvas API |
| Styling | Inline CSS (embedded in HTML) |
| Storage | localStorage (high scores) |
| Deployment | Any static host (Vercel, Netlify, GitHub Pages) |

## Project Structure

```
100-games/
├── index.html               # Main game gallery/index
├── README.md                # Project overview
├── DEVLOG.md                # Development patterns and lessons
├── _TEMPLATE_DEVLOG.md      # Template for game dev logs
├── 001-click-counter/
│   ├── index.html           # The complete game
│   └── DEVLOG.md           # Creation story
├── 002-whack-a-mole/
│   ├── index.html
│   └── DEVLOG.md
├── ... (continues to 031+)
└── tutorials/               # Step-by-step game tutorials
    ├── index.html           # Tutorial gallery
    ├── PROCESS-GUIDE.md     # How to create tutorials
    ├── snake-tutorial/
    ├── pong-tutorial/
    ├── breakout-tutorial/
    └── space-invaders-tutorial/
```

## Current Progress

- **27+ games completed** (README says 27, but 31+ folders exist)
- **4 tutorials** with step-by-step lessons
- Each game has mobile-responsive design and touch controls

## Game Categories

| Category | Games | Examples |
|----------|-------|----------|
| Clickers | 001-006 | Click Counter, Whack-a-Mole, Speed Clicker |
| Memory | 007, 030 | Simon Says, Memory Match |
| Movement | 008-014 | Maze Walker, Snake, Pac-Man Lite |
| Physics | 015-021 | Pong, Breakout, Pool Billiards |
| Shooters | 022-027 | Space Invaders, Galaga, Zombie Wave |
| Puzzles | 029, 031 | Tetris, 2048 |

## Key Patterns

### Standard Game Loop
```javascript
function gameLoop() {
    update();    // Game logic, physics, AI
    render();    // Draw to canvas
    requestAnimationFrame(gameLoop);
}
```

### Mobile Touch Controls
```javascript
// Touch-friendly buttons or swipe detection
canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleSwipe, { passive: false });
```

### localStorage High Scores
```javascript
const highScore = localStorage.getItem('game-name-high') || 0;
localStorage.setItem('game-name-high', newScore);
```

### Responsive Canvas
```javascript
function resize() {
    canvas.width = Math.min(window.innerWidth, 600);
    canvas.height = canvas.width * 0.75; // 4:3 ratio
}
window.addEventListener('resize', resize);
```

## Development Workflow

1. **Create folder**: `XXX-game-name/`
2. **Single HTML file**: All code in one `index.html`
3. **Copy DEVLOG template**: Document the creation process
4. **Test locally**: Just open in browser
5. **Add to gallery**: Update root `index.html`

## Conventions

### File Structure
- **One game = One folder**
- **One folder = One index.html** (fully self-contained)
- **No external dependencies** (no CDN, no npm)
- **DEVLOG.md** documents AI prompts and iterations

### Visual Style
- Dark gradient backgrounds (space/gaming aesthetic)
- Neon accent colors (`#64ffda`, `#ff6b6b`, etc.)
- System fonts (`'Segoe UI', system-ui, sans-serif`)
- Smooth CSS transitions and animations

### Code Style
- ES6+ features (arrow functions, destructuring, template literals)
- Meaningful variable names
- Comments for complex logic
- State objects for game data

## Gotchas

1. **Touch Events**: Always use `{ passive: false }` to allow `preventDefault()`
2. **Canvas Scaling**: Use `devicePixelRatio` for crisp rendering on Retina
3. **Performance**: Use `requestAnimationFrame`, not `setInterval`
4. **Audio**: Browsers require user interaction before playing audio
5. **Mobile Safari**: Fullscreen API has quirks; test thoroughly

## Testing Checklist

- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile responsive (test on phone)
- [ ] Touch controls work (if applicable)
- [ ] High score persists across sessions
- [ ] No console errors
- [ ] Starts/restarts cleanly

## Tutorial Format

Tutorials live in `/tutorials/` and follow a step-by-step structure:
1. **Step 1**: Basic canvas and game loop
2. **Step 2**: Player movement
3. **Step 3**: Enemies/obstacles
4. **Step 4**: Collision detection
5. **Step 5**: Scoring and polish

Each step builds on the previous, with complete working code.

## Adding New Games

```bash
# Create new game folder
mkdir XXX-game-name
cp _TEMPLATE_DEVLOG.md XXX-game-name/DEVLOG.md

# Create the game (or generate with AI)
# Then add to root index.html gallery
```

## Common AI Prompts

**For new games:**
> Create a complete HTML5 canvas game called [Name]. Single HTML file, no dependencies. Include: game loop, mobile controls, high score saving, restart button, visual polish.

**For iterations:**
> The game is too [easy/hard/slow/fast]. Adjust [specific parameter] to [target value].

**For polish:**
> Add juice: screen shake on impact, particle effects, sound effects, smooth animations.
