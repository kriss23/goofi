var React = require('react');
var ReactDOM = require('react-dom');
var Video = require('./Video');
var Overlay = require('./Overlay');
var Map = require('./Map');

var App = React.createClass({
    pullingTimer: null,
    active: false,
    getDefaultProps: function () {
        return {
            baseApiUrl: 'http://localhost:3000'
        }
    },
    getInitialState: function() {
        return {
            videoSrc: null,
            ad: null,
            adOn: false
        }
    },
    componentDidMount: function() {
        this.initSocketConnection();
        this.initApi();
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.adOn) {
            // if ad is on dont do the pulling
        }
    },
    initSocketConnection: function () {
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
    initApi: function () {
        this.startBackend();
        this.pullingTimer = setInterval(this.startPulling.bind(this), 1000);
    },
    startBackend: function () {
        var self = this;
        $.get( this.props.baseApiUrl + "/start", function( data ) {
            $( ".result" ).html( data );
            if (data && data.state === 'started') {
                self.setState({videoSrc: data.msg.video});
            }
            console.log("starting backend at timecode 0")
        });
    },
    startPulling: function () {
        var self = this;
        $.get( this.props.baseApiUrl + "/getLastMessage", function( data ) {
            var type = data.msg.data.type,
                active = data.msg.data.active;

            if (active) {
                this.active = true;

                self.setState({
                    ad: type,
                    adOn: true
                });
            } else {
                self.setState({
                    ad: null,
                    adOn: false
                });
                this.active = false;
            }
            if (data.msg.data.videoSrc) {
                self.setState({videoSrc: data.msg.data.videoSrc});
            }
            console.log(this.active);
        });
    },

    render: function () {
        var overlay;
        switch (this.state.ad) {
            case 'geo':
                overlay = <Overlay type="geo" />;
                break;
            case 'ad':
                overlay = <Overlay type="ad" />;
                break;
        }
        return (
            <div className="app">
                <Video videoSrc={ this.state.videoSrc }/>
                { overlay }
            </div>
        );
    }
});

module.exports = App;
