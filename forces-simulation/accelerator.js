function Accelerator(x, y) {
    this.pos = createVector(x, y);
    this.mass = 60;
    this.c = 0.003;
    
    this.collision = function(p) {
        return collideCircleCircle(
	    this.pos.x, this.pos.y, this.mass,
	    p.pos.x, p.pos.y, p.mass
	);
    }

    this.calculateAcceleration = function(p) {
	var speed = p.vel.mag();
	var accelerationMagnitude = constrain(this.c * speed * speed, 0, 0.031);

        var accelerationForce = p.vel.copy();
        
	accelerationForce.setMag(accelerationMagnitude);
	return accelerationForce;
    }

    this.applyForceOn = function(p) {
        if (this.collision(p)) {
	    let drag = this.calculateAcceleration(p);
	    p.applyForce(drag);
	}
    }
    
    this.display = function() {
        noStroke();
        fill(color('#ABC178'));
	ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
    }
    
}
