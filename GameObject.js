function gameObject(x, y, img) {
    this.image = img;
    this.x = x;
    this.y = y;
    this.centerX = x + (img.width / 2);
    this.centerY = y + (img.height / 2);
    this.width = img.width;
    this.height = img.height;
    return this;
}