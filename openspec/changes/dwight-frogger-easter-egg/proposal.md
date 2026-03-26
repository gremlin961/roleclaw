## Why

Add an Office-themed easter egg game that activates when users name an agent "Dwight" or "Dwight Schrute", enhancing user engagement with a fun, interactive experience inspired by classic arcade games.

## What Changes

- Add agent naming validation that detects "Dwight" or "Dwight Schrute" as agent names
- Create a modal/prompt asking if user wants to play a game when Dwight names are detected
- Implement a 3-round Frogger-style game with Office themes:
  - Player character: Man in white shirt and brown pants (Dwight)
  - Obstacles: Desks, waste baskets, red staplers instead of cars/buses
  - Goal: Reach one of three water coolers at the top of the screen
  - Controls: Arrow keys for movement
- Add game state management for rounds, scoring, and win/lose conditions
- Integrate game canvas rendering and animation loop
- Add sound effects and visual feedback for game events

## Capabilities

### New Capabilities

- `dwight-frogger-game`: Complete easter egg game system including agent name detection, game UI modal, 3-round gameplay with Office-themed assets, and game state management

### Modified Capabilities

<!-- No existing capabilities modified - this is a new feature -->

## Impact

- New game components and assets (canvas rendering, game loop, Office-themed graphics)
- Agent creation/renaming flow gains conditional game prompt
- New keyboard event handlers for game controls
- Additional dependencies for game rendering (if not already present)
- Minimal impact on existing agent functionality - game only triggers on specific names
