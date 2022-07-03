var amplitude = 100;
var nWaves = 33;
var waveSpacing = 14;
var mainCount = 0;
var c = 0;

function setup() {
  createCanvas(1150, 777);
  frameRate(30);
  
  stroke(255);
  fill(0);
}

function draw() {
  
  background(0);

  let a = 70;
  let h = 1 / 123;
  let o = PI * 2;
  let s = -80;


  for (let w = 0; w < waveSpacing*nWaves; w += waveSpacing) {
    beginShape();

    vertex(0, height);

    for (var i = 0; i < width; i++) {


      let fun = (sin(h * i + o) * a + sin(h * 3 * i + o) / 3 * a + sin(h * 5 * i + o) / 5 * a + sin(h * 7 * i + o) / 7 * a + sin(h * 9 * i + o) / 9 * a) + s;
      
      let noiseFactor = noise((i) / 60 + c+c*w/200, w) * amplitude * fun /100 + height/2;
      
      vertex(i, w + noiseFactor*noiseFactor/555 - 0);

      mainCount += i;
    }

    c += 0.0004;

    vertex(width, w + height);

    endShape();

  }

}