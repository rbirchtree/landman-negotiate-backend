'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {Contact} = require('./models');

const router = express.Router();
const jsonParser = bodyParser.json();

router.use(jsonParser)

router.post('/',(req,res) => {
	//test req

	console.log('req what',req.body);
	const requiredField = ['lastName','firstName','streetAddress','unit','city','zipCode','USstate','phoneNumber','email','notes'];
	const missingField = requiredField.find(field =>!(field in req.body));
	
	Contact.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		streetAddress: req.body.streetAddress,
		unit: req.body.unit,
		city: req.body.city,
		zipCode: req.body.zipCode,
		USstate: req.body.USstate,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		notes: req.body.notes
	})
	.then( success => {
		return res.sendStatus(201).send();
	})
	.catch(err => {
		return res.sendStatus(500).send();
	});
});

module.exports = {router};