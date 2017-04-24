var w;
var xoff = 0;
var wwidth = 24;
var wheight = 24;
var fillColor = 255;

function setup(){
    createCanvas(640, 480);
    //ellipseMode(RADIUS);
    w = new Walker();
}

function draw() {
  background(102);
  w.update();
  w.display();
}

function Walker() {
  this.pos = createVector(random(1,width), random(1,height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.update = function() {
    /*
      Add and smooth change on acceleration vector in every update.
      The noise funcion is used to generate the smothness movement, and
      the random function enables the inversion of the movement, because
      the noise function always return positive numbers.
    */
    smoothChange = createVector(
      noise(xoff) * 100 * random([1,-1]),
      noise(xoff) * 100 * random([1,-1])
    );

    this.acc.add(smoothChange);

    // In 3% of the movements the magnitude of acc vector
    // is 2 orders of magnitude greater.
    let magnitude = 0;
    if (random(1, 101) >= 97) {
      magnitude = 0.5;
    } else {
      magnitude = random([0.000001, 0.00001, 0.0001, 0.001]);
    }

    console.log(magnitude, this.pos.x, this.pos.y);

    // Test to see if the shape exceeds the boundaries of the screen
    // If it does, reverse its direction by multiplying by -1
    let magnitudes = [0.000001, 0.00001, 0.0001, 0.001];
    if (this.pos.x > width - wwidth || this.pos.x < wwidth) {
      this.vel.x *= random(magnitudes) * -1;
      //wwidth -= 0.1;
    }
    if (this.pos.y > height - wheight || this.pos.y < wheight) {
      this.vel.y *= random(magnitudes) * -1;
      //wheight -= 0.1;
    }

    fillColor = noise(xoff);

    this.acc.setMag(magnitude);

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // Incrementing offsets, xoff is incremented
    xoff = xoff + 1;
  }

  this.display = function() {
    //fill(fillColor * -255, fillColor * 255, fillColor * 120);
    //ellipse(this.pos.x, this.pos.y, wwidth, wheight);

    push();
    translate(width*0.8, height*0.5);
    rotate(frameCount / -100.0);
    polygon(this.pos.x, this.pos.y, wwidth, 7);
    pop();
  }
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(x, y);
  }
  endShape(CLOSE);
}
