var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

let Player = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
};

Player.prototype.revolveAround = function rotate(cx, cy, angle) {
  let radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (this.x - cx)) + (sin * (this.y - cy)) + cx,
      ny = (cos * (this.y - cy)) - (sin * (this.x - cx)) + cy;
  this.x = nx;
  this.y = ny;
}

let Orbit = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
}

inheritsFrom(Orbit, Player);

let BlueOrb = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
}

inheritsFrom(BlueOrb, Player);

let RedOrb = function(x, y, r, fs, ss) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.fs = fs;
	this.ss = ss;
}

inheritsFrom(RedOrb, Player);
