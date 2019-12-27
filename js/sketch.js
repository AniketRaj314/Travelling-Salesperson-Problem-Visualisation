let width;
let height;
let vertices;
let num;
let order;
let cities;
let min_distance;
let cityText;
let final_distance;
let final_order;
function setup() {
  width = height = 600;
  createCanvas(width, height);

  cities = [];
  cityText = createP(`Number of paths discovered = ${cities.length}`);
  cityText.position(width + 10, 50);
  vertices = [];
  order = [];
  num = 4;
  min_distance = Infinity;

  for (let i = 0; i < num; i++) {
    vertices[i] = createVector(floor(random(width)), floor(random(height)));
    order[i] = i;
  }
  cities[0] = new Cities(order.slice(), calcDistance(vertices.slice(), order.slice()))
}

function draw() {
  background(0);
  //frameRate(9);
  ellipseMode(CENTER);
  for (let i = 0; i < vertices.length; i++) {
    fill(255, 0, 0);
    stroke(255, 0, 0);
    ellipse(vertices[i].x, vertices[i].y, 12, 12);
  }
  cityText.html(`Number of paths discovered = ${cities.length} / ${factorial(num)} <br> Minimum Distance: ${final_distance}, Order: ${final_order}`);
  writeVertices();

  if (cities.length == factorial(num)) {
    drawPath(vertices.slice(), final_order.slice());
    noLoop();
  }
  else {
    if (calcDistance(vertices, order) < min_distance) {
      min_distance = calcDistance(vertices, order);
      final_distance = min_distance;
      final_order = order.slice();
    }
    drawPath(vertices.slice(), order.slice());
    shuffle(order, true);
    if (!orderExists(order.slice())) {
      cities[cities.length] = new Cities(order.slice(), calcDistance(vertices.slice(), order.slice()));
    }

  }
}

function writeVertices() {
  stroke(255);
  fill(255);
  for(let i = 0; i < vertices.length; i++) {
    strokeWeight(1);
    text(i, vertices[i].x + 5, vertices[i].y);
  }
}

function drawPath(vertices, order) {
  strokeWeight(3);
  stroke(255);
  noFill();
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[order[i]].x, vertices[order[i]].y);
  }
  endShape();
}
function calcDistance(arr, order) {
  sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    sum += dist(arr[order[i]].x, arr[order[i]].y, arr[order[i + 1]].x, arr[order[i + 1]].y);
  }
  return sum;
}

function orderExists(order) {
  let flg;
  for (let i = 0; i < cities.length; i++) {
    flg = 1;
    for (let j = 0; j < cities[i].order.length; j++) {
      if (cities[i].order[j] != order[j]) {
        flg = 0;
        break;
      }
    }
    if (flg) return flg;
  }
  return flg;
}

function factorial(num) {
  if (num == 0) { return 1; }
  else { return num * factorial(num - 1) };
}