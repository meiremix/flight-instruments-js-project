const readline = require('readline');
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3001');
let altitude;
let adi;
let his;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


ws.on('open', () => {
  console.log('Connected to the GUI program.');

  askValue("altitude", 0, 3000, (altitudeValue) => {
    altitude = altitudeValue;

    askValue("his", 0, 360, (hisValue) => {
      his = hisValue;

      askValue("adi", -100, 100, (adiValue) => {
        adi = adiValue;

        const data = JSON.stringify({ altitude, his, adi });
        ws.send(data);
        rl.close();
      });
    });
  });
});

function askValue(name, min, max, callback) {
  rl.question(`Enter the ${name} value (${min}-${max}): `, (value) => {
    if (isNaN(value) || value < min || value > max || value == "") {
      console.log("Incorrect input");
      askValue(name, min, max, callback);
    } else {
      callback(value);
    }
  });
}
