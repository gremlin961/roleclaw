import readline from 'readline';
import chalk from 'chalk';

const WIDTH = 32; // Increased to accommodate emoji width for proper alignment
const HEIGHT = 13; // 1 goal, 5 river, 1 median, 5 road, 1 start
const ROUNDS = 3;

// Game elements - Using emojis for visual appeal
const PLAYER = '🙍'; // Dwight - frowning person
const WATER_COOLER = '☕️'; // Coffee cups as the goal
const EMPTY = ' ';

// Office-themed obstacles (replacing cars) - Road items
const OFFICE_OBSTACLES = ['🪑', '🗑️', '📎', '📚', '💻']; // Desk, waste basket, stapler, books, laptop
// Office pond items - desks to ride on
const DESKS = ['🪑', '🛋️', '🛋️', '🛋️', '🗄️', '🗄️']; // More desks and chairs

class DwightFrogger {
constructor() {
    this.round = 1;
    this.status = 'waiting'; // 'waiting', 'playing', 'won', 'lost'
    this.message = '';
    this.initRound();
}

  initRound() {
    this.playerX = Math.floor(WIDTH / 2);
    this.playerY = HEIGHT - 1;
    
    // Rows: 0 (Goal), 1-5 (River), 6 (Median), 7-11 (Road), 12 (Start)
    this.rows = [];

    // Road (Bottom half) - Office items moving across
    for (let y = 7; y <= 11; y++) {
      const speed = (y % 2 === 0 ? 1 : -1) * (0.02 + (this.round * 0.01) + Math.random() * 0.02);
      const items = [];
      const itemSpacing = 6 + Math.floor(Math.random() * 4);
      for (let x = 0; x < WIDTH; x += itemSpacing) {
        items.push({ x: (x + Math.floor(Math.random() * 3)) % WIDTH, type: OFFICE_OBSTACLES[Math.floor(Math.random() * OFFICE_OBSTACLES.length)] });
      }
      this.rows.push({ y, speed, offset: 0, items, type: 'road' });
    }

    // River (Top half) - Office desks to ride on
    for (let y = 1; y <= 5; y++) {
      const speed = (y % 2 === 0 ? 1 : -1) * (0.02 + (this.round * 0.01) + Math.random() * 0.02);
      const items = [];
      const itemSpacing = 8 + Math.floor(Math.random() * 4);
      for (let x = 0; x < WIDTH; x += itemSpacing) {
        items.push({ x: (x + Math.floor(Math.random() * 3)) % WIDTH, type: DESKS[Math.floor(Math.random() * DESKS.length)] });
      }
      this.rows.push({ y, speed, offset: 0, items, type: 'river' });
    }

    // Goals at the top - Coffee cups - evenly spaced across the width
    this.goals = [
      { x: 4, y: 0, hit: false },
      { x: 11, y: 0, hit: false },
      { x: 18, y: 0, hit: false },
      { x: 25, y: 0, hit: false }
    ];
  }

  update() {
    if (this.status !== 'playing') return;

    // Update obstacle offsets
    for (const row of this.rows) {
      row.offset += row.speed;
      if (row.offset >= WIDTH) row.offset -= WIDTH;
      if (row.offset < 0) row.offset += WIDTH;
    }

    // Current row logic
    const currentRow = this.rows.find(r => r.y === this.playerY);
    
    if (currentRow) {
      let onObject = false;
      let objectSpeed = 0;

      for (const item of currentRow.items) {
        const itemX = Math.floor(item.x + currentRow.offset) % WIDTH;
        // Collision detection with tolerance - desk is about 2 chars wide
        if (Math.abs(itemX - this.playerX) <= 1) {
          onObject = true;
          objectSpeed = currentRow.speed;
          break;
        }
      }

      if (currentRow.type === 'road' && onObject) {
        this.status = 'lost';
        this.message = 'Identity theft is not a joke, Jim! You got hit by office chaos.';
      } else if (currentRow.type === 'river') {
        if (!onObject) {
          this.status = 'lost';
          this.message = 'You fell into the office pond! "I am fast. To give you a reference point I am somewhere between a snake and a mongoose... And a panther."';
        } else {
          // Move player with the desk
          this.playerX += objectSpeed;
          if (this.playerX < 0) this.playerX = 0;
          if (this.playerX >= WIDTH) this.playerX = WIDTH - 1;
        }
      }
    }

    // Check goal
    if (this.playerY === 0) {
      const goal = this.goals.find(g => Math.abs(g.x - this.playerX) <= 1);
      if (goal && !goal.hit) {
        goal.hit = true;
        if (this.goals.every(g => g.hit) || this.round > 1) { // Shortening for testing or win condition
           if (this.round < ROUNDS) {
             this.round++;
             this.initRound();
             this.message = `Round complete! "I am ready for anything."`;
           } else {
this.status = 'won';
              this.message = 'VICTORY! You reached the coffee break!';
           }
        } else {
           // Success but more goals to fill?
           this.playerX = Math.floor(WIDTH / 2);
           this.playerY = HEIGHT - 1;
           this.message = 'Goal reached! Get the others!';
        }
      } else {
        // Hit top but not a goal
        this.playerY = 1;
      }
    }
  }

