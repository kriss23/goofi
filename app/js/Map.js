var React = require('react');
var ReactDOM = require('react-dom');

var Map = React.createClass({

    componentDidMount: function() {
        // set el height and width etc.

        var wasEarthUpdatedRecently = 0
        var lastLatitude = 46.8011
        var lastLongitude = 8.2266

        var earth;
        function initializeEarth() {
            earth = new WE.map('earth_div');
            earth.setView([lastLatitude, lastLongitude], 0.2);
            WE.tileLayer('http://data.webglearth.com/natural-earth-color/{z}/{x}/{y}.jpg', {
                      tileSize: 256,
                      bounds: [[-85, -180], [85, 180]],
                      minZoom: 0,
                      maxZoom: 16,
                      attribution: 'WebGLEarth example',
                      tms: true
                    }).addTo(earth);
            // Start a simple rotation animation
            var before = 0;

            console.log("HEHRREE");
            earth.setView([46.8011, 8.2266], 0.2);
        }

        initializeEarth();
        $( "#earth_div" ).hide();

    },

    componentDidUpdate: function (prevProps, prevState) {
        if (prevProps.data.lat !== this.props.data.lat) {
            var newLatitude = this.props.data.lat;
            var newLongitude = this.props.data.long;
            var goalTime = 0;
            var isNewCoordinate = true;

            function requestAnimationFrame() {
                var c = earth.getPosition();
                if (isNewCoordinate){
                    goalTime = Date.now() + 3000
                }
                var timeLeft = goalTime - Date.now();
                if (timeLeft < 0){
                    timeLeft = 0
                    lastLatitude = newLatitude
                    lastLongitude = newLongitude
                    return
                }

                console.log("now: " + Date.now() + " - timeLeft" + timeLeft)

                earth.setCenter([
                    lastLatitude + ((newLatitude - lastLatitude) * (1 - (0.0005 * timeLeft))),
                    lastLongitude + ((newLongitude - lastLongitude) * (1 - (0.0005 * timeLeft))),
                ]);
                setTimeout(requestAnimationFrame, 25); // 50 Hz
            };
            requestAnimationFrame()
            isNewCoordinate = false
        }

        console.log("Got Coordinates lat: " + this.props.data.lat);
        console.log("Got Coordinates long: " + this.props.data.long);
        $( "#earth_div" ).show();
    },

    render: function () {
        return (
            <div className="map">
                <div id="earth_div">
                </div>
            </div>
        );
    }
});

module.exports = Map;
