## Context

The application needs an engaging easter egg feature that activates when users name an agent "Dwight" or "Dwight Schrute". This will be a self-contained Frogger-style game with Office themes. The game should not interfere with normal agent creation flow when users decline to play.

## Goals / Non-Goals

**Goals:**
- Detect "Dwight" or "Dwight Schrute" agent names and trigger game prompt
- Implement a 3-round Frogger-style game with Office-themed graphics
- Player character moves with arrow keys to reach water coolers at top of screen
- Obstacles include desks, waste baskets, and red staplers
- Game modal can be dismissed to continue normal agent creation process
- Responsive canvas rendering that works across different screen sizes

**Non-Goals:**
- Multiplayer functionality
- High score persistence (can be added later)
- Sound effects (can be added later)
- Mobile/touch controls
- Complex power-ups or special abilities

## Decisions

**Canvas vs DOM-based rendering**: Use HTML5 Canvas for smooth 60fps animation and efficient sprite rendering. Canvas is better suited for game loops with multiple moving objects compared to DOM manipulation.

**Single file game component**: Keep the game self-contained in one React component with embedded game logic. This makes it easy to remove or modify without affecting other parts of the app.

**Arrow key controls**: Use keyboard event listeners for arrow keys as specified. This provides precise control and matches classic arcade game feel.

**3-round structure**: Each round increases difficulty (faster obstacles, tighter gaps). This provides progression without requiring complex scoring systems.

**Sprite-based graphics**: Use simple geometric shapes and colors to represent Office items (white/brown for Dwight, various shapes for obstacles). Keeps asset requirements minimal.

## Risks / Trade-offs

[Risk] Keyboard event conflicts with other app shortcuts → [Mitigation] Use event.stopPropagation() and only activate game controls when modal is open

[Risk] Canvas may not scale well on all devices → [Mitigation] Implement responsive canvas sizing and test on common viewport sizes

[Risk] Game could block agent creation flow → [Mitigation] Ensure clear "No, continue" button that immediately closes modal and proceeds with normal flow

[Risk] Performance issues with animation loop → [Mitigation] Use requestAnimationFrame and clean up event listeners on component unmount

## Migration Plan

1. Create game component and assets
2. Add agent name detection logic to agent creation flow
3. Integrate game modal trigger when Dwight names are detected
4. Test game functionality and ensure normal flow continues when declined
5. Deploy with feature flag if needed for testing

## Open Questions

- What is the current agent creation flow structure? (need to examine existing code)
- Are there existing game libraries or utilities in the codebase?
- What styling system does the app use (CSS modules, styled-components, etc.)?