  render() {
    process.stdout.write('\x1B[H\x1B[2J'); // Clear screen
    
    // Simple title that matches grid width
    console.log(chalk.bold.yellow(`OFFICE FROGGER - Round ${this.round}/${ROUNDS}`));
    console.log('');
    
    if (this.status === 'waiting') {
      // Show instructions when waiting to start
      console.log(chalk.cyan('Press SPACE to start!'));
      console.log(chalk.yellow('\nHow to play:'));
      console.log(chalk.white('  • Arrow Keys or WASD to move Dwight'));
      console.log(chalk.white('  • Reach the coffee (☕️) at the top'));
      console.log(chalk.white('  • Avoid obstacles on the road'));
      console.log(chalk.white('  • Ride desks in the pond to cross'));
      console.log(chalk.white('  • Complete 3 rounds to win'));
      console.log(chalk.white('  • Press Q to quit\n'));
      
      // Show only the background grids with goals visible
      const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(null));
      
      // Place Goals (Coffee cups) - always visible
      for (const goal of this.goals) {
        grid[goal.y][goal.x] = goal.hit ? '☑️' : WATER_COOLER;
      }
      
      // Output Grid with backgrounds (no player or obstacles in waiting state)
      for (let y = 0; y < HEIGHT; y++) {
        let rowStr = '';
        let bg = chalk.bgBlack; // Default road
        
        if (y === 0 || y === 6 || y === 12) bg = chalk.bgGreen; // Grass/Median
        else if (y >= 1 && y <= 5) bg = chalk.bgBlue; // Office Pond (desks)
        
        for (let x = 0; x < WIDTH; x++) {
          const char = grid[y][x] || ' ';
          // Each cell is exactly 2 chars wide for consistent emoji alignment
          rowStr += bg(char.padEnd(2, ' '));
        }
        console.log(rowStr);
      }
    } else {
      // Show game elements when playing
      console.log(chalk.cyan('Reach the coffee (☕️) at the top!'));
      console.log(chalk.yellow('Use arrows/WASD. Avoid obstacles, ride desks.\n'));

      const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(null));

      // Place Goals (Coffee cups)
      for (const goal of this.goals) {
        grid[goal.y][goal.x] = goal.hit ? '☑️' : WATER_COOLER;
      }

      // Place obstacles
      for (const row of this.rows) {
        for (const item of row.items) {
          const x = Math.floor(item.x + row.offset) % WIDTH;
          if (x >= 0 && x < WIDTH) {
            grid[row.y][x] = item.type;
          }
        }
      }

      // Place Player
      const px = Math.floor(this.playerX);
      const py = this.playerY;
      if (py >= 0 && py < HEIGHT && px >= 0 && px < WIDTH) {
        grid[py][px] = PLAYER;
      }

      // Output Grid with backgrounds
      for (let y = 0; y < HEIGHT; y++) {
        let rowStr = '';
        let bg = chalk.bgBlack; // Default road
        
        if (y === 0 || y === 6 || y === 12) bg = chalk.bgGreen; // Grass/Median
        else if (y >= 1 && y <= 5) bg = chalk.bgBlue; // Office Pond (desks)
        
        for (let x = 0; x < WIDTH; x++) {
          const char = grid[y][x] || ' ';
          // Each cell is exactly 2 chars wide for consistent emoji alignment
          rowStr += bg(char.padEnd(2, ' '));
        }
        console.log(rowStr);
      }
    }

    if (this.message && this.status !== 'waiting') {
      console.log(chalk.magenta.bold('\n' + this.message));
    }
    if (this.status !== 'playing' && this.status !== 'waiting') {
      console.log(chalk.whiteBright.bgRed.bold(` GAME OVER: ${this.status.toUpperCase()} `));
      console.log(chalk.green('\nPress any key to exit...'));
    }
  }

  handleInput(key) {
    // In waiting state, only space bar starts the game
    if (this.status === 'waiting') {
      if (key.name === 'space' || key.name === ' ' || key.code === 'Space') {
        this.status = 'playing';
        this.message = ''; // Clear any previous message
        return false; // Don't exit
      }
      // Ignore all other keys when waiting
      return false;
    }
    
    // In playing/won/lost states, use existing logic
    if (this.status !== 'playing') return true;

    switch (key.name) {
      case 'up':
        if (this.playerY > 0) {
          this.playerY--;
          this.message = '';
        }
        break;
      case 'down':
        if (this.playerY < HEIGHT - 1) {
          this.playerY++;
          this.message = '';
        }
        break;
      case 'left':
        if (this.playerX > 0) {
          this.playerX--;
          this.message = '';
        }
        break;
      case 'right':
        if (this.playerX < WIDTH - 1) {
          this.playerX++;
          this.message = '';
        }
        break;
      case 'c':
        if (key.ctrl) {
          process.exit();
        }
        break;
    }
    return false;
  }
}

