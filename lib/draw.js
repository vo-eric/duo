let Drawer = function(canvas, orbit, redOrb, blueOrb, obstacles, playerData) {
	let ctx = canvas.getContext('2d');
	let w = canvas.width;
	let h = canvas.height;
	let that = this;

	let drawPlayer = function(player) {
	ctx.beginPath();
	ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
	ctx.closePath();
	}

	let drawRectFill = function(player) {
	  ctx.beginPath();
	  ctx.fillStyle = player.fs;
	  ctx.fillRect(player.x, player.y, player.w, player.h);
	  ctx.closePath();
	}

	let drawOrbFill = function(player) {
		ctx.fillStyle = player.fs;
		drawPlayer(player);
		ctx.fill();
	}

	let drawOrbStroke = function(player) {
		ctx.strokeStyle = player.ss;
		drawPlayer(player);
		ctx.stroke();
	}

	let lives = function(life) {
		ctx.font = "14px Lato";
		ctx.fillStyle = "white";
		ctx.fillText("LIVES: " + life, 170, 35);
	}

	this.redraw = function() {
	  ctx.fillStyle = 'rgba(0,0,0,0.3)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

	  drawOrbStroke(orbit);
		drawOrbFill(redOrb);
	  drawOrbFill(blueOrb);

	  for (let i = 0; i < obstacles.length; i++) {
	   if (obstacles[i].onScreen) {
			 drawRectFill(obstacles[i]);
			}
	  }

	  lives(playerData.life);

	  window.requestAnimationFrame(that.redraw);
	};

}
