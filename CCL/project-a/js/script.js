let bacteria; // Variable for the main bacteria
let smallBacteria = []; // Array for small bacteria
let isInBarrier = false; // To track if the bacteria is in the barrier
let baseSize = 30; // Base size of the main bacteria
let morphAmount = 10; // Amount of morphing
let ringCount = 5; // # of rings around the main bacteria
let bacteriaColor; // Color of the main bacteria
let particles = []; // Array for background particles

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container")
    bacteria = createVector(50, height / 2); // Initial position of the main bacteria
    bacteriaColor = color(150, 0, 0); // Initial color (red)

    // Initialize particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(random(width), random(height)));
    }

    // Create small bacteria
    for (let i = 0; i < 10; i++) {
        smallBacteria.push(new SmallBacteria(random(width), random(height)));
    }
}

function draw() {
    drawBackground();

    // electric barrier in the middle
    drawElectricBarrier(width / 2, height);

    // Check if the bacteria is in the barrier
    if (bacteria.x > width / 2) {
        isInBarrier = true; // Change state if it hits the barrier
    }

    // Move the main bacteria towards the mouse with erratic shaking
    let target = createVector(mouseX, mouseY); // Target position is the mouse
    let force = p5.Vector.sub(target, bacteria); // Calculate direction

    if (isInBarrier) {
        force.x += random(-1, 1) * 2; // Add erratic horizontal movement
        force.y += random(-1, 1) * 2; // Add erratic vertical movement

        // Change color after hitting the barrier
        bacteriaColor = color(random(255), random(255), random(255)); // Random color
    }

    // Normalize and apply speed
    force.setMag(2); // Set a consistent speed
    bacteria.add(force); // Move the bacteria towards the target

    // Keep the main bacteria within the canvas
    bacteria.x = constrain(bacteria.x, 0, width);
    bacteria.y = constrain(bacteria.y, 0, height);

    //  main bacteria
    if (isInBarrier) {
        // effects after hitting the barrier
        drawRings(bacteria.x, bacteria.y);
        drawBacteria(bacteria.x, bacteria.y);
    } else {
        // simple circle before hitting the barrier
        fill(150, 0, 0);
        ellipse(bacteria.x, bacteria.y, baseSize, baseSize);
    }

    // check collisions with small bacteria
    for (let i = smallBacteria.length - 1; i >= 0; i--) {
        smallBacteria[i].display();
        if (smallBacteria[i].isConsumed(bacteria)) {
            smallBacteria.splice(i, 1); // Remove consumed small bacteria
            baseSize += 5; // Increase size of the main bacteria
        }
    }
}

// main bacteria with effects
function drawBacteria(x, y) {
    fill(bacteriaColor); // updated color
    ellipse(x, y, baseSize, baseSize); // breathing effect
}

// circular rings around the main bacteria
function drawRings(x, y) {
    noFill();
    stroke(150, 0, 0, 150); //color and transparency for the rings
    for (let i = 1; i <= ringCount; i++) {
        let ringSize = baseSize + i * 10; // Size of each ring
        ellipse(x, y, ringSize, ringSize);
    }
}

// electric barrier
function drawElectricBarrier(x, h) {
    strokeWeight(4);
    for (let i = -h / 2; i < h / 2; i += 10) {
        let offset = random(-5, 5); // Random offset for flickering effect
        stroke(0, 200, 255); // Electric blue color
        line(x, i + height / 2 + offset, x + offset, i + height / 2 + 5 + offset);
    }
}


function drawBackground() {
    // gradient background
    for (let i = 0; i < height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(10, 10, 30), color(30, 30, 80), inter);
        stroke(c);
        line(0, i, width, i);
    }

    // cosmic effect
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

// small bacteria
class SmallBacteria {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.size = random(10, 20); // Random size for small bacteria
        this.color = color(0, 150, 0); // Green color for small bacteria
    }

    display() {
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    isConsumed(mainBacteria) {
        let d = dist(this.position.x, this.position.y, mainBacteria.x, mainBacteria.y);
        return d < (this.size / 2 + baseSize / 2); // Check for collision with the main bacteria
    }
}

// background effects
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.size = random(3, 5);
    }

    update() {
        this.position.add(this.velocity);
        // Wrap around edges
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }

    display() {
        noStroke();
        fill(255, 255, 255, 150); // White color with transparency
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }
}