let bg;
let ball;
let players = [];
let points;
let bgSound;
let kickSound;
let pointSound;

let kenvectorFont;

function preload() {
  soundFormats("wav");
  bgSound = loadSound("/src/assets/sfx/musicloop");
  kickSound = loadSound("/src/assets/sfx/kick");
  pointSound = loadSound("/src/assets/sfx/point");
  kenvectorFont = loadFont("/src/assets/fonts/kenvector_future_thin.ttf");
}

function setup() {
  bg = loadImage("/src/assets/sprites/board.png");

  players.push(
    new Paddle(
      PaddleFactory.coords(0, BOARD.height / 2 - PADDLE.height / 2),
      PaddleFactory.controllSettings(87, 83),
      PLAYERSID.player1
    ),
    new Paddle(
      PaddleFactory.coords(
        BOARD.width - PADDLE.width,
        BOARD.height / 2 - PADDLE.height / 2
      ),
      PaddleFactory.controllSettings(38, 40),
      PLAYERSID.player2
    )
  );
  points = new Points(PointsFactory.coords(BOARD.width / 2, 50), kenvectorFont);
  ball = new Ball(
    BallFactory.coords(
      BOARD.width / 2 - BALL.side / 2,
      BOARD.height / 2 - BALL.side / 2
    ),
    players,
    points,
    kickSound,
    pointSound
  );

  bgSound.loop();
  createCanvas(BOARD.width, BOARD.height);
}

function draw() {
  background(bg);
  ball.draw();
  points.draw();
  players.forEach((player) => player.draw());
}
