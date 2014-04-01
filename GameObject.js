function gameObject(x, y, img){
	this.image = img;
	this.x = x;
	this.y = y;
	this.width = img.width;
	this.height = img.height;
	return this;
}