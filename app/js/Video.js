var React = require('react');
var ReactDOM = require('react-dom');

var Video = React.createClass({
    render: function () {
        return (
            <video muted autoPlay src="http://images.mixd.tv/GNTM.mp4" type="video/mp4"></video>
        );
    }
});

module.exports = Video;