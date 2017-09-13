var ObstacleFactory = function(){
	this.getObstacle = function(code, dy, initialY) {
		switch(code){
			case 'SC':
				return(new SquareC(dy, initialY));
				break;

			case 'SCD':
				return(new SquareCDown(dy, initialY));
				break;

			case 'SCR':
				return(new SquareCRight(dy, initialY));
				break;

			case 'SCL':
				return(new SquareCLeft(dy, initialY));
				break;

			case 'RUL':
				return(new RectangleUprightL(dy, initialY));
				break;

			case 'RUR':
				return(new RectangleUprightR(dy, initialY));
				break;

			case 'RHC':
				return(new RectangleHorizontalC(dy, initialY));
				break;

			case 'RHCD':
				return(new RectangleHorizontalCDown(dy, initialY));
				break;

			case 'RHCR':
				return(new RectangleHorizontalCRight(dy, initialY));
				break;

			case 'RHCL':
				return(new RectangleHorizontalCLeft(dy, initialY));
				break;

			case 'RHL':
				return(new RectangleHorizontalL(dy, initialY));
				break;

			case 'RHR':
				return(new RectangleHorizontalR(dy, initialY));
				break;

			case 'RHLR':
				return(new RectangleHorizontalLRight(dy, initialY));
				break;

			case 'RHRL':
				return(new RectangleHorizontalRLeft(dy, initialY));
				break;

			case 'RHRD':
				return(new RectangleHorizontalRDown(dy, initialY));
				break;

			case 'RHLD':
				return(new RectangleHorizontalLDown(dy, initialY));
				break;
		}
	}
}
