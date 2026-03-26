## ADDED Requirements

### Requirement: Office Frogger Game Logic
The system SHALL implement a terminal-based game similar to "Frogger" with an office theme.

#### Scenario: Character movement
- **WHEN** the user presses an arrow key
- **THEN** the character moves one unit in the corresponding direction

#### Scenario: Obstacle collision
- **WHEN** the character occupies the same cell as an obstacle (desk, waste basket, or red stapler)
- **THEN** the round resets and the character is returned to the starting position

#### Scenario: Round completion
- **WHEN** the character reaches one of the three digital water coolers at the top of the screen
- **THEN** the next round begins, or the game ends if it was the final round

### Requirement: Office Theme Rendering
The system SHALL use specific characters or emojis to represent office-themed elements.

#### Scenario: Character representation
- **WHEN** the game renders the main character
- **THEN** it uses a "Man in white shirt and brown pants" representation (e.g., 👨‍💼 or a specific ASCII pattern)

#### Scenario: Obstacle representation
- **WHEN** the game renders obstacles
- **THEN** it uses office-themed icons such as 🛋️ (desk), 🗑️ (waste basket), and 🖇️ (red stapler)

#### Scenario: Goal representation
- **WHEN** the game renders goals
- **THEN** it uses water cooler icons (e.g., 🚰 or ⛲)
