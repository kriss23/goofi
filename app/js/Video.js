var React = require('react');
var ReactDOM = require('react-dom');

var Video = React.createClass({
    render: function () {
        var videoSrc = this.props.videoSrc,
            video = <div></div>;
        if (videoSrc) {
            video = <video muted autoPlay src={ videoSrc } type="video/mp4"></video>;
        }
        return (
            video
        );
    }
});

module.exports = Video;