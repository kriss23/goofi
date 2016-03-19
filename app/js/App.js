var React = require('react');
var ReactDOM = require('react-dom');
var Video = require('./Video');
var Overlay = require('./Overlay')

var App = React.createClass({
    render: function () {
        return (
            <Video />,
            <Overlay />
        );
    }
});

module.exports = App;

