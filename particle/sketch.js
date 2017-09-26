var particle1;
var particle2;
var backcolor = 51;

function setup() {
  createCanvas(1000, 340);
  particle1 = new Particle(300, 100, 2);
  particle2 = new Particle(700, 100, 5);
}

function draw() {
  background(backcolor);

  let gravity1 = createVector(0, 0.2 * particle1.mass);
  let gravity2 = createVector(0, 0.2 * particle2.mass);
  let wind = createVector(0.1, 0);

  particle1.applyForce(gravity1);
  particle2.applyForce(gravity2);

  if (mouseIsPressed) {
    particle1.applyForce(wind);
    particle2.applyForce(wind);
  }

  particle1.update();
  particle1.edges();
  particle1.display();

  particle2.update();
  particle2.edges();
  particle2.display();
}
