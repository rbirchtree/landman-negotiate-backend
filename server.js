'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const {router: userRouter} = require('./users');
const {router: countactRouter} = require('./contact');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL } = require('./config');

/*mongoose.connect(DATABASE_URL).then(() => {
  console.log('able to connect');
*/
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});


app.use('/api/contact/', countactRouter);


app.use('*',(req,res) => {
  return res.sendStatus(404).json({message: 'Not Found'});
});

/*app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});*/

//}).catch(err => console.log('not able to connect', err));

let server;
function runServer(databaseUrl, port = PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
