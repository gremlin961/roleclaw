import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '../../');

export function getCatalog() {
  const roleDefsPath = path.join(BASE_DIR, 'disc-profiles', 'role-definitions.json');
  const skillsPath = path.join(BASE_DIR, 'skills-mapping', 'role-skills.json');
  
  const roleDefs = JSON.parse(fs.readFileSync(roleDefsPath, 'utf8'));
  const skillsMapping = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

  const catalog = [];

  for (const [roleId, roleData] of Object.entries(roleDefs.roles)) {
    const skills = skillsMapping[roleId] || {};
    catalog.push({
      role_id: roleId,
      title: roleData.name,
      disc_profile: `${roleData.primary_disc}+${roleData.secondary_disc}`,
      traits: roleData.key_traits || [],
      personality_summary: roleData.personality_summary,
      recommended_skills: skills.recommended_skills || [],
      optional_skills: skills.optional_skills || [],
      model: skills.model || 'spark/qwen3.5-35b-a3b'
    });
  }

  return catalog;
}

export function searchCatalog(query) {
  const catalog = getCatalog();
  if (!query) return catalog;
  
  const lowerQuery = query.toLowerCase();
  return catalog.filter(c => 
    c.role_id.toLowerCase().includes(lowerQuery) ||
    c.title.toLowerCase().includes(lowerQuery) ||
    c.traits.some(t => t.toLowerCase().includes(lowerQuery)) ||
    c.personality_summary.toLowerCase().includes(lowerQuery)
  );
}

export function getCandidate(roleId) {
  const catalog = getCatalog();
  return catalog.find(c => c.role_id === roleId);
}
