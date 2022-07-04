let x = 0;
let c = 0;


function setup() {
  createCanvas(1900, 1900);
  noFill();
  stroke(255);
  strokeWeight(0.1);
  
  background(0, 255);
  
}


function draw() {
  
  blendMode(BLEND);
  background(0, 0.5);
  blendMode(ADD);  
  
  translate(width/2, height/2);  
  
  stroke(c*50, 0, 0);
  rotate(x);  
  ellipse(260*5/c, 160*c/5, 520,520*c/5*c/5);
  
  stroke(0, c*50, 0);
  rotate(x);  
  ellipse(260*5/c, 80*c/5, 520,520*c/5*c/5);
  
  stroke(0, 0, c*50);
  rotate(x); 
  ellipse(260*5/c, 80*c/5, 520,520*c/5*c/5);
  
    
  x += 0.0007;  
  
  c = sin(x) * 5;
    
}
