const {Island} = require('../islandModel');
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

router.post('/getAnimals', function(req, res){
  console.log("In islands.js");
  let animalsArray = []
  if(req.body.locale != null){
    if(req.body.animals[0] != null){
      animalsArray.push(req.body.animals[0]);
      if(req.body.animals[1] != null){
        animalsArray.push(req.body.animals[1]);
      } 
      if(req.body.animals[2] != null){
        animalsArray.push(req.body.animals[2]);
      }
      
      Island.getAnimals(animalsArray, req.body.locale, function(err, result){
        if(err){
          res.send(err);
        } else{
          res.json(result);
        }
      });
    } else {
      res.send("Error: Cannot get optimal locations for animals because there were no animals proided.");
    }
  } else {
    res.send("Error : Cannot get optimal locations for animals because locale was not provided.");
  }
  
});
module.exports = router;