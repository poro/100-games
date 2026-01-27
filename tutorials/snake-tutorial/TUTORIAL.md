# Snake Game Tutorial 🐍

Learn to build the classic Snake game from scratch! Each step introduces ONE new concept.

## What You'll Learn

1. **HTML5 Canvas basics** - Setting up a drawing surface
2. **Drawing shapes** - Rendering the snake on screen
3. **Game loops** - Making things move automatically
4. **Keyboard input** - Responding to player controls
5. **Game state** - Tracking food, score, and snake body
6. **Collision detection** - Knowing when game events occur
7. **Game over logic** - Handling win/lose conditions
8. **Polish** - Making it feel like a real game

## Step Progression

| Step | File | Concept | What's New |
|------|------|---------|------------|
| 1 | `step1.html` | Canvas Setup | Create HTML structure and get canvas context |
| 2 | `step2.html` | Drawing | Draw a static snake on the grid |
| 3 | `step3.html` | Game Loop | Make the snake move automatically |
| 4 | `step4.html` | Input | Control direction with arrow keys |
| 5 | `step5.html` | Food | Add food that makes the snake grow |
| 6 | `step6.html` | Collision | Detect wall and self-collision |
| 7 | `step7.html` | Game Over | Show score and restart option |
| 8 | `step8.html` | Polish | Speed increase, better styling, effects |

## How to Use This Tutorial

1. Open each step in your browser to see it working
2. Read ALL the comments in the code
3. Try modifying values to see what happens
4. Only move to the next step when you understand the current one
5. If stuck, compare your code to the working example

## Key Concepts

### The Grid System
Snake moves on a grid, not pixel-by-pixel. This makes collision detection simple - we just compare grid positions.

### The Game Loop
Games run in a loop: **Update → Draw → Repeat**. We use `setInterval()` to call our game function repeatedly.

### The Snake as an Array
The snake body is an array of {x, y} positions. The head is at index 0. To move, we add a new head and remove the tail.

## Try These Challenges After Completing

1. Add obstacles/walls in the middle
2. Make the snake wrap around screen edges
3. Add power-ups (speed boost, slow motion)
4. Create a two-player mode
5. Add sound effects

## Final Result

The completed game (`step8.html`) features:
- Smooth snake movement
- Score tracking
- Increasing difficulty (speed)
- Game over and restart
- Clean, modern styling

Happy coding! 🎮
