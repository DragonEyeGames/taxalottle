const waveElement = document.getElementById("wave");
const waveElementTwo = document.getElementById("wave-2");
const sandElement = document.getElementById("sand-wave");
const sandElementTwo = document.getElementById("sand-wave-2");

let width = window.innerWidth;
const height = 400; 
let baselineY = 150;
let baselineTicks = 0;

const amplitude = 30;   
const frequency = 0.004; 
const segments = 500; 

let time = 0;

window.addEventListener('resize', () => {
  width = window.innerWidth;
});

function getWaveY(x, phase) {

  const mainWave = Math.sin(x * frequency + phase) * amplitude;
  

  const noise1 = Math.sin(x * (frequency * 2.5) - phase * .5) * (amplitude * 0.25);
  

  const noise2 = Math.cos(x * (frequency * 5.0) + phase * 3.2) * (amplitude * 0.05);


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

  pathData += ` L ${width} 0 L 0 0 Z`;
  return pathData;
}

let lastTime = 0
let lastValue = -2
let direction= -1



const cycleDuration = 5000;

let previousPhase=0

function animate(currentTime) {
	// Update time
	const delta = currentTime - lastTime;
	lastTime = currentTime;

	time += delta;
	baselineTicks += delta;
	const phase = time / cycleDuration;

	baselineY = Math.sin(
		(baselineTicks - 1250) * 2 * Math.PI / cycleDuration
	) * 50 + 110;

	const newPath = buildWavePoints(Math.floor(phase));
	waveElement.setAttribute("d", newPath);

	baselineY = Math.sin(
		(baselineTicks + 1250) * 2 * Math.PI / cycleDuration
	) * 50 + 110;

	const newPath2 = buildWavePoints(
		(Math.floor(phase - 0.5) + 10) * 15
	);

	waveElementTwo.setAttribute("d", newPath2);

	let phaseValue = (Math.floor(phase*2))/2

	if(phaseValue>previousPhase){

		previousPhase=phaseValue;

		if(phaseValue % 1 === 0) {
			triggerAnimation(sandElementTwo, newPath2)
		} else if(phaseValue % .5 === 0) {
			triggerAnimation(sandElement, newPath)
		}
	}

	console.log(phaseValue)

	requestAnimationFrame(animate);
}

function triggerAnimation(element, path) {
	element.classList.remove("animate-out");

	element.setAttribute("d", path);

	// Force the browser to register the removed class
	void element.getBoundingClientRect();

	element.classList.add("animate-out");
}

requestAnimationFrame(animate);
