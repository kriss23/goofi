var React = require('react');
var ReactDOM = require('react-dom');
var Video = require('./Video');
var Map = require('./Map')
var Overlay = require('./Overlay')

var App = React.createClass({
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
