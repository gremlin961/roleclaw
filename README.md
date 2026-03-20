# RoleClaw (DISC + OpenClaw) 🪩

**[www.roleclaw.ai](https://www.roleclaw.ai)**

**The Talent Agency for AI Agents.** 

RoleClaw makes it incredibly easy to search, configure, and deploy pre-configured OpenClaw agents. Every agent is tailored to a specific job role and possesses a unique, distinct personality driven by **DISC profiling**.

## Why RoleClaw?

Instead of manually building OpenClaw workspaces from scratch, you "hire" an AI candidate.

- **DISC-driven personality** (Communication styles, strengths, boundaries)
- **Role-appropriate skill sets** (Out-of-the-box OpenClaw skill recommendations)
- **Frictionless Onboarding** (Automated OpenClaw registration)

## Installation

```bash
# Clone the repository
git clone https://github.com/your-org/disc-agent-builder.git
cd disc-agent-builder

# Install dependencies
npm install

# Link the CLI globally
npm link
```

## Usage

RoleClaw provides two main commands: `search` to find candidates, and `hire` to deploy them.

### 1. Search for Candidates

Find the perfect AI employee for your OpenClaw instance.

```bash
# See all available candidates
roleclaw search

# Search by role
roleclaw search "marketing"
```

### 2. Hire & Deploy

Found the right candidate? Hire them interactively. RoleClaw handles the OpenClaw configuration automatically.

```bash
roleclaw hire hr-specialist
```

The CLI will walk you through the onboarding process:
1. Setting the agent's name and emoji.
2. Selecting the right LLM model for the role.
3. Reviewing and confirming the required OpenClaw skills.

Under the hood, RoleClaw generates the workspace and automatically runs the necessary `openclaw` commands to register and deploy your new agent.

## Available Roles (The Talent Pool)

| Role | DISC Profile | Description |
|------|--------------|-------------|
| **hr-specialist** | S+C | Empathetic, patient, policy-aware |
| **developer** | C+D | Analytical, precise, results-driven |
| **marketing** | I+S | Creative, collaborative, people-focused |
| **sales** | D+I | Results-oriented, persuasive, strategic |
| **customer-support** | S+I | Patient, friendly, solution-focused |

*(More roles coming soon!)*

## Architecture

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full system design and "Talent Agency" approach.

## Contributing

1. Add new DISC profiles to `disc-profiles/`
2. Create new templates in `templates/<role>/`
3. Add a `manifest.json` to your template directory.
