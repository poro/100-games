# Game 026: Duck Hunt

## The Prompt
> "Create a Duck Hunt-style shooting game"

## What Was Built
A shooting gallery inspired by the NES classic. Ducks fly across the screen in patterns, players have limited shots per round, and a dog reacts to hits/misses. Features increasing difficulty and round-based gameplay.

## Key Decisions

### Design Choices
- **3 shots per duck**: Limited ammo creates tension
- **Dog character**: Celebrates hits, laughs at misses (iconic!)
- **Round progression**: More ducks, faster movement each round

### Technical Approach
- **Bezier flight paths**: Natural flying motion
- **State machine for ducks**: Flying → Hit → Falling
- **Animated sprites**: Dog has different poses

## Code Concepts

### Duck Flight Patterns
```javascript
class Duck {
    constructor(startSide) {
        if (startSide === 'left') {
            this.x = -50;
            this.targetX = WIDTH + 50;
        } else {
            this.x = WIDTH + 50;
            this.targetX = -50;
        }
        
        this.y = HEIGHT * (0.3 + Math.random() * 0.4);
        this.baseY = this.y;
        this.state = 'flying';
        
        // Oscillation for wavy flight
        this.waveOffset = Math.random() * Math.PI * 2;
        this.waveAmplitude = 30 + Math.random() * 40;
        this.waveFrequency = 0.02 + Math.random() * 0.02;
    }

    update() {
        if (this.state === 'flying') {
            // Horizontal movement
            const direction = Math.sign(this.targetX - this.x);
            this.x += direction * this.speed;

            // Wavy vertical movement
            this.waveOffset += this.waveFrequency;
            this.y = this.baseY + Math.sin(this.waveOffset) * this.waveAmplitude;

            // Escaped?
            if ((direction > 0 && this.x > WIDTH + 50) ||
                (direction < 0 && this.x < -50)) {
                this.state = 'escaped';
            }
        } else if (this.state === 'falling') {
            this.vy += GRAVITY;
            this.y += this.vy;
            this.rotation += 0.2;
        }
    }
}
```

### Limited Shots System
```javascript
let shotsRemaining = 3;
let ducksThisRound = 0;
let ducksHit = 0;

function shoot(x, y) {
    if (shotsRemaining <= 0 || roundOver) return;
    
    shotsRemaining--;
    playSound('gunshot');
    createMuzzleFlash(x, y);

    // Check hit
    let hit = false;
    for (const duck of ducks) {
        if (duck.state === 'flying' && 
            distance(x, y, duck.x, duck.y) < DUCK_HITBOX) {
            hitDuck(duck);
            hit = true;
            break;
        }
    }

    if (!hit && shotsRemaining === 0 && activeDucks > 0) {
        // Missed all shots - ducks escape
        roundFailed();
    }
}
```

### Dog Animation States
```javascript
const DOG_STATES = {
    hidden: { frame: 0, y: HEIGHT },
    sniffing: { frames: [0,1,2,1], y: HEIGHT - 80 },
    jumping: { frames: [3], y: HEIGHT - 120 },
    celebrating: { frames: [4,5], y: HEIGHT - 100 },  // Holding duck
    laughing: { frames: [6,7], y: HEIGHT - 90 }       // Player missed
};

class Dog {
    setState(state) {
        this.state = state;
        this.frameIndex = 0;
        this.targetY = DOG_STATES[state].y;
    }

    update() {
        // Animate toward target Y
        this.y += (this.targetY - this.y) * 0.1;

        // Cycle animation frames
        if (this.frameTimer++ > 10) {
            this.frameTimer = 0;
            const frames = DOG_STATES[this.state].frames;
            this.frameIndex = (this.frameIndex + 1) % frames.length;
        }
    }

    celebrate(ducksHit) {
        if (ducksHit > 0) {
            this.setState('celebrating');
        } else {
            this.setState('laughing');  // The infamous laugh!
        }
        setTimeout(() => this.setState('hidden'), 2000);
    }
}
```

### Round Progression
```javascript
function startRound(roundNum) {
    round = roundNum;
    ducksThisRound = Math.min(10, 3 + round);
    duckSpeed = BASE_SPEED * (1 + round * 0.15);
    ducksRequired = Math.ceil(ducksThisRound * 0.6);  // 60% hit rate needed

    dog.setState('sniffing');
    setTimeout(() => {
        dog.setState('jumping');
        setTimeout(() => {
            dog.setState('hidden');
            spawnDucks();
        }, 500);
    }, 2000);
}
```

## Iterations
1. **v1**: Flying ducks with click-to-shoot
2. **v2**: Dog character with reaction animations
3. **v3**: Round system, difficulty scaling, sound effects

## Bugs Encountered
- **Multiple ducks hit with one shot**: Loop continued after hit → `break` after first hit
- **Dog stuck on screen**: State not resetting → Added timeout to return to hidden

## Lessons Learned
- Character reactions (dog) add huge personality
- Limited ammo transforms casual shooting into strategy
- Sound effects are crucial for shooting games

## Time to Build
~65 minutes (prompt to playable)

## Ideas for Improvement
- [ ] Clay pigeons mode
- [ ] Two-player alternating
- [ ] Different duck types (bonus, penalty)
- [ ] Light gun / gyroscope aiming on mobile

---
*Complexity: ⭐⭐⭐ | Concepts: flight patterns, state machines, character animation, round-based progression*
