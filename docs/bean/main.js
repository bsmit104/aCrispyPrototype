title = "Ive Bean Skating 4 Ever";

description = `
[Tap] Jump
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
  isPlayingBgm: true,
  isReplayEnabled: true,
};

/**
 * @typedef {{
* pos: Vector,
* speed: number,
* direction: number
* isJumping: boolean
* }} Player
*/

/**
* @type { Player }
*/
let player;


function update() {
  if (!player) {
    player = {
      pos: vec(G.WIDTH * 0.5, G.HEIGHT - 60),
      speed: 2,
      direction: 1, // 1 right, -1 left
      isJumping: false,
    };
  }

  color("black");
  char("a", player.pos);

  color("red");
  box(150, 100, 300, 10);

  player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);

  // left and right
  player.pos.x += player.speed * player.direction;

  // Change direction at end of screen
  if (player.pos.x >= G.WIDTH || player.pos.x <= 0) {
    player.direction *= -1;
  }

    // Handle jump when the player taps the screen
    if (input.isJustPressed) {
      if (!player.isJumping) {
        player.isJumping = true;
        player.pos.y -= 10; // Adjust the jump height by changing the value
      }
    }
  
    // Simulate gravity to bring the player back down after jumping
    if (player.isJumping) {
      player.pos.y += 0.5; // Adjust the gravity value as needed
      if (player.pos.y >= G.HEIGHT - 15) {
        player.isJumping = false;
        player.pos.y = G.HEIGHT - 15;
      }
    }
}