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
purpose: Adds a todo item to the user's list.
example get url: http://localhost:5000/api/users/addTodo?user=User1
example body: {"id": "7", "description":"test insert", "title": "test", "completed": false,"location": null}

Parameters:
1. "user", the users username (string)
Body:
1. a JSON object of the ToDo item to be inserted

example response:
{
    "n": 1,         -- this is the number of documents that matched the search criteria
    "nModified": 1, -- this is the number of documents modified
    "ok": 1         -- boolean success/failure to update
}
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

purpose: Marks a todo as completed.
example get url: http://localhost:5000/api/users/todoCompleted?user=User1&todoId=7

Parameters:
1. "user", the users username (string)
2. "todoId", the id of the todo item to be updated (string)

example response:
{
    "n": 1,         -- this is the number of documents that matched the search criteria
    "nModified": 1, -- this is the number of documents modified
    "ok": 1         -- boolean success/failure to update
}
*/
router.get('/todoCompleted', function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db('mydb');
    dbo.collection("users").update({name: req.query.user, "todo.id":req.query.todoId},{$set: {"todo.$.completed":true}},function(err, res1) {
        if(err) {
            throw err;
        } else{
          res.send(res1);
        }
    }); 
  });
});
module.exports = router;