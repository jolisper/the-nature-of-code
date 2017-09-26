function Dragger(x, y) {
    this.pos = createVector(x, y);
    this.mass = 60;
    this.c = 0.006;
    
    this.collision = function(p) {
        return collideCircleCircle(
	    this.pos.x, this.pos.y, this.mass,
	    p.pos.x, p.pos.y, p.mass
	);
    }

    this.calculateDrag = function(p) {
	var speed = p.vel.mag();
	var dragMagnitude = constrain(this.c * speed * speed, 0, 0.8);

        var dragForce = p.vel.copy().mult(-1);
	
	dragForce.setMag(dragMagnitude);
	return dragForce;
    }

    this.applyForceOn = function(p) {
        if (this.collision(p)) {
	    let drag = this.calculateDrag(p);
	    p.applyForce(drag);
	}
    }

    this.display = function() {
	noStroke();
	var c = color('#A7A9AC');
        fill(c);
	ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
    }
    
}
