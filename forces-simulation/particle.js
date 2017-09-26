function Particle(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;

    this.G = 0.09;
    
    this.applyForce = function(force) {
	// 2nd Newton Law:
	// F = m . a
	let f = force.copy();
	f.div(this.mass);
	this.acc.add(f);
    }

    this.calculateAttraction = function(p) {
	var force = p5.Vector.sub(this.pos, p.pos);

	var distance = force.mag();

	distance = constrain(distance, 5, 25);

	force.normalize();

	var stregth = (this.G * this.mass * p.mass) / (distance * distance);

	force.mult(stregth);
	
	return force;
    }

    this.applyForceOn = function(p) {
	if (this != p) { // The particle do not affect itself
	    var attraction = this.calculateAttraction(p);
	    p.applyForce(attraction);
	}
    }
    
    this.update = function() {
	this.vel.add(this.acc);
	this.pos.add(this.vel);

	// Acceleration goes to 0 in every update
	this.acc.set(0, 0);
    }
    
    this.display = function() {
	noStroke();
	fill(color('#FED535'));
	ellipse(this.pos.x, this.pos.y, this.mass * 20, this.mass * 20);
    }

}
