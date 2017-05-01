var wwidth = 24;
var wheight = 24;
var fillColor = '#F9CF00';
var backgroundColor = '#94618E';
var walkers = [];

function setup(){
  createCanvas(640, 480);
  ellipseMode(RADIUS);

  var n = 0;
  while (n < 3) {
    walkers.push(new Walker());
    n++;
  }
}

function draw() {
  background(backgroundColor);
  for (let walker of walkers) {
    walker.update();
    walker.display();
  }
}

function Walker() {
  this.xoff = 0;
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.magnitudes = [0.000001, 0.00001, 0.0001, 0.001, 0.01];
  this.direction = 1;
  this.poly;

  this.update = function() {
    /*
      Add and smooth change on acceleration vector in every update.
      The noise funcion is used to generate the smothness movement, and
      the random function enables the inversion of the movement, because
      the noise function always return positive numbers.
    */
    let smoothChange = createVector(
      noise(this.xoff) * 100 * random([1,-1]),
      noise(this.xoff) * 100 * random([1,-1])
    );

    this.acc.add(smoothChange);

    this.checkBordersCollitionAndChangeDirection();

    // In 3% of the movements the magnitude of acc vector
    // is 2 orders of magnitude greater.
    let magnitude = 0;
    if (random(1, 101) >= 97) {
      magnitude = 0.5;
    } else {
      magnitude = random(this.magnitudes);
    }

    this.acc.setMag(magnitude);

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // Incrementing offsets
    this.xoff += 1;
  }

  this.display = function() {
    push();

    translate(this.pos.x, this.pos.y);
    rotate(frameCount / 25.0 * this.direction);

    this.poly = this.polygon(0, 0, wwidth, 7);

    beginShape();
  	for(i = 0; i < this.poly.length; i++){
      vertex(this.poly[i].x, this.poly[i].y);
  	}
  	endShape(CLOSE);

    pop();

    fill(fillColor);
  }

  this.polygon = function(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    let poly = new Array(npoints);
    let i = 0;
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      poly[i] = createVector(sx, sy);
      i++;
    }
    return poly;
  }

  this.checkBordersCollitionAndChangeDirection = function() {
    // Some bounce factors distinct to 1, to not always bounce like a ball
    let bounceFactors = [0.1, 0.3, 0.5, 0.5, 1, 1];

    // Test to see if the shape exceeds the boundaries of the screen
    // If it does, reverse its direction by multiplying by -1
    if (this.pos.x > width - wwidth || this.pos.x < wwidth) {
      this.vel.x *= random(bounceFactors) * -1;
      //this.vel.x *= -1;
      this.direction *= -1;
    }
    if (this.pos.y > height - wheight || this.pos.y < wheight) {
      this.vel.y *= random(bounceFactors) * -1;
      //this.vel.y *= -1;
      this.direction *= -1;
    }
  }
}
