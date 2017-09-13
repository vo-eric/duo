var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};

let Obstacle = function(dx, dy, y, fs) {
	this.x;
	this.y = y;
	this.w;
	this.h;
	this.dx = dx;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.onScreen = false;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;
};

Obstacle.prototype.updatePos = function() {
	if (this.y < 700 && this. y > -200) {
    this.onScreen = true;
  }	else {
  this.onScreen = false;
  }

	this.y += this.dy;
	this.x += this.dx;

	if (this.dx != 0) {
    if (this.x + this.w >= 400 || this.x <= 0) {
      this.dx = this.dx * -1;
    }
  }

	if (this.counter == 44) {
		if (!this.beating) {
			this.x -= 1;
			this.y -= 1;
			this.w += 2;
			this.h += 2;
			this.beating = true;
			this.counter = 0;
		} else {
			this.x += 1;
			this.y += 1;
			this.w -= 2;
			this.h -= 2;
			this.beating = false;
			this.counter = 0;
		}
	}
	this.counter++;
}

Obstacle.prototype.reversePos = function() {
	if (this.y < 700 && this. y > -200) {
    this.onScreen = true;
  } else {
    this.onScreen = false;
  }

	if (this.initialY <= this.y) {
		this.y -= this.dy * 7;
		return false;
	} else {
		this.y = this.initialY;
		this.x = this.initialX;
		return true;
	}
}

//checks to see if the level is finished
Obstacle.prototype.crossedFinish = function() {
	if (this.y > 600) {
    return true;
  } else {
    return false;
  }
}

//changes the color of the obstacle when hit
Obstacle.prototype.changeColor = function(color) {
	this.fs = color;
}


let SquareC = function(dy, y, fs) {
	this.x = 150;
	this.y = y;
	this.w = 80;
	this.h = 80;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }

}

inheritsFrom(SquareC, Obstacle);

let SquareCRight = function(dy, y, fs) {
	this.x = 150;
	this.y = y;
	this.w = 80;
	this.h = 80;
	this.dx = 0.2;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
}

inheritsFrom(SquareCRight, Obstacle);

let SquareCLeft = function(dy, y, fs) {
	this.x = 150;
	this.y = y;
	this.w = 80;
	this.h = 80;
	this.dx = -0.2;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
}

inheritsFrom(SquareCLeft, Obstacle);

let SquareCDown = function(dy, y, fs) {
	this.x = 150;
	this.y = y;
	this.w = 80;
	this.h = 80;
	this.dx = 0;
	this.dy = dy+1;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
}

inheritsFrom(SquareCDown, Obstacle);


let RectangleUprightR = function(dy, y, fs) {
	this.x = 280;
	this.y = y;
	this.w = 30;
	this.h = 150;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleUprightR, Obstacle);

let RectangleUprightL = function(dy, y, fs) {
	this.x = 100;
	this.y = y;
	this.w = 30;
	this.h = 150;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleUprightL, Obstacle);


let RectangleHorizontalC = function(dy, y, fs) {
	this.x = 150;
	this.y =  y;
	this.w = 70;
	this.h = 30;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalC, Obstacle);

let RectangleHorizontalCRight = function(dy, y, fs) {
	this.x = 150;
	this.y =  y;
	this.w = 70;
	this.h = 30;
	this.dx = 0.5;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalCRight, Obstacle);

let RectangleHorizontalCLeft = function(dy, y, fs) {
	this.x = 150;
	this.y =  y;
	this.w = 70;
	this.h = 30;
	this.dx = -0.5;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalCLeft, Obstacle);

let RectangleHorizontalCDown = function(dy, y, fs) {
	this.x = 150;
	this.y =  y;
	this.w = 70;
	this.h = 30;
	this.dx = 0;
	this.dy = dy+1;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalCDown, Obstacle);

let RectangleHorizontalL = function(dy, y, fs) {
	this.x = 0;
	this.y =  y;
	this.w = 200;
	this.h = 30;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalL, Obstacle);

let RectangleHorizontalLRight = function(dy, y, fs) {
	this.x = 0;
	this.y =  y;
	this.w = 170;
	this.h = 30;
	this.dx = 1;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalLRight, Obstacle);

let RectangleHorizontalLDown = function(dy, y, fs) {
	this.x = 0;
	this.y =  y;
	this.w = 200;
	this.h = 30;
	this.dx = 0;
	this.dy = dy+1;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalLDown, Obstacle);

let RectangleHorizontalR = function(dy, y, fs) {
	this.x = 200;
	this.y =  y;
	this.w = 200;
	this.h = 30;
	this.dx = 0;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalR, Obstacle);

let RectangleHorizontalRLeft = function(dy, y, fs) {
	this.x = 200;
	this.y =  y;
	this.w = 170;
	this.h = 30;
	this.dx = -1;
	this.dy = dy;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalRLeft, Obstacle);

let RectangleHorizontalRDown = function(dy, y, fs) {
	this.x = 200;
	this.y =  y;
	this.w = 200;
	this.h = 30;
	this.dx = 0;
	this.dy = dy+1;
	this.initialX = this.x;
	this.initialY = this.y;
	this.spd = 5;
	this.counter = 0;
	this.beating = false;

  if (!fs) {
    this.fs = 'white';
  }	else {
    this.fs = fs;
  }
};

inheritsFrom(RectangleHorizontalRDown, Obstacle);
