// So many users! Are site is blowing up!
var User = require('../models/user.js')

//create index action to display all users
function index(req,res){
	User.find({}, function(err,users){
		if(err) console.log(err)
		res.json(users)
	})
}

//create show action for a single user
function show(req,res){
	User.findById(req.params.user_id, function(err,user){
		if(err) console.log(err)
		res.json(user)
	})
}

//method to create a user
function create(req,res){
	console.log('Creating a user')
	var user = new User(req.body.user)

	user.user_name = req.body.username
	user.email = req.body.email

	user.save(function(err){
		if(err){
			if(err.code == 11000){
				return res.json({success: false, message: 'username already exists' })
			} else {
				res.send(err)
			}
		}
		res.json({success: true, message: 'User created, Wahey!'})
	})
}

function update(req, res){
	// update a single user -- update
	User.findById(req.params.user_id, function(err, user){
		if(err) res.send(err)

		if(req.body.user.user_name) user.user_name = req.body.user.user_name
		if(req.body.user.email) user.email = req.body.user.email
		if(req.body.user.age) user.age = req.body.user.age

		user.save(function(err){
			if(err) res.send(err)
			res.json({success: true, message: 'you have been updated!'})
		})
	})
}

function destroy(req, res){
	// delete a single user -- destroy
	User.findOneAndRemove({_id: req.params.user_id}, function(err, user){
		if(err) res.send(err)
		res.json({success: true, message: 'User: ' + user.user_name + ' deleted!'})
	})
}

module.exports = {
	index: index
	,show: show
	,create: create
	,destroy: destroy
	,update: update
}
