
var hero;

function setup() {
  createCanvas(1005, 505);
  hero = new dot();
}

function draw() {
  background(200);
  hero.update();
  hero.show();

}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    hero.dirX = 5;
    hero.dirY = 0;
  }
  if(keyCode === LEFT_ARROW){
    hero.dirX = -5;
    hero.dirY = 0;
  }
  if(keyCode === UP_ARROW){
    hero.dirX = 0;
    hero.dirY = -5;
  }
  if(keyCode === DOWN_ARROW){
    hero.dirX = 0;
    hero.dirY = 5;
  }
}

function dot(){
  this.x = 0;
  this.y = 300;
  this.dirX = 0;
  this.dirY = 0;

  this.show = function(){
    fill(0);
    rect(this.x,this.y,10,10);
  }

  this.update = function(){
    if(this.x + this.dirX > 995 || this.x + this.dirX < 0) return;
    if(this.y + this.dirY > 495 || this.y + this.dirY < 0) return;

    this.x += this.dirX;
    this.y += this.dirY;
  }
}
