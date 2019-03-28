'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const contactSchema = new mongoose.Schema({
	firstName : String,
	lastName : String,
	streetAddress: String,
	unit: String,
	city: String,
	zipCode: String,
	USstate: String,
	phoneNumber: String,
	email: String,
	notes: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {Contact}