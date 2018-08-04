var hero;
const INITPOS = 300;
const LEFTBOUND = 0;
const RIGHTBOUND = 600;
const UPSPEED = -10;
const GRAVITY = 0.5;
const BOOST = 10;
const XSPEED = 3.5;
const GROUNDWIDTH = 12.5;
const AIRRESIS = 0.02;

function setup() {
  createCanvas(RIGHTBOUND, 505);
  hero = new dot();

}

function draw() {
  background(200);
  hero.bounce();
  hero.update();
  if(!keyIsPressed === true) hero.airResis();
  if(hero.y <= INITPOS-4) hero.show();
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
    // keep the cube on the ground if key not released
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
   * simulate air resistance applied on the object
   */
   this.airResis = function(){
      if(this.dirX > 0) this.dirX -= AIRRESIS;
      else if(this.dirX < 0) this.dirX += AIRRESIS;
   }

  /*
   * keep the ball on the ground
   */
   //this.stay = function(){
  //    if(this.y >= INITPOS && keyIsPressed === true){
   //      this.y = INITPOS;
   //    }
   //}

  /*
   * simulate the gravity applied on the rubber ball
   */
  this.bounce = function(){

    if(this.ySpeed +  0.001*this.acc <= INITPOS){
      this.y += this.ySpeed + 0.0000000000001 * this.acc;
      this.ySpeed = this.ySpeed + this.acc;
    }
    if(this.y >= INITPOS){
      // bounce back after a downward boost
      if(this.acc == BOOST) this.ySpeed = UPSPEED * 1.5;
      else this.ySpeed = UPSPEED;
      // set the acc back to gravity after hit the ground
      this.acc = GRAVITY;
    }
    // check if DOWN_ARROW key is being pressed
    //this.stay();
  }

}
