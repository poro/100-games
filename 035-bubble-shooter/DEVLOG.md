# DEVLOG - 035 Bubble Shooter

## Game Overview
A classic bubble shooter game where players aim and shoot colored bubbles to match 3+ of the same color. Features hex-grid snapping, wall bouncing, and floating bubble removal.

## Development Date
February 3, 2026

## AI Prompts Used

### Initial Creation
> Create a complete HTML5 canvas bubble shooter game. Single file, no dependencies. Include:
> - Hex grid pattern for bubble placement
> - Aim line with wall bounce preview
> - Match-3+ mechanics to pop bubbles
> - Floating bubble detection and removal
> - Progressive levels
> - Mobile touch support

### Polish Iteration
> Add visual polish:
> - Gradient bubbles with 3D shine effect
> - Smooth aim line
> - Score multiplier for combos
> - Next bubble preview

## Key Features
- Hex-grid bubble arrangement (natural packing)
- Dotted aim line showing trajectory
- Wall bounce physics
- Match detection using flood fill algorithm
- Floating bubble removal (bubbles not connected to ceiling fall)
- Level progression when all bubbles cleared
- Touch controls for mobile

## Technical Notes

### Hex Grid Math
```javascript
// Offset every other row for hex pattern
const offset = row % 2 === 1 ? BUBBLE_RADIUS : 0;
const x = offsetX + col * (BUBBLE_RADIUS * 2) + offset;
const y = offsetY + row * rowHeight;
```

### Collision Detection
Uses distance-based collision with 1.8x radius for natural snap feel.

### Match Finding
Flood-fill algorithm starting from newly placed bubble, checking same-color neighbors within 2.2x radius.

### Floating Bubble Detection
BFS from all top-row bubbles to find connected set. Any bubble not in set is "floating" and removed.

## Lessons Learned
1. Hex grids need special handling for odd/even rows
2. Snap-to-grid feels better with slightly generous collision radius
3. Preview aim line should show bounces for better UX
4. Floating bubble removal is key to satisfying gameplay

## Play Time
~3-5 minutes per level

## Difficulty
Medium - requires aim precision and color strategy

## Mobile Status
✅ Fully playable with touch
