class Hitbox {
    constructor(coords, dims) {
      this.x = coords.x;
      this.y = coords.y;
      
      this.width = dims.width;
      this.height = dims.height;
    
      this.diameter = dims.diameter;
    }

    wasHitSquare(hbs) {
      return (
        hbs.x < this.x + this.width &&
        hbs.x + hbs.width > this.x &&
        hbs.y < this.y + this.height &&
        hbs.y + hbs.height > this.y
      );
    }
    wasHitCircle(hbc) {
      var testX = hbc.x,
        testY = hbc.y;
  
      if (hbc.x < this.x) testX = this.x;
      else if (hbc.x > this.x + this.width) testX = this.x + this.width;
      if (hbc.y < this.y) testY = this.y;
      else if (hbc.y > this.y + this.height) testY = this.y + this.height;
  
      var distX = hbc.x - testX;
      var distY = hbc.y - testY;
      var distance = Math.sqrt(distX * distX + distY * distY);
  
      if (distance <= hbc.diameter / 2) {
        var hitPlace = this.y + this.height - testY;
        if (hitPlace < 22) return 1;
        if (hitPlace < 44) return 2;
        if (hitPlace < 66) return 3;
        if (hitPlace < 88) return 2;
        return 1;
      }
      return 0;
    }
  
    draw() {
      if (!this.diameter) {
        rect(this.x, this.y, this.width, this.height);
      } else {
        ellipse(this.x, this.y, this.diameter);
      }
    }
  }
  
  const HitboxFactory = {
    coords: (x, y) => {
      return { x, y };
    },
    squareDims: (width, height) => {
      return { width, height };
    },
    circleDims: (diameter) => {
      return { diameter };
    },
  };