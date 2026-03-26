## ADDED Requirements

### Requirement: Dwight Schrute Agent Detection
The system SHALL intercept agent names that match "Dwight" or "Dwight Schrute" in the hiring flow.

#### Scenario: Name "Dwight" detected
- **WHEN** the user inputs "Dwight" as the agent name
- **THEN** the system triggers a prompt asking if they want to play a game

#### Scenario: Name "Dwight Schrute" detected
- **WHEN** the user inputs "Dwight Schrute" as the agent name
- **THEN** the system triggers a prompt asking if they want to play a game

#### Scenario: Name "Jim" detected
- **WHEN** the user inputs "Jim" as the agent name
- **THEN** the system proceeds normally without triggering a game prompt

### Requirement: Game Acceptance Prompt
The system SHALL present a specific prompt message when a name match is found.

#### Scenario: User accepts game
- **WHEN** the user selects "Yes" to the game prompt
- **THEN** the Office Frogger game is launched

#### Scenario: User declines game
- **WHEN** the user selects "No" to the game prompt
- **THEN** the normal onboarding process continues
