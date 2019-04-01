var express = require('express');
var router = express.Router();
let mongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/mydb`;

router.get('/addUser', function(req, res) {
  res.send("Index response");
});

router.get('/getUser', function(req, res) {
  mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db('mydb');
    console.log(req.query);
    dbo.collection("users").find({name: req.query.user}).toArray(function(err, res1) {
        if(err) {
            throw err;
        } else{
          res.send(res1);
        }
    });
    
});
});
module.exports = router;