/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // Adjusted the dancer's name here:
  dancer = new MonkeDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

class MonkeDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;

    // Initial angles for arms, legs, and tail to simulate dancing motion
    this.armAngle = 0;
    this.legAngle = 0;
    this.tailAngle = 0;

    // Swing directions
    this.armSwingDirection = 1;
    this.legSwingDirection = -1;
    this.tailSwingDirection = 1;
  }

  update() {
    // Swing the arms and legs back and forth
    this.armAngle += 0.05 * this.armSwingDirection;
    this.legAngle += 0.03 * this.legSwingDirection;
    this.tailAngle += 0.02 * this.tailSwingDirection;

    // Reverse direction when reaching a certain angle
    if (this.armAngle > QUARTER_PI || this.armAngle < -QUARTER_PI) {
      this.armSwingDirection *= -1;
    }
    if (this.legAngle > PI / 8 || this.legAngle < -PI / 8) {
      this.legSwingDirection *= -1;
    }
    if (this.tailAngle > PI / 16 || this.tailAngle < -PI / 16) {
      this.tailSwingDirection *= -1;
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    // Body
    fill(139, 69, 19);
    ellipse(0, 0, 60, 80); // body

    // Head with ears
    fill(160, 82, 45);
    ellipse(0, -50, 50, 50); // head

    // Ears
    fill(160, 82, 45);
    ellipse(-30, -50, 20, 30); // left ear
    ellipse(30, -50, 20, 30);  // rihgt ear

    // Eyes and mouth on head
    fill(0);
    ellipse(-10, -55, 5, 5); // left eye
    ellipse(10, -55, 5, 5);  // right eye
    noFill();
    arc(0, -45, 20, 15, 0, PI); // mouth

    // Arms
    fill(139, 69, 19);
    push();
    rotate(this.armAngle);
    rect(-50, -20, 50, 10, 5); // left arm
    pop();
    push();
    rotate(-this.armAngle);
    rect(0, -20, 50, 10, 5); // right arm
    pop();

    // Legs
    fill(139, 69, 19);
    push();
    rotate(this.legAngle);
    rect(-30, 40, 10, 50, 5); // left leg
    pop();
    push();
    rotate(-this.legAngle);
    rect(20, 40, 10, 50, 5); // right leg
    pop();

    // Tail
    push();
    rotate(this.tailAngle);
    stroke(160, 82, 45);
    strokeWeight(4);
    noFill();
    arc(-20, 40, 40, 60, 0, PI); // curved tail
    pop();

    pop();
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/