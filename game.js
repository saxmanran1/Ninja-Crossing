// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 240;
canvas.height = 320;

// Game variables
let gameRunning = false;
let ninja, limousine, obstacles, gameLoop;

// Game objects
class Ninja {
  constructor() {
    this.x = 3;
    this.y = 7;
  }
  draw() {
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(this.x * 40, this.y * 40, 40, 40);
  }
  move(dx, dy) {
    if (this.x + dx >= 0 && this.x + dx < 6 && this.y + dy >= 0 && this.y + dy < 8) {
      this.x += dx;
      this.y += dy;
    }
  }
}

class Limousine {
  constructor() {
    this.x = 3;
    this.y = 0;
  }
  draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x * 40, this.y * 40, 40, 40);
  }
}

class Obstacle {
  constructor(row, speed) {
    this.row = row;
    this.speed = speed;
    this.blocks = [];
    this.spawn();
  }
  spawn() {
    this.blocks = [];
    for (let i = 0; i < 6; i++) {
      if (Math.random() < 0.3) {
        this.blocks.push(i);
      }
    }
  }
  update() {
    this.blocks = this.blocks.map((x) => (x + this.speed + 6) % 6);
    if (Math.random() < 0.05) {
      this.spawn();
    }
  }
  draw() {
    ctx.fillStyle = '#ff0000';
    this.blocks.forEach((x) => {
      ctx.fillRect(x * 40, this.row * 40, 40, 40);
    });
  }
  collides(x, y) {
    return this.row === y && this.blocks.includes(x);
  }
}

function startGame() {
  ninja = new Ninja();
  limousine = new Limousine();
  obstacles = [new Obstacle(2, 1), new Obstacle(4, -1)];
  gameRunning = true;
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('winScreen').style.display = 'none';
  gameLoop = setInterval(updateGame, 1000 / 60);
}

document.getElementById('startButton').addEventListener('click', startGame);