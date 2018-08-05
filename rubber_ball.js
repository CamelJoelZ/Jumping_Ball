var hero;
const INITPOS = 300;
const LEFTBOUND = 0;
const RIGHTBOUND = 600;
const UPSPEED = -10;
const GRAVITY = 0.5;
const BOOST = 1.5;
const XSPEED = 3.5;
const GROUNDWIDTH = 12.5;
const AIRRESIS = 0.02;
const FRICTION = 0.08;
const OBJ_WIDTH = 10;
const PRESSED_WIDTH = OBJ_WIDTH * 0.75;
const SHADOW_ADJ = 1;


function setup() {
  createCanvas(RIGHTBOUND, 505);
  hero = new dot();

}

function draw() {
  background(200);
  hero.shadow();
  hero.move();
  hero.update();
  if(!keyIsPressed === true) hero.airResis();
  hero.show();
  line(0,INITPOS+10,RIGHTBOUND,INITPOS+10);
}

function keyPressed(){
  if(keyIsDown(RIGHT_ARROW)){
    // moving to the right
    hero.dirX = XSPEED;
  }
  if(keyIsDown(LEFT_ARROW)){
    // moving to the left
    hero.dirX = -XSPEED;
  }
  if(keyIsDown(DOWN_ARROW)){
    // give it a downward boost
    hero.acc = BOOST;
    // keep the cube on the ground if key not released
  }
  if(keyIsDown(SHIFT)){
    if(keyIsPressed === true){
      hero.quick = 1;
      hero.dirX *= 2;
    }
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
  // determine if speed up
  this.quick = 0;

  /*
   * display the ball after every position update
   */
  this.show = function(){
    fill(0);
    if(this.ySpeed == 0)
      rect(this.x, this.y + OBJ_WIDTH - PRESSED_WIDTH, OBJ_WIDTH, PRESSED_WIDTH);
    else
      rect(this.x, this.y, OBJ_WIDTH, OBJ_WIDTH);
  }

  /*
   * display the faded object
   */
   this.shadow = function(){
     if(!keyIsDown(SHIFT)) return;
     if(this.x + this.dirX > RIGHTBOUND - OBJ_WIDTH || this.x + this.dirX < LEFTBOUND ) return;

     fill(80);
     if(this.ySpeed == 0)
       rect(this.x, this.y + OBJ_WIDTH - PRESSED_WIDTH, OBJ_WIDTH, PRESSED_WIDTH);
     else{
       rect(this.x, this.y, OBJ_WIDTH, OBJ_WIDTH);
       fill(80);
       rect(this.x - this.dirX/1000, this.y - (this.ySpeed + this.acc)/1000, OBJ_WIDTH, OBJ_WIDTH);
     }
   }

  /*
   * update the position of the rubber_ball according to the x axis speed
   * stop updating if bounds arrived
   */
  this.update = function(){
    if(this.x + this.dirX > RIGHTBOUND - OBJ_WIDTH || this.x + this.dirX < LEFTBOUND ) return;
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
    * simulate air resistance applied on the object
    */
    this.friction = function(){
       if(this.dirX > 0) this.dirX -= FRICTION;
       else if(this.dirX < 0) this.dirX += FRICTION;
    }

  /*
   * keep the ball on the ground
   */
   this.stay = function(){
      if(this.y == INITPOS && keyIsPressed === true && keyIsDown(DOWN_ARROW)){
         this.ySpeed = 0;
         this.friction();
       }
   }

   /*
    * function to bounce back
    */
  this.bounce = function(){
    if(this.y == INITPOS){
      // bounce back after a downward boost
      if(this.acc == BOOST) this.ySpeed = UPSPEED * 1.25;
      else if(this.ySpeed == 0) this.ySpeed = UPSPEED * 1.5;
      else this.ySpeed = UPSPEED;
      // set the acc back to gravity after hit the ground
      this.acc = GRAVITY;
    }
    // keep the obj on the ground if DOWN_ARROW pressed
    this.stay();
  }

  /*
   * simulate the gravity applied on the rubber ball
   */
  this.move = function(){

    if(this.y + this.ySpeed + this.acc <= INITPOS){
      this.y += this.ySpeed + this.acc;
      this.ySpeed = this.ySpeed + this.acc;
    }
    else this.y = INITPOS;

    // bounce back
    this.bounce();
  }

}
