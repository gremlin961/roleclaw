## ADDED Requirements

### Requirement: Dwight Easter Egg Detection
When hiring an agent, if the user names the agent "Dwight" or "Dwight Schrute", the system shall detect this and offer to play an Easter egg game.

#### Scenario: User names agent Dwight
- **WHEN** the user enters "Dwight" as the agent name during the hiring process
- **THEN** the system shall ask if the user wants to play a game

#### Scenario: User names agent Dwight Schrute
- **WHEN** the user enters "Dwight Schrute" as the agent name during the hiring process
- **THEN** the system shall ask if the user wants to play a game

#### Scenario: User declines to play game
- **WHEN** the system offers the game and the user selects "no"
- **THEN** the normal hiring process shall continue without interruption

#### Scenario: User accepts to play game
- **WHEN** the system offers the game and the user selects "yes"
- **THEN** the system shall launch the office-themed Frogger-like game

### Requirement: Office-Themed Frogger Game
The Easter egg game shall be a Frogger-like game with office theme consisting of 3 rounds.

#### Scenario: Game presentation
- **WHEN** the game starts
- **THEN** the system shall display a game screen with office-themed elements

#### Scenario: Character representation
- **WHEN** the game starts
- **THEN** the main character shall be represented as a man in a white shirt and brown pants

#### Scenario: Obstacle representation
- **WHEN** the game is running
- **THEN** vehicles shall be replaced with office items such as desks, waste baskets, and red staplers

#### Scenario: Goal representation
- **WHEN** the game is running
- **THEN** the ultimate goal shall be to reach one of three water coolers at the top of the screen

#### Scenario: Game rounds
- **WHEN** the game is played
- **THEN** the game shall consist of 3 rounds increasing in difficulty

#### Scenario: Keyboard controls
- **WHEN** the game is running
- **THEN** the user shall move the main character using the arrow buttons on their keyboard

#### Scenario: Game completion
- **WHEN** the user successfully reaches a water cooler
- **THEN** the round shall be completed and the user shall advance to the next round or finish the game

#### Scenario: Game over
- **WHEN** the user collides with an obstacle
- **THEN** the current round shall end and appropriate feedback shall be given
