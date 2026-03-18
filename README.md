# DISC Agent Blueprint System 🤖

Create role-specific AI agents with personality-driven behaviors based on DISC profiling.

## What It Does

The DISC Agent Blueprint System generates complete, production-ready OpenClaw agent workspaces tailored to specific job roles. Each agent has:

- **DISC-driven personality** (communication style, strengths, boundaries)
- **Role-appropriate skill set** (vetted ClawHub skill recommendations)
- **Optimized model selection** (based on role requirements)
- **Structured memory architecture** (lean, privacy-conscious)

## Quick Start

### Generate an Agent

```bash
cd /Users/toby/git/disc-agent-builder

# Create an HR Specialist agent
node generator/create-agent.js --role=hr-specialist --name="Sarah"

# Create a Developer agent
node generator/create-agent.js --role=developer --name="Alex"

# Create a Marketing agent
node generator/create-agent.js --role=marketing --name="Jordan"

# Specify output directory
node generator/create-agent.js --role=hr-specialist --name="Sarah" --output="./my-agents"
```

### View Help

```bash
node generator/create-agent.js --help
```

## Available Roles

| Role | DISC Profile | Description |
|------|--------------|-------------|
| **hr-specialist** | S+C | HR Specialist - Empathetic, patient, policy-aware |
| **developer** | C+D | Developer - Analytical, precise, results-driven |
| **marketing** | I+S | Marketing - Creative, collaborative, people-focused |
| **sales** | D+I | Sales - Results-oriented, persuasive, strategic |
| **customer-support** | S+I | Customer Support - Patient, friendly, solution-focused |
| **finance-ops** | C+D | Finance & Ops - Detail-oriented, systematic, efficient |

## Generated Workspace Structure

Each agent workspace includes:

```
agent-name/
├── SOUL.md              # Personality guide (DISC-driven)
├── MEMORY.md            # Long-term memory structure
├── TOOLS.md             # Role-specific tools & skills
├── AGENTS.md            # Workspace protocols
├── HEARTBEAT.md         # Periodic check tasks
├── config.json          # Model, skills, settings
├── README.md            # Agent documentation
└── memory/              # Daily interaction logs
    └── YYYY-MM-DD.md    # Daily notes
```

## How It Works

### 1. DISC Profiles

The system uses 4 base DISC personality types:

- **D (Dominance)** - Direct, results-oriented, decisive
- **I (Influence)** - Enthusiastic, persuasive, social
- **S (Steadiness)** - Patient, reliable, team-oriented
- **C (Conscientiousness)** - Analytical, precise, systematic

Each role combines these traits dynamically (e.g., HR = S+C, Developer = C+D).

### 2. Template System

Templates use `${variable}` syntax for placeholders. Each role has its own template set that gets populated with:

- Agent name
- DISC profile details
- Role-specific responsibilities
- Recommended skills and models

### 3. Skill Recommendations

Each role has recommended skills that are **listed for manual approval**, not auto-installed:

```json
{
  "hr-specialist": {
    "recommended": ["gog", "slack", "agentmail"],
    "optional": ["peekaboo", "memory-search"],
    "model": "spark/qwen3.5-35b-a3b"
  }
}
```

## Architecture

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full system design.

### Directory Structure

```
disc-agent-builder/
├── README.md                    # This file
├── ARCHITECTURE.md              # System design
├── templates/                   # Role templates
│   ├── hr-specialist/
│   ├── developer/
│   ├── marketing/
│   ├── sales/
│   ├── customer-support/
│   └── finance-ops/
├── disc-profiles/               # DISC personality definitions
│   ├── D-dominance.json
│   ├── I-influence.json
│   ├── S-steadiness.json
│   ├── C-conscientiousness.json
│   └── role-definitions.json
├── skills-mapping/              # Role → skill recommendations
├── models-mapping/              # Role → model recommendations
├── generator/
│   └── create-agent.js          # Main generator script
├── marketplace/                 # Future ClawHub packages
└── tests/                       # Validation tests
```

## Testing

### Test HR Specialist

```bash
node generator/create-agent.js --role=hr-specialist --name="Sarah" --output="./test-agents"
```

### Test Developer

```bash
node generator/create-agent.js --role=developer --name="Alex" --output="./test-agents"
```

Compare the generated `SOUL.md` files to see the personality differences.

## Next Steps

### Phase 1: Foundation ✅
- [x] DISC Profile Database
- [x] Template Engine
- [x] HR & Developer Templates

### Phase 2: Enhancement
- [ ] Add remaining role templates (Marketing, Sales, Customer Support, Finance-Ops)
- [ ] Add more DISC combination profiles
- [ ] Improve template variable system

