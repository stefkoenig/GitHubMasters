var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
   user_name: String
  ,email: String
  ,friends: []
  ,age: Number
})

userSchema.methods.info = function(){
  console.log('My username is: ' + this.user_name + '. I am' + this.age + ' years young.')
}

var User = mongoose.model('User', userSchema)

module.exports = User
