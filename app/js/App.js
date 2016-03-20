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
            baseApiUrl: 'http://10.100.105.108:3000'
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
        document.addEventListener('keydown', this.handleOnKeyDown);
    },
    handleOnKeyDown: function () {
        console.log('handle on key down');
        if (this.state.ad) {
            console.log(this.state.ad.mobile);
            if (window.channel) {
                console.log('Channel is ready, trying to push ');
                window.channel.publish('say',
                    {
                        img: 'https://data.motor-talk.de/data/galleries/0/6/7618/48882008/opel-adam-02-3558568649803261659.jpg',
                        lnk: 'http://www.opel.de/fahrzeuge/modelle/personenwagen/adam/index.html'
                    }
                )
            }
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
                    ad: data.msg.data,
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
        if (this.state.ad){
            switch (this.state.ad.type) {
                case 'geo':
                    overlay = <Overlay baseApiUrl={ this.props.baseApiUrl } ad={this.state.ad} />;
                    break;
                case 'ad':
                    overlay = <Overlay baseApiUrl={ this.props.baseApiUrl } ad={this.state.ad} />;
                    break;
            }
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