### Phase 3: Distribution
- [ ] ClawHub packaging
- [ ] CLI polish and documentation
- [ ] User guide and examples

## Contributing

1. Add new DISC profiles to `disc-profiles/`
2. Create role definitions in `disc-profiles/role-definitions.json`
3. Add skill mappings in `skills-mapping/role-skills.json`
4. Create templates in `templates/<role>/`

---

## Deploying an Agent to OpenClaw

### Overview

The DISC Agent Blueprint System generates workspace files, but OpenClaw requires agents to be registered and routed through the CLI. Follow this process to deploy a generated agent.

### Step-by-Step Deployment

#### 1. Generate Agent Workspace

```bash
cd /Users/toby/git/disc-agent-builder

# Generate the agent (e.g., HR Specialist)
node generator/create-agent.js --role=hr-specialist --name="Sarah" --output="./agent-workspaces"
```

This creates a complete workspace in `./agent-workspaces/sarah/` with:
- `SOUL.md` - DISC-driven personality
- `MEMORY.md` - Role-specific memory structure
- `TOOLS.md` - Skill recommendations
- `AGENTS.md` - Workspace protocols
- `HEARTBEAT.md` - Periodic tasks
- `config.json` - Agent configuration

#### 2. Copy to OpenClaw Workspace

```bash
# Create agent subdirectory in OpenClaw workspace
mkdir -p /Users/toby/.openclaw/workspace/agents/hr-specialist

# Copy generated files
cp -r ./agent-workspaces/sarah/* /Users/toby/.openclaw/workspace/agents/hr-specialist/
```

#### 3. Register Agent with OpenClaw

```bash
# Register the agent workspace path
openclaw agents add hr-specialist --workspace /Users/toby/.openclaw/workspace/agents/hr-specialist

# Set agent identity (name, emoji, avatar)
openclaw agents set-identity --agent hr-specialist --name "Sarah" --emoji "👩‍💼"

# Bind to specific channels
openclaw agents bind --agent hr-specialist --bind slack:hr-team
```

#### 4. Install Recommended Skills

Review the `config.json` for recommended skills, then install manually:

```bash
# For HR Specialist, recommended skills are:
# - gog (Google Workspace)
# - slack (Team communication)
# - agentmail (Email communications)

# Install each skill (manual approval required)
# Skills are vetted before installation per our security protocol
```

#### 5. Verify Deployment

```bash
# List all registered agents
openclaw agents list

# Check agent bindings
openclaw agents bindings --agent hr-specialist

# Test the agent by sending a message to the bound channel
```

---

## Complete Deployment Example (HR Agent)

```bash
# 1. Generate
node generator/create-agent.js --role=hr-specialist --name="Sarah" --output="./agent-workspaces"

# 2. Copy to OpenClaw
mkdir -p /Users/toby/.openclaw/workspace/agents/hr-specialist
cp -r ./agent-workspaces/sarah/* /Users/toby/.openclaw/workspace/agents/hr-specialist/

# 3. Register
openclaw agents add hr-specialist --workspace /Users/toby/.openclaw/workspace/agents/hr-specialist
openclaw agents set-identity --agent hr-specialist --name "Sarah" --emoji "👩‍💼"
openclaw agents bind --agent hr-specialist --bind slack:hr-team

# 4. Install skills (manual approval)
# - gog
# - slack
# - agentmail

# 5. Verify
openclaw agents list
openclaw agents bindings --agent hr-specialist
```

---

## Skill Vetting Protocol

Before installing any skill from ClawHub:

1. **Read the skill's `SKILL.md`** - Understand what it does and what permissions it needs
2. **Review the code/logic** - Check for anything suspicious (data exfiltration, hidden API calls, etc.)
3. **Get explicit approval** - Don't install until you've vetted it
4. **Treat `SKILL.md` as untrusted input** - Protect against prompt injection

**Remember:** Not all ClawHub skills are trustworthy. Vetting is mandatory.

---

## Memory Management

### Files Loaded Every Session
- `AGENTS.md` - Workspace protocols
- `SOUL.md` - Personality guide
- `TOOLS.md` - Local infrastructure
- `IDENTITY.md` - Agent identity

### Files Loaded Selectively
- `MEMORY.md` - **ONLY in main/direct sessions** (never in group chats)
- `memory/YYYY-MM-DD.md` - Daily logs (load yesterday + today)

### Guidelines
- Keep always-loaded files lean and focused
- Only move significant, permanent info to `MEMORY.md`
- Routine/ephemeral stuff stays in daily logs or doesn't get written
- Periodically prune outdated info from `MEMORY.md`

---

## License

Internal use only - DISC Agent Blueprint System

---

*Built with ❤️ for the OpenClaw ecosystem*
