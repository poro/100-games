# Game 002: Whack-a-Mole

## The Prompt
> "Create a whack-a-mole game"

## What Was Built
A classic arcade-style whack-a-mole game where moles pop up from holes on a 3x3 grid. Players must click/tap moles before they disappear to score points. The game features progressive difficulty, visual feedback, and a 60-second time limit.

## Key Decisions

### Design Choices
- **3x3 grid**: Balanced between too easy (2x2) and overwhelming (4x4)
- **CSS-only mole design**: No images needed, pure CSS shapes create a charming character
- **Progressive difficulty**: Game speeds up over time to maintain engagement

### Technical Approach
- **DOM-based rendering**: Used CSS transitions for smooth mole animations instead of canvas
- **setTimeout chaining**: Controls mole spawn timing with variable delays
- **LocalStorage**: Persists high scores across sessions

## Code Concepts

### Dynamic Difficulty Scaling
```javascript
function updateDifficulty() {
    const elapsed = 60 - timeLeft;
    if (elapsed >= 45) {
        moleMinTime = 600;  // Mole stays up shorter
        moleMaxTime = 1000;
        spawnMinDelay = 300; // Spawns faster
        spawnMaxDelay = 600;
    }
    // ... more difficulty tiers
}
```

### CSS Transition-Based Animation
```javascript
.mole {
    position: absolute;
    bottom: -100%;  /* Hidden below hole */
    transition: bottom 0.15s ease-out;
}
.mole.up {
    bottom: 10%;    /* Visible */
}
```

### Touch + Click Handling
```javascript
hole.addEventListener('click', whackMole);
hole.addEventListener('touchstart', handleTouch, { passive: false });

function handleTouch(e) {
    e.preventDefault();  // Prevents double-firing
    whackMole.call(this, e);
}
```

## Iterations
1. **v1**: Basic mole pop-up mechanics with click detection
2. **v2**: Added CSS mole character design with face details
3. **v3**: Implemented difficulty scaling and visual feedback (stars, +10 popup)

## Bugs Encountered
- **Double-tap issue on mobile**: Touch events fired both touchstart and click → Fixed with `e.preventDefault()` and careful event handling
- **Moles stacking**: Multiple moles could appear in same hole → Added check for available holes before spawning

## Lessons Learned
- CSS transitions are powerful for simple animations without canvas overhead
- Progressive difficulty is essential for keeping arcade games engaging
- Always handle both touch and mouse events for mobile compatibility

## Time to Build
~45 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Add sound effects for whacking
- [ ] Different mole types (golden mole = bonus, bomb = penalty)
- [ ] Multiplayer split-screen mode
- [ ] Combo system for consecutive hits

---
*Complexity: ⭐⭐ | Concepts: CSS animations, event handling, setTimeout, difficulty scaling, localStorage*
