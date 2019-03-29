var express = require('express');
var router = express.Router();

router.get('/addUser', function(req, res) {
  res.send("Index response");
});

router.get('/getUser', function(req, res) {
    res.send("Index response");
  });

module.exports = router;