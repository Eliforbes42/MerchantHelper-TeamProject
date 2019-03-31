const {User} = require('../models/playerModel');
var express = require('express');
var router = express.Router();

router.get('/addUser', function(req, res) {
  if(req.query.name != null){
    var newUser = new User({name:req.query.name,todo:[]});
    User.addUser(newUser, function(err,result){
      if(err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } else {
    res.send("Error: No user to insert, name not provided.");
  }    
});

router.get('/getUser', function(req, res) {
    res.send("Index response");
  });

module.exports = router;