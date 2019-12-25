let width;
let height;
let vertices;
let num;
let order;
let cities;
let min_distance;
function setup() {
  width = height = 600;
  createCanvas(width, height);
  
  cities = [];
  vertices = [];
  order = [];
  num = 4;
  min_distance = Infinity;

  for(let i = 0; i < num; i++) {
    vertices[i] = createVector(floor(random(width)), floor(random(height)));
    order[i] = i;
  }
  console.log(`Total number of paths = ${factorial(num)}`);
  cities[0] = new Cities(order.slice(), calcDistance(vertices.slice(), order.slice()))
}

function draw() {
  background(0);
  frameRate(9);
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
  drawPath(vertices.slice(), order.slice());
  shuffle(order, true);
  if(!orderExists(order.slice())) {
    cities[cities.length] = new Cities(order.slice(), calcDistance(vertices.slice(), order.slice()));
  }
  if(cities.length == factorial(num)) { noLoop(); }
}


function drawPath(vertices, order) {
  strokeWeight(3);
  stroke(255);
  noFill();
  beginShape();
  for(let i = 0; i < vertices.length; i++) {
    vertex(vertices[order[i]].x, vertices[order[i]].y);
  }
  endShape();
}
function calcDistance(arr, order) {
  sum = 0;
  for(let i = 0; i < arr.length - 1; i++) {
    sum += dist(arr[order[i]].x, arr[order[i]].y, arr[order[i+1]].x, arr[order[i+1]].y);
  }
  return sum;
}

function orderExists(order) {
  let flg;
  for(let i = 0; i < cities.length; i++) {
    flg = 1;
    for(let j = 0; j < cities[i].order.length; j++) {
      if(cities[i].order[j] != order[j]) {
        flg = 0;
        break;
      }
    }
    if (flg) return flg;
  }
  return flg;
}

function factorial(num) {
  if(num == 0) { return 1; }
  else { return num * factorial(num - 1) };
}