const {Island} = require('../models/islandModel');
var express = require('express');
var router = express.Router();

router.get('/getGunpowder', function(req, res) {
  if(req.query.locale != null){
    Island.getGunpowder(req.query.locale, function(err,result){
      if(err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  } else {
    res.send("Error: Cannot get gunpowder locations, locale not provided.");
  }    
});

module.exports = router;