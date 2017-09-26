var particle1;
var particle2;
var backcolor = 51;
var liquid;

function setup() {
    createCanvas(640, 480);
    
    liquid = new Liquid(0, height / 2, width, height / 2, 0.18)
    particle1 = new Particle(240, 10, 1.5);
    particle2 = new Particle(400, 10, 3);
}

function draw() {
    background(backcolor);

    liquid.display();

    // Is the mover in the liquid?
    if (liquid.contains(particle1)) {
	var dragForce = liquid.calculateDrag(particle1);
	particle1.applyForce(dragForce);
    }

    if (liquid.contains(particle2)) {
	var dragForce = liquid.calculateDrag(particle2);
	particle2.applyForce(dragForce);
    }
    
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
