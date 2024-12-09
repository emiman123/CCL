function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(0);

  fill(100);
  noStroke();
  rect(350, 220, 100, 60, 15);

  fill(255, 204, 0);
  rect(390, 240, 20, 20, 5);

  stroke(255);
  strokeWeight(2);

  line(390, 240, 350, 220);
  line(410, 240, 450, 220);
  line(390, 260, 350, 280);
  line(410, 260, 450, 280);

  line(350, 250, 450, 250);
  line(360, 220, 360, 280);
  line(440, 220, 440, 280);

  fill(0, 255, 255);
  rect(370, 230, 10, 5);
  rect(420, 230, 10, 5);
  rect(370, 270, 10, 5);
  rect(420, 270, 10, 5);

  noFill();
  stroke(255, 204, 0, 100);
  strokeWeight(4);

  ellipse(400, 250, 140, 140);
  ellipse(400, 250, 160, 160);
  ellipse(400, 250, 180, 180);
}
