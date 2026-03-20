# RoleClaw Blueprint System - Architecture

> **Purpose:** A "Talent Agency" for AI Agents. Discover, configure, and seamlessly deploy pre-configured OpenClaw agents tailored to specific job roles and driven by DISC personality profiling.

---

## 🎯 Vision

Transitioning from a generic marketplace to a "Talent Agency" model where users "hire" and "onboard" AI candidates. 

RoleClaw (DISC + OpenClaw) abstracts away the complexity of manual workspace creation and OpenClaw registration. It provides an intuitive CLI to:
1. **Search** for the right AI candidate based on role or traits.
2. **Configure** their identity and tools interactively (the "Interview").
3. **Deploy** them directly to a local OpenClaw instance automatically (the "Onboarding").

---

## 📁 Directory Structure

```
/Users/toby/git/disc-agent-builder/
├── README.md                    # Project overview
├── ARCHITECTURE.md              # This file
├── package.json                 # Node dependencies and 'roleclaw' bin
├── bin/
│   └── roleclaw.js                 # CLI entrypoint
├── src/
│   ├── commands/                # CLI commands (search, hire)
│   ├── registry/                # Central candidate registry builder
│   ├── utils/                   # Shared utilities (OpenClaw bridge)
│   └── templates/               # Role-specific OpenClaw workspaces
├── templates/                   # Role templates
│   ├── hr-specialist/
│   │   ├── manifest.json        # Candidate profile and metadata
│   │   ├── SOUL.md.template
│   │   ├── MEMORY.md.template
│   │   ├── TOOLS.md.template
│   │   ├── AGENTS.md.template
│   │   ├── HEARTBEAT.md.template
│   │   └── config.json.template
│   └── ... (other roles)
├── disc-profiles/               # DISC personality definitions
├── skills-mapping/              # Role → OpenClaw skill recommendations
├── models-mapping/              # Role → Recommended LLMs
└── tests/                       # Validation tests
```

---

## 🔑 Core Components

### 1. The Registry (The "Talent Pool")
A centralized registry catalogs all available AI candidates. It parses the `manifest.json` files from each template directory to build a comprehensive list of roles, traits, and skills.

```json
// Example candidate manifest (hr-specialist/manifest.json)
{
  "role_id": "hr-specialist",
  "title": "HR & Employee Relations Specialist",
  "disc_profile": "S+C",
  "traits": ["Empathetic", "Patient", "Detail-oriented"],
  "capabilities": ["Conflict Resolution", "Onboarding", "Policy QA"],
  "recommended_skills": ["gog", "slack", "agentmail"],
  "model": "spark/qwen3.5-35b-a3b"
}
```

### 2. The CLI Commands

**`roleclaw search [query]`**
Queries the registry to find matching templates by role name, DISC trait, or capability. Returns a formatted "Candidate Profile" list.

**`roleclaw hire <role_id>`**
Initiates the interactive configuration and deployment flow:
1. Prompts for the agent's name and emoji.
2. Prompts for LLM model selection.
3. Reviews and confirms the security/skill background check.
4. Generates the OpenClaw workspace.
5. Invokes OpenClaw CLI programmatically to register and deploy.

### 3. OpenClaw Bridge (`src/utils/openclaw-bridge.js`)
A programmatic wrapper around the OpenClaw CLI using Node's `child_process`. It automates the manual steps of:
- `openclaw agents add ...`
- `openclaw agents set-identity ...`
- (Future) automated skill installation requests.

---

## 🔄 The Deployment Flow

```
1. User runs: roleclaw hire hr-specialist
2. CLI prompts: "What is the agent's name?" -> User types "Sarah"
3. CLI prompts for Model selection.
4. CLI warns about required skills (gog, slack, etc.) and asks for confirmation.
5. Under the hood:
   a. Renders template to ~/.openclaw/workspace/agents/hr-specialist
   b. Exec: openclaw agents add hr-specialist --workspace <path>
   c. Exec: openclaw agents set-identity --agent hr-specialist --name "Sarah" --emoji "👩‍💼"
6. Output: "🎉 Sarah is hired and ready to work!"
```

---

## 🛠️ Implementation Phases

### Phase 1: The Registry & Search
- Create the `manifest.json` structure for existing templates.
- Build the registry builder (`catalog.json` generator).
- Implement the `roleclaw search` command.

### Phase 2: Interactive "Hire" Command
- Implement the interactive prompt flow using `inquirer`/`prompts`.
- Update the template engine to use the user's interactive inputs.

### Phase 3: OpenClaw Bridge
- Implement `execSync` wrapper for OpenClaw commands.
- Integrate the bridge into the end of the `roleclaw hire` command.

---

**Status:** Implementation  
**Last Updated:** March 19, 2026  
**Version:** 1.0.0
