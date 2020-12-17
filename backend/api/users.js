const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

const User = require('../models/user');

router.get('/', (req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => console.log(err))
})

router.get('/creditorNameLookup/:name', (req, res) => {

	const { name } = req.params;
	User.find({ creditorName: name })
		.then(users => res.json(users))
		.catch(err => console.log(err))
})


router.post('/', (req, res) => {
	const {
		creditorName, firstName, lastName, minPaymentPercentage, balance } = req.body;

	User.create({
		creditorName, firstName, lastName, minPaymentPercentage, balance, id: ObjectID()
	})
		.then(() => res.json({
			message: "Created account successfully"
		}))
		.catch(err => res.status(400).json({
			"error": err,
			"message": "Error creating account"
		})
		)
})


router.put('/:id', (req, res) => {
	const { id } = req.params;
	User.findOneAndUpdate({_id: ObjectID(id)}, {$set: req.body})
		.then(() => res.json({
			message: "Changed Account Successfully"
		}))
		.catch(err => res.status(400).json({
			"error": err,
			"message": "Error changing account"
		})
		)
})


router.delete('/:id', (req, res) => {
	const {
		id } = req.params;

	User.findOneAndDelete({
		_id: id
	})
		.then(() => res.json({
			message: "Deleted account successfully"
		}))
		.catch(err => res.status(400).json({
			"error": err,
			"message": "Error deleting account"
		})
		)
})


router.get('/search', (req, res) => {
	User.find({ $and: [{ balance: { $gt: 2000 } }, { minPaymentPercentage: { $lt: 29.99 } }] })
		.then(users => res.json(users))
		.catch(err => res.status(400).json({
			"error": err,
			"message": "Accounts not found"
		})
		)
})


module.exports = router 