// run npm run watch_games
// paste in browser
// http://localhost:4000/?bean

title = "Ive Bean Skating 4 Ever";

description = `
[Tap] Jump to avoid crashing
`;

characters = [
  `
llllll
CCCCCC
CrrrrC
CrrrrC
CCCCCC
llllll
`,

  `
llllll
gggggg
grrrrg
grrrrg
gggggg
llllll
`,
];

const G = {
  WIDTH: 300,
  HEIGHT: 150,
};

options = {
  viewSize: { x: G.WIDTH, y: G.HEIGHT },
  theme: "dark",
  //isPlayingBgm: true,
  isReplayEnabled: true,
};

let player;
let enemy;
let isLeft = false;
let died = false;
let deathticks = 100000000000;

function death() {
  let a = ticks;
  let b = 4;
  deathticks = a + b;
}

function update() {
  if (!player) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT - 60),
      speed: 0.5,
      direction: 1,
      isJumping: false,
    };
  }
  if (!ticks) {
    deathticks = 10000000000000;
    player.speed = 0.5;
    score = 0;
    // player.pos = vec(G.WIDTH * 0.5, G.HEIGHT - 60);
    // enemy.pos = vec(G.WIDTH - 75, G.HEIGHT - 60);
  }

  score += 1 -.9;

  color("black");
  char("a", player.pos);

  color("red");
  box(150, 100, 300, 10);

  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

  if (box(150, 100, 300, 10).isColliding.char.a) {
    player.isJumping = false;
    player.pos.y = 90;
  }

  if (input.isJustPressed) {
    if (!player.isJumping) {
      player.isJumping = true;
      player.pos.y -= 30;
    }
  }

  if (player.isJumping) {
    player.pos.y += 0.5;
    if (player.pos.y >= G.HEIGHT - 15) {
      player.isJumping = false;
      player.pos.y = G.HEIGHT - 15;
    }
  }

  player.pos.x += player.speed * player.direction;

  if (player.pos.x >= G.WIDTH || player.pos.x <= 0) {
    player.direction *= -1;
  }

  if (player.speed < 8) {
    player.speed += 0.002;
  }

  if (!enemy) {
    enemy = {
      pos: vec(G.WIDTH - 75, G.HEIGHT - 60),
      speed: 2,
      direction: 1,
    };
  }

  enemy.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

  enemy.pos.x += enemy.speed * enemy.direction;

  if (enemy.pos.x >= G.WIDTH || enemy.pos.x <= 0) {
    enemy.direction *= -1;
    if (isLeft == false) {
      isLeft = true;
    } else {
      isLeft = false;
    }
  }

  if (ticks > deathticks) {
    end();
  }

  color("black");
  const isCollidingWithPlayer = char("b", enemy.pos).isColliding.char.a;
  if (isCollidingWithPlayer) {
    color("yellow");
    particle(player.pos.x + 2, player.pos.y, 30, 1, -PI / 2, PI / 4);

    death();
    
  }
}
