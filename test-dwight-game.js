import { playDwightFrogger } from './src/games/dwightFrogger.js';

async function test() {
  console.log('Starting Dwight Frogger test...');
  const won = await playDwightFrogger();
  console.log('Game finished. Won?', won);
}

test().catch(console.error);
