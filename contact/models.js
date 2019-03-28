'use strict';
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	firstName : {
		type: String
	},
	lastName : {
		type: String
	},
	streetAddress: {
		type: String
	},
	unit: {
		type: String
	},
	city: {
		type: String
	},
	zipCode : {
		type: String
	},
	USstate: {
		type: String
	},
	phoneNumber : {
		type: String
	},
	email : {
		type : String
	},
	notes: {
		type : String
	}
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = {Contact}