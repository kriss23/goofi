var React = require('react');
var ReactDOM = require('react-dom');
var Map = require('./Map');

var Overlay = React.createClass({

    render: function () {
        var content;
        if (this.props.ad.type === 'ad') {
            content = <div className="content">
                <img className="button" src="image/Press-Green.gif"/>
                <img className="moving-car" src="image/GNTM-overlay-keyvisual.png" />
                <img className="car-logo" src="image/GNTM-overlay-logo.png" />
            </div>;
        }

        if (this.props.ad.type === 'geo') {
            content = <Map  baseApiUrl={ this.props.baseApiUrl }  ad={ this.props.ad }/>;
        }

        return (
            <div className="overlay">
                { content }
            </div>
        );
    }
});

module.exports = Overlay;