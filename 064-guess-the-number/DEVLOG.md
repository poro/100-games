# Game 064: Guess the Number

## The Prompt
> "Create a game where the player has to guess a randomly generated number within a certain range and a limited number of attempts."

## Design Thinking

### Core Mechanics
1.  Generate a random number between 1 and 100 at the start of the game.
2.  The player has 10 attempts to guess the number.
3.  The player enters their guess in an input field.
4.  After each guess, the game provides feedback: "Too high!", "Too low!", or "Congratulations!".
5.  The game ends when the player guesses the number correctly or runs out of attempts.

### Implementation Details
The game logic is handled in JavaScript. A random number is generated using `Math.random()`. A variable keeps track of the remaining attempts. The `makeGuess()` function is called when the player clicks the "Guess" button. This function validates the input, compares the guess to the random number, provides feedback, and updates the number of attempts. When the game ends, the input field and button are disabled.

### Code Snippet
```javascript
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = parseInt(guessInput.value);
    const messageText = document.getElementById('message-text');
    const attemptsText = document.getElementById('attempts');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageText.innerText = 'Please enter a valid number between 1 and 100.';
        return;
    }

    attempts--;

    if (guess === randomNumber) {
        messageText.innerText = `Congratulations! You guessed the number ${randomNumber}!`;
        endGame();
    } else if (attempts === 0) {
        messageText.innerText = `Sorry, you've run out of attempts. The number was ${randomNumber}.`;
        endGame();
    } else if (guess < randomNumber) {
        messageText.innerText = 'Too low! Try again.';
    } else {
        messageText.innerText = 'Too high! Try again.';
    }

    attemptsText.innerText = attempts;
    guessInput.value = '';
}
```

## Lessons Learned
*   This game is a great way to practice input handling and validation in JavaScript.
*   The feedback loop of "Too high!" or "Too low!" provides a good example of a simple algorithm.

---
*Complexity: ⭐ | Concepts: input handling, loops, conditional logic*
