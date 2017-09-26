var backcolor = '#58595B';
var particles = [];
var attractors = [];
var repulsors = [];
var draggers = [];
var accelerators = [];
var blackholes = [];
var particlesGravityIsOn = false;
var instructionsIsOn = false;
var cnv;
var instructions = "* Press a to add an attractor object.\n* Press r to add a repulsor object, its have a 1/2 of the attractor object force.\n* Press d to add a dragger object, when a particle pass through a dragger suffer friction.\n* Press v to add an accelerator object, when a particle pass through an accerelator extra acceleration is added to the particle.\n* Press h to add an blackhole object, when a particle pass through a blackhole, the particle is dematerialized and rematerialized in other blackhole. Only 2 blackholes are allowed.\n* Click to add 200 particles from the same origin point every 250ms.\n* Press x to delete an object.\n* Press p set on/off the particles gravity. When is on, the particles attract each other. With more than 200 particles in the field could be slow.";

function setup() {
    cnv = createCanvas(1000, 600);
    centerCanvas();
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    cnv.position(x, cnv.y);
}

function windowResized() {
  centerCanvas();
}

function draw() {
    background(backcolor);

    if (mouseIsPressed) {
	let mx = mouseX;
	let my = mouseY;
	let pc = 0;
	let ti = 0;
	
	while (pc < 200) {
	    setTimeout(function(){
		particles.push(
		    new Particle(mx, my, 0.25)
		);		
	    }, ti);
	    ti += 250;
	    pc++;
	}
	
	mouseIsPressed = false;
    }

    if (keyIsPressed) {
	switch(keyCode) {
	case 105:
	    instructionsIsOn = !instructionsIsOn;
	    break;
	case 97: // a
	    attractors.push(
		new Attractor(mouseX, mouseY)
	    );
	    break;
	case 114: // r
	    repulsors.push(
		new Repulsor(mouseX, mouseY)
	    );
	    break;
	case 100: // d
	    draggers.push(
		new Dragger(mouseX, mouseY)
	    );
	    break;
	case 118: // v
            accelerators.push(
		new Accelerator(mouseX, mouseY)
	    );
	    break;
	case 104: // h
	    let bh = new BlackHole(mouseX, mouseY, blackholes);
	    // Only 2 black holes are allowed
	    if (blackholes.length >= 2) { blackholes.shift(); }
	    blackholes.push(bh);
	    break;
	case 120: // x
            deleteObject();
            break;
	case 112: // p
	    particlesGravityIsOn = !particlesGravityIsOn;	    
	    break;
	default:
	    console.log("bad key! (" + keyCode + ")");
	    // nothing to do
	}
	keyIsPressed = false;
    }

    let objs = [blackholes, repulsors, attractors, draggers, accelerators, particles];

    // Display all objects
    for (let i = 0; i < objs.length; i++) {
	for (j = 0; j < objs[i].length; j++) {
	    objs[i][j].display();
	}
    }

    // Update particles state
    for (let i = 0; i < particles.length; i++) {
	let nonParticles = objs.filter(function(i){ return i != particles; });

	// Non particles affect particles 
	for (j = 0; j < nonParticles.length; j++) {
	    for (k = 0; k < nonParticles[j].length; k++) {
                nonParticles[j][k].applyForceOn(particles[i]);
	    }
	}

	// Particles affects particles
	if (particlesGravityIsOn) {
	    for (j = 0; j < particles.length; j++) {
		if (i == j) {
                    continue; // The particle do not affect itself
		}
		particles[j].applyForceOn(particles[i]);
	    }
	}
	
	particles[i].update();
    }

    drawParticlesGravityStatus();
    drawInstructions();
}

function drawParticlesGravityStatus() {
    fill(color('#FFFFFF'));
    textSize(12);
    stroke('#000000');
    strokeWeight(1);
    
    if (particlesGravityIsOn) {
	text("Particles Gravity On (Press i for instructions)", 5, 15);
    } else {
	text("Particles Gravity Off (Press i for instructions) ", 5, 15);
    }
}

function drawInstructions() {
    fill(color('#FFFFFF'));
    textSize(12);
    stroke('#000000');
    strokeWeight(1);
    
    if (instructionsIsOn) {
	text(instructions, 5, 40);
    }
}

function deleteObject() {
    return ifCollideDelete(particles, 100) ||
	ifCollideDelete(accelerators, 1)   ||
	ifCollideDelete(draggers, 1)       ||
	ifCollideDelete(repulsors, 1)      ||
	ifCollideDelete(attractors, 1)     ||
	ifCollideDelete(blackholes, 1);
}

/**
 Delete an object if collide with mouse position.
*/
function ifCollideDelete(os, mm) {
    for (let i = 0; i < os.length; i++) {
        if (collidePointCircle(
	    mouseX, mouseY,
	    os[i].pos.x, os[i].pos.y, os[i].mass * mm)) {
            os.splice(i, 1);
	    return true;
	}
    }
    return false;
}
