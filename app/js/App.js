var React = require('react');
var ReactDOM = require('react-dom');
var Video = require('./Video');
var Overlay = require('./Overlay');

var App = React.createClass({
    componentDidMount: function() {
        msf.local(function(err, service){

            var channel = service.channel('com.goofi.myapp');

            channel.connect({name: 'TV'}, function (err) {
                if(err) return console.error(err);
                console.log('You are connected');
            });

            channel.on('say', function(msg, from){
                console.log(from.attributes.name + ' says, ' + msg);
            });

            channel.on('clientConnect', function(client){
                channel.publish('say', 'Hello '+client.attributes.name, client.id);
            });

            window.channel = channel;

        });
    },
    render: function () {
        return (
            <div className="app">
                <Video />
                <Overlay />
            </div>
        );
    }
});

module.exports = App;
