function setup() {
  createCanvas(800, 800);
  blendMode(LIGHTEST);
  colorMode(RGB, 1);
}

function draw() {
  blendMode(BLEND);
  background(0);
  
  let rows = 20; cols = 20;
  
 
  blendMode(LIGHTEST);

  
  for (let i=0; i<rows; i++) {    
    for (let j=0; j<cols; j++) {
      
      let cX = i*width/cols;  let cY = j*height/rows;
      
      let offsetX = (width - mouseX - cX) / 5;
      let offsetY = (height - mouseY - cY) / 5;
      
      //d = dist(mouseX, mouseY, i*width/cols, j*height/rows);
    
      fill(1,0,0);      
      circle(cX+offsetX, cY+offsetY, 15);
      
      fill(0,1,0);      
      circle(cX+offsetX/2, cY+offsetY/2, 15);
      
      fill(0,0,1);      
      circle(cX+offsetX/3, cY+offsetY/3, 15);
      
    }  
  }
  

    
}
