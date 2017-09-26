function Particle(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;

  this.applyForce = function(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  this.update = function() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);

      // Acceleration goes to 0 in every update
      this.acc.set(0, 0);
  }

  this.display = function() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10);
  }

  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= -1;
      this.pos.y = height;
    }

    if (this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
      backcolor = '#FFD700';
    }

    if (this.pos.y < 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }

    if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
      backcolor = 51;
    }
  }
}