export function playDwightFrogger() {
  return new Promise((resolve) => {
    const game = new DwightFrogger();
    const isRaw = process.stdin.isRaw;
    
    if (!process.stdin.setRawMode) {
      console.log('This game must be run from a terminal that supports raw mode.');
      resolve(false);
      return;
    }
    
    // Ensure stdin is in raw mode and resumed
    process.stdin.setRawMode(true);
    process.stdin.resume();
    readline.emitKeypressEvents(process.stdin);
    
const onKeypress = (str, key) => {
      // Debug log to stderr so it doesn't mess up the game display
      process.stderr.write(`Key: name=${key.name || 'none'}, ch=${key.ch || 'none'}, ctrl=${key.ctrl}\n`);
      
      if (!key) return;
      
      // Handle space bar to start game when waiting
      if (game.status === 'waiting') {
        if (key.name === 'space' || key.name === ' ' || key.code === 'Space') {
          game.status = 'playing';
          game.message = '';
          // Render immediately after starting
          game.update();
          game.render();
        }
        // Ignore all other keys when waiting
        return;
      }
      
      let handled = false;
      
      // Arrow keys
      if (key.name === 'up') {
        if (game.playerY > 0) {
          game.playerY--;
          game.message = '';
          handled = true;
        }
      } else if (key.name === 'down') {
        if (game.playerY < HEIGHT - 1) {
          game.playerY++;
          game.message = '';
          handled = true;
        }
      } else if (key.name === 'left') {
        if (game.playerX > 0) {
          game.playerX--;
          game.message = '';
          handled = true;
        }
      } else if (key.name === 'right') {
        if (game.playerX < WIDTH - 1) {
          game.playerX++;
          game.message = '';
          handled = true;
        }
      }
      // WASD as fallback
      else if (key.ch === 'w' || key.ch === 'W') {
        if (game.playerY > 0) {
          game.playerY--;
          game.message = '';
          handled = true;
        }
      } else if (key.ch === 's' || key.ch === 'S') {
        if (game.playerY < HEIGHT - 1) {
          game.playerY++;
          game.message = '';
          handled = true;
        }
      } else if (key.ch === 'a' || key.ch === 'A') {
        if (game.playerX > 0) {
          game.playerX--;
          game.message = '';
          handled = true;
        }
      } else if (key.ch === 'd' || key.ch === 'D') {
        if (game.playerX < WIDTH - 1) {
          game.playerX++;
          game.message = '';
          handled = true;
        }
      } else if (key.ch === 'q' || key.ch === 'Q') {
        cleanup();
        resolve(false);
        return;
      }
      
      // Render immediately on input
      if (handled) {
        game.update();
        game.render();
      }
      
      if (game.status === 'won' || game.status === 'lost') {
        clearInterval(interval);
        setTimeout(() => {
          cleanup();
          resolve(game.status === 'won');
        }, 2000);
      }
    };

    process.stdin.on('keypress', onKeypress);

    // Initial render
    game.render();

    let lastTime = Date.now();
    const frameInterval = 16; // ~60 FPS

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTime;
      
      // Only update if enough time has passed (prevents glitching)
      if (elapsed >= frameInterval) {
        game.update();
        game.render();
        lastTime = now;
      }
      
      if (game.status === 'won' || game.status === 'lost') {
        clearInterval(interval);
        setTimeout(() => {
          cleanup();
          resolve(game.status === 'won');
        }, 2000);
      }
    }, frameInterval);

    function cleanup() {
      clearInterval(interval);
      process.stdin.removeListener('keypress', onKeypress);
      if (process.stdin.setRawMode) {
        process.stdin.setRawMode(isRaw);
      }
      process.stdin.resume();
    }
  });
}
