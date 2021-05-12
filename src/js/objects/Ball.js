class Ball {
    constructor(coords, players, points, kickSound, pointSound) {
      
      this.x = coords.x;
      this.y = coords.y;
    
      this.width = BALL.side;
      this.height = BALL.side;
      
      this.img = loadImage("/src/assets/sprites/ball.png");
    
      this.speedX = 5 * this.multiplierDirection();
      this.speedY = 5 * this.multiplierDirection();
      this.canMove = 0;
      this.hb = new Hitbox(
        HitboxFactory.coords(
          this.x + BALL.hbComepnsation,
          this.y + BALL.hbComepnsation
        ),
        HitboxFactory.circleDims(BALL.hitboxSide)
      );
      this.players = players;
      this.points = points;
      this.kickSound = kickSound;
      this.pointSound = pointSound;
      this.bounce = true;
    }
  
    multiplierDirection() {
      return Math.round(Math.random()) ? 1 : -1;
    }
  
    hitCheck() {
      players.forEach((player) => {
        if(player.hasMove) this.canMove = 1;
  
        var hit = player.hb.wasHitCircle(ball.hb);
        var scoreHit = player.pointsHB.wasHitCircle(ball.hb);
        if (hit !== 0 && this.bounce) this.hitPlayer(hit);
        if (scoreHit !== 0) this.hitScore(player);
      });
    }
  
    hitPlayer(hit) {
      var dirX = this.speedX > 0 ? 1 : -1;
      var dirY = this.speedY > 0 ? 1 : -1;
      switch (hit) {
        case 1:
          this.speedX += dirX;
          if (Math.abs(this.speedY) > 3) this.speedY -= dirY;
          break;
        case 2:
          this.speedY += dirY;
          if (Math.abs(this.speedX) > 3) this.speedX -= dirX;
          break;
      }
      this.speedX *= -1;
      this.bounce = false;
      this.kickSound.play();
    }
  
    hitScore(player) {
      this.points.updatePlayerPoints(player.player);
      this.pointSound.play();
      this.reset();
    }
  
    move() {
      if (
        this.hb.y - this.hb.diameter / 2 <= 0 ||
        this.hb.y >= BOARD.height - this.hb.diameter / 2
      )
        this.speedY *= -1;
      if (this.x < BOARD.width / 2 + 10 && this.x > BOARD.width / 2 - 10)
        this.bounce = true;
      this.x += this.speedX * this.canMove;
      this.hb.x += this.speedX * this.canMove;
      this.y += this.speedY * this.canMove;
      this.hb.y += this.speedY * this.canMove;
    }
  
    reset() {
      this.x = BOARD.width / 2 - BALL.side / 2;
      this.y = BOARD.height / 2 - BALL.side / 2;
      this.hb.x = this.x + BALL.hbComepnsation;
      this.hb.y = this.y + BALL.hbComepnsation;
      this.speedY = 0;
      this.speedX = (this.speedX>0)? 6 : -6;
      this.canMove = 0;
      this.players.forEach((player) => {
        player.y = BOARD.height / 2 - PADDLE.height / 2;
        player.hb.y = BOARD.height / 2 - PADDLE.height / 2;
        player.hasMove = false;
      });
    }
  
    draw() {
      image(this.img, this.x, this.y, this.width, this.height);
      this.hitCheck();
      this.move();
      //this.hb.draw();
    }
  }
  
  const BallFactory = {
    coords: (x, y) => {
      return { x, y };
    },
  };