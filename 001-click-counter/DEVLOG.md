# Game 001: Click Counter

## The Prompt
> "Create a simple click counter game - click a button to increment a score, with a nice visual feedback"

## What Was Built
A minimal first game to establish the pattern:
- Large clickable button
- Score display
- Visual/audio feedback on click
- High score tracking (localStorage)

## Key Decisions

### Why Start Here?
Click Counter is the "Hello World" of game dev. It has:
- One input (click)
- One state (count)
- One output (display)

Perfect for validating the setup works.

### Design Choices
- Big button = mobile friendly
- Satisfying click feedback (scale animation)
- Persistent high score = replayability hook

## Code Concepts

### State Management
```javascript
let score = 0;
let highScore = localStorage.getItem('clickerHigh') || 0;
```

### Event Handling
```javascript
button.addEventListener('click', () => {
    score++;
    updateDisplay();
    playClickSound();
});
```

### Feedback Loop
```javascript
function onClick() {
    // 1. Update state
    score++;
    
    // 2. Visual feedback
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 100);
    
    // 3. Update display
    scoreEl.textContent = score;
}
```

## Iterations
1. **v1**: Basic counter - worked but boring
2. **v2**: Added CSS animation on click - much better feel
3. **v3**: Added high score persistence - gives reason to return

## Lessons Learned
- Even the simplest game needs "juice" (feedback)
- localStorage is great for quick persistence
- CSS transitions > JavaScript animations for simple effects

## Time to Build
~5 minutes (prompt to playable)

---
*Complexity: ⭐ | Concepts: DOM events, state, localStorage*
