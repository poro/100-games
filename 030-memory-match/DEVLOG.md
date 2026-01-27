# Game 030: Memory Match

## The Prompt
> "Create a card memory matching game - flip cards, find pairs, track moves and time"

## Design Thinking

### Core Mechanics
1. Grid of face-down cards (4x4 = 8 pairs)
2. Click to flip, max 2 cards at a time
3. Match = cards stay revealed
4. No match = flip back after delay
5. Win when all pairs found

### Key Decisions

**How many cards?**
→ 16 (4x4 grid). Good balance - not too easy, not overwhelming.

**Flip animation?**
→ CSS 3D transform. Looks polished, hardware accelerated.

**What symbols?**
→ Emoji. Universal, no loading, visually distinct.

**Timing for non-match flip-back?**
→ 1 second. Long enough to memorize, short enough to stay engaging.

## Code Highlights

### Card Flip with CSS 3D
```css
.card {
    transform-style: preserve-3d;
    transition: transform 0.5s;
}
.card.flipped {
    transform: rotateY(180deg);
}
.card-front, .card-back {
    backface-visibility: hidden;
}
.card-front {
    transform: rotateY(180deg);
}
```

### Shuffle Algorithm (Fisher-Yates)
```javascript
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
```

### Match Detection
```javascript
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}
```

## Iterations
1. **v1**: Basic matching worked but cards could be clicked during flip animation
   - Fix: Added `isLocked` flag during animations
   
2. **v2**: No feedback on win
   - Fix: Added celebration animation and stats display

3. **v3**: Same game every time
   - Fix: Proper Fisher-Yates shuffle on each reset

## Lessons Learned
- CSS 3D transforms are powerful and performant
- State management is crucial (locked/flipped/matched)
- 1-second delay feels right for memory games

---
*Complexity: ⭐⭐ | Concepts: CSS 3D, state management, shuffle algorithm*
