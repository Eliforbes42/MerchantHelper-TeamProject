'user strict'
var ObjectId = require('mongodb').ObjectId;
var {insert,update} = require('./db');
// {name:"string",todo:[]}
var Player = function(player) {
    this.name = player.name;
    this.todo = player.todo;
};

Player.addPlayer = function(player, result) {
    insert(player,'players');
    result("Player '"+player.name+"' was added to the database.");
};

module.exports = {Player};