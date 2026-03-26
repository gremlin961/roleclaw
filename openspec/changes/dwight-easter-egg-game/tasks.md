## 1. Easter Egg Detection in Hire Command

- [x] 1.1 Modify src/commands/hire.js to detect "Dwight" or "Dwight Schrute" agent names
- [x] 1.2 Add prompt asking user if they want to play game when Dwight name detected
- [x] 1.3 Implement logic to continue normal hiring process if user declines
- [x] 1.4 Implement logic to launch game if user accepts

## 2. Game Implementation

- [x] 2.1 Create new game module src/games/dwightGame.js
- [x] 2.2 Implement game initialization and setup
- [x] 2.3 Create office-themed game board representation
- [x] 2.4 Implement character (white shirt/brown pants) representation
- [x] 2.5 Implement obstacle representation (desks, waste baskets, red staplers)
- [x] 2.6 Implement goal representation (3 water coolers at top)
- [x] 2.7 Implement keyboard controls using arrow keys
- [x] 2.8 Implement collision detection with obstacles
- [x] 2.9 Implement round completion when reaching water cooler
- [x] 2.10 Implement 3-round progression with increasing difficulty
- [x] 2.11 Implement game over conditions and feedback
- [x] 2.12 Add game to project dependencies/imports

## 3. Integration and Testing

- [x] 3.1 Import game module in hire command
- [x] 3.2 Test Easter egg detection with "Dwight" name
- [x] 3.3 Test Easter egg detection with "Dwight Schrute" name
- [x] 3.4 Test normal hiring process when declining game
- [x] 3.5 Test game launch when accepting
- [ ] 3.6 Test game mechanics and controls
- [ ] 3.7 Test 3-round progression
- [ ] 3.8 Test collision detection and game over
- [ ] 3.9 Verify no impact on normal hiring process for non-Dwight names
