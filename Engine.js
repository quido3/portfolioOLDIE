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
	var xPos = event.pageX;
	var yPos = event.pageY;

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
var amount = 0.00001;
function moveMainChar(x, y){

	mainChar.centerX = mainChar.centerX + (x - mainChar.centerX) * amount;
	mainChar.centerY = mainChar.centerY + (y - mainChar.centerY) * amount;
	amount += 0.00001;
	if (amount > 0.5){
		amount = 0.00001;
	}

	var d = document.getElementById("debug");
	d.innerHTML = "MainChar X: " + mainChar.centerX + " MainChar Y: " + mainChar.centerY;
	redraw();
}

function redraw(){
	ctx.clearRect(0, 0, width, height);

	var bgOffsetX = mainChar.centerX - 400;
	var bgOffsetY = mainChar.centerY - 400;

	bgOffsetX < 0 ? bgOffsetX = 0 : bgOffsetX = bgOffsetX;
	bgOffsetY < 0 ? bgOffsetY = 0 : bgOffsetY = bgOffsetY;

	ctx.drawImage(background, bgOffsetX, bgOffsetY, width, height, 0, 0, width, height);

	ctx.drawImage(mainChar.image,
                  mainChar.centerX,
                  mainChar.centerY);
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
