const { fork } = require('child_process');
const path = require('path');
const child = fork(path.resolve(__dirname, 'test-child.js'), [ path.resolve(__dirname, 'video.h264') ])

child.on('message', (message) => {
  console.log(`Message from child: ${ JSON.stringify(message, null, 2) }`);
});

child.on('error', (error) => {
  console.log(`Error from child: ${ JSON.stringify(error, null, 2) }`);
});

child.send({});
