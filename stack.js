//constructor
function Stack() {}
//prototype
Stack.prototype = Object.create(Array.prototype);
//reset constructor
Stack.prototype.constructor = Stack;
//more methods
Stack.prototype.peek = function() {
	return this[this.length-1];
}



//SHAPE
var counter = 0;
function Shape() {
  this.corners = [0,0,0,0];
  counter++;
}
Shape.prototype.moveTo = function(x,y) {
	this.corners[0] += x;
	this.corners[2] += x;
	this.corners[1] += y;
	this.corners[3] += y;
}

function Rectangle() {
	Shape.call(this);
	this.type = "Rectangle";
}
Rectangle.prototype = Object.create(Shape.prototype);
// Rectangle.prototype = new Shape();
// Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.sum = function() {
	return this.corners[0] + this.corners[1] + this.corners[2] + this.corners[3];
}

