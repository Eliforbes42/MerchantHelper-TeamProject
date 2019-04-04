const {User} = require('../playerModel');
var express = require('express');
var router = express.Router();
let mongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/mydb`;

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

/*
example get url: http://localhost:5000/api/users/getUser?user=User1
this assumes:
1. the mongoDB database is named "mydb"
2. the collection is called "users"
3. url passes a parameter called "user" which is the name of the user

example response:
[
    {
        "_id": "5ca1780cf4e003274804047d",
        "name": "User1",
        "todo": "[]"
    }
]
*/
router.get('/getUser', function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db('mydb');
    dbo.collection("users").find({name: req.query.user}).toArray(function(err, res1) {
        if(err) {
            throw err;
        } else{
          res.send(res1);
        }
    }); 
  });
});
/*
adds a todo item to the user's list
*/
router.post('/addTodo', function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db('mydb');
    dbo.collection("users").update({name: req.query.user},{$push: {"todo":req.body}},function(err, res1) {
        if(err) {
            throw err;
        } else{
          res.send(res1);
        }
    }); 
  });
});
/*
marks a todo as completed
*/
router.post('/todoCompleted', function(req, res) {

});
module.exports = router;