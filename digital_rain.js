var clock = 0;
var drops = [];

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < 100; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  background(0, 20);

  for (let i = 0; i < 100; i++) {
    drops[i].move();
    drops[i].display();
  }

  drops.shift();
  drops.push(new Drop());

  clock += 1;
}


class Drop {

  constructor() {

    this.length = 90;

    this.x = random(-this.length, width);
    this.y = -100;

    this.opacity = map(this.length, 25, 55, 55, 255);
    this.col = color(0,255,0, this.opacity);
    
    
  }

  move() {

    this.speed = map(this.x/5, 25, 55, 2, 10);

    this.y += this.speed;

  }

  display() {
    stroke(0,255,0);

    noStroke();
    fill(0, 255, 0, this.opacity);
    
    this.char = "雨災日淵天気麗以目雨火海先縁傘雨冥黴一三龍".charAt(random(21));
    textSize(5+this.x/40);
    text(this.char, this.x, this.y, this.x+5+this.x/40, this.y+5+this.x/40 );

  }
}