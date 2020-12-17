const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

const userSchema = new Schema({
	creditorName: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	minPaymentPercentage: {
		type: Number,
		required: true
	},
	balance: {
		type: Number,
		required: true
	},
	id: {
		type: ObjectID,
		required: false
	},
})

module.exports = mongoose.model("User", userSchema, "USER_COLLECTION")