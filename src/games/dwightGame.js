import readline from 'readline';

// Game constants
const WIDTH = 20;
const HEIGHT = 10;
const ROUNDS = 3;

// Game elements
const PLAYER = '🧑‍💼'; // Office worker
const OBSTACLE = '🪑'; // Desk
const WASTE_BASKET = '🗑️'; 
const RED_STAPLER = '📎';
const WATER_COOLER = '💧';
const EMPTY = ' ';

class DwightGame {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    this.resetGame();
  }
  
  resetGame() {
    this.playerX = Math.floor(WIDTH / 2);
    this.playerY = HEIGHT - 1; // Start at bottom
    this.round = 1;
    this.obstacles = [];
    this.gameOver = false;
    this.victory = false;
    
    // Generate obstacles for current round
    this.generateObstacles();
    
    // Place water coolers at top (3 random positions)
    this.waterCoolers = [];
    while (this.waterCoolers.length < 3) {
      const x = Math.floor(Math.random() * WIDTH);
      if (!this.waterCoolers.some(wc => wc.x === x)) {
        this.waterCoolers.push({ x, y: 0 });
      }
    }
  }
  
  generateObstacles() {
    this.obstacles = [];
    const obstacleCount = 5 + (this.round - 1) * 3; // Increase with round
    
    for (let i = 0; i < obstacleCount; i++) {
      const type = Math.random() < 0.33 ? OBSTACLE : 
                   Math.random() < 0.66 ? WASTE_BASKET : RED_STAPLER;
      const x = Math.floor(Math.random() * WIDTH);
      const y = Math.floor(Math.random() * (HEIGHT - 2)) + 1; // Avoid top row (water coolers) and bottom row (player start)
      
      // Make sure we don't place obstacle on player start position
      if (!(x === this.playerX && y === this.playerY)) {
        this.obstacles.push({ x, y, type });
      }
    }
  }
  
  render() {
    // Clear console
    console.clear();
    
    // Print header
    console.log(`=== Dwight Schrute Office Game - Round ${this.round}/${ROUNDS} ===`);
    console.log('Use arrow keys to move. Reach the water coolers (💧) at the top!');
    console.log('Avoid desks (🪑), waste baskets (🗑️), and red staplers (📎)!');
    console.log('');
    
    // Create game grid
    const grid = Array.from({ length: HEIGHT }, () => 
      Array.from({ length: WIDTH }, () => EMPTY)
    );
    
    // Place water coolers
    for (const wc of this.waterCoolers) {
      grid[wc.y][wc.x] = WATER_COOLER;
    }
    
    // Place obstacles
    for (const obs of this.obstacles) {
      grid[obs.y][obs.x] = obs.type;
    }
    
    // Place player
    grid[this.playerY][this.playerX] = PLAYER;
    
    // Print grid
    for (let y = 0; y < HEIGHT; y++) {
      let row = '';
      for (let x = 0; x < WIDTH; x++) {
        row += grid[y][x];
      }
      console.log(row);
    }
    
    console.log('');
    if (this.gameOver) {
      console.log('Game Over! You hit an obstacle.');
    } else if (this.victory) {
      console.log('Victory! You reached the water cooler!');
    }
    console.log('Press any key to continue...');
  }
  
  movePlayer(dx, dy) {
    const newX = this.playerX + dx;
    const newY = this.playerY + dy;
    
    // Check bounds
    if (newX < 0 || newX >= WIDTH || newY < 0 || newY >= HEIGHT) {
      return; // Ignore moves that go out of bounds
    }
    
    // Check for collision with obstacles
    for (const obs of this.obstacles) {
      if (obs.x === newX && obs.y === newY) {
        this.gameOver = true;
        this.render();
        this.endGame();
        return;
      }
    }
    
    // Check for water cooler collision (victory condition)
    for (const wc of this.waterCoolers) {
      if (wc.x === newX && wc.y === newY) {
        if (this.round < ROUNDS) {
          this.round++;
          this.resetGame();
          this.render();
          return;
        } else {
          this.victory = true;
          this.render();
          this.endGame();
          return;
        }
      }
    }
    
    // Move player
    this.playerX = newX;
    this.playerY = newY;
    this.render();
  }
  
  endGame() {
    setTimeout(() => {
      this.rl.close();
    }, 1000);
  }
  
  start() {
    console.log('Game starting...');
    // Set up keyboard controls
    this.rl.on('keypress', (str, key) => {
      if (this.gameOver || this.victory) return;
      
      switch (key.name) {
        case 'up':
          this.movePlayer(0, -1);
          break;
        case 'down':
          this.movePlayer(0, 1);
          break;
        case 'left':
          this.movePlayer(-1, 0);
          break;
        case 'right':
          this.movePlayer(1, 0);
          break;
      }
    });
    
    // Initial render
    this.render();
    
    // Handle game exit
    this.rl.on('close', () => {
      if (this.victory) {
        console.log('\n🎉 Congratulations! You completed all 3 rounds!');
      } else if (this.gameOver) {
        console.log('\n💥 Game Over! Better luck next time.');
      } else {
        console.log('\nGame exited.');
      }
      process.exit(0);
    });
  }
}

// Export function to play the game
export async function playDwightGame() {
  console.log('\n🎮 Starting Dwight Schrute Office Game...\n');
  try {
    const game = new DwightGame();
    console.log('Game created');
    game.start();
    console.log('Game started');
  } catch (error) {
    console.error('Error in playDwightGame:', error);
  }
}