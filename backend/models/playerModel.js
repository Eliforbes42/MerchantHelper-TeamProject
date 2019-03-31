'user strict'
var ObjectId = require('mongodb').ObjectId;
var {insert,update,select} = require('./db');
// {name:"string",todo:[]}
var User = function(user) {
    this.name = user.name;
    this.todo = user.todo;
};

User.addUser = function(user, result) {
    //select('name',user.name,'players').then((logg)=>{console.log(logg);});
    //console.log({getRes});
    //TODO-Promisify to check for existing player
    insert(user,'players');
    result("User '"+user.name+"' was added to the database.");
};

module.exports = {User};