let gridSize = 300;

var grid = [gridSize*gridSize];
var updated_grid = [gridSize*gridSize];

function setup() {
  createCanvas(900, 900);
  frameRate(120);
  colorMode(HSB, 1);
  textSize(30);
  
  //stroke(0.3);
  noStroke();
 
  for(let i=0; i<gridSize; i++) {
    for(let j=0; j<gridSize; j++) {

      grid[i*gridSize + j] = floor(random(2));
      //grid[i*gridSize + j] = 1;
    }  
  }
  
  
  /*
  let x = 45;
  
  grid[x*gridSize + x] = 1;
  grid[(x+1)*gridSize + x] = 1;
  grid[(x+2)*gridSize + x] = 1;
  
  grid[(x+2)*gridSize + (x-1)] = 1;
  grid[(x+1)*gridSize + (x-2)] = 1;
  */
  /*
  grid[2500] = 1;
  grid[2501] = 1;
  grid[2502] = 1;
  */
  
  updated_grid = grid.slice(0);
}



function draw() {
  
  background(0, 0.0628);
   
  drawGrid();

  iterate();    
}


function drawGrid() {
  cellSize = width / gridSize;
  /*
  for(let i=0; i<gridSize; i++) {
    for(let j=0; j<gridSize; j++) {  
      
      fill( grid[i*gridSize + j] );
      square(i*cellSize, j*cellSize, cellSize);      
    } 
  }
  */  
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