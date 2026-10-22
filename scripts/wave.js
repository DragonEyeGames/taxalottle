const waveElement = document.getElementById("wave");

let width = window.innerWidth;
const height = 300; 
const baselineY = 150; 

const amplitude = 40;   
const frequency = 0.004; 
const segments = 500; // Increased segments for smoother noise detail    

let time = 0;

window.addEventListener('resize', () => {
  width = window.innerWidth;
});

// A function to get the current Y point with added noise layers
function getWaveY(x, phase) {
  // Main structural wave
  const mainWave = Math.sin(x * frequency + phase) * amplitude;
  
  // Noise Layer 1: Medium choppy waves moving twice as fast
  const noise1 = Math.sin(x * (frequency * 2.5) - phase * .5) * (amplitude * 0.25);
  
  // Noise Layer 2: Fine surface ripples moving in the opposite direction
  const noise2 = Math.cos(x * (frequency * 5.0) + phase * 3.2) * (amplitude * 0.05);

  // Combine everything together
  return baselineY + mainWave + noise1;// + noise2;
}

function buildWavePoints(phase) {
  let pathData = `M 0 ${getWaveY(0, phase)}`; 
  const segmentWidth = width / segments;

  for (let i = 1; i <= segments; i++) {
    const x = i * segmentWidth;
    const y = getWaveY(x, phase);

    const prevX = (i - 1) * segmentWidth;
    const prevY = getWaveY(prevX, phase);

    const cpX1 = prevX + segmentWidth / 2;
    const cpY1 = prevY;
    const cpX2 = x - segmentWidth / 2;
    const cpY2 = y;

    pathData += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
  }

  pathData += ` L ${width} ${height} L 0 ${height} Z`;
  return pathData;
}

function animate() {
  time += 0.015; // Slower time step looks better with layered noise
  const newPath = buildWavePoints(time);
  waveElement.setAttribute("d", newPath);
  requestAnimationFrame(animate);
}

animate();
