/*
initialize
draw
update
check and change
repeat
*/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let i;
let dx;
let dy;
let time = 100;
let src1 = "images/green150.png";

let toogle = {
	tower: true,
	car: false,
}

const color = ["#ffffff", "#ff4000", "#ff6633", "#ff8c66", "#ffb399", "#ffd9cc"];
let towers = [];

canvas.width=innerWidth;
canvas.height=innerHeight;

class Plane {
	constructor(currentPath, currentAngle, speedx, speedy, signx, signy) {
		this.currentPath = currentPath,
		this.currentAngle = currentAngle;

		this.x = Math.random()*innerWidth;
		this.y = Math.random()*innerHeight;

		this.width = Math.floor(innerWidth/15);
		this.height = Math.floor(innerHeight/15);

		this.speed = {
			x: speedx,
			y: speedy,
		}
		this.sign = {
			x: signx,
			y: signy,
		}

		this.image = new Image();
		this.image.src = "images/" + 2 + ".png";

		this.path = [];
	}
	drawPath() {
		ctx.beginPath();
		ctx.moveTo(this.path[0].x, this.path[0].y);
		for(i = 1; i < this.path.length; i++) {
			ctx.lineTo(this.path[i].x, this.path[i].y);
		}
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		ctx.stroke();
	}
	drawDotAtCurrentXY() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
		ctx.fillStyle = "black";
		ctx.fill();
	}
	draw() {
		ctx.drawImage(this.image, this.x - this.width, this.y - this.height);
		//ctx.drawImage(this.img,this.x,this.y);
	}
	moveForwardOnPath() {
		if(this.path[this.currentPath]) {
			this.x += this.speed.x;
			this.y += this.speed.y;
		}
	}
	findSign() {
		this.sign.x = this.speed.x>0?1:-1;
		this.sign.y = this.speed.y>0?1:-1;
	}
	rotateImage() {
		ctx.save();
		ctx.translate(this.x + this.width, this.y + this.height);
		ctx.rotate(this.currentAngle);
		ctx.beginPath();
		ctx.drawImage(this.img, -this.width, -this.height);
		//ctx.drawImage(this.img,0,0);
		//ctx.translate(-(this.x + this.image.w),-(this.y + this.image.h));
		ctx.restore();
	}
	checkIfJunction() {
		if(this.path[this.currentPath]) {
			if(this.speed.x == 0) {
				this.checkIfNextPathExist();
			}
			else if(this.speed.x > 0) {
				if(this.x >= this.path[this.currentPath].x) {
					this.checkIfNextPathExist();
				}
			}
			else if(this.speed.x < 0) {
				if(this.x <= this.path[this.currentPath].x) {
					this.checkIfNextPathExist();
				}
			}
			/*
			else if(car.sy > 0){
				if(car.y + car.h >= path[car.nextPath - 1].y){
					car.sx = Math.round((path[car.nextPath].x - car.x) / time);
					car.sy = Math.round((path[car.nextPath].y - car.y) / time);
					car.nextPath++;
				}
			}
			else if(car.sy < 0){
				if(car.y + car.h <= path[car.nextPath - 1].y){
					car.sx = Math.round((path[car.nextPath].x - car.x) / time);
					car.sy = Math.round((path[car.nextPath].y - car.y) / time);
					car.nextPath++;
				}
			}
			*/
		}
	}
	changingCurrentPath() {
		//
	}
	changingAngle() {
		dx = this.path[this.currentPath].x - this.x;
		dy = this.path[this.currentPath].y - this.y;
		this.currentAngle -= Math.atan2(this.sign.y*dy, this.sign.x*dx);
	}
	changingSpeed() {
		//
	}
	checkIfNextPathExist() {
		if(this.path[this.currentPath + 1]) {
			this.currentPath++;
			this.speed.x = (this.path[this.currentPath].x - this.x) / time;
			this.speed.y = (this.path[this.currentPath].y - this.y) / time;
			//this.findSign();
			//this.changingAngle();
			//this.rotateImage();
		}
		else {
			//this.currentPath++;
			this.speed.x = 0;
			this.speed.y = 0;
		}
	}
}

let planes = [];
planes.push(new Plane(1, 2, 1, 1, 0, -1));

let runway = [];
runway.push({x: 500, y: 100});
runway.push({x: 500, y: 500});
runway.push({x: 800, y: 500});
runway.push({x: 500, y: 200});


//car.path.push({x:500,y:75});
//path.push({x:400,y:400});

window.addEventListener("resize",function(){
	canvas.width=innerWidth;
	canvas.height=innerHeight;
});



/*
document.getElementById("b1").onclick = addTower;
document.getElementById("b2").onclick = addPath;

document.getElementById("b1").ontouchend = addTower;
document.getElementById("b2").ontouchend = addPath;

canvas.addEventListener("click",addTowerOrPath);
canvas.addEventListener("touchend",addTowerOrPath);
*/

function addTower(){
	toogle.tower=true;
	toogle.car=false;
}

function addPath(){
	toogle.tower=false;
	toogle.car=true;
}

function addTowerOrPath(event){
	//console.log(car);
	if(toogle.car){
		car.path.push({x:event.clientX,y:event.clientY});
	}
	else{
		let radius=Number(document.getElementById("t1").value);
		towers.push({x:event.clientX,y:event.clientY,radius:radius});
	}
}

function randomInt(min,max){
	return Math.round(Math.random()*(max-min)+min);
}

function clearCanvas() {
	ctx.fillStyle = "#ffff80"; //white color with last parameter as opacity between 0 and 1
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRunway() {
	for(let i = 0 ; i <= runway.length ; i + 2) {
		ctx.beginPath();
		ctx.moveTo(runway[i].x, runway[i].y);
		ctx.lineTo(runway[i + 1].x, runway[i + 1].y);
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#000000";
		ctx.stroke();
	}
}

function animate() {
	clearCanvas();
	drawRunway();

	planes.forEach(p => {
		p.draw();
		p.drawPath();
		//p.drawDotAtCurrentXY();
		//p.rotateImage();
		p.moveForwardOnPath();
		p.checkIfJunction();
	});

	requestAnimationFrame(animate);
}
animate();
