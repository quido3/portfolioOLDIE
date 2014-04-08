var background = new Image();
background.src = "big_pic.jpg";

var mainCharacterImage = new Image();
mainCharacterImage.src = "mario.png";

var houseImage = new Image();
houseImage.src = "house.png";

var mainChar = new gameObject(400, 400, mainCharacterImage);
var house = new gameObject(500, 500, houseImage);
var house2 = new gameObject(800, 500, houseImage);
var house3 = new gameObject(1200, 500, houseImage);

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
var previousX;
var previousY;
function moveMainChar(x, y){
	previousX = mainChar.x;
	previousY = mainChar.y;
	mainChar.x = mainChar.x + (x - mainChar.x) * amount;
	mainChar.y = mainChar.y + (y - mainChar.y) * amount;
	amount += 0.00001;
	if (amount > 0.01){
		amount = 0.01;
	}

	//var d = document.getElementById("debug");
	//d.innerHTML = "MainChar X: " + mainChar.centerX + " MainChar Y: " + mainChar.centerY;
	redraw();
}

var bgOffsetX;
var bgOffsetY;
function redraw(){
	ctx.clearRect(0, 0, width, height);

	bgOffsetX = mainChar.x - 400;
	bgOffsetY = mainChar.y - 400;

	bgOffsetX < 0 ? bgOffsetX = 0 : bgOffsetX = bgOffsetX;
	bgOffsetY < 0 ? bgOffsetY = 0 : bgOffsetY = bgOffsetY;

	ctx.drawImage(background, bgOffsetX, bgOffsetY, width, height, 0, 0, width, height);

	ctx.drawImage(house.image,
                  house.x - bgOffsetX,
                  house.y - bgOffsetY);

	ctx.drawImage(house2.image,
                  house2.x - bgOffsetX,
                  house2.y - bgOffsetY);

	ctx.drawImage(house3.image,
                  house3.x - bgOffsetX,
                  house3.y - bgOffsetY);

	ctx.drawImage(mainChar.image,
                  mainChar.x,
                  mainChar.y);

	if (checkCollision(mainChar, house)
		|| checkCollision(mainChar, house2)
		|| checkCollision(mainChar, house3)){
		mainChar.x = previousX;
		mainChar.y = previousY;
		//var d = document.getElementById("debug");
		//d.innerHTML = "Char X: " + mainChar.x + " Char y: " + mainChar.y + " Hero width: " + mainChar.image.width;
	}
}

function checkCollision(hero, object){

    if ((hero.x + hero.image.width) > object.x - bgOffsetX
         && hero.x < ((object.x - bgOffsetX) + object.image.width)
         && (hero.y + hero.image.width) > object.y - bgOffsetY
         && hero.y < ((object.y - bgOffsetY) + object.image.height)){
      return true;
    } else {
      return false;
    }
}