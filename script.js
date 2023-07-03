function fetchData() {
  fetch('http://localhost:3001/data')
    .then(response => response.json())
    .then(data => updateValues(data))
    .catch(error => console.error(error));
}

function updateValues(data) {
  const altitudeElement = document.getElementById('altitude');
  const adiElement = document.getElementById('adi');
  const hisElement = document.getElementById("his");

  altitudeElement.textContent = `Altitude: ${data.altitude}`;
  adiElement.textContent = `ADI: ${data.adi}`;
  hisElement.textContent = `HIS: ${data.his}`;

  updateAdiCircleColor(data.adi);
  moveArrow(data.altitude);


setTimeout(fetchData, 2000);
}


// Fetch initial data
fetchData();




function updateAdiCircleColor(value) {
  const circle = document.getElementById("circle");
  let percentage;

  if (value >= 0) {
    percentage = (value / 200 + 0.5) * 100;
  } else {
    percentage = 100 - (((value * (-1)) / 200 + 0.5) * 100);
  }

  circle.style.background = `linear-gradient(to bottom, blue ${percentage}%, green 0%)`;
}



function moveArrow(value) {
  const input = value;
  const bar = document.getElementById('bar');
  const barArrow = document.getElementById('barArrow');
  const parse = parseFloat(value) || 0;
  const percentage = Math.min(100, (parse / 3000) * 100); // Calculate percentage value
  const barHeight = bar.clientHeight;
  const arrowHeight = barArrow.clientHeight;

  const arrowTop = (barHeight - arrowHeight) * (1 - percentage / 100); // Calculate top position of the arrow
  
  barArrow.style.top = (arrowTop - 1) + 'px'; // Set the top position of the arrow
}
