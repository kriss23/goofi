var React = require('react');
var ReactDOM = require('react-dom');

var Overlay = React.createClass({
    render: function () {
        return (
            <div class="wrapper">
                <img id="slide" src="app/image/opel-adam-grey.png" />
            </div>
        );
    }
});

module.exports = Overlay;
