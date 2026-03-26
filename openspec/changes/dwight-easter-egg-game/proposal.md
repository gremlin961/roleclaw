## Why

Add an entertaining Easter egg to the RoleClaw hiring process that engages users with a nostalgic office-themed game when they name their agent after the iconic Dwight Schrute character from The Office.

## What Changes

- Add Easter egg detection in the hire command when agent name is "Dwight" or "Dwight Schrute"
- Implement a Frogger-like office-themed game with 3 rounds
- Game features: character in white shirt/brown pants, office obstacles (desks, waste baskets, red staplers), goal to reach water coolers
- Keyboard controls using arrow keys for character movement
- Normal hiring process continues if user declines to play game

## Capabilities

### New Capabilities
- `dwight-easter-egg`: Easter egg game triggered when naming agent Dwight/Dwight Schrute

### Modified Capabilities
- None (no existing capability requirements are changing)

## Impact

- Modification to src/commands/hire.js to add Easter egg logic
- New game implementation files (to be determined in design phase)
- No breaking changes to existing functionality
