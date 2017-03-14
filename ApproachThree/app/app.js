'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'profile',
  'config',
  'approach3',
  'teaminfo'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
