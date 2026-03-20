#!/usr/bin/env node

import { program } from 'commander';
import searchCommand from '../src/commands/search.js';
import hireCommand from '../src/commands/hire.js';

program
  .name('roleclaw')
  .description('RoleClaw: The Talent Agency for AI Agents')
  .version('1.0.0');

program
  .command('search')
  .description('Search for available AI candidates by role or trait')
  .argument('[query]', 'Search query (e.g., "marketing", "empathetic")')
  .action(searchCommand);

program
  .command('hire')
  .description('Hire and configure a new AI agent')
  .argument('<role_id>', 'The ID of the candidate role to hire (e.g., "hr-specialist")')
  .action(hireCommand);

program.parse();
