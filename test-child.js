// This module is responsible for capturing videos

'use strict';

const PiCamera = require('./index');
const myCamera = new PiCamera({
  mode: 'video',
  output: process.argv[2],
  width: config.get('1920'),
  height: config.get('1080'),
  timeout: config.get('5000'),
  nopreview: true,
});

process.on('message', (messageFromParent) => {
  setTimeout(() => {
    myCamera.record()
      .then((message) => {
        process.send('Video capture was successful');

        process.send({
          result: 'success',
          message,
          error: null,
        });
      })
      .catch((error) => {
        process.send('Video capture failed');

        process.send({
          result: 'failure',
          message: null,
          error,
        });
      });
  }, 500);
});