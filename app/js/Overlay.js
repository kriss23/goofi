var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./Map');
var Recommend = require('./Recommend');

var Overlay = React.createClass({
    render: function () {
        return (
            <div className="overlay">
                <Map />
                <Recommend />
                <img className="moving-car" src="image/GNTM-overlay-keyvisual.png" />
                <img className="car-logo" src="image/GNTM-overlay-logo.png" />
            </div>
        );
    }
});

module.exports = Overlay;
