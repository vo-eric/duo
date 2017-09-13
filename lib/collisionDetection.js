let CollisionDetection = function() {

	this.detectCollision = function (player, obstacle){
    var distX = Math.abs(player.x - obstacle.x - obstacle.w / 2);
    var distY = Math.abs(player.y - obstacle.y - obstacle.h / 2);

    if (distX > (obstacle.w / 2 + player.r)) { return false; }
    if (distY > (obstacle.h / 2 + player.r)) { return false; }

    if (distX <= (obstacle.w / 2)) { return true; }
    if (distY <= (obstacle.h / 2)) { return true; }

    var dx = distX - obstacle.w / 2;
    var dy = distY - obstacle.h / 2;
    if ( (dx * dx) + (dy * dy) <= (player.r * player.r))
    	return true;
	}
}
