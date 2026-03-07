# Game 063: Rock Paper Scissors

## The Prompt
> "Create a simple Rock Paper Scissors game against the computer."

## Design Thinking

### Core Mechanics
1.  Player can choose between Rock, Paper, or Scissors.
2.  The computer randomly selects one of the three options.
3.  The winner is determined based on the classic rules:
    *   Rock beats Scissors
    *   Scissors beats Paper
    *   Paper beats Rock
4.  The result (win, lose, or tie) is displayed.
5.  A running score is kept.

### Implementation Details
The game is implemented in a single HTML file with embedded CSS and JavaScript. The player's choice is passed to a `play()` function when a button is clicked. The computer's choice is generated randomly. The game logic then determines the winner and updates the UI with the result and the new score.

### Code Snippet
```javascript
function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let resultText = '';

    if (playerChoice === computerChoice) {
        resultText = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultText = 'You win!';
        score++;
    } else {
        resultText = 'You lose!';
        score--;
    }

    document.getElementById('result-text').innerText = resultText;
    document.getElementById('player-choice').innerText = playerChoice;
    document.getElementById('computer-choice').innerText = computerChoice;
    document.getElementById('score').innerText = score;
}
```

## Lessons Learned
*   This is a great introductory game for teaching basic JavaScript concepts like functions, event handling, and random number generation.
*   The use of emojis for the choices makes the UI simple and intuitive.

---
*Complexity: ⭐ | Concepts: random number generation, conditional logic, DOM manipulation*
