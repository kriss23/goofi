var Oauth = require('oauth');
var textArray = [],
    textString,
    userIsInterested = false;

var oauth = new Oauth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'aEbD8QeO0rimGOMbE3CpwfgxO',
    'z6nooCjOhUmFbQoxm0p73WL2HC1G7R6u5EEA8RPsShL00r2mGw',
    '1.0A',
    null,
    'HMAC-SHA1'
);

oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json?count=100&user_id=dimified&screen_name=dimified',
    '492083552-Q68W0j2twhfZqekJ4jOqQR3zXj4AYJsO2ZuVzTaB',
    'gMZfonK93BQDC5mAbLNKBp5hqrTp5pM9DdliADeIZv81p',
    function (e, data) {
        if (e) console.error(e);

        JSON.parse(data).forEach(function (obj) {
            textArray.push(obj.text);
        });

        textString = textArray.join(',').toLowerCase();

        if (textString.indexOf('opel') > -1 ||
            textString.indexOf('adam') > -1 ) {
            userIsInterested = true;
        }
    }
);

module.exports = userIsInterested;