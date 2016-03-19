var React = require('react');
var ReactDOM = require('react-dom');

var Map = React.createClass({
    componentDidMount: function() {
        var el = $(this.getDOMNode());
        // set el height and width etc.
        var wasEarthUpdatedRecently = 0

        var earth;
        function initializeEarth() {
            earth = new WE.map('earth_div');
            earth.setView([46.8011, 8.2266], 0.2);
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

            /*
            requestAnimationFrame(function animate(now) {
                var c = earth.getPosition();
                var elapsed = before? now - before: 0;
                before = now;
                earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
                requestAnimationFrame(animate);
            });
            */
        }

        function startBackend() {
            $.get( "/start", function( data ) {
                $( ".result" ).html( data );
                console.log("starting backend at timecode 0")
            });
        }

        function pollApi() {
            $.get( "/getLastMessage", function( data ) {
                $( ".result" ).html( data );

                if (data.msg.data.type == "geo"){
                    earth.setView([data.msg.data.lat, data.msg.data.long], 0.4);

                    console.log("Got Coordinates lat: " + data.msg.data.lat)
                    console.log("Got Coordinates long: " + data.msg.data.long)
                    $( "#earth_div" ).show()
                    wasEarthUpdatedRecently = 5
                }
            });

            if (wasEarthUpdatedRecently >= 5){
                // hide after 5 seconds
                $( "#earth_div" ).hide()
            }

            wasEarthUpdatedRecently += 1
            setTimeout(pollApi, 1000);
        }

        initializeEarth();
        startBackend();
        $( "#earth_div" ).hide()

        setTimeout(pollApi, 1000);
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
