window.init = function () {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var App = require('./js/App');

    ReactDOM.render(
    <App />,
        document.getElementById('main')
    );


    console.log('hello');

}

setTimeout(init, 500);