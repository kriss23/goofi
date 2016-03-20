var React = require('react');
var ReactDOM = require('react-dom');

function getContentMatchingKeywords(keywords) {
    var combinedKeywords = "";
    for (var i = 0; i < keywords.length; i++) {
        combinedKeywords += keywords[i];
        if (i != 0) { combinedKeywords += "+AND+" }
    }
    return $.get('http://hack.api.uat.ebmsctogroup.com/stores-active/contentInstance/event/search?query="+combinedKeywords+"&numberOfResults=1000&api_key=240e4458fc4c6ac85c290481646b21ef', function(data) {
        return data;
    })
}

var Recommend = React.createClass({

    componentDidMount: function() {
        var wasRecommendationUpdatedRecently = 0

        function startBackend() {
            $.get( "/start", function( data ) {
                $( ".result" ).html( data );
                console.log("starting backend at timecode 0")
            });
        }

        function pollApi() {
            $.get( "/getLastMessage", function( data ) {
                $( ".result" ).html( data );

                if (data.msg.data.type == "subtitle") {


                    var keywords = data.msg.data.text.split(" ");

                    var shows = this.getContentMatchingKeywords(keywords);
                    var selectedShow = show[0];

                    var relevantTextDetail;
                    var textDetails = shows[0].document.searchableTextItems;
                    for (var j = 0; j < textDetails.length; j++) {
                        var allKeywordsMatch = true;
                        for (var k = 0; k < keywords.length; k++) {
                            if (!textDetails.contains(keyword[k])) {
                                allKeywordsMatch = false;
                                break;
                            }
                        }
                        if (allKeywordsMatch) {
                            relevantTextDetail = textDetails[j];
                            break;
                        }
                    }

                    if (relevantTextDetail) {
                        $("#recommend_div").show();
                        $("#recommend_div").innerHTML = "The following show could interest you:<br/>"+relevantTextDetail;
                        wasRecommendationUpdatedRecently = 5
                    }
                }


            });

            if (wasRecommendationUpdatedRecently >= 5){
                // hide after 5 seconds
                $( "#recommend_div" ).hide()
            }

            wasRecommendationUpdatedRecently += 1;
            setTimeout(pollApi, 1000);
        }

        startBackend();
        $( "#recommend_div" ).hide();

        setTimeout(pollApi, 1000);

    },

    render: function () {
        return (
            <div className="recommend">
                <div id="recommend_div">
                </div>
            </div>
        );
    }
});

module.exports = Recommend;

