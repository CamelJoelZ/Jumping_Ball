var hero;
const INITPOS = 250;
const LEFTBOUND = 0;
const RIGHTBOUND = 1005;
const UPSPEED = -22;
const GRAVITY = 1.5;
const BOOST = 20;

function setup() {
  createCanvas(RIGHTBOUND, 505);
  hero = new dot();

}

function draw() {
  background(200);
  hero.bounce();
  hero.update();
  hero.show();
}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    // moving to the right
    hero.dirX = 5;
  }
  if(keyCode === LEFT_ARROW){
    // moving to the left
    hero.dirX = -5;
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
    if(this.x + this.dirX > RIGHTBOUND - 10 || this.x + this.dirX < UPSPEED) return;
    this.x += this.dirX;
  }

  /*
   * simulate the gravity applied on the rubber ball 
   */
  this.bounce = function(){

    this.y += this.ySpeed + 0.01 * this.acc;
    this.ySpeed = this.ySpeed + this.acc;
    if(this.y >= INITPOS){
      this.acc = GRAVITY;
      this.ySpeed = UPSPEED;
    }
  }

}
