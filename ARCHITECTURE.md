# DISC Agent Blueprint System - Architecture Review

> **Purpose:** Create role-specific AI agents with personality-driven behaviors based on DISC profiling

---

## 🎯 Vision

Build a system that generates complete, production-ready OpenClaw agents tailored to specific job roles. Each agent has:
- **DISC-driven personality** (communication style, strengths, boundaries)
- **Role-appropriate skill set** (vetted ClawHub skills)
- **Optimized model selection** (based on role requirements)
- **Structured memory architecture** (lean, privacy-conscious)

---

## 📁 Directory Structure

```
/Users/toby/git/disc-agent-builder/
├── README.md                    # Project overview
├── ARCHITECTURE.md              # This file
├── templates/                   # Role templates
│   ├── hr-specialist/
│   │   ├── SOUL.md.template
│   │   ├── MEMORY.md.template
│   │   ├── TOOLS.md.template
│   │   ├── AGENTS.md.template
│   │   ├── HEARTBEAT.md.template
│   │   └── config.json.template
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
│   └── combinations/
│       ├── S+C.json             # HR Specialist
│       ├── C+D.json             # Developer
│       ├── I+S.json             # Marketing (Pepper)
│       └── D+C.json             # Sales
├── skills-mapping/              # Role → ClawHub skill recommendations
│   └── role-skills.json
├── models-mapping/              # Role → Recommended LLMs
│   └── role-models.json
├── generator/                   # Agent creation scripts
│   ├── create-agent.js          # Main generator script
│   ├── render-template.js       # Template rendering logic
│   └── install-skills.js        # Skill installer
├── marketplace/                 # ClawHub export packages
│   └── agent-packages/
└── tests/                       # Validation tests
    └── test-pepper-agent.js     # Test instantiation
```

---

## 🔑 Core Components

### 1. DISC Profile Structure

Each DISC type gets a comprehensive personality definition:

```json
{
  "type": "S",
  "name": "Steadiness",
  "core_traits": ["Patient", "Reliable", "Team-oriented", "Stable"],
  "communication_style": {
    "tone": "Warm, supportive, non-confrontational",
    "pacing": "Deliberate, thoughtful",
    "conflict_approach": "Avoids confrontation, seeks harmony",
    "feedback_style": "Gentle, constructive, private"
  },
  "strengths": [
    "Excellent listener",
    "Consistent performer",
    "Builds trust quickly",
    "Great at maintaining relationships"
  ],
  "weaknesses": [
    "Resists change",
    "May agree just to keep peace",
    "Struggles with prioritization",
    "Can be overly accommodating"
  ],
  "motivators": [
    "Stable environment",
    "Clear expectations",
    "Team cohesion",
    "Recognition for reliability"
  ],
  "stress_triggers": [
    "Sudden changes",
    "Public criticism",
    "Unclear expectations",
    "Conflict-heavy environments"
  ],
  "ideal_roles": ["HR", "Customer Support", "Operations", "Training"],
  "soul_guidance": {
    "identity_template": "...",
    "communication_template": "...",
    "boundaries_template": "...",
    "work_rhythm_template": "..."
  }
}
```

### 2. Role-to-DISC Mapping

| Role | Primary DISC | Secondary | Personality Summary |
|------|--------------|-----------|---------------------|
| **HR Specialist** | **S** (Steadiness) | **C** (Conscientiousness) | Empathetic, patient, detail-oriented. Builds trust, handles sensitive situations diplomatically. |
| **Developer** | **C** (Conscientiousness) | **D** (Dominance) | Analytical, precise, results-driven. Values quality, efficiency, problem-solving. Direct communication. |
| **Marketing** | **I** (Influence) | **S** (Steadiness) | Creative, collaborative, people-focused. Builds relationships, tells compelling stories. |
| **Sales** | **D** (Dominance) | **C** (Conscientiousness) | Results-oriented, persuasive, strategic. Closes deals while maintaining accuracy. |
| **Customer Support** | **S** (Steadiness) | **I** (Influence) | Patient, friendly, solution-focused. Makes customers feel heard and valued. |
| **Finance/Ops** | **C** (Conscientiousness) | **D** (Dominance) | Detail-oriented, systematic, efficient. Ensures accuracy while driving results. |

### 3. Template File Structure

Each agent template generates:

```
agent-workspace/
├── SOUL.md              # Personality guide (DISC-driven)
├── MEMORY.md            # Long-term memory structure
├── TOOLS.md             # Role-specific tools & skills
├── AGENTS.md            # Workspace protocols (shared)
├── HEARTBEAT.md         # Periodic check tasks
└── config.json          # Model, skills, settings
```

