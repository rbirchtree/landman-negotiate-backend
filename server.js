'use strict';
require('dotenv').config();
const express = require('express');

const {router: userRouter} = require('./users');
const {router: countactRouter} = require('./contact');
//const {router: authRouter, localStrategy, jwtStrategy } = require('./auth');
//const {router: ping } = require('./');

const {PORT, DATABASE_URL } = require('./config');

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

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});