var background = new Image();
background.src = "big_pic.jpg";

var mainCharacterImage = new Image();
mainCharacterImage.src = "mario.jpg";

var mainChar = new gameObject(400, 400, mainCharacterImage);

var startX = 50;
var startY = 50;

var c;
var ctx;

background.onload=function(){
	c = document.getElementById("viewport");
	ctx = c.getContext("2d");
    width = window.innerWidth;
    height = window.innerHeight;
    document.getElementsByTagName("canvas")[0].setAttribute("width", width);
    document.getElementsByTagName("canvas")[0].setAttribute("height", height);
    ctx.drawImage(background, startX, startY, width, height, 0, 0, width, height);
    ctx.drawImage(mainCharacterImage, mainChar.x, mainChar.y);
}

window.onresize=function(){
    ctx.clearRect(0, 0, width, height);
    width = window.innerWidth;
    height = window.innerHeight;
    document.getElementsByTagName("canvas")[0].setAttribute("width", width);
    document.getElementsByTagName("canvas")[0].setAttribute("height", height);
    redraw();
}

var moveTimer;
function move(event){
	var xPos = event.clientX;
	var yPos = event.clientY;

	var d = document.getElementById("debug");
	d.innerHTML = xPos + "  " + yPos;

	clearInterval(moveTimer);
	moveTimer = 0;
	if (!moveTimer){
		moveTimer = setInterval(
			function(){
				moveMainChar(xPos, yPos)
			}, 5);
	}
}

var dirX;
var dirY;
function moveMainChar(x, y){
	var yPerX = getRelativeValue(x, y);
	
	var d = document.getElementById("debug");
	d.innerHTML = yPerX;

	if (mainChar.x < x){
		dirX = 1;
	} else if (mainChar.x > x){
		dirX = -1;
	} else {
		dirX = 0;
	}

	if (mainChar.y < y){
		dirY = yPerX * 1;
	} else if (mainChar.y > y){
		dirY = yPerX * -1;
	} else {
		dirY = 0;
	}

	if (dirX > 1){
		dirX = 1;
	}

	if (dirX < -1){
		dirX = -1;
	}

	if (dirY > 1){
		dirY = 1;
	}

	if (dirY < -1){
		dirY = -1;
	}

	mainChar.x += dirX;
	mainChar.y += dirY;

	redraw();
}

function getRelativeValue(x, y){

	if (mainChar.x > x && mainChar.y > y){
		return ((mainChar.y - y) / (mainChar.x - x));
	} else if (mainChar.x > x && mainChar.y < y){
		return ((y - mainChar.y) / (mainChar.x - x));
	} else if (mainChar.x < x && mainChar.y > y){
		return ((mainChar.y - y) / (x - mainChar.x));
	} else if (mainChar.x < x && mainChar.y < y){
		return ((y - mainChar.y) / (x - mainChar.x));
	} else {
		return 1;
	}
}

function redraw(){
	ctx.clearRect(0, 0, width, height);

	var bgOffsetX = mainChar.x - 400;
	var bgOffsetY = mainChar.y - 400;

	bgOffsetX < 0 ? bgOffsetX = 0 : bgOffsetX = bgOffsetX;
	bgOffsetY < 0 ? bgOffsetY = 0 : bgOffsetY = bgOffsetY;

	ctx.drawImage(background, bgOffsetX, bgOffsetY, width, height, 0, 0, width, height);

	ctx.drawImage(mainChar.image,
                  mainChar.x,
                  mainChar.y);
}

function checkCollision(img1, img2){

    if ((img1.x + img1.width) > img2.x 
      && img1.x < (img2.x + img2.width)
      && (img1.y + img1.width) > img2.y
      && img1.y < (img2.y + img2.height)){
      return true;
    } else {
      return false;
    }
}
