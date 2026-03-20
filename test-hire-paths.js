import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname);

const roleId = 'hr-specialist';
const templatesDir = path.join(BASE_DIR, 'templates', roleId);
console.log('templatesDir:', templatesDir);

const templateFiles = [
    'SOUL.md.template',
    'MEMORY.md.template',
    'TOOLS.md.template',
    'AGENTS.md.template',
    'HEARTBEAT.md.template',
    'config.json.template'
];

templateFiles.forEach(templateFile => {
    const templatePath = path.join(templatesDir, templateFile);
    console.log('Checking:', templatePath, 'Exists?', fs.existsSync(templatePath));
});
