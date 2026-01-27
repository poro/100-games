# Game 007: Simon Says

## The Prompt
> "Create a Simon Says memory game"

## What Was Built
A classic memory game with a circular 4-button interface. The game plays an increasingly long sequence of colors/tones that players must repeat. Features Web Audio API for musical tones and satisfying lit-up button effects.

## Key Decisions

### Design Choices
- **Classic 4-color layout**: Green, Red, Yellow, Blue in quadrants
- **Musical tones**: Each color has a distinct frequency (E4, C4, A3, E3)
- **Circular design**: Authentic Simon feel with rounded edges

### Technical Approach
- **Web Audio API**: Generates tones programmatically (no audio files)
- **Async/await sequence**: Clean handling of sequential light-up animations
- **State machine**: Watching → Player's Turn → Game Over

## Code Concepts

### Web Audio Tone Generation
```javascript
function playTone(color, duration = 300) {
    if (!audioCtx) audioCtx = new AudioContext();
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.frequency.value = frequencies[color];  // e.g., 329.63 Hz
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration/1000);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration/1000);
}
```

### Async Sequence Playback
```javascript
async function playSequence() {
    canClick = false;
    statusDisplay.textContent = 'Watch';
    
    await new Promise(r => setTimeout(r, 500));
    
    for (let i = 0; i < sequence.length; i++) {
        lightButton(sequence[i], 400);
        await new Promise(r => setTimeout(r, 600));
    }
    
    canClick = true;
    statusDisplay.textContent = 'Your Turn';
}
```

### Input Validation
```javascript
function handleButtonClick(e) {
    const index = parseInt(btn.dataset.index);
    
    if (index === sequence[playerIndex]) {
        playerIndex++;
        if (playerIndex === sequence.length) {
            // Completed sequence - add another
            addToSequence();
            playSequence();
        }
    } else {
        gameOver();  // Wrong button
    }
}
```

## Iterations
1. **v1**: Basic 4-button interface with visual-only feedback
2. **v2**: Added Web Audio tones and sequence playback
3. **v3**: Polish with error sound, flash effects, high score

## Bugs Encountered
- **AudioContext blocked**: Browsers block audio before user interaction → Create AudioContext on first button press
- **Sequence playing during input**: Player could interrupt → Added `canClick` flag to lock during playback

## Lessons Learned
- Web Audio API is powerful but requires user gesture to initialize
- async/await makes sequential animations much cleaner than nested callbacks
- The game is harder than it looks - 10+ rounds is impressive

## Time to Build
~50 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Different game modes (speed round, reverse)
- [ ] Custom color themes
- [ ] Practice mode (unlimited mistakes)
- [ ] Record and share sequences

---
*Complexity: ⭐⭐⭐ | Concepts: Web Audio API, async/await, sequence validation, state management*
