'user strict'
var ObjectId = require('mongodb').ObjectId;
var {insert,insertUser,update,select} = require('./db');
// {name:"string",todo:[]}
var User = function(user) {
    this.name = user.name;
    this.todo = user.todo;
};

User.addUser = function(user, result) {
    //TODO-Promisify to check for existing player
    var insertRes = insertUser(user,'players');
    console.log({insertRes});
    if(insertRes != "Success"){
        result("User '"+user.name+"' was added to the database.");
    } else {
        result("Failed to add User '"+user.name+"' -- Already exists in database.");
    }    
};

module.exports = {User};