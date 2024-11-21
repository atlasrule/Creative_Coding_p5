let c = 0;
let r = 280;
let bodyR = 23;
let nBodies = 25;
let oscillators = [];

// Frequencies for notes C4 to B4
let frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88];

let lastPositions = [];
let velocities = [];
let accelerations = [];
let activeOscillators = [];

function setup() {
  createCanvas(900, 900);
  colorMode(HSB, 255);
  noStroke();

  // Initialize oscillators
  for (let i = 0; i < nBodies; i++) {
    let osc = new p5.Oscillator('sine');
    osc.freq(frequencies[i % frequencies.length]); // Loop through frequencies
    osc.amp(0); // Initially silent
    osc.start();
    oscillators.push(osc);
    activeOscillators.push(false);
  }

  // Initialize positions, velocities, and accelerations
  for (let i = 0; i < nBodies; i++) {
    lastPositions.push(createVector(width / 2, height / 2));
    velocities.push(createVector(0, 0));
    accelerations.push(createVector(0, 0));
  }
}

function draw() {
  background(0, 12);
  
  nBodies = floor(mouseY / width * 24);

  while (oscillators.length < nBodies) {
    let osc = new p5.Oscillator('sine');
    osc.freq(frequencies[oscillators.length % frequencies.length]);
    osc.amp(0);
    osc.start();
    oscillators.push(osc);
    activeOscillators.push(false);
  }

  while (oscillators.length > nBodies) {
    oscillators.pop().stop();
    activeOscillators.pop();
  }

  for (let i = 0; i < nBodies; i++) {
    let angle = noise(i) * c + c + noise(i * c);
    let x = width / 2 + cos(angle) * (r + noise(c * i) * 15) / 11 * (i + 3);
    let y = height / 2 + sin(angle) * (r + noise(c * i) * 15) / 11 * (i + 3);

    // Calculate velocity and acceleration
    let currentPosition = createVector(x, y);
    let velocity = p5.Vector.sub(currentPosition, lastPositions[i]);
    let acceleration = p5.Vector.sub(velocity, velocities[i]);

    velocities[i] = velocity;
    accelerations[i] = acceleration;
    lastPositions[i] = currentPosition;

    if (i != 0) {
      stroke('white');
      strokeWeight(0.05);
      line(lastPositions[i - 1].x, lastPositions[i - 1].y, x, y);
    }

    let colorValue = (x * y) / height;
    let hueValue = 255 - colorValue;
    fill(hueValue, 255, 255);
    noStroke();
    circle(x, y, bodyR);

    // Map distance from center to frequency (octaves)
    let distanceFromCenter = dist(x, y, width / 2, height / 2);
    let freqIndex = Math.floor(map(distanceFromCenter, 0, width / 2, 0, frequencies.length));
    freqIndex = constrain(freqIndex, 0, frequencies.length - 1);
    let osc = oscillators[i];
    osc.freq(frequencies[freqIndex], 0.1); // Smooth freq change

    // Set oscillator amplitude based on acceleration magnitude
    let amp = map(acceleration.mag(), 0, nBodies, 0, 0.9);
    osc.amp(amp, 0.1); // Smooth amp change over 0.1 seconds

    // Mark oscillator as active
    activeOscillators[i] = true;
  }

  // Reduce amplitude of inactive oscillators
  for (let i = 0; i < nBodies; i++) {
    if (!activeOscillators[i]) {
      oscillators[i].amp(0, 0.1); // Smoothly reduce amp to zero
    } else {
      activeOscillators[i] = false; // Reset for next frame
    }
  }

  c += 0.007;
}

function mousePressed() {
  nBodies = constrain(nBodies - 1, 1, 20); // Lower nBodies dynamically
}

function keyPressed() {
  if (key === ' ') {
    nBodies = constrain(nBodies + 1, 1, 20); // Increase nBodies dynamically
  }
}
