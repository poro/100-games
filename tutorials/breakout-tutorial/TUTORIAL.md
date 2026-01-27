# Breakout Game Tutorial 🧱

Learn to build the classic Breakout (brick breaker) game from scratch!

## What You'll Learn

1. **Paddle mechanics** - Drawing and moving a player-controlled paddle
2. **Ball physics** - Bouncing off walls and objects
3. **Brick layouts** - Creating and drawing a grid of bricks
4. **Collision detection** - Ball vs paddle, ball vs bricks
5. **Game state** - Lives, scoring, winning
6. **Polish** - Effects, power-ups, and juice

## Step Progression

| Step | File | Concept | What's New |
|------|------|---------|------------|
| 1 | `step1.html` | Canvas Setup | HTML structure, canvas basics |
| 2 | `step2.html` | The Paddle | Drawing and positioning the paddle |
| 3 | `step3.html` | Paddle Controls | Moving paddle with keyboard/mouse |
| 4 | `step4.html` | The Ball | Drawing and basic ball movement |
| 5 | `step5.html` | Ball Bouncing | Wall and paddle collision |
| 6 | `step6.html` | Bricks | Creating and drawing the brick grid |
| 7 | `step7.html` | Brick Collision | Breaking bricks, scoring |
| 8 | `step8.html` | Complete Game | Lives, win/lose, effects, polish |

## Key Concepts

### Ball Physics
The ball has a velocity (dx, dy) that determines how fast and in which direction it moves. When it hits something, we reverse the appropriate velocity component:
- Hit left/right wall: reverse dx (horizontal bounce)
- Hit top wall: reverse dy (vertical bounce)
- Hit paddle/brick: reverse dy and optionally adjust dx based on hit position

### Paddle Collision Zones
A clever trick: where the ball hits the paddle affects its bounce angle. Hitting the center sends it straight up, hitting the edges sends it at an angle. This gives the player more control!

### Brick Grid
Bricks are stored in a 2D array. Each brick has an x, y position and a "status" (1 = visible, 0 = broken). We loop through the array to draw and check collisions.

## Try These Challenges After Completing

1. Add power-ups (wider paddle, multi-ball, laser)
2. Create different brick types (multi-hit, explosive)
3. Add levels with different layouts
4. Implement a high score system
5. Add sound effects and music

## Final Result

The completed game (`step8.html`) features:
- Responsive paddle control (keyboard + mouse)
- Realistic ball physics
- Multiple rows of colorful bricks
- Score tracking and lives system
- Win/lose conditions
- Particle effects on brick break

Happy coding! 🎮
