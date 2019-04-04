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

/*
purpose: Returns the closest island with the desired animal(s).
single-animal example get url: http://localhost:5000/api/islands/getAnimals?locale=G10&animals=snake
multi-animal example get url: http://localhost:5000/api/islands/getAnimals?locale=G10&animals=snake&animals=chicken
-This leverages the fact that Node.js turns the multiple occurrences of the key into an array.

Parameters:
1. "locale", a pairing of the row character and column integer (string [A-Z][1-26]) Ex. G10
2. "animals", the name of the animal(s) to be found (string)

example response:
{
    "name": "Wanderer's Refuge",  --The island name where the animals were found, empty string if error.
    "locale": "G15"               --The map location of the found island, empty string if error.
    "message": "Success"          --A message showing the status of the result "Success"/"Error: ..."
}
*/
router.get('/getAnimals', function(req, res){
  console.log("In islands.js");
  var errorObj = {name:"",locale:"",message:""};
  let animalsArray = []
  if(req.query.locale != null){
    if(req.query.animals != null){
      if(typeof req.query.animals == "object"){
        if(req.query.animals[0] != null){
          animalsArray.push(req.query.animals[0]);
        } 
        if(req.query.animals[1] != null){
          animalsArray.push(req.query.animals[1]);
        } 
        if(req.query.animals[2] != null){
          animalsArray.push(req.query.animals[2]);
        }  
      } else{
        animalsArray.push(req.query.animals);
      }      
          
      Island.getAnimals(animalsArray, req.query.locale, function(err, result){
        if(err){
          res.send(err);
        } else{
          res.json(result);
        }
      });
    } else {
      errorObj.message = "Error: Cannot get optimal locations for animals because there were no animals proided.";
      res.send(errorObj);
    }
  } else {
    errorObj.message = "Error: Cannot get optimal locations for animals because locale was not provided.";
    res.send(errorObj);
  }
  
});
module.exports = router;