let Duet = function() {
	let that = this;
	let STATE = {
		START: 0,
		PLAY: 1,
		HIT: 2,
		OVER:3,
		CLEAR:4
	};
	let KEY = {
		LEFT:97,
		RIGHT:100,
		ESC:27,
		SPACE:32
	};
	let paused = false;
	let gameLoop;
	let canvas = document.getElementById('canvas');
	let canvasContainer = document.getElementById('canvas-container');
	let screenOverlay, gameTitle, gameSubtitle, continueButton, state,
			pauseButton, screenMsg, levelTitle, levelSubtext, collisionDetection,
			keyPressInterval, backgroundAudio, checkAudioInterval, orbit, red, blue;
	let MESSAGES = {
		LOADING: "Loading...",
		START: "Press space to start",
		PAUSE: "Paused",
		OVER: "Game over!",
		CLEAR: "Press space to continue",
		CHAPCLEAR: "Next Chapter",
		CONTINUE: "Press space to continue",
		NOMORELVL : "Congrats, You won!",
		BTNCONTINUE: "Cleared!",
		BTNRESTART: "Restart",
		BTNRESUME: "Resume",
		BTNSTART: "Begin",
		GAMETITLE: "duo",
		GAMESUB: ""
	};
	let ringX = canvas.width/2;
	let ringY = canvas.height/1.3;
	let angleInterval = 25;
  let angle = 0;
  let increment = 0.9;
	let obstacles = [];
	let levelCounter = 0;
	let playerData = {life: 100};
	let currentLevel = level[levelCounter];
	let obsFactory = new ObstacleFactory();
	let rect = canvas.getBoundingClientRect();

	let loadLevel = () => {
		obstacles.splice(0,obstacles.length);
		for(let i = 0; i < currentLevel.OBS.length; i++) {
		obstacles[i] = obsFactory.getObstacle(currentLevel.OBS[i].code, currentLevel.SPEED, currentLevel.OBS[i].INITY);
		}
		playerData.level += 1;
		levelTitle.innerHTML = currentLevel.TITLE;
		levelSubtext.innerHTML = currentLevel.MESSAGE;
		let levelMsgDuration = currentLevel.DURATION;
		canvasContainer.appendChild(levelTitle);
		canvasContainer.appendChild(levelSubtext);
		if(document.getElementById('level-title'))setTimeout(function(){
			canvasContainer.removeChild(levelTitle);
		}, 3000);
		if(document.getElementById('level-msg'))setTimeout(function(){
			canvasContainer.removeChild(levelSubtext);
		}, levelMsgDuration);
	}

	let reset = () => {
		obstacles.splice(0,obstacles.length);
		levelCounter = 0;
		currentLevel = level[levelCounter];
		playerData.life = 100;
		playerData.level = 0;
		backgroundAudio.src = "../music/cutToBlack.mp3";
		screenMsg.innerHTML = MESSAGES.LOADING;
		canvasContainer.appendChild(screenOverlay);
		checkAudioInterval = setInterval(function(){
			if(checkAudio()){
				clearInterval(checkAudioInterval);
				screenMsg.innerHTML = MESSAGES.CONTINUE;
				continueButton.innerHTML = MESSAGES.BTNSTART;
				canvasContainer.appendChild(continueButton);
			}
		}, 1000);
	}


	this.load = function() {
		document.addEventListener('keypress', onKeyPress);
		document.addEventListener('keyup', onKeyUp);
		document.addEventListener('keydown', onKeyDown);

		canvas.addEventListener('touchstart', onTouchStart, false);
		canvas.addEventListener('touchend', onTouchEnd, false);

		orbit = new Orbit(ringX, ringY, 100, null, '#E8E6E4');
		red = new RedOrb(ringX-100, ringY, 10, '#F71313');
		blue = new BlueOrb(ringX+100, ringY, 10, '#6229FF');

		let drawer = new Drawer(canvas, orbit, red, blue, obstacles, playerData);
		window.requestAnimationFrame(drawer.redraw);

		screenOverlay = document.createElement('div');
		screenOverlay.id = 'overlay';

		continueButton = document.createElement('div');
		continueButton.id = 'btn-continue';

		pauseButton = document.createElement('div');
		pauseButton.id = 'btn-pause';
		pauseButton.addEventListener('click', onPause);

		gameTitle = document.createElement('p');
		gameTitle.id = 'game-title';
		gameTitle.innerHTML = MESSAGES.GAMETITLE;

		gameSubtitle = document.createElement('p');
		gameSubtitle.id = 'game-subtitle';
		gameSubtitle.innerHTML = MESSAGES.GAMESUB;

		levelTitle = document.createElement('p');
		levelTitle.id = 'level-title';

		levelSubtext = document.createElement('p');
		levelSubtext.id = 'level-msg';

		screenMsg = document.createElement('p');
		screenOverlay.appendChild(screenMsg);
		screenOverlay.appendChild(gameTitle);
		continueButton.innerHTML = MESSAGES.BTNSTART;
		continueButton.addEventListener('click', onContinue);

		screenMsg.innerHTML = MESSAGES.LOADING;
		canvasContainer.appendChild(screenOverlay);
		canvasContainer.appendChild(gameSubtitle);
		canvasContainer.appendChild(pauseButton);

		collisionDetection = new CollisionDetection();

		backgroundAudio = new Audio('music/cutToBlack.mp3');
		backgroundAudio.loop = true;
		backgroundAudio.volume = .50;
		backgroundAudio.load();

		checkAudioInterval = setInterval(function(){
			if(checkAudio()){
				clearInterval(checkAudioInterval);
				screenMsg.innerHTML = MESSAGES.START;
				canvasContainer.appendChild(continueButton);
				state = STATE.START;
			}
		}, 1000);

		document.body.appendChild(canvasContainer);
	}

	let checkAudio = function()	{
		if (backgroundAudio.readyState === 4) {
			return true;
		}
	}

	let changeState = function() {
		window.cancelAnimationFrame(gameLoop);
		gameLoop = window.requestAnimationFrame(that.game);
	}

	this.game = function() {
		switch(state) {
			case STATE.PLAY:
			gameLoop = window.requestAnimationFrame(that.game);

			for(let i = 0; i < obstacles.length; i++) {
		    obstacles[i].updatePos();
		    if(collisionDetection.detectCollision(red, obstacles[i])) {
		    	playerData.life--;
		    	state = STATE.HIT;
		    	obstacles[i].changeColor('#F71313');
		    }
		    if(collisionDetection.detectCollision(blue, obstacles[i])) {
		    	playerData.life--;
		    	state = STATE.HIT;
		    	obstacles[i].changeColor('#6229FF');
		    }
	  	}
	  	break;

	  	case STATE.HIT:
  		changeState();
  		for(let i = 0; i < obstacles.length; i++) {
  			red.revolveAround(ringX, ringY, .15);
  			blue.revolveAround(ringX, ringY, .15);
  			if(playerData.life == 0) state = STATE.OVER;
		   if(obstacles[i].reversePos()) state = STATE.PLAY;
	  	}
  		break;

	    case STATE.START:
	    if(level[levelCounter])loadLevel();
    	changeState();
    	backgroundAudio.play();
    	state = STATE.PLAY;
    	break;

	    case STATE.OVER:
	    if(gameLoop)window.cancelAnimationFrame(gameLoop);
	    screenOverlay.appendChild(gameTitle);
	    continueButton.innerHTML = MESSAGES.BTNRESTART;
	    canvasContainer.appendChild(continueButton);
			break;


    	case STATE.CLEAR:
    	currentLevel = level[++levelCounter];
    	screenMsg.innerHTML = MESSAGES.CLEAR;
    	canvasContainer.appendChild(screenOverlay);
    	if(currentLevel == undefined) {
    		screenMsg.innerHTML = MESSAGES.NOMORELVL;
    		screenOverlay.appendChild(gameTitle);
		    continueButton.innerHTML = MESSAGES.BTNRESTART;
		    canvasContainer.appendChild(continueButton);
    		break;
    	}
    	if(currentLevel.AUDIO) {
    		screenMsg.innerHTML = MESSAGES.CHAPCLEAR + '<p>' + MESSAGES.CONTINUE + '</p>';
    		backgroundAudio.src = currentLevel.AUDIO;
    		checkAudioInterval = setInterval(function(){
					if(checkAudio()){
						clearInterval(checkAudioInterval);
						screenMsg.innerHTML = MESSAGES.CONTINUE;
						continueButton.innerHTML = MESSAGES.BTNCONTINUE;
						canvasContainer.appendChild(continueButton);
						state = STATE.START;
					}
				}, 1000);
    	}
    	else {
    				canvasContainer.appendChild(screenOverlay);
    				continueButton.innerHTML = MESSAGES.BTNCONTINUE;
    				canvasContainer.appendChild(continueButton);}
    	window.cancelAnimationFrame(gameLoop);
    	state = STATE.START;
    	break;
		}
	}

  let onKeyPress = function(event) {

    if (!keyPressInterval) {
        switch(event.keyCode){
            case KEY.LEFT:
              keyPressInterval = setInterval(function() {
              if(angle < 5)
              angle += increment;
              red.revolveAround(ringX, ringY, angle);
              blue.revolveAround(ringX, ringY, angle);
              }, angleInterval);
            break;

            case KEY.RIGHT:
              keyPressInterval = setInterval(function() {
              if(angle > -5)
              angle -= increment;
              red.revolveAround(ringX, ringY, angle);
              blue.revolveAround(ringX, ringY, angle);
              }, angleInterval);
            break;
        }
    }
  }

  let onKeyUp = function(event) {
    if(angle > 0) angle -= increment * 5;
    else angle += increment * 5;
    clearInterval(keyPressInterval);
    keyPressInterval = undefined;
  }

  let onKeyDown = function(event) {
    switch(event.keyCode){
      case KEY.ESC:
      if(state == STATE.PLAY || state == STATE.HIT){
	      if(!paused){
	        if(gameLoop)window.cancelAnimationFrame(gameLoop);
	        backgroundAudio.pause();
	        document.removeEventListener('keypress', onKeyPress);
	        document.removeEventListener('keyup', onKeyUp);
	        canvas.removeEventListener('touchstart', onTouchStart);
	        canvas.removeEventListener('touchend', onTouchEnd);
	        screenMsg.innerHTML = MESSAGES.PAUSE;
	        continueButton.innerHTML = 'RESUME';
	        canvasContainer.appendChild(screenOverlay);
	        canvasContainer.appendChild(continueButton);
	        paused = !paused;
	      }
	      else {
	      	backgroundAudio.play();
	      	if(document.getElementById('overlay'))canvasContainer.removeChild(screenOverlay);
  	 			if(document.getElementById('btn-continue'))canvasContainer.removeChild(continueButton);
	        gameLoop = window.requestAnimationFrame(that.game);
	        document.addEventListener('keypress', onKeyPress);
	        document.addEventListener('keyup', onKeyUp);
	        canvas.addEventListener('touchstart', onTouchStart);
	        canvas.addEventListener('touchend', onTouchEnd);
	        paused = !paused;
	      }
    	}
      break;

      case KEY.SPACE:
      if(!paused && state == STATE.START){
	      if(document.getElementById('game-title'))screenOverlay.removeChild(gameTitle);
	      if(document.getElementById('game-subtitle'))canvasContainer.removeChild(gameSubtitle);
	      if(document.getElementById('overlay'))canvasContainer.removeChild(screenOverlay);
	      if(document.getElementById('btn-continue'))canvasContainer.removeChild(continueButton);
	    }
      if(state == STATE.START)that.game();
      if(state == STATE.OVER){
      	if(document.getElementById('overlay'))canvasContainer.removeChild(screenOverlay);
	      if(document.getElementById('btn-continue'))canvasContainer.removeChild(continueButton);
      	reset();
      	state = STATE.START;
      	changeState();
      }
      break;
    }
  }

  let onTouchStart = function(event) {
  	event.preventDefault();
  	let x = event.touches[0].clientX - rect.left;
	  	if(x<200) {
	  		 event.keyCode = 37;
	  		 onKeyPress(event);
  	  	}
  	  	else {
  	  		event.keyCode = 39;
  	  		onKeyPress(event);
	  		}
  }

  let onTouchEnd = function(event) {
  	event.preventDefault();
  	onKeyUp(event);
  }

  let onContinue = function(event) {
		if(document.getElementById('game-title'))screenOverlay.removeChild(gameTitle);
		if(document.getElementById('overlay'))canvasContainer.removeChild(screenOverlay);
		if(document.getElementById('game-subtitle'))canvasContainer.removeChild(gameSubtitle);
		if(document.getElementById('btn-continue'))canvasContainer.removeChild(continueButton);

      if(state == STATE.START)that.game();
      if(state == STATE.OVER || state == STATE.CLEAR){
      	if(document.getElementById('btn-continue'))canvasContainer.removeChild(continueButton);
      	screenMsg.innerHTML = MESSAGES.LOADING;
      	reset();
      	state = STATE.START;
      }

      if(paused){
      		backgroundAudio.play();
	        gameLoop = window.requestAnimationFrame(that.game);
	        document.addEventListener('keypress', onKeyPress);
	        document.addEventListener('keyup', onKeyUp);
	        paused = !paused;
	      }
  }

  let onPause = function(event) {
  	event.keyCode = KEY.ESC;
  	onKeyDown(event);
  }
}
