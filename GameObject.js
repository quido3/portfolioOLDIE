function gameObject(name, x, y, img, hitboxImg, hX, hY){
	this.name = name;
	this.image = img;
	this.x = x;
	this.y = y;
	this.centerX = x + (img.width / 2);
	this.centerY = y + (img.height / 2);
	this.width = img.width;
	this.height = img.height;

	if (hitboxImg){
		this.hitbox = hitboxImg;
		this.hitboxX = x + hX;							// Kuvan vasen reuna
		this.hitboxY = y + hY;							// Kuvan alareuna
		this.bBoxX = x + hX - (hitboxImg.width / 2);    // Hitboxin vasen reuna
		this.bBoxY = y + hY;							// Hitboxin alareuna
		this.bBoxWidth = hitboxImg.width*2;				// Hitboxin leveys
		this.bBoxHeight = hitboxImg.height*1.5;			// Hitboxin korkeus
	}

	return this;
}