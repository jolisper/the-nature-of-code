function Attractor() {

    this.pos = createVector(width/2, height/2);
    this.mass = 20;
    this.G = 1;

    this.calculateAttraction = function(p) {
	var force = p5.Vector.sub(this.pos, p.pos);

	var distance = force.mag();

	distance = constrain(distance, 5, 25);

	force.normalize();

	var stregth = (this.G * this.mass * p.mass) / (distance * distance);

	force.mult(stregth);
	
	return force;
    }

    this.display = function() {
	ellipseMode(CENTER);
	strokeWeight(4);
	stroke(0);
	ellipse(this.pos.x, this.pos.y, this.mass*2, this.mass*2);
    }
    
}
