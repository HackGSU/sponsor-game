// Helper functions

function AABBIntersect(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};

//Projectile
function Projectile(x, y, vely, w, h, color) {
  this.x = x;
  this.y = y;
  this.vely = vely;
  this.width = w;
  this.height = h;
  this.color = color;
};

Projectile.prototype.update = function() {
  this.y += this.vely;
};

// Screen
function Screen(width, height) {
  this.canvas = document.createElement("canvas");
  this.canvas.id = 'gameScreen';
  this.canvas.width = this.width = width;
  this.canvas.height = this.height = height;
  this.ctx = this.canvas.getContext("2d");

  document.body.appendChild(this.canvas);
};

Screen.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

Screen.prototype.drawSprite = function(sp, x, y) {
  this.ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
};

//draw Projectile
Screen.prototype.drawProjectile = function(projectile) {
  this.ctx.fillStyle = projectile.color;
  // this.ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
  this.ctx.beginPath();
  this.ctx.moveTo(projectile.x, projectile.y);
  this.ctx.bezierCurveTo(projectile.x + 7.5, projectile.y + 3.7, projectile.x + 7.0, projectile.y + 2.5,projectile.x + 5.0, projectile.y + 2.5);
  this.ctx.bezierCurveTo(projectile.x + 2.0, projectile.y + 2.5, projectile.x + 2.0, projectile.y + 6.25,projectile.x + 2.0, projectile.y + 6.25);
  this.ctx.bezierCurveTo(projectile.x + 2.0, projectile.y + 8.0, projectile.x + 4.0, projectile.y + 10.2,projectile.x + 7.5, projectile.y + 12.0);
  this.ctx.bezierCurveTo(projectile.x + 11.0, projectile.y + 10.2, projectile.x + 13.0, projectile.y + 8.0,projectile.x + 13.0, projectile.y + 6.25);
  this.ctx.bezierCurveTo(projectile.x + 13.0, projectile.y + 6.25, projectile.x + 13.0, projectile.y + 2.5,projectile.x + 10.0, projectile.y + 2.5);
  this.ctx.bezierCurveTo(projectile.x + 8.5, projectile.y + 2.5, projectile.x + 7.5, projectile.y + 3.7,projectile.x + 7.5, projectile.y + 4.0);
  this.ctx.fill();
};
// Sprite
function Sprite(img, x, y, w, h) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};
// Input Handler
function InputHandler() {
  this.down = {};
  this.pressed = {};

  var _this = this;
  document.addEventListener("keydown", function(evt) {
    _this.down[evt.keyCode] = true;
  });
  document.addEventListener("keyup", function(evt) {
    delete _this.down[evt.keyCode];
    delete _this.pressed[evt.keyCode];
  });
};

InputHandler.prototype.isDown = function(code) {
  return this.down[code];
};

InputHandler.prototype.isPressed = function(code) {
  if (this.pressed[code]){
    return false;
  } else if (this.down[code]) {
    return this.pressed[code] = true;
  }
  return false;

};
