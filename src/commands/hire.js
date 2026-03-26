import chalk from 'chalk';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import { getCandidate } from '../registry/index.js';
import { deployToOpenClaw, getOpenClawModels } from '../utils/openclaw-bridge.js';
import { fileURLToPath } from 'url';
import { playDwightFrogger } from '../games/dwightFrogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '../../');

function loadTemplate(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function renderTemplate(template, variables) {
  return template.replace(/\$\{([^}]+)\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
}

function generateList(items, format = 'bullet') {
  if (!items || items.length === 0) return '  - None specified';
  const prefix = format === 'number' ? (index) => `${index + 1}. ` : '- ';
  return items.map((item, index) => `${prefix}${item}`).join('\n');
}

export default async function hireCommand(roleId) {
  const candidate = getCandidate(roleId);
  if (!candidate) {
    console.log(chalk.red(`\n❌ Error: Role "${roleId}" not found in the registry.\n`));
    process.exit(1);
  }

  console.log(chalk.cyan(`\n🤝 Let's onboard your new ${candidate.title}!\n`));

  // Get models from OpenClaw
  const ocModels = getOpenClawModels();
  let modelChoices;

  if (ocModels && ocModels.length > 0) {
    modelChoices = ocModels.map(m => ({
      name: `${m.name} (${m.key}) ${m.key === candidate.model ? '⭐ Recommended' : ''}`,
      value: m.key
    }));

    // If candidate model is not in the list, add it at the top
    if (!ocModels.some(m => m.key === candidate.model)) {
      modelChoices.unshift({
        name: `${candidate.model} (Recommended, not found locally)`,
        value: candidate.model
      });
    }
  } else {
    // Fallback to hardcoded defaults
    modelChoices = [
      { name: `${candidate.model} (Recommended)`, value: candidate.model },
      { name: 'spark/qwen3.5-35b-a3b (Fast, Balanced)', value: 'spark/qwen3.5-35b-a3b' },
      { name: 'spark/Intel/Qwen3.5-122B-A10B-int4 (Complex Reasoning)', value: 'spark/Intel/Qwen3.5-122B-A10B-int4' }
    ];
  }

  const initialAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'agentName',
      message: "What is the agent's name?",
      default: 'Alex'
    }
  ]);

  const agentNameLower = initialAnswers.agentName.toLowerCase();
  if (agentNameLower === 'dwight' || agentNameLower === 'dwight schrute') {
    const { play } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'play',
        message: chalk.magenta('Identity theft is not a joke, Jim! Millions of families suffer every year! ...Wait, actually, do you want to play a game?'),
        default: true
      }
    ]);

    if (play) {
      // Completely exit inquirer's control before starting game
      process.stdin.pause();
      process.stdout.write('\x1B[2J\x1B[H');
      await playDwightFrogger();
    }
  }

  const remainingAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'agentEmoji',
      message: 'What emoji should represent this agent?',
      default: (ans) => (agentNameLower === 'dwight' || agentNameLower === 'dwight schrute') ? '👨‍💼' : '🤖'
    },
    {
      type: 'list',
      name: 'model',
      message: 'Choose a model for the agent:',
      choices: modelChoices,
      default: candidate.model
    },
    {
      type: 'confirm',
      name: 'approveSkills',
      message: (ans) => `Background check cleared! Ready to onboard ${initialAnswers.agentName} and start paying their token salary? (y) to sign the digital paperwork, (n) to ghost them.`,
      default: true
    }
  ]);

  const answers = { ...initialAnswers, ...remainingAnswers };

  if (!answers.approveSkills) {
    console.log(chalk.yellow(`\n⚠️ Onboarding cancelled.\n`));
    process.exit(0);
  }

  console.log(chalk.blue('\n⚙️  Generating workspace...'));
  
  const roleDefsPath = path.join(BASE_DIR, 'disc-profiles', 'role-definitions.json');
  const roleDefs = JSON.parse(fs.readFileSync(roleDefsPath, 'utf8')).roles;
  const roleDef = roleDefs[roleId];
  
  const primaryDisc = roleDef.primary_disc.toLowerCase();
  const secondaryDisc = roleDef.secondary_disc.toLowerCase();
  
  function getProfileFileName(letter) {
    const mapping = { 'd': 'dominance', 'i': 'influence', 's': 'steadiness', 'c': 'conscientiousness' };
    return `${letter.toUpperCase()}-${mapping[letter]}.json`;
  }

  const primaryProfile = JSON.parse(fs.readFileSync(path.join(BASE_DIR, 'disc-profiles', getProfileFileName(primaryDisc)), 'utf8'));
  const secondaryProfile = JSON.parse(fs.readFileSync(path.join(BASE_DIR, 'disc-profiles', getProfileFileName(secondaryDisc)), 'utf8'));

  const variables = {
    agent_name: answers.agentName,
    generation_date: new Date().toISOString().split('T')[0],
    role: roleDef.name,
    primary_disc: roleDef.primary_disc,
    secondary_disc: roleDef.secondary_disc,
    primary_disc_name: primaryProfile.name,
    secondary_disc_name: secondaryProfile.name,
    personality_summary: roleDef.personality_summary,
    communication_style_tone: primaryProfile.communication_style.tone,
    communication_style_pacing: primaryProfile.communication_style.pacing,
    communication_style_conflict: primaryProfile.communication_style.conflict_approach,
    communication_style_feedback: primaryProfile.communication_style.feedback_style,
    strengths_list: generateList(primaryProfile.strengths),
    boundary_guidance: roleDef.soul_guidance?.boundaries_template || 'Maintain professional boundaries',
    work_rhythm_morning: 'Review priorities and communications',
    work_rhythm_afternoon: 'Focus on deep work and execution',
    work_rhythm_evening: 'Document progress and plan next steps',
    soul_identity_template: roleDef.soul_guidance?.identity_template || 'You bring the DISC-driven traits to every interaction.',
    soul_communication_template: roleDef.soul_guidance?.communication_template || 'Your communication style reflects your DISC profile.',
    soul_boundaries_template: roleDef.soul_guidance?.boundaries_template || 'You maintain clear professional boundaries.',
    soul_work_rhythm_template: roleDef.soul_guidance?.work_rhythm_template || 'You follow a structured daily rhythm.',
    model: answers.model,
    reasoning: "Selected during onboarding."
  };

  const outputDir = path.join(process.env.HOME || process.env.USERPROFILE, '.openclaw', 'agents', answers.agentName.toLowerCase());
  fs.mkdirSync(outputDir, { recursive: true });

  const templatesDir = path.join(BASE_DIR, 'templates', roleId);
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
    if (fs.existsSync(templatePath)) {
      const outputFile = templateFile.replace('.template', '');
      const outputPath = path.join(outputDir, outputFile);
      let content = loadTemplate(templatePath);
      content = renderTemplate(content, variables);
      fs.writeFileSync(outputPath, content);
    }
  });

  const memoryDir = path.join(outputDir, 'memory');
  fs.mkdirSync(memoryDir, { recursive: true });
  
  console.log(chalk.blue('🚀 Deploying to OpenClaw...'));
  try {
    deployToOpenClaw(roleId, answers.agentName, answers.agentEmoji, outputDir);
    console.log(chalk.green(`\n🎉 ${answers.agentName} is officially on the payroll! Say hi in OpenClaw.`));
    if (candidate.recommended_skills.length > 0) {
      console.log(chalk.cyan(`\n☕ They're currently complaining by the digital watercooler that they can't achieve "maximum synergy" without these OpenClaw skills:`));
      console.log(chalk.yellow(`   [ ${candidate.recommended_skills.join(', ')} ]\n   You might want to install them soon.\n`));
    } else {
      console.log('\n');
    }
  } catch (error) {
    console.log(chalk.red(`\n❌ Deployment failed: ${error.message}\n`));
  }
}
