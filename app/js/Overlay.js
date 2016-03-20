var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./Map');

var Overlay = React.createClass({

    render: function () {
        var content;
        if (this.props.type === 'ad') {
            content = <div className="content">
                <img className="moving-car" src="image/GNTM-overlay-keyvisual.png" />
                <img className="car-logo" src="image/GNTM-overlay-logo.png" />
            </div>;
        }

        if (this.props.type === 'geo') {
            content = <Map />;
        }

        return (
            <div className="overlay">
                { content }
            </div>
        );
    }
});

module.exports = Overlay;
