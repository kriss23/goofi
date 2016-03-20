var express = require('express')
var bodyParser = require('body-parser')

var twitterUserInterested = require('./server/UserProfile')

var isUserInterested = false

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

app.get('/getLastMessage/', function(req, res) {
    var fs = require('fs');
    var timecodes_json = JSON.parse(fs.readFileSync('timecodes.json', 'utf8'));
    var last_message = {}

    for (var i = 0; i < timecodes_json.msg.length; i++) {
        if (timecodes_json.msg[i].timecode <= timecode){
            last_message = timecodes_json.msg[i]
            //last_message.filtered = false
            //if (last_message.timecode + last_message.duration >= timecode){
              //  last_message.active = true
                //console.log("TTTT" + isUserInterested)
                // if (!isUserInterested && (
                //         last_message.filter.indexOf("opel") > -1 ||
                //         last_message.filter.indexOf("adam") > -1))
                // {
                //         last_message.filtered = true
                //         last_message.active = false
                // }
            if (last_message.timecode + last_message.duration >= timecode){
                last_message.active = true
            } else {
                last_message.active = false
            }
        }
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
        'result': 'success',
        'timecode': timecode,
        'msg': {
            'data':  last_message
        }
    });
    res.end()
})

app.get('/start/', function(req, res) {
    /*
    var fs = require('fs');
    var json_response = JSON.parse(fs.readFileSync('demo_data/broadcasters.json', 'utf8'));
    */

    console.log("TTTTT2 " + isUserInterested)
    twitterUserInterested(function(value){
        isUserInterested = value
    })
    console.log("TTTTT3 " + isUserInterested)

    if (!is_timeout_running){
        is_timeout_running = true
        setTimeout(timeoutMethod, 1000);
    }

    var json_response = {
        "state": "started",
        "msg": {
            "data": "restarted from " + timecode,
            "video": "http://images.mixd.tv/GNTM.mp4"
        }
    }
    timecode = 0
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(json_response);
    res.end()

})

app.get("/*",function(req,res){
    res.sendfile('./'+req.path);
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on ' + port)
});
