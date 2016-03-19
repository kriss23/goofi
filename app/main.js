var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./js/App');

window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {
            }
    });

    // Sample code
    var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", function(){
        box = document.querySelector('#textbox');
        box.innerHTML = box.innerHTML == "Basic" ? "Sample" : "Basic";
    });
};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
