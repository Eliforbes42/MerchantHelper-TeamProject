'user strict'
var {insertUser} = require('./db');

var User = function(user) {
    this.name = user.name;
    this.todo = user.todo;
};

User.addUser = function(user, result) {
    insertUser(user,'users',result);    
};

module.exports = {User};