window.init = function () {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var App = require('./js/App');

    ReactDOM.render(
        <App />,
        document.getElementById('main')
    );

}

setTimeout(init, 500);
