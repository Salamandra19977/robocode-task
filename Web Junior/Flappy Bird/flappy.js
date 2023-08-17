const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let bird = new Image();
let back = new Image();
let pipeBottom = new Image();
let pipeUp = new Image();  
let road = new Image();
let flyA = new Audio();
let scoreA = new Audio();

let birdX = 10;
let birdY = 10;

let gtavity = 0.30;

let velY = 0;   
let pipe = [];
let score = 0;
let bestScore = 0;
const pipesDistance = 90;
const pipeSpeed = 2;

canvas.width  = 256;
canvas.height = 512;

pipe[0] = {
	x: canvas.width,
	y: 0
}

bird.src = "img/bird.png";
back.src = "img/back.png";
pipeBottom.src = "img/pipeBottom.png";
pipeUp.src = "img/pipeUp.png";
road.src = "img/road.png";
flyA.src = "audio/fly.mp3";
scoreA.src = "audio/score.mp3";



function draw()  {
	velY += gtavity;
	birdY += velY;

	if(birdY > canvas.height - road.height - bird.height) {
		reload();
	}

	ctx.drawImage(back, 0, 0);
	ctx.drawImage(bird, birdX, birdY);
	ctx.drawImage(road, 0, 400);

	for(let i = 0; i < pipe.length; i++) {
		let randomY = Math.random() * (10 - (-150)) + (-150);

		const birdUpPoint = {
			x: birdX + bird.width / 2,
			y: birdY
		};
		const birdMiddlePoint = {
			x: birdX + bird.width / 2,
			y: birdY + bird.height / 2
		};
		const birdBottomPoint = {
			x: birdX + bird.width / 2,
			y: birdY + bird.height
		};

		const pipeUpLine = {
			x1: pipe[i].x,
			x2: pipe[i].x + pipeUp.width,
			y:  pipe[i].y + pipeUp.height
		};
		const pipeBottomLine = {
			x1: pipe[i].x,
			x2: pipe[i].x + pipeUp.width,
			y:  pipe[i].y + pipeUp.height + pipesDistance
		};
		const pipeUpVerticalLine = {
			y1: pipe[i].y,
			y2: pipe[i].y + pipeUp.height,
			x:  pipe[i].x
		};
		const pipeBottomVerticalLine = {
			y1: pipe[i].y + pipeUp.height + pipesDistance,
			y2: pipe[i].y + pipeUp.height + pipesDistance + pipeBottom.height,
			x: pipe[i].x
		};
		if((birdUpPoint.y <= pipeUpLine.y+2 && birdUpPoint.y >= pipeUpLine.y-1)
			&& (birdUpPoint.x >= pipeUpLine.x1 && birdUpPoint.x < pipeUpLine.x2)) {
			reload();
		}
		if((birdBottomPoint.y <= pipeBottomLine.y+2 && birdBottomPoint.y >= pipeBottomLine.y-1)
			&& (birdBottomPoint.x >= pipeBottomLine.x1 && birdBottomPoint.x < pipeBottomLine.x2)) {
			reload();
		}
		if((birdMiddlePoint.x <= pipeUpVerticalLine.x && birdMiddlePoint.x >= pipeUpVerticalLine.x-1)
			&& birdMiddlePoint.y >= pipeUpVerticalLine.y1 && birdMiddlePoint.y <= pipeUpVerticalLine.y2) {
			reload();
		}
		if((birdMiddlePoint.x <= pipeBottomVerticalLine.x && birdMiddlePoint.x >= pipeBottomVerticalLine.x-1)
			&& birdMiddlePoint.y >= pipeBottomVerticalLine.y1 && birdMiddlePoint.y <= pipeBottomVerticalLine.y2) {
			reload();
		}

		if(birdMiddlePoint.x >= pipeUpLine.x2-1 && birdMiddlePoint.x <= pipeUpLine.x2+2) {
			score += 0.5;
		}

		if(pipe[i].x === 80)
			pipe.push({
				x: canvas.width,
				y: randomY
			});
		if(pipe[i].x === -60)
			pipe.shift();

		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y+pipeUp.height+pipesDistance)

		pipe[i].x -= pipeSpeed;
	}

	document.getElementById("score").innerHTML = `Score: ${score}`;
	document.getElementById("best-score").innerHTML = `Best score: ${bestScore}`;
}

function moveUp(e) {
	if(e.keyCode === 32) {
		velY = -3 ;
		birdY += velY;
		flyA.play();
	}
}

function reload() {
	birdX = 10;
	birdY = 10;

	velY = 0;

	pipe = [];
	pipe[0] = {
		x: canvas.width,
		y: 0
	};

	if(score > bestScore) bestScore = score;
	score = 0;
}

document.addEventListener("keydown", moveUp);

let isStoped = false;

function stopGame() {
    isStoped = !isStoped;
    if (isStoped) {
        clearInterval(interval);
        document.querySelector('button').innerHTML = 'UNPAUSE';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }

    document.querySelector('button').innerHTML = 'PAUSE'
    document.querySelector('button').blur();
    interval = setInterval(draw, 20);
}

let interval = setInterval(draw, 20);
