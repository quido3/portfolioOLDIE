var background = new Image();
background.src = "images/grass.png";

var mainCharacterImage = new Image();
mainCharacterImage.src = "images/hero.png";

var mill = new Image();
mill.src = "images/mylly.png";

var millDoor = new Image();
millDoor.src = "images/mylly_ovi.png";

var talo = new Image();
talo.src = "images/talo.png";
var taloOvi = new Image();
taloOvi.src = "images/talo_ovi.png";

var castle = new Image();
castle.src = "images/castle.png";
var castleDoor = new Image();
castleDoor.src = "images/castledoor2.png";

var board = new Image();
board.src = "images/board.png";

var princess = new Image();
princess.src = "images/princess.png";

var mainChar = new gameObject("hero", 400, 400, mainCharacterImage);
var objectContainer = new Array();

var startX = 100;
var startY = 200;

var c;
var ctx;

var pause = false;

var bgOffsetX = 0;
var bgOffsetY = 0;
var scrollThreshold;
background.onload=function(){

	objectContainer[0] = new gameObject("mill"
										, 1500
									    , 1500
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

	objectContainer[2] = new gameObject("castle"
										, 1000
										, 0
										, castle
										, castleDoor
										, (castle.width/2) - (castleDoor.width / 2)
										, castle.height - castleDoor.height);

	objectContainer[3] = new gameObject("board"
										, 200
										, 100
										, board
										, board
										, 0
										, 0);

	objectContainer[4] = new gameObject("princess"
										, 1250
										, 750
										, princess
										, null
										, 0
										, 0);


	c = document.getElementById("viewport");
	ctx = c.getContext("2d");
    width = window.innerWidth;
    height = window.innerHeight;
    scrollThreshold = width * 0.15;
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


function redraw(x, y){
	ctx.clearRect(0, 0, width, height);

	scrollBackground();

	bgOffsetX < 0 ? bgOffsetX = 0 : bgOffsetX = bgOffsetX;
	bgOffsetY < 0 ? bgOffsetY = 0 : bgOffsetY = bgOffsetY;
	
	var endX = background.width - width;
	var endY = background.height - height;
	bgOffsetX > endX ? bgOffsetX = endX : bgOffsetX = bgOffsetX;
	bgOffsetY > endY ? bgOffsetY = endY : bgOffsetY = bgOffsetY;
	
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
	var collided = false;
	
	for (var i = 0; i < objectContainer.length; i++){
		if (checkCollision(mainChar, objectContainer[i])){
			collided = true;
		}
	}
	
	
	if ((mainChar.x + mainChar.width) > (width - scrollThreshold)){
		if (!collided){
			bgOffsetX++;
		}else{
			bgOffsetX--;
		}
	} else if (mainChar.x < scrollThreshold){
		if (!collided){
			bgOffsetX--;
		}else{
			bgOffsetX++;
		}
	}

	if ((mainChar.y + mainChar.height) > (height - scrollThreshold)){
		if (!collided){
			bgOffsetY++;
		}else{
			bgOffsetY--;
		}
	} else if (mainChar.y < scrollThreshold) {
		if (!collided){
			bgOffsetY--;
		}else{
			bgOffsetY++;
		}
	}
}

function drawObjectImage(object){
	ctx.drawImage(object.image, 
				  object.x - bgOffsetX,
				  object.y - bgOffsetY);
}

function drawObjectHitbox(object){
	if (object.hitbox){
		ctx.drawImage(object.hitbox,
					  object.hitboxX - bgOffsetX,
					  object.hitboxY - bgOffsetY);
	}
}

function checkCollision(hero, object){

    if ((hero.x + hero.image.width) > object.x - bgOffsetX
         && hero.x < ((object.x - bgOffsetX) + object.image.width)
         && (hero.y + hero.image.height) > object.y - bgOffsetY
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
	        		document.getElementById('cvContent').style.visibility = 'visible';
	        	} else if (object.name == "talo"){
	        		document.getElementById('skillsContent').style.visibility = 'visible';
	        	} else if (object.name == "board"){
	        		document.getElementById('contactContent').style.visibility = 'visible';
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

function hideContact(event) {
    var source = event.target || event.srcElement;
    source.parentNode.parentNode.parentNode.style.visibility = 'hidden';
    pause = false;
}