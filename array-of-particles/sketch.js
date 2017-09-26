var backcolor = 51;
var particles = [];

function setup() {
    createCanvas(640, 360);

    for (i = 0; i < 2; i++) {
	particles.push(
	    new Particle(random() * width, 10, random() * 5)
	);
    }

}

function draw() {
    background(backcolor);

    for (i = 0; i < particles.length; i++) {
	let gravity = createVector(0, 0.2 * particles[i].mass);
	particles[i].applyForce(gravity);

	let wind = createVector(0.1, 0);
	if (mouseIsPressed) {
	    particles[i].applyForce(wind);
	}

	particles[i].update();
	particles[i].edges();
	particles[i].display();
    }    
}
