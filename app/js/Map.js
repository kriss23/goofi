var React = require('react');
var ReactDOM = require('react-dom');

var Map = React.createClass({
    componentDidMount: function() {
        var el = $(this.getDOMNode());
        // set el height and width etc.

        var earth;
        function initialize() {
            earth = new WE.map('earth_div');
            earth.setView([46.8011, 8.2266], 0.2);
            WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                attribution: ''
            }).addTo(earth);

            // Start a simple rotation animation
            var before = null;

            console.log("HEHRREE")

            requestAnimationFrame(function animate(now) {
                var c = earth.getPosition();
                var elapsed = before? now - before: 0;
                before = now;
                earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
                requestAnimationFrame(animate);
            });
        }

        function pollApi() {
            setTimeout(pollApi, 1000);
            // console.log("poloing API :-)")
        }

        initialize()
        setTimeout(pollApi, 1000);
    },

    render: function () {
        return (
            <div className="overlay">
                <div className="map">
                    <div id="earth_div">
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Map;
