'use strict';


angular.module('editorialDashboardApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $http) {
    var broadcaster_list_url_all = "http://vion-stage.mixd.tv/epg/DMB/broadcasters/?api_key=d57cb0b3-19a5-5383-bb58-a6c9d3e8ab92&format=json";
    var now_on_tv_url_header = "http://vion-stage.mixd.tv/epg/DMB/now/"
    // local test
    // var broadcaster_list_url_all = "http://localhost:3000/vion-stage/epg/DMB/broadcasters/?api_key=d57cb0b3-19a5-5383-bb58-a6c9d3e8ab92&format=json"
    // var now_on_tv_url_header = "http://localhost:3000/vion-stage/epg/DMB/now/"
    var now_on_tv_url_trailer = "/?api_key=d57cb0b3-19a5-5383-bb58-a6c9d3e8ab92&format=json"

    $scope.getBroadcasters = function(broadcaster_list_url){
        $http.get(broadcaster_list_url, {cache: true})
            .success(function(data) {
                if (data.result === 'success') {
                    $scope.broadcasters = []
                    for (var i = 0; i < data.msg.length; i++) {
                        data.msg[i].counter = i+1
                        data.msg[i].now_url = now_on_tv_url_header + data.msg[i].epgId + now_on_tv_url_trailer
                        $scope.broadcasters.push(data.msg[i])
                        console.log("adding " + data.msg[i].title)

                        $http.get(data.msg[i].now_url, {cache: true})
                            .success(function(broadcast_data) {
                                if (data.result === 'success') {
                                    if (broadcast_data.msg[0]){
                                        var now_title = broadcast_data.msg[0].title
                                    } else {
                                        var now_title = "MISSING!"
                                    }
                                } else {
                                    var now_title = "ERROR!"
                                }
                                for (var j = 0; j < $scope.broadcasters.length; j++) {
                                    if ($scope.broadcasters[j].epgId == broadcast_data.epgId){
                                        $scope.broadcasters[j].now_on_tv = now_title
                                    }
                                }
                            }
                        )
                    }
                    $scope.broadcasters.sort(function(first, second) {
                        if(first.name < second.name) return -1;
                        if(first.name > second.name) return 1;
                        return 0;
                    });
                }
            }
        );
    }

    // INIT STUFFF ///////////////////////////////////////////////////////////////////////
    $scope.getBroadcasters(broadcaster_list_url_all);
});
