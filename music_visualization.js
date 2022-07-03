var song;
var button;
var amp;
var volHistory = [];
var canvasW = 0;
var canvasH = 0;
let img;
var stars = [];
var starCount = 100;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  }

  else {
    song.play();
  }
}


function preload() {
  song = loadSound('music.mp3');

  img = loadImage('car.png');
}

function setup() {

  canvasW = windowWidth-50;
  canvasH = windowHeight-50;

  createCanvas(canvasW, canvasH);
  background(30);
  button = createButton('►/ ||');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
  
  noFill();
  
  colorMode(HSB, canvasH);
  
  resizeCanvas(canvasW, canvasH);
  
  for (let i=0; i<starCount; i++) {
    stars.push(new Star());
  }

}

function draw() {
  
  //strokeWeight(2);
  for (let i=0; i<100; i++) {
    
    stroke(0,canvasH, (canvasH-i)/(i*i)*70);
    line(width/2, canvasH/1.8, i*100, canvasH);
    
    stroke(0,canvasH, (canvasH-i)/(i*i)*15);
    line(width/2, canvasH/1.8, -i*100, canvasH);
    
    stroke(0,canvasH, 800 - ( (canvasH-i)/(i*i)*40) );
    line(0,canvasH/1.8+i*i * 1.5,     width,canvasH/1.8+i*i  * 1.5);

  }
  
  
  background(540,canvasH, 100, 140);
  let vol = amp.getLevel(); //Gets current sound level

  volHistory.push(vol);
  
  
  for (let i=0; i<starCount; i++) {
    stars[i].draw(vol);
  }

  canvasW = windowWidth-50;
  canvasH = windowHeight-50;



  strokeWeight(1);
  
  
  for (i=0; i<canvasH/1.8; i++) {
    stroke(540,canvasH, i,100);
    line(0, i,1000,i);
  }

  for (i=0; i<volHistory.length; i++) {
    
    var y = map(volHistory[i], 1,0, 0, canvasH) + 50; //Maps sound level

    stroke(y/1.2,canvasH, canvasH);
    line(canvasW-(y/i*270),canvasW-i, y/i*270, canvasW-i);
  }

    
  button.style('background-color', color(y,canvasH, canvasH));
  
  strokeWeight(0.6);


  if (volHistory.length > windowWidth-100) {
    volHistory.splice(0, 1);
  }
  
    
  image(img, 200,450,500,340);

}

class Star {
  
  constructor() {
    this.dia = random(3,10);
    this.x = random(0,canvasW);
    this.y = random(0,canvasH/1.8 - this.dia);
    
    this.seed = random(0,1000);
    
    print(this.seed)
    
  }

  draw(curVol) {
    
    let b = sqrt((1-noise(this.seed + millis() / 5000.0 )) * sq(curVol));
    //let b = sqrt(noise(this.seed + millis() / 50000.0 ) * curVol);
    
    noStroke();
    fill(canvasH, b*120*this.dia);
    //fill(canvasH, curVol*120*this.dia);
    ellipse(this.x, this.y, this.dia, this.dia);
  }
    
}
