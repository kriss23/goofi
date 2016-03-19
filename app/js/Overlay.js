var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./Map');

var Overlay = React.createClass({
    render: function () {
        return (
            <div className="overlay">
                <Map />
                <img className="moving-car" src="image/GNTM-overlay-keyvisual.png" />
                <img className="car-logo" src="image/GNTM-overlay-logo.png" />
            </div>
        );
    }
});

module.exports = Overlay;
