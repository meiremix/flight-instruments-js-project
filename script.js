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


setTimeout(fetchData, 2000);
}


// Fetch initial data
fetchData();
