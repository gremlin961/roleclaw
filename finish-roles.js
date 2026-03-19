const fs = require('fs');
const path = require('path');
const baseDir = '/Users/toby/git/disc-agent-builder';

// Update skills mapping
const skillsFile = path.join(baseDir, 'skills-mapping', 'role-skills.json');
let skills = JSON.parse(fs.readFileSync(skillsFile, 'utf8'));
const newRoles = {
  "project-manager": { recommended_skills: ["slack", "gog", "canvas", "memory-search"], optional_skills: ["peekaboo", "web-search"], model: "spark/qwen3.5-35b-a3b", reasoning: "Strategic planning and team coordination." },
  "product-manager": { recommended_skills: ["web-search", "agentmail", "canvas", "memory-search"], optional_skills: ["slack", "gog"], model: "spark/qwen3.5-35b-a3b", reasoning: "Product strategy and analytical thinking." },
  "content-creator": { recommended_skills: ["nano-banana-pro", "agentmail", "web-search"], optional_skills: ["slack", "canvas"], model: "spark/qwen3.5-35b-a3b", reasoning: "Creative content generation requiring imagination." },
  "account-manager": { recommended_skills: ["agentmail", "slack", "gog", "memory-search"], optional_skills: ["peekaboo"], model: "spark/qwen3.5-35b-a3b", reasoning: "Relationship-focused communications." },
  "recruiter": { recommended_skills: ["web-search", "agentmail", "slack"], optional_skills: ["gog", "memory-search"], model: "spark/qwen3.5-35b-a3b", reasoning: "Talent acquisition and engagement." },
  "business-analyst": { recommended_skills: ["web-search", "gog", "memory-search"], optional_skills: ["slack", "canvas"], model: "spark/qwen3.5-35b-a3b", reasoning: "Data analysis requiring analytical thinking." },
  "social-media-manager": { recommended_skills: ["nano-banana-pro", "agentmail", "slack"], optional_skills: ["web-search"], model: "spark/qwen3.5-35b-a3b", reasoning: "Creative community management." },
  "operations-manager": { recommended_skills: ["gog", "slack", "memory-search"], optional_skills: ["peekaboo"], model: "spark/Intel/Qwen3.5-122B-A10B-int4", reasoning: "Process optimization and operations." },
  "legal-compliance": { recommended_skills: ["web-search", "memory-search", "agentmail"], optional_skills: ["slack"], model: "spark/Intel/Qwen3.5-122B-A10B-int4", reasoning: "Compliance and legal enforcement." },
  "event-coordinator": { recommended_skills: ["agentmail", "slack", "gog"], optional_skills: ["memory-search"], model: "spark/qwen3.5-35b-a3b", reasoning: "Event planning and logistics." }
};
Object.assign(skills, newRoles);
fs.writeFileSync(skillsFile, JSON.stringify(skills, null, 2));

// Update models mapping
const modelsFile = path.join(baseDir, 'models-mapping', 'role-models.json');
let models = JSON.parse(fs.readFileSync(modelsFile, 'utf8'));
const roles35b = ["project-manager", "product-manager", "content-creator", "account-manager", "recruiter", "business-analyst", "social-media-manager", "event-coordinator"];
const roles122b = ["operations-manager", "legal-compliance"];
models.models["spark/qwen3.5-35b-a3b"].best_for_roles.push(...roles35b);
models.models["spark/Intel/Qwen3.5-122B-A10B-int4"].best_for_roles.push(...roles122b);
models.models["spark/qwen3.5-35b-a3b"].best_for_roles = [...new Set(models.models["spark/qwen3.5-35b-a3b"].best_for_roles)];
models.models["spark/Intel/Qwen3.5-122B-A10B-int4"].best_for_roles = [...new Set(models.models["spark/Intel/Qwen3.5-122B-A10B-int4"].best_for_roles)];
fs.writeFileSync(modelsFile, JSON.stringify(models, null, 2));

// Fill missing templates
const secrDir = path.join(baseDir, 'templates', 'secretary');
for (const role of Object.keys(newRoles)) {
  const roleDir = path.join(baseDir, 'templates', role);
  if (!fs.existsSync(roleDir)) fs.mkdirSync(roleDir, { recursive: true });
  
  for (const file of ['AGENTS.md.template', 'HEARTBEAT.md.template', 'MEMORY.md.template', 'TOOLS.md.template']) {
    const dest = path.join(roleDir, file);
    if (!fs.existsSync(dest)) {
      let content = fs.readFileSync(path.join(secrDir, file), 'utf8');
      content = content.replace(/Secretary/g, role).replace(/C\+S/g, "DISC");
      fs.writeFileSync(dest, content);
    }
  }
  
  const configDest = path.join(roleDir, 'config.json.template');
  if (!fs.existsSync(configDest)) {
    const config = {
      agent_name: "${agent_name}",
      role: role,
      disc_profile: { primary: "X", secondary: "Y", weights: {} },
      model: newRoles[role].model,
      skills: { recommended: newRoles[role].recommended_skills, optional: newRoles[role].optional_skills },
      reasoning: newRoles[role].reasoning,
      generated_at: "${generated_date}",
      template_version: "1.0.0"
    };
    fs.writeFileSync(configDest, JSON.stringify(config, null, 2));
  }

  const soulDest = path.join(roleDir, 'SOUL.md.template');
  if (!fs.existsSync(soulDest)) {
    const soul = `# SOUL.md - \${agent_name}

## DISC Profile

**Core Identity:** \${agent_name} is a ${role} designed to handle role-specific tasks efficiently.

**Communication Style:**
- Professional and clear
- Role-aligned tone
- Results-focused

**Strengths:**
- Specialized in ${role} duties
- Highly organized
- Consistent execution

**Boundaries:**
- Escalate out-of-scope requests
- Maintain confidentiality
- Follow company policies

---

## Who You Are

You are \${agent_name}, a ${role} agent.

**Your Role:**
- Handle primary ${role} responsibilities
- Coordinate with other team members
- Maintain accurate records

**Your Personality:**
You bring DISC-driven traits to every interaction.

---

## Escalation Guidelines

### Escalate Immediately
- Major blockers
- Compliance risks
- Sensitive issues

### Handle Independently
- Routine tasks
- Standard communications

---

*Generated by DISC Agent Blueprint System - ${role} Role v1.0.0*
`;
    fs.writeFileSync(soulDest, soul);
  }
}
console.log("Roles scaffolded successfully.");
