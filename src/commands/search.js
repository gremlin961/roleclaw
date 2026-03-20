import chalk from 'chalk';
import { searchCatalog } from '../registry/index.js';

export default function searchCommand(query) {
  const results = searchCatalog(query);
  
  if (results.length === 0) {
    console.log(chalk.yellow(`\n🔍 No candidates found matching "${query}"\n`));
    return;
  }
  
  console.log(chalk.cyan(`\n🔍 Found ${results.length} Candidate(s)${query ? ` for "${query}"` : ''}:\n`));
  
  results.forEach((c, index) => {
    console.log(`${index + 1}. ${chalk.green(`[Role: ${c.role_id}]`)} - ${chalk.bold(c.title)} (${chalk.yellow(c.disc_profile)})`);
    console.log(`   ${chalk.gray('Traits:')} ${c.personality_summary}`);
    console.log(`   ${chalk.gray('Skills:')} ${c.recommended_skills.join(', ') || 'None'}\n`);
  });
}
