'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {type: String, default: ''},
	lastName: {type: String, default:''}
});

UserSchema.methods.validatePassword = (password => {
	return bcrypt.compare(password, this.password);
});

UserSchema.statics.hashPassword = (password) => {
	return bcrypt.hash(password,10);
};
//used es6 might need to convert to es5 lines 21-25
UserSchema.methods.serialize = function(){
	return {
		username: this.username || '',
		firstName: this.firstName || '',
		lastName: this.lastName || ''
	};
};


const User = mongoose.model('User', UserSchema);

module.exports = {User};