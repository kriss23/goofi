var React = require('react');
var ReactDOM = require('react-dom');

var Video = React.createClass({
    render: function () {
        var videoSrc = this.props.videoSrc,
            video = <div></div>;
        if (videoSrc) {
            video = <video muted autoPlay src="http://images.mixd.tv/GNTM.mp4" type="video/mp4"></video>;
        }
        return (
            video
        );
    }
});

module.exports = Video;