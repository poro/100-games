# Game 004: Color Match (Stroop Challenge)

## The Prompt
> "Create a color matching game based on the Stroop effect"

## What Was Built
A psychological reflex game exploiting the Stroop effect - words are displayed in mismatched colors, and players must identify the TEXT COLOR (not the word). Features a 3-second timer per round, lives system, and high score tracking.

## Key Decisions

### Design Choices
- **6 colors**: Red, Blue, Green, Yellow, Purple, Orange - distinct and easily recognizable
- **3-second timer**: Creates urgency without being impossible
- **3 lives**: Forgiving enough for learning, challenging for high scores

### Technical Approach
- **Forced mismatch**: Algorithm ensures word never matches its color
- **Visual timer bar**: Gradient changes from green → yellow → red
- **Screen-based UI**: Start/Game/End screens for clean state management

## Code Concepts

### Guaranteed Mismatch Generation
```javascript
function nextRound() {
    const wordIndex = Math.floor(Math.random() * colors.length);
    let colorIndex;
    do {
        colorIndex = Math.floor(Math.random() * colors.length);
    } while (colorIndex === wordIndex);  // Keep trying until different
    
    const word = colors[wordIndex].name;
    currentColor = colors[colorIndex].name;
}
```

### Dynamic Timer Bar with CSS Classes
```javascript
function updateTimer() {
    const percent = (timeLeft / 3000) * 100;
    timerFill.style.width = percent + '%';
    
    timerFill.classList.remove('warning', 'danger');
    if (percent <= 33) timerFill.classList.add('danger');
    else if (percent <= 66) timerFill.classList.add('warning');
}
```

### Feedback Animations
```css
@keyframes wrong {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-10px); }
    40%, 80% { transform: translateX(10px); }
}
.game-area.wrong {
    animation: wrong 0.4s ease;
    background: rgba(255, 0, 0, 0.2);
}
```

## Iterations
1. **v1**: Basic color word display with button selection
2. **v2**: Added timer bar and lives system
3. **v3**: Polish with animations and screen transitions

## Bugs Encountered
- **Timer not resetting**: Previous interval still running → Clear interval before starting new one
- **Same color appearing twice**: Random could pick word = color → Added do-while loop to force mismatch

## Lessons Learned
- The Stroop effect is genuinely difficult - 3 seconds feels short
- Visual feedback (shake, color flash) is crucial for player understanding
- CSS class toggling is cleaner than inline style manipulation for states

## Time to Build
~35 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Multiple difficulty modes (more colors, shorter timer)
- [ ] Color-blind friendly mode with patterns
- [ ] Multiplayer race mode
- [ ] Statistics tracking (accuracy %, avg response time)

---
*Complexity: ⭐⭐ | Concepts: Stroop effect, do-while loops, setInterval timing, CSS state classes*
