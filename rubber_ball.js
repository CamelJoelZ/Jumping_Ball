var hero;
const positionY = 250;
const boundLeft = 0;
const boundRight = 1005;
const upForce = -22;
const initAcc = 1.5;
const boost = 20;

function setup() {
  createCanvas(boundRight, 505);
  hero = new dot();
  //storke(255);

}

function draw() {
  background(200);
  //stroke(105);
  //line(0,310,1005,310)
  hero.bounce();
  hero.update();
  hero.show();
}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    hero.dirX = 5;
  }
  if(keyCode === LEFT_ARROW){
    hero.dirX = -5;
  }
  //if(keyCode === DOWN_ARROW){
  //  hero.acc = boost;
    //hero.ySpeed = upForce * 1.5;
  //}
}

function dot(){
  this.x = 0;
  this.y = positionY;
  this.dirX = 0;
  this.ySpeed = upForce;
  this.acc = initAcc; // m/s^2

  this.show = function(){
    fill(0);
    rect(this.x,this.y,10,10);
  }

  this.update = function(){
    if(this.x + this.dirX > boundRight - 10 || this.x + this.dirX < 0) return;
    this.x += this.dirX;
  }

  this.bounce = function(){

    this.y += this.ySpeed + 0.01 * this.acc;
    this.ySpeed = this.ySpeed + this.acc;
    if(this.y >= positionY){
      this.acc = initAcc;
      this.ySpeed = upForce;
    }
  }

}
