# Pong Game Tutorial 🏓

Learn to build the classic Pong game with AI opponent!

## What You'll Learn

1. **Game canvas setup** - Creating the play area
2. **Paddle mechanics** - Drawing and controlling paddles
3. **Ball physics** - Movement and bouncing
4. **Collision detection** - Ball vs paddle interactions
5. **AI opponent** - Simple but effective computer player
6. **Scoring system** - Points and win conditions

## Step Progression

| Step | File | Concept | What's New |
|------|------|---------|------------|
| 1 | `step1.html` | Canvas & Paddles | Draw the playing field and two paddles |
| 2 | `step2.html` | Player Control | Move bottom/left paddle with keyboard |
| 3 | `step3.html` | Ball Movement | Add a moving ball with velocity |
| 4 | `step4.html` | Wall Bounce | Ball bounces off top and bottom |
| 5 | `step5.html` | Paddle Collision | Ball bounces off paddles |
| 6 | `step6.html` | AI Opponent | Computer controls the other paddle |
| 7 | `step7.html` | Scoring | Track points, display score, win condition |

## Key Concepts

### The Game Loop
Pong runs in a continuous loop:
1. **Update** - Move ball, check collisions, update AI
2. **Render** - Clear screen, draw everything
3. **Repeat** - Use `requestAnimationFrame` for smooth 60fps

### Ball Velocity
The ball has two velocity components:
- `dx` (delta-x): Horizontal speed and direction
- `dy` (delta-y): Vertical speed and direction

Positive values move right/down, negative move left/up.

### Paddle Collision Angle
Where the ball hits the paddle affects its bounce angle:
- **Center hit**: Ball bounces straight
- **Edge hit**: Ball bounces at an angle
- This adds skill and strategy to the game!

### Simple AI
The AI paddle follows the ball's Y position, but with limitations:
- It has a maximum speed (can't teleport)
- It only reacts when ball is moving toward it
- Optional: add slight delay or imperfection for fairness

## Why Pong is Perfect for Learning

- **Minimal art**: Just rectangles!
- **Clear rules**: Ball bounces, paddles move, score points
- **Core concepts**: Every game uses movement, collision, and game loops
- **Expandable**: Easy to add features once basics work

## Try These Challenges After Completing

1. Add a two-player mode (split keyboard: W/S and Arrow keys)
2. Speed up the ball each rally
3. Add "spin" based on paddle movement
4. Create power-ups that appear randomly
5. Add sound effects (beep on hit, buzz on score)

## Historical Note

Pong (1972) was one of the first commercially successful video games. Its simple mechanics hid sophisticated engineering for the time. Today, we can recreate it in about 100 lines of JavaScript!

Happy coding! 🎮
