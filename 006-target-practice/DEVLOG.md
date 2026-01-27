# Game 006: Target Practice

## The Prompt
> "Create a target shooting game"

## What Was Built
A precision shooter where targets spawn, shrink over time, and must be clicked before disappearing. Smaller targets = more points. Features a custom crosshair cursor, accuracy tracking, and satisfying hit effects.

## Key Decisions

### Design Choices
- **Shrinking targets**: Creates urgency and rewards quick reflexes
- **Size-based scoring**: 10-100 points based on how small the target is when hit
- **60-second rounds**: Long enough for skill expression, short enough for replayability

### Technical Approach
- **Custom CSS crosshair**: Hides system cursor, draws crosshair with pseudo-elements
- **Interval-based shrinking**: Each target has its own shrink timer
- **Miss tracking**: Clicks on empty space count as misses for accuracy

## Code Concepts

### Size-Based Score Calculation
```javascript
function hitTarget(targetData, x, y) {
    // sizeRatio: 0 = full size (10pts), 1 = minimum size (100pts)
    const sizeRatio = 1 - (targetData.size - this.minTargetSize) / 
                          (this.initialTargetSize - this.minTargetSize);
    const points = Math.round(10 + sizeRatio * 90);
    this.score += points;
}
```

### Shrinking Animation with Cleanup
```javascript
targetData.shrinkInterval = setInterval(() => {
    const elapsed = Date.now() - targetData.startTime;
    const progress = elapsed / this.shrinkDuration;
    
    if (progress >= 1) {
        this.removeTarget(targetData);  // Target expired
    } else {
        const newSize = initialSize - (initialSize - minSize) * progress;
        targetData.size = newSize;
        target.style.width = newSize + 'px';
    }
}, 16);  // ~60fps
```

### Custom Crosshair with CSS
```css
#crosshair {
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
}
#crosshair::before, #crosshair::after {
    content: '';
    position: absolute;
    background: #fff;
}
#crosshair::before {
    width: 2px; height: 100%;  /* Vertical line */
}
#crosshair::after {
    width: 100%; height: 2px;  /* Horizontal line */
}
```

## Iterations
1. **v1**: Static targets with click detection
2. **v2**: Added shrinking mechanic and size-based scoring
3. **v3**: Custom crosshair, accuracy tracking, miss indicators

## Bugs Encountered
- **Crosshair lag on mobile**: Touch doesn't have hover → Hide crosshair on touch devices with media query
- **Multiple targets in same spot**: Random positioning could overlap → Added minimum distance check (not implemented in final version)

## Lessons Learned
- Shrinking targets create natural difficulty progression without artificial speed increases
- Accuracy tracking adds a secondary goal beyond raw score
- Custom cursors enhance immersion but need fallbacks for touch devices

## Time to Build
~40 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Moving targets
- [ ] Target types (bonus, penalty, chain)
- [ ] Weapon upgrades (faster fire rate, larger hitbox)
- [ ] Challenge modes (moving targets, limited ammo)

---
*Complexity: ⭐⭐ | Concepts: setInterval management, size interpolation, custom cursors, accuracy metrics*