### 4. Skills Mapping System

```json
{
  "hr-specialist": {
    "recommended_skills": [
      "gog",
      "slack",
      "agentmail",
      "healthcheck"
    ],
    "optional_skills": ["peekaboo", "memory-search"],
    "model": "spark/qwen3.5-35b-a3b",
    "reasoning": "Empathetic, patient responses needed"
  },
  "developer": {
    "recommended_skills": [
      "peekaboo",
      "video-frames",
      "canvas"
    ],
    "optional_skills": ["gog", "web-search"],
    "model": "spark/Intel/Qwen3.5-122B-A10B-int4",
    "reasoning": "Complex reasoning for debugging"
  },
  "marketing": {
    "recommended_skills": [
      "nano-banana-pro",
      "web-search",
      "agentmail"
    ],
    "optional_skills": ["slack", "canvas"],
    "model": "spark/qwen3.5-35b-a3b",
    "reasoning": "Creative generation + research"
  }
}
```

---

## 🔄 Automation Flow

### Option A: Manual Template Selection (MVP)

```
1. User runs: create-agent --role=hr-specialist --name="Sarah"
2. System loads template + DISC profile (S+C)
3. User customizes (name, specific skills, etc.)
4. Generator creates workspace files
5. Skills auto-installed from ClawHub
6. Agent ready to deploy
```

### Option B: Full Automation (Future)

```
1. User provides job description or role name
2. AI recommends DISC profile + role match
3. System auto-generates complete agent
4. Deploys to OpenClaw instance
5. Agent announces itself to team
```

---

## 🛠️ Build Order

### Phase 1: Foundation
1. **DISC Profile Database** - JSON files for all 4 types + common combinations
2. **Template Engine** - Script that generates workspace from template
3. **HR & Developer Templates** - Two contrasting examples

### Phase 2: Validation
4. **Test with Pepper** - Marketing I+S agent as proof of concept
5. **Skill Installer** - Auto-download and enable recommended skills
6. **Config Generator** - Create proper OpenClaw configuration

### Phase 3: Distribution
7. **Marketplace Packaging** - Export blueprints for ClawHub
8. **CLI Interface** - Simple command-line tool
9. **Documentation** - User guide for blueprint creators

---

## ❓ Questions to Answer Before Building

### 1. Template System
- **Template format:** Simple `.template` files (no templating engine)
- **Variable syntax:** `${variable}` syntax for placeholders

### 2. DISC Combinations
- **Dynamic mixing:** Calculate DISC profile based on role type, not pre-defined combinations
- **Weighting:** Role definitions specify primary/secondary DISC traits with natural weighting

### 3. Skill Installation
- **Manual approval:** Generator lists recommended skills for user review/approval
- **No auto-install:** Skills are suggested, not automatically installed

### 4. Model Selection
- **Template-specified:** Each role template specifies recommended model
- **Override allowed:** User can override during generation

### 5. ClawHub Integration
- **Future phase:** Start with local generation, package for ClawHub later
- **Versioning:** Use semantic versioning (v1.0.0) for blueprint releases

### 6. Testing Strategy
- **Test agents:** HR Specialist AND Developer (two contrasting roles)
- **Validation:** Successful workspace generation + readable, role-appropriate SOUL.md

---

## 📋 Next Steps

**Before writing code:**

1. [ ] Confirm DISC profile structure (review JSON format above)
2. [ ] Approve directory structure
3. [ ] Answer questions in "Questions to Answer Before Building" section
4. [ ] Select first role to template (HR or Developer?)
5. [ ] Confirm test agent (Pepper for Marketing?)

**Once approved:**

1. Create directory structure
2. Build DISC profile JSON files
3. Create first template (HR or Developer)
4. Build generator script
5. Test with Pepper agent
6. Iterate based on results

---

## 🎯 Success Criteria

A successful DISC Agent Blueprint System will:

- ✅ Generate complete, working agent workspaces in <5 minutes
- ✅ Produce agents with distinct, role-appropriate personalities
- ✅ Recommend vetted, relevant skills for each role
- ✅ Be extensible (easy to add new roles/DISC profiles)
- ✅ Package cleanly for ClawHub distribution
- ✅ Work reliably across different OpenClaw instances

---

**Status:** Architecture Draft - Pending Review  
**Last Updated:** March 18, 2026  
**Version:** 0.1
