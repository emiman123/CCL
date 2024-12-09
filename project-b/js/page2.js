let offset = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  noFill();
}

function draw() {
  background(30);

  Head.display(250, 200);
  Head.display(550, 200);

  Chip.display();

  if (Chip.isOverHead(250, 200) || Chip.isOverHead(550, 200)) {
    drawWaves();
  }
}

function drawWaves() {
  stroke(0, 255, 255);
  for (let x = 250; x <= 550; x += 10) {
    let y = 200 + sin((x - 250) * 0.05 + offset) * 30;
    point(x, y);
  }

  stroke(255, 100, 150);
  for (let x = 250; x <= 550; x += 10) {
    let y = 200 + cos((x - 250) * 0.05 + offset) * 30;
    point(x, y);
  }

  offset += 0.1;
}

class Head {
  static display(x, y) {
    stroke(255);
    ellipse(x, y, 100, 120);
    line(x - 10, y - 10, x + 10, y - 10);
    line(x, y, x, y + 10);
    arc(x, y + 20, 40, 20, 0, PI);
  }
}

class Chip {
  static display() {
    let size = 20;
    fill(100);
    noStroke();
    rect(mouseX - size / 2, mouseY - size / 2, size, size);
  }

  static isOverHead(headX, headY) {
    if (mouseX < headX - 50) {
      return false;
    }
    if (mouseX > headX + 50) {
      return false;
    }
    if (mouseY < headY - 60) {
      return false;
    }
    if (mouseY > headY + 60) {
      return false;
    }
    return true;
  }
}

