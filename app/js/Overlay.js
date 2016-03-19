var React = require('react');
var ReactDOM = require('react-dom');

var Overlay = React.createClass({
    render: function () {
        return (
            <div className="overlay">
                <div className="overlay__text">
                    <p className="fading-text">Finde deinen Adam-Style.</p>
                </div>
                <div className="overlay__image">
                    <img className="moving-car" src="app/image/opel-adam-grey.png" />
                </div>
            </div>
        );
    }
});

module.exports = Overlay;
