var React = require('react');
var ReactDOM = require('react-dom');

var Map = React.createClass({
    componentDidMount: function() {
        // set el height and width etc.
        var isNewCoordinate = true
        var wasEarthUpdatedRecently = 0
        var lastLatitude = 46.8011
        var lastLongitude = 8.2266
        var self = this;

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
            earth.setView([46.8011, 8.2266], 0.5);
        }

        function pollApi() {
            $.get( self.props.baseApiUrl + "/getLastMessage", function( data ) {
                $( ".result" ).html( data );

                if (data.msg.data.type == "geo"){
                    if (isNewCoordinate) {
                        var newLatitude = data.msg.data.lat
                        var newLongitude = data.msg.data.long
                        var goalTime = 0;

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

                    console.log("Got Coordinates lat: " + data.msg.data.lat);
                    console.log("Got Coordinates long: " + data.msg.data.long);
                    $( "#earth_div" ).show();
                    wasEarthUpdatedRecently = 0
                } else {
                    isNewCoordinate = true
                }

            });

            if (wasEarthUpdatedRecently >= 4){
                // hide after 5 seconds
                $( "#earth_div" ).hide()
            }

            wasEarthUpdatedRecently += 1;
            setTimeout(pollApi, 1000);
        }

        initializeEarth();
        $( "#earth_div" ).hide();

        setTimeout(pollApi, 1000);
    },

    render: function () {
        var image;
        if (this.props.ad.filter.indexOf('indien') > -1) {
            image = <img className="image" src="image/Overlay-India.png" />;
        }
        if (this.props.ad.filter.indexOf('venezuela') > -1) {
            image = <img className="image" src="image/Overlay-Venezuela.png" />;
        }
        return (
            <div className="map">
                { image }
                <div id="earth_div">
                </div>
            </div>
        );
    }
});

module.exports = Map;