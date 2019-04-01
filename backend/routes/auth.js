var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/getUser', function(req, res) {
    console.log(req.body);
    request.post('https://github.com/login/oauth/access_token',{json:{
        "client_id":"06e862791312dfd72480",
        "client_secret": "4160078d4f864ec99533255daf1fc777fe5a4902",
        "code": `${req.body.code}`
    }}, (err, response, body)=>{
        const options = {
            url: 'https://api.github.com/user',
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `token ${body.access_token}`,
                'user-agent': 'node.js'
            }
        };
        request(options,(status, response, body)=>{
            const result = {username: JSON.parse(body)['login']};
            console.log(result)
            res.send(result);
        });
    });
});

module.exports = router;