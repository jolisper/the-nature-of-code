function BlackHole(x, y, bhs) {
    this.pos = createVector(x, y);
    this.mass = 60;
    this.bhs = bhs;
    
    this.collision = function(p) {
        return collideCircleCircle(
	    this.pos.x, this.pos.y, this.mass,
	    p.pos.x, p.pos.y, p.mass
	);
    }

    this.applyForceOn = function(p) {
	if (this.bhs.length < 2) {
	    return;
	}
	
        if (this.collision(p)) {
	    /*
	      The new position of the particle is the next black hole
	      position plus an offset to avoid a new immediate
	      collision with the next blackhole.
	     */
	    let ci = this.bhs.indexOf(this);
            let nbh = this.bhs[(ci + 1) % this.bhs.length];
            let offset = p5.Vector.sub(p.pos, this.pos).mult(-1.1);
	    let npp = p5.Vector.add(nbh.pos, offset);
	    
            p.pos.set(npp.x, npp.y);
	}
    }

    this.display = function() {
        noStroke();
        fill(color('#4a4a4a'));
	ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
    }
    
}
