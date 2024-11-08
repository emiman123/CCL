// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 100; // Number of asteroids to start with
let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // Generate initial particles (asteroids)
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(-height, 0));
  }

  // Lower opacity background to create trailing effect
  background(30);
}

function draw() {
  // Use a semi-transparent background to create trails
  fill(30, 30, 30, 20); // Very low opacity
  rect(0, 0, width, height);

  // Update and display each particle
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update(); // Update position and velocity
    p.checkBounds(); // Check if the particle is out of bounds
    p.display(); // Display the particle

    // Remove asteroid and add a new one when its lifespan reaches zero
    if (p.lifespan <= 0) {
      particles.splice(i, 1); // Remove the particle
      particles.push(new Particle(random(width), random(-height, 0))); // Add a new asteroid at the top
    }
  }
}

class Particle {
  // Constructor function to set the initial state of the asteroid
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = random(15, 40); // Random size for asteroid
    this.velX = random(-1, 1); // Small horizontal drift
    this.velY = random(1, 5); // Random downward speed
    this.accelY = 0.05; // Small gravity effect
    this.color = color(120, 100, 100, random(150, 255)); // Grayish with random opacity
    this.lifespan = 255; // Asteroid lifespan (255 means fully visible, 0 means invisible)
    this.history = []; // Array to store previous positions for the trail
  }

  // Update method to change asteroid's position based on velocity and acceleration
  update() {
    this.velY += this.accelY; // Apply gravity
    this.x += this.velX; // Update x position based on velocity
    this.y += this.velY; // Update y position based on velocity
    this.lifespan -= 2; // Decrease lifespan over time (simulating fading)

    // Add the current position to the history
    this.history.push({ x: this.x, y: this.y });

    // Limit the length of the trail to the last 10 positions
    if (this.history.length > 10) {
      this.history.shift(); // Remove the oldest position
    }
  }

  // Method to check if the asteroid is outside the canvas boundaries
  checkBounds() {
    if (this.y > height) {
      this.lifespan = 0; // If the asteroid goes off the bottom, set lifespan to 0
    }
  }

  // Display method to draw the asteroid and its trail on the canvas
  display() {
    push();
    translate(this.x, this.y); // Move origin to asteroid's position
    noStroke();

    // Draw the trail from the history
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let trailAlpha = map(i, 0, this.history.length, 20, 0); // Gradually fade out trail
      fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], trailAlpha);
      ellipse(pos.x - this.x, pos.y - this.y, this.dia * 0.6, this.dia * 0.6);
    }

    // Draw the asteroid itself
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    beginShape();
    let angleOffset = random(TWO_PI); // Random rotation angle
    for (let i = 0; i < 6; i++) { // 6-sided rough "asteroid" shape
      let angle = map(i, 0, 6, 0, TWO_PI) + angleOffset;
      let r = this.dia * 0.6 + random(-this.dia * 0.2, this.dia * 0.2); // Randomize radius for rough edges
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
