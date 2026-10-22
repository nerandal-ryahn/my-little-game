kaboom({
  width: 960,
  height: 540,
  background: [26, 20, 35],
});

setGravity(1600);

const SPEED = 280;
const JUMP = 720;

scene("game", () => {
  let score = 0;
  const totalCoins = 4;

  add([
    rect(width(), 48),
    pos(0, height() - 48),
    area(),
    body({ isStatic: true }),
    color(76, 175, 80),
    "platform",
  ]);

  const platforms = [
    { x: 180, y: 390, w: 180, h: 28 },
    { x: 430, y: 310, w: 160, h: 28 },
    { x: 680, y: 230, w: 180, h: 28 },
    { x: 420, y: 150, w: 140, h: 28 },
    { x: 80, y: 220, w: 120, h: 28 },
  ];

  for (const p of platforms) {
    add([
      rect(p.w, p.h),
      pos(p.x, p.y),
      area(),
      body({ isStatic: true }),
      color(121, 85, 72),
      "platform",
    ]);
  }

  const coinSpots = [
    vec2(240, 350),
    vec2(490, 270),
    vec2(750, 190),
    vec2(470, 110),
  ];

  for (const spot of coinSpots) {
    add([
      rect(22, 22),
      pos(spot),
      area(),
      color(255, 213, 79),
      "coin",
    ]);
  }

  const player = add([
    rect(36, 36),
    pos(60, 400),
    area(),
    body(),
    color(0, 188, 212),
    "player",
  ]);

  const scoreLabel = add([
    text("Coins: 0 / " + totalCoins, { size: 24 }),
    pos(16, 16),
    color(255, 255, 255),
    fixed(),
  ]);

  add([
    text("Arrows / A D to move, Space / W / Up to jump", { size: 16 }),
    pos(16, 48),
    color(200, 200, 210),
    fixed(),
  ]);

  onKeyDown("left", () => player.move(-SPEED, 0));
  onKeyDown("a", () => player.move(-SPEED, 0));
  onKeyDown("right", () => player.move(SPEED, 0));
  onKeyDown("d", () => player.move(SPEED, 0));

  function tryJump() {
    if (player.isGrounded()) {
      player.jump(JUMP);
    }
  }

  onKeyPress("space", tryJump);
  onKeyPress("up", tryJump);
  onKeyPress("w", tryJump);

  player.onCollide("coin", (coin) => {
    destroy(coin);
    score += 1;
    scoreLabel.text = "Coins: " + score + " / " + totalCoins;
    if (score >= totalCoins) {
      go("win");
    }
  });

  player.onUpdate(() => {
    if (player.pos.y > height() + 80) {
      go("game");
    }
  });
});

scene("win", () => {
  add([
    text("You collected all the squares!", { size: 32 }),
    pos(center()),
    anchor("center"),
    color(255, 255, 255),
  ]);
  add([
    text("Press Space to play again", { size: 20 }),
    pos(center().add(0, 48)),
    anchor("center"),
    color(200, 200, 210),
  ]);
  onKeyPress("space", () => go("game"));
});

go("game");
