## Why

To add a fun, office-themed easter egg game ("Frogger" style) triggered by specific agent names, enhancing user engagement and personality within the RoleClaw CLI. This provides a delightful surprise for fans of "The Office" and classic arcade games.

## What Changes

- **Agent Name Detection**: Modify the hiring flow to check if the user-provided agent name is "Dwight" or "Dwight Schrute".
- **Game Trigger**: If the name matches, prompt the user with "Identity theft is not a joke, Jim! Millions of families suffer every year! ...Wait, actually, do you want to play a game?"
- **Office Frogger Game**: Implement a 3-round, terminal-based "Frogger" clone with the following office themes:
  - Main character: Man in white shirt and brown pants (Dwight-like).
  - Obstacles: Desks, waste baskets, and red staplers instead of cars/buses.
  - Goal: Reach 1 of 3 digital water coolers at the top.
  - Controls: Arrow keys for movement.
- **Game Integration**: If the user accepts, launch the game. After the game ends (win or lose), resume the normal onboarding process. If they decline, proceed directly to onboarding.

## Capabilities

### New Capabilities
- `dwight-frogger-easter-egg`: Implements the terminal-based Frogger game logic, rendering, and input handling.

### Modified Capabilities
- `agent-onboarding`: Update the onboarding flow in `src/commands/hire.js` to include the name check and game trigger logic.

## Impact

- `src/commands/hire.js`: Modified to intercept the `agentName` and potentially launch the game.
- `src/games/dwightFrogger.js`: New file containing the game implementation.
- `package.json`: May need additional dependencies for terminal manipulation (e.g., `readline`, `keypress`, or `term-canvas` if applicable, though standard `readline` should suffice).
