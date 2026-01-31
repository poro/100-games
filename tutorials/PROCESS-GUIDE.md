# 🎮 How to Prompt AI to Make Browser Games

A meta-guide on using AI (like Claude) to create playable browser games from scratch.

## The Core Philosophy

**Think like a game designer, not a programmer.** When prompting AI, describe what you want to experience, not how to code it. The AI handles the "how" - you focus on the "what" and "why."

---

## The Anatomy of a Great Game Prompt

### 1. Start with the Core Mechanic

Bad: "Make me a game"
Good: "Make a game where you control a paddle to bounce a ball and break bricks"

**The pattern:**
> "Make a game where [player action] to [achieve goal]"

Examples:
- "Make a game where you click rising balloons before they escape"
- "Make a game where you guide a snake to eat food without hitting yourself"
- "Make a game where you shoot descending aliens before they reach you"

### 2. Specify the Technology Stack

Always be explicit:
> "Use HTML5 Canvas and vanilla JavaScript. No external libraries or dependencies."

This ensures:
- The game works in any browser
- No dependency management needed
- Simple deployment (just upload files)

### 3. Define the Controls

Be specific about input methods:
- "Arrow keys to move, spacebar to shoot"
- "Click/tap to jump"
- "Mouse to aim, click to fire"
- "Drag to draw a path"

For mobile support, add:
> "Include touch controls: swipe to move, tap to shoot"

### 4. Request Visual Style

Vague: "Make it look good"
Better: "Retro pixel art style with neon colors on a dark background"

Style keywords that work well:
- **Retro/Arcade**: Pixel art, CRT glow effects, 8-bit colors
- **Modern/Clean**: Gradients, rounded corners, subtle shadows
- **Minimalist**: Simple shapes, limited color palette
- **Neon/Synthwave**: Dark backgrounds, glowing elements
- **Cute/Cartoon**: Bouncy animations, pastel colors

### 5. Specify Difficulty & Progression

Games need challenge. Include:
- "Start easy, get progressively harder"
- "Speed increases as score rises"
- "Enemies spawn faster over time"
- "Add new mechanics each level"

---

## The Iterative Approach

### First Prompt: Get Something Working

Start simple:
> "Create a basic Pong game. One paddle controlled by mouse, ball bounces off walls. Just get the core mechanic working."

### Second Prompt: Add Features

Once the base works:
> "Add a score counter, make the ball speed up each hit, and add a game over screen when the ball goes past the paddle"

### Third Prompt: Polish

Final touches:
> "Add particle effects when the ball hits something, a subtle screen shake on score, and a neon glow effect on the paddle"

---

## Common Pitfalls & Fixes

### ❌ Problem: Game runs too fast/slow

**Fix prompt:**
> "The ball moves too fast. Reduce ball speed to X pixels per frame" (or use `requestAnimationFrame` properly)

### ❌ Problem: Controls feel sluggish

**Fix prompt:**
> "Make controls more responsive. Use continuous key detection (track if key is held, not just key events)"

### ❌ Problem: Collision detection is buggy

**Fix prompt:**
> "Ball sometimes passes through paddle. Add proper rectangle-rectangle or circle-rectangle collision detection"

### ❌ Problem: Game is too easy/hard

**Fix prompt:**
> "Game is too easy. Increase difficulty by: starting with more enemies, making them faster, reducing player lives to 3"

### ❌ Problem: Looks boring

**Fix prompt:**
> "Add juice! Include: particle effects on impact, screen shake on damage, trailing effects behind the ball, a score popup animation"

---

## Magic Phrases That Work

### For Features
- "Add a high score that persists using localStorage"
- "Include a pause feature (press P to toggle)"
- "Add mobile touch controls"
- "Create 3 difficulty levels the player can choose"

### For Polish
- "Add satisfying feedback when [action happens]"
- "Make it feel like an arcade game"
- "Add particles/effects for [specific events]"
- "Include subtle animations during idle states"

### For Fixes
- "The [specific thing] isn't working. [Describe what happens vs. what should happen]"
- "Make [element] snap to grid / stay within bounds"
- "Prevent [unwanted behavior] by [adding check/limit]"

---

## Template: Complete Game Prompt

```
Create a [GAME TYPE] game using HTML5 Canvas and vanilla JavaScript (no dependencies).

**Core Mechanic:**
[Describe what the player does and what they're trying to achieve]

**Controls:**
- [Input method] to [action]
- [Input method] to [action]
Include touch controls for mobile.

**Game Rules:**
- [Win/lose condition]
- [Scoring system]
- [Lives/attempts]

**Visual Style:**
[Describe the look and feel]

**Progression:**
[How difficulty increases]

**Required Features:**
- High score persistence (localStorage)
- Game over screen with restart option
- Score display during gameplay
- Sound effects for key actions (optional)

Make it polished and fun to play!
```

---

## Example: Building Snake

### Prompt 1: Core
> "Create the classic Snake game. Arrow keys to move. Snake eats food and grows. Dies if it hits walls or itself. Use HTML5 Canvas, no libraries."

### Prompt 2: Polish
> "Add: score display, speed increase as snake grows, high score with localStorage, game over screen with 'Press SPACE to restart'"

### Prompt 3: Mobile
> "Add swipe controls for mobile. Swipe direction changes snake direction. Also add on-screen arrow buttons for touch."

### Prompt 4: Juice
> "Add visual polish: snake body has gradient from head to tail, food pulses gently, particles burst when eating food"

---

## Advanced: Multi-Step Tutorials

For creating educational step-by-step tutorials:

> "Create a tutorial version of [GAME] broken into 8 steps. Each step should:
> 1. Introduce ONE new concept
> 2. Be a complete, runnable HTML file
> 3. Have extensive code comments explaining what each part does
> 4. Build on the previous step
>
> Steps: 1) Canvas setup, 2) Draw player, 3) Movement, 4) Add objective, 5) Collision, 6) Scoring, 7) Game over, 8) Polish"

---

## The Golden Rules

1. **Be specific** - Vague prompts get vague results
2. **Iterate** - Don't try to get everything in one prompt
3. **Test and describe** - When something's wrong, describe the actual vs. expected behavior
4. **Think player experience** - Describe how it should feel to play
5. **Request comments** - Ask for commented code to understand and modify later

---

## Quick Reference: Game-Specific Tips

| Game Type | Key Prompt Elements |
|-----------|-------------------|
| **Clicker** | Click feedback, score multipliers, visual progression |
| **Platformer** | Gravity value, jump height, ground detection |
| **Shooter** | Fire rate, bullet speed, enemy patterns |
| **Puzzle** | Clear win condition, reset ability, hint system |
| **Physics** | Bounce coefficient, friction, velocity limits |
| **Arcade** | Lives system, difficulty curve, high score |

---

## Final Advice

The best games come from clear vision plus iteration. Don't expect perfection on the first try. Prompt, play, refine, repeat.

And most importantly: **have fun!** You're literally conjuring games out of words. That's magic. 🎩✨
