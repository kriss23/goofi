var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())

app.get('*', function(req, res, next){
    next();
});

app.get('/', function(req, res) {
    res.sendfile('app/index.html')
})

app.get('/broadcasters/', function(req, res) {
    var fs = require('fs');
    var json_response = JSON.parse(fs.readFileSync('demo_data/broadcasters.json', 'utf8'));
    res.json(json_response);
})

app.get("/*",function(req,res){
  res.sendfile('./'+req.path);
});


app.listen(3000, function(){
    console.log('Server listening on', 3000)
});
