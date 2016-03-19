'use strict';

// Declare app level module which depends on views, and components
angular.module('editorialDashboardApp', [
  'ngRoute',
  'editorialDashboardApp.view1',
  'editorialDashboardApp.view2',
  'editorialDashboardApp.playlist_iframe',
  'editorialDashboardApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
