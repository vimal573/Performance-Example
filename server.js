const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  // delay the response
  delay(9000);
  res.send(`Din ding ding! ${process.pid}`);
});

console.log('Running server.js');
if (cluster.isMaster) {
  console.log('Master Has been started...');
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log('Worker process started...');
  app.listen(3000);
}
