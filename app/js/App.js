var React = require('react');
var ReactDOM = require('react-dom');
var Video = require('./Video');

var App = React.createClass({
    render: function () {
        return (
            <Video />
        );
    }
});

module.exports = App;

