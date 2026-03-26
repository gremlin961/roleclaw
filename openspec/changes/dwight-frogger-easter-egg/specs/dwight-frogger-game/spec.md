## ADDED Requirements

### Requirement: Dwight name detection triggers game prompt
When a user attempts to name an agent "Dwight" or "Dwight Schrute", the system SHALL display a modal asking if they want to play a game.

#### Scenario: Agent named "Dwight" triggers prompt
- **WHEN** user enters "Dwight" as agent name
- **THEN** system displays game prompt modal with Yes/No options

#### Scenario: Agent named "Dwight Schrute" triggers prompt
- **WHEN** user enters "Dwight Schrute" as agent name
- **THEN** system displays game prompt modal with Yes/No options

#### Scenario: Other names do not trigger prompt
- **WHEN** user enters any name other than "Dwight" or "Dwight Schrute"
- **THEN** no game prompt appears and normal flow continues

### Requirement: Game modal offers Yes/No choices
The game prompt modal SHALL provide two clear options for the user.

#### Scenario: User selects No
- **WHEN** user clicks "No" or declines the game
- **THEN** modal closes and normal agent creation process continues

#### Scenario: User selects Yes
- **WHEN** user clicks "Yes" to play the game
- **THEN** the Dwight Frogger game launches in a modal window

### Requirement: Game is Office-themed Frogger clone
The game SHALL be a Frogger-style game with Office-themed graphics and 3 rounds of increasing difficulty.

#### Scenario: Player character representation
- **WHEN** game loads
- **THEN** player character appears as a man in white shirt and brown pants

#### Scenario: Obstacles are Office items
- **WHEN** game runs
- **THEN** obstacles include desks, waste baskets, and red staplers instead of traditional cars/buses

#### Scenario: Goal is water coolers
- **WHEN** player reaches top of screen
- **THEN** player must reach one of three water cooler positions to complete the round

### Requirement: Arrow key controls
The game SHALL use keyboard arrow keys for player movement.

#### Scenario: Left arrow moves player left
- **WHEN** user presses left arrow key
- **THEN** player character moves one position to the left

#### Scenario: Right arrow moves player right
- **WHEN** user presses right arrow key
- **THEN** player character moves one position to the right

#### Scenario: Up arrow moves player up
- **WHEN** user presses up arrow key
- **THEN** player character moves one position up toward the goal

#### Scenario: Down arrow moves player down
- **WHEN** user presses down arrow key
- **THEN** player character moves one position down

### Requirement: Three round game structure
The game SHALL consist of exactly 3 rounds with increasing difficulty.

#### Scenario: Round 1 starts automatically
- **WHEN** user accepts to play the game
- **THEN** Round 1 begins with slowest obstacle speed

#### Scenario: Round progression
- **WHEN** player successfully reaches a water cooler
- **THEN** next round begins with increased obstacle speed

#### Scenario: Round 3 completion
- **WHEN** player completes Round 3
- **THEN** game displays victory message and closes modal

#### Scenario: Player collision
- **WHEN** player collides with an obstacle
- **THEN** current round restarts or game ends (based on difficulty level)

### Requirement: Game canvas rendering
The game SHALL render on a canvas element with smooth animation.

#### Scenario: Game loop animation
- **WHEN** game is running
- **THEN** obstacles and player animate smoothly at 60fps

#### Scenario: Responsive canvas
- **WHEN** modal opens
- **THEN** canvas scales appropriately to fit the modal window

### Requirement: Game state management
The game SHALL track rounds, player position, and obstacle positions.

#### Scenario: Round tracking
- **WHEN** game starts
- **THEN** system tracks current round (1-3)

#### Scenario: Collision detection
- **WHEN** player position overlaps with obstacle
- **THEN** collision is detected and appropriate action taken

#### Scenario: Win condition
- **WHEN** player reaches water cooler position
- **THEN** round is marked complete and next round or victory screen shows

### Requirement: Game modal can be dismissed
The game modal SHALL provide a way to exit at any time.

#### Scenario: Close button available
- **WHEN** game modal is open
- **THEN** user can close modal and return to agent creation

#### Scenario: Game exit preserves agent flow
- **WHEN** user exits game
- **THEN** agent creation process continues with the Dwight name
