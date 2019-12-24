let width;
let height;
let vertices;
let num;
let order;
let min_distance;
function setup() {
  width = height = 600;
  createCanvas(width, height);
  
  vertices = [];
  order = [];
  num = 10;
  min_distance = Infinity;

  for(let i = 0; i < num; i++) {
    vertices[i] = createVector(floor(random(width)), floor(random(height)));
    order[i] = i;
  }
}

function draw() {
  background(0);
  //frameRate(5);
  ellipseMode(CENTER);
  for(let i = 0; i < vertices.length; i++) {
    fill(255, 0, 0);
    stroke(255, 0, 0);
    ellipse(vertices[i].x, vertices[i].y, 12, 12);
  }
  
  if (calcDistance(vertices, order) < min_distance) {
    min_distance = calcDistance(vertices, order);
    console.log(`Minimum Distance = ${min_distance}, order = ${order}`)
  }

  strokeWeight(3);
  stroke(255);
  noFill();
  beginShape();
  for(let i = 0; i < vertices.length; i++) {
    vertex(vertices[order[i]].x, vertices[order[i]].y);
  }
  shuffle(order, true);
  endShape();
}

function calcDistance(arr, order) {
  sum = 0;
  for(let i = 0; i < arr.length - 1; i++) {
    sum += dist(arr[order[i]].x, arr[order[i]].y, arr[order[i+1]].x, arr[order[i+1]].y);
  }
  return sum;
}
