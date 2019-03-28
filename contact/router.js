'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Contact} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.use(jsonParser);

router.post('/',(req,res) => {
	//test req
	console.log('res',req.body)
	console.log('res',JSON.parse(req))
	Contact.create({
	firstName : req.body.firstName,
	lastName : req.body.lastName,
	streetAddress: req.body.streetAddress,
	unit: req.body.unit,
	city: req.body.city,
	zipCode : req.body.zipCode,
	USstate: req.body.USstate,
	phoneNumber : req.body.phoneNumber,
	email : req.body.email,
	notes: req.body.notes
	})
	.then(contactInfo => {
		return res.sendStatus(201).json(contactInfo).send();
	})
	.catch(err => {
		return res.sendStatus(500).json(err).send();
	});
});

module.exports = {router};