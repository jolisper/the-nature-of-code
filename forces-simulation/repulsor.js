function Repulsor(x, y) {
    this.attractor = new Attractor(x, y);
    this.pos = this.attractor.pos;
    this.mass = this.attractor.mass;
    
    this.calculateRepulsion = function(p) {
	let v = p5.Vector.div(this.attractor.calculateAttraction(p), 2);
	return p5.Vector.mult(v, -1);
    }

    this.applyForceOn = function(p) {
	let repulsion = this.calculateRepulsion(p);
	p.applyForce(repulsion);
    }

    this.display = function() {
	noStroke();
	fill(color('#B9E1E2'));
	ellipse(
	    this.attractor.pos.x,
	    this.attractor.pos.y,
	    this.attractor.mass,
	    this.attractor.mass);
    }
}
