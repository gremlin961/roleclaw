## 1. Game Core Implementation

- [x] 1.1 Create `src/games/dwightFrogger.js` with basic terminal setup and cursor manipulation utilities.
- [x] 1.2 Implement character movement logic using `process.stdin` raw mode and `readline.emitKeypressEvents`.
- [x] 1.3 Implement the rendering loop using `process.stdout.write` with office-themed emojis (👨‍💼, 🛋️, 🗑️, 🖇️, 🚰).
- [x] 1.4 Add collision detection between the player and office-themed obstacles.
- [x] 1.5 Implement round progression (3 rounds) and win/loss states.

## 2. Integration

- [x] 2.1 Update `src/commands/hire.js` to detect "Dwight" or "Dwight Schrute" in the `agentName` input.
- [x] 2.2 Implement the "Identity theft is not a joke" prompt using `inquirer` if a name match occurs.
- [x] 2.3 Connect the prompt response to launch the `dwightFrogger` game (via import and function call).
- [x] 2.4 Ensure the game correctly restores terminal state (e.g., `setRawMode(false)`) before returning to the hiring flow.

## 3. Testing and Polish

- [ ] 3.1 Manually test the "Dwight" name detection and prompt.
- [ ] 3.2 Verify game mechanics: movement, obstacle collisions, and water cooler goal.
- [ ] 3.3 Ensure the hiring flow continues as expected regardless of whether the game was played, won, or lost.
- [ ] 3.4 Optimize rendering to minimize flickering and handle terminal resizing gracefully.
