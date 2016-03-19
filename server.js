var express = require('express')
var bodyParser = require('body-parser')

var timecode = 0
var is_timeout_running = false


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Helper functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var timeoutMethod = function () {
    timecode += 1
    setTimeout(timeoutMethod, 1000);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var app = express()

app.use(bodyParser.json())

app.get('*', function(req, res, next){
    next();
});

app.get('/', function(req, res) {
    res.sendfile('app/index.html')
})

app.get('/start/', function(req, res) {
    /*
    var fs = require('fs');
    var json_response = JSON.parse(fs.readFileSync('demo_data/broadcasters.json', 'utf8'));
    */

    if (!is_timeout_running){
        is_timeout_running = true
        console.log("BLUAGG")
        setTimeout(timeoutMethod, 1000);
    }

    var json_response = {
        "state": "started",
        "data": "restarted from " + timecode
    }
    timecode = 0

    res.json(json_response);
})

app.get("/*",function(req,res){
  res.sendfile('./'+req.path);
});


app.listen(3000, function(){
    console.log('Server listening on', 3000)
});
