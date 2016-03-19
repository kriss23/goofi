var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOM = require('./Map');

var Overlay = React.createClass({
    render: function () {
        return (
            <div className="overlay">
                <img className="moving-car" src="app/image/GNTM-overlay-keyvisual.png" />
                <img className="car-logo" src="app/image/GNTM-overlay-logo.png" />
            </div>
        );
    }
});

module.exports = Overlay;
