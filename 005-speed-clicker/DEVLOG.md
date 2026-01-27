# Game 005: Speed Clicker

## The Prompt
> "Create a click speed test game"

## What Was Built
A 10-second click speed challenge that measures clicks-per-second (CPS). Features real-time CPS tracking, max CPS recording, floating "+1" feedback, and a ranking system based on final average CPS.

## Key Decisions

### Design Choices
- **10-second duration**: Industry standard for CPS tests
- **Rolling CPS calculation**: Only counts clicks from last 1 second for real-time accuracy
- **Rank system**: Motivational feedback based on performance tiers

### Technical Approach
- **Click history array**: Stores timestamps for rolling CPS calculation
- **Visual feedback overdrive**: Button animations, floating numbers, ripple effects
- **Responsive design**: Large button works well on both mouse and touch

## Code Concepts

### Rolling CPS Calculation (Last 1 Second)
```javascript
function calculateCurrentCps() {
    const now = Date.now();
    // Only count clicks from the last 1000ms
    const recentClicks = clickHistory.filter(t => now - t < 1000);
    return recentClicks.length;
}
```

### Floating Number Effect
```javascript
function createFloatingNumber(x, y) {
    const floating = document.createElement('div');
    floating.className = 'floating-number';
    floating.textContent = '+1';
    floating.style.left = x + 'px';
    floating.style.top = y + 'px';
    gameArea.appendChild(floating);
    setTimeout(() => floating.remove(), 800);
}
```

### Performance Ranking System
```javascript
const avgCps = clicks / 10;
let rank, emoji;
if (avgCps >= 14) { rank = 'Superhuman'; emoji = '🦸'; }
else if (avgCps >= 12) { rank = 'Lightning Fast'; emoji = '⚡'; }
else if (avgCps >= 10) { rank = 'Speed Demon'; emoji = '😈'; }
// ... more tiers
```

## Iterations
1. **v1**: Basic click counter with timer
2. **v2**: Added real-time CPS and max CPS tracking
3. **v3**: Polished with animations, ranks, and results screen

## Bugs Encountered
- **CPS jumping wildly**: Was calculating CPS from game start → Switched to rolling 1-second window
- **Touch causing scroll**: Mobile users accidentally scrolling → Added `touch-action: manipulation` and `e.preventDefault()`

## Lessons Learned
- Rolling calculations provide more meaningful real-time feedback than cumulative
- Visual feedback (floating numbers) makes repetitive actions feel rewarding
- CPS games reveal that most people click 5-8 times per second

## Time to Build
~25 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Different test durations (5s, 30s, 60s)
- [ ] Auto-clicker detection
- [ ] Global leaderboard
- [ ] Click pattern analysis (consistency score)

---
*Complexity: ⭐ | Concepts: rolling calculations, timestamp arrays, performance metrics, touch events*
