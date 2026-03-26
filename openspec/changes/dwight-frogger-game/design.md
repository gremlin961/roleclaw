## Context

The RoleClaw CLI's `hire` command uses `inquirer` to gather agent details. To implement the "Dwight" easter egg, we need to intercept the name entry and conditionally launch a terminal-based game. The game itself needs to handle raw keyboard input and perform simple terminal rendering without adding heavy external dependencies.

## Goals / Non-Goals

**Goals:**
- Detect specific agent names ("Dwight", "Dwight Schrute").
- Launch a 3-round office-themed "Frogger" clone.
- Handle keyboard input for character movement (arrow keys).
- Seamlessly return to the onboarding flow after the game ends.

**Non-Goals:**
- High-fidelity graphics; the game will be character/emoji-based.
- Multiplayer or networking capabilities.
- Persisting game high scores.

## Decisions

### 1. Game Implementation Location
- **Decision**: Create `src/games/dwightFrogger.js`.
- **Rationale**: Keeps game logic separate from the main CLI commands and follows the existing project structure (as seen in `src/games/dwightGame.js`).

### 2. Terminal Rendering Strategy
- **Decision**: Use Node.js `readline` and `process.stdout` for cursor manipulation and rendering.
- **Rationale**: Avoids adding large dependencies like `blessed` or `term-canvas`. Standard `readline` is sufficient for a simple character-based game.
- **Alternatives**: `blessed` (too complex for an easter egg), `term-canvas` (requires more setup).

### 3. Input Handling
- **Decision**: Use `process.stdin.setRawMode(true)` and `readline.emitKeypressEvents(process.stdin)`.
- **Rationale**: Allows for real-time response to arrow keys without requiring the user to press Enter.
- **Note**: Must be careful to restore the previous state so `inquirer` can continue correctly.

### 4. Game Integration Point
- **Decision**: Modify `src/commands/hire.js` immediately after the `inquirer` prompt for `agentName`.
- **Rationale**: This is the natural point where the name is first known and the flow can be diverted.

## Risks / Trade-offs

- **[Risk] Terminal Size** → If the terminal is too small, the game board may wrap or look broken.
  - **Mitigation**: Detect terminal size at launch and either scale the board or show a "Terminal too small" message.
- **[Risk] Inquirer Conflict** → `inquirer` manages `stdin`. Switching to raw mode for the game might interfere.
  - **Mitigation**: Ensure the game only starts *after* the `agentName` question is answered and before the next question, or use a temporary `stdin` listener that is cleaned up properly.
- **[Risk] Emoji Support** → Not all terminals render emojis correctly.
  - **Mitigation**: Use a mix of emojis and ASCII fallbacks if needed, or stick to widely supported emojis.
