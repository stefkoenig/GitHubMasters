var express = require('express')
,			app		= express()
,	 	logger	= require('morgan')
,bodyParser = require('body-parser')
, mongoose	= require('mongoose')
, ejs       = require('ejs')
, ejsLayouts= require('express-ejs-layouts')

//app configuration
app.set('view engine', 'ejs')

//establishes connection to MongoDB
mongoose.connect('mongodb://localhost/') //location of db

//track requests made to the app
app.use(logger('dev')) //middleware software that runs before other software. in this instance we want to log data on the user before they visit the page.

//makes json object available in requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//create the root route
app.get('/', function(req,res){
	res.send('Welcome to the Hizzy')
})

//import user routes
var userRoutes = require('./routes/user_routes.js')
app.use('/users', userRoutes)
app.listen(3000)
console.log('Server is running on 3000')
