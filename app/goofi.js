'use strict';

// Declare app level module which depends on views, and components
angular.module('editorialDashboardApp', [
  'ngRoute',
  'editorialDashboardApp.tv_view',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/tv_view'});
}]);
