var Liquid = function(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.contains = function(m) {
	var l = m.pos;

	return l.x > this.x && l.x < this.x + this.w &&
	    l.y > this.y && l.y < this.y + this.h;
    }

    this.calculateDrag = function(m) {
	var speed = m.vel.mag();
	var dragMagnitude = this.c * speed * speed

	var dragForce = m.vel.copy();
	dragForce.mult(-1);

	dragForce.setMag(dragMagnitude);
	return dragForce;
    }

    this.display = function() {
	noStroke();
	fill(30);
	rect(this.x, this.y, this.w, this.h);
    }
    
}
