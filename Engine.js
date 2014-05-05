var background = new Image();
background.src = "grass.png";

var mainCharacterImage = new Image();
mainCharacterImage.src = "mario.png";

var mill = new Image();
mill.src = "mylly.png";
var millDoor = new Image();
millDoor.src = "mylly_ovi.png";

var talo = new Image();
talo.src = "talo.png";
var taloOvi = new Image();
taloOvi.src = "talo_ovi.png";

var mainChar = new gameObject("hero", 400, 400, mainCharacterImage);
var objectContainer = new Array();

var startX = 50;
var startY = 50;

var c;
var ctx;

var pause = false;

background.onload=function(){

	objectContainer[0] = new gameObject("mill"
										, 500
									    , 0
									    , mill
									    , millDoor
									    , (mill.width / 2) - (millDoor.width / 2)
									    , mill.height - millDoor.height);

	objectContainer[1] = new gameObject("talo"
										, 500
										, 750
										, talo
										, taloOvi
										, (talo.width / 2) - (taloOvi.width / 2)
										, talo.height - taloOvi.height);

	c = document.getElementById("viewport");
	ctx = c.getContext("2d");
    width = window.innerWidth;
    height = window.innerHeight;
    document.getElementsByTagName("canvas")[0].setAttribute("width", width);
    document.getElementsByTagName("canvas")[0].setAttribute("height", height);
    ctx.drawImage(background, startX, startY, width, height, 0, 0, width, height);
    ctx.drawImage(mainCharacterImage, mainChar.x, mainChar.y);
    redraw();
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
var amount = 0.01;
var previousX;
var previousY;
var intervalX;
var intervalY;
function moveMainChar(x, y){
	if (!pause){
		previousX = mainChar.x;
		previousY = mainChar.y;

		mainChar.x += (x - mainChar.x) * amount;
		mainChar.y += (y - mainChar.y) * amount;

		redraw(x, y);
	}
}

var bgOffsetX = 0;
var bgOffsetY = 0;
var scrollThreshold = 200;
function redraw(x, y){
	ctx.clearRect(0, 0, width, height);

	scrollBackground();

	bgOffsetX < 0 ? bgOffsetX = 0 : bgOffsetX = bgOffsetX;
	bgOffsetY < 0 ? bgOffsetY = 0 : bgOffsetY = bgOffsetY;

	ctx.drawImage(background, bgOffsetX, bgOffsetY, width, height, 0, 0, width, height);

	for (var i = 0; i < objectContainer.length; i++){
		var temp = objectContainer[i];
		drawObjectImage(temp);
		drawObjectHitbox(temp);

		if (checkHitboxCollision(mainChar, temp)){
			// DO SOMETHING	
		}

		ctx.beginPath();
		ctx.moveTo(temp.bBoxX - bgOffsetX,
				   temp.bBoxY - bgOffsetY);
		ctx.lineTo(temp.bBoxX + temp.bBoxWidth - bgOffsetX,
				   temp.bBoxY - bgOffsetY);
		ctx.lineTo(temp.bBoxX + temp.bBoxWidth - bgOffsetX,
				   temp.bBoxY + temp.bBoxHeight - bgOffsetY);
		ctx.lineTo(temp.bBoxX - bgOffsetX,
				   temp.bBoxY + temp.bBoxHeight - bgOffsetY);
		ctx.lineTo(temp.bBoxX - bgOffsetX,
				   temp.bBoxY - bgOffsetY);
		ctx.stroke();
	}

	ctx.drawImage(mainChar.image,
                  mainChar.x,
                  mainChar.y);

	for (var i = 0; i < objectContainer.length; i++){
		if (checkCollision(mainChar, objectContainer[i])){
			mainChar.x = previousX;
			mainChar.y = previousY;
		}
	}
}

function scrollBackground(){
	if ((mainChar.x + mainChar.width) > (width - scrollThreshold)){
		bgOffsetX++;
	} else if (mainChar.x < scrollThreshold){
		bgOffsetX--;
	}

	if ((mainChar.y + mainChar.height) > (height - scrollThreshold)){
		bgOffsetY++;
	} else if (mainChar.y < scrollThreshold) {
		bgOffsetY--;
	}
}

function drawObjectImage(object){
	ctx.drawImage(object.image, 
				  object.x - bgOffsetX,
				  object.y - bgOffsetY);
}

function drawObjectHitbox(object){
	ctx.drawImage(object.hitbox,
				  object.hitboxX - bgOffsetX,
				  object.hitboxY - bgOffsetY);
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

function checkHitboxCollision(hero, object){

	if ((hero.x + hero.image.width) > (object.bBoxX - bgOffsetX)
         && hero.x < ((object.bBoxX - bgOffsetX) + object.bBoxWidth)
         && (hero.y + hero.image.width) > object.bBoxY - bgOffsetY
         && hero.y < ((object.bBoxY - bgOffsetY) + object.bBoxHeight)){
      return true;
    } else {
      return false;
    }
}

function checkClickOnObjects(event) {
    for (var i = 0; i < objectContainer.length; i++) {
        var object = objectContainer[i];

        if (checkHitboxCollision(mainChar, object)){
	        if ((event.pageX) > object.x - bgOffsetX
		         && event.pageX < ((object.x - bgOffsetX) + object.image.width)
		         && (event.pageY) > object.y - bgOffsetY
		         && event.pageY < ((object.y - bgOffsetY) + object.image.height)) {
	        	if (object.name == "mill"){
	        		document.getElementById('firstContent').style.visibility = 'visible';
	        	} else if (object.name == "talo"){
	        		document.getElementById('skillsContent').style.visibility = 'visible';
	        	}
	            
	            pause = true;
	        }
	    }
    }
}

function hideContent(event) {
    var source = event.target || event.srcElement;
    source.parentNode.parentNode.style.visibility = 'hidden';
    pause = false;
}