function Attractor(x, y) {

    this.pos = createVector(x, y);
    this.mass = 60;
    this.G = 0.09;

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
	let attraction = this.calculateAttraction(p);
	p.applyForce(attraction);
    }

    this.display = function() {
        noStroke();
	fill(color('#ffa07a'));
	ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
    }
    
}
