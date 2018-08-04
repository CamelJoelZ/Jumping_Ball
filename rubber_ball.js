var hero;
const INITPOS = 300;
const LEFTBOUND = 0;
const RIGHTBOUND = 600;
const UPSPEED = -20;
const GRAVITY = 1;
const BOOST = 10;
const XSPEED = 3;
const GROUNDWIDTH = 12;

function setup() {
  createCanvas(RIGHTBOUND, 505);
  hero = new dot();

}

function draw() {
  background(200);
  hero.bounce();
  hero.update();
  if(hero.y <= INITPOS-4)
  hero.show();
  rect(0,INITPOS-8,RIGHTBOUND,GROUNDWIDTH);
}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    // moving to the right
    hero.dirX = XSPEED;
  }
  if(keyCode === LEFT_ARROW){
    // moving to the left
    hero.dirX = -XSPEED;
  }
  if(keyCode === DOWN_ARROW){
    // give it a downward boost
    hero.acc = BOOST;
  }
}

function dot(){
  // starting position
  this.x = 0;
  this.y = INITPOS;
  // x axis speed
  this.dirX = 0;
  // initial y axis speed
  this.ySpeed = UPSPEED;
  // initial downward gravity
  this.acc = GRAVITY; // m/s^2

  /*
   * display the ball after every position update
   */
  this.show = function(){
    fill(0);
    rect(this.x,this.y,10,10);
  }

  /*
   * update the position of the rubber_ball according to the x axis speed
   * stop updating if bounds arrived
   */
  this.update = function(){
    if(this.x + this.dirX > RIGHTBOUND - 10 || this.x + this.dirX < LEFTBOUND) return;
    this.x += this.dirX;
  }

  /*
   * simulate the gravity applied on the rubber ball
   */
  this.bounce = function(){

    if(this.ySpeed +  0.001*this.acc <= INITPOS){
      this.y += this.ySpeed + 0.0000000001 * this.acc;
      this.ySpeed = this.ySpeed + this.acc;
    }
    if(this.y >= INITPOS){
      // bounce back after a downward boost
      if(this.acc == BOOST) this.ySpeed = UPSPEED * 1.3;
      else this.ySpeed = UPSPEED;
      // set the acc back to gravity after hit the ground
      this.acc = GRAVITY;
    }
  }

}
