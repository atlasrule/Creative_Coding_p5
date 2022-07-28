let gridSize = 100;

var grid = [gridSize*gridSize];
var updated_grid = [gridSize*gridSize];

function setup() {
  createCanvas(900, 900);
  frameRate(120);
  colorMode(HSB, 1);
  
  //stroke(0.3);
  noStroke();
 
  for(let i=0; i<gridSize; i++) {
    for(let j=0; j<gridSize; j++) {

      grid[i*gridSize + j] = floor(random(2));
      //grid[i*gridSize + j] = 1;
    }  
  }
  
  updated_grid = grid.slice(0);
}



function draw() {
  
  textSize(60);
  fill(255, 0.318);
  //text("After", 20,60);
  //textSize(20);
  fill(0);
  rect(105,73, 48,20);
  fill(255);
  text("Iteration: " + frameCount, 23,90);
  
  background(0, 0.0628);
   
  drawGrid();

  iterate();
  
  if (frameCount % 2 == 0) { tunnel(); }
}


function drawGrid() {
  cellSize = width / gridSize;
  
  for(let i=0; i<gridSize; i++) {
    for(let j=0; j<gridSize; j++) {  
      
      if ( grid[i*gridSize + j] == 1 ) {
      fill(0.9-(i*j/(gridSize*gridSize)), 1, 1);  
      square(i*cellSize, j*cellSize, cellSize); }  
    } 
  }  
}

function nNeighbours( i, j ) {
  
  let num = 0;
  
  if ( grid[(i-1)*gridSize+(j-1)] ) { num++; }
  
  if ( grid[(i-1)*gridSize+(j)] ) { num++; }
  
  if ( grid[(i-1)*gridSize+(j+1)] ) { num++; }
  
  if ( grid[(i)*gridSize+(j+1)] ) { num++; }
  
  if ( grid[(i+1)*gridSize+(j+1)] ) { num++; }
  
  if ( grid[(i+1)*gridSize+(j)] ) { num++; }
  
  if ( grid[(i+1)*gridSize+(j-1)] ) { num++; }
  
  if ( grid[(i)*gridSize+(j-1)] ) { num++; }
  
  return num;
}


function tunnel() {
  let c1X = floor(random(gridSize));
  let c1Y = floor(random(gridSize));
  
  cellValue = grid[c1X*gridSize + c1Y];
  
  grid[c1X*gridSize + c1Y] = (cellValue ^ 1);
  
  let c2X = floor(random(gridSize));
  let c2Y = floor(random(gridSize));
  
  grid[c2X*gridSize + c2Y] = cellValue;
  
}


function isAlive(i, j) {
  
  if ( grid[i*gridSize + j] == 1) { return true;}
  
  if ( grid[i*gridSize + j] == 0) { return false;}
}


function applyRules( i, j ) {
  
  // Death Rule
  if (isAlive(i, j)  &&  nNeighbours(i,j) < 2 ) { updated_grid[i*gridSize + j] = 0}
  if (isAlive(i, j)  &&  nNeighbours(i,j) > 3 ) { updated_grid[i*gridSize + j] = 0}
  
  // Survival Rule
  // if the cell is alive and has 2 or 3 alive neighbours it survives.
  
  // Birth Rule
  if (!isAlive(i, j)  &&  nNeighbours(i,j) == 3 ) { updated_grid[i*gridSize + j] = 1}    
}


function iterate() {

  for(let i=0; i<gridSize; i++) {
    for(let j=0; j<gridSize; j++) {
      
      applyRules( i, j );
    }  
  }  
  grid = updated_grid.slice(0);
}
