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
            baseApiUrl: 'http://goofi.mixd.tv:3000'
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
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.adOn) {
            // if ad is on dont do the pulling
        }
    },
    handleOnKeyDown: function () {
        console.log('handle on key down');
        if (this.state.data) {
            if (window.channel) {
                console.log('Channel is ready, trying to push ');
                window.channel.publish('say',
                    {
                        img: 'http://nude-girls.pics/sll/thumbs/ff/317548.jpg',
                        lnk: 'http://google.com'
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

            /*channel.on('clientConnect', function(client){
                channel.publish('say', 'Hello '+client.attributes.name, client.id);
            });*/

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

            if (data.msg.data.active) {
                this.active = true;

                self.setState({
                    data: data.msg.data,
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
        var ad;
        if (this.state.data) {
            switch (this.state.data.type) {
                case 'geo':
                    ad = <Map data={ this.state.data }/>;
                    break;
                case 'ad':
                    ad = <Overlay />
                    break;
            }
        }
        return (
            <div className="app">
                <Video videoSrc={ this.state.videoSrc }/>
                {ad}
            </div>
        );
    }
});

module.exports = App;
