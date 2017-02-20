'use strict';

//check login
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in
    }
    else{
        //not signed in
        window.location = '~/index.html';
    }
});

$("#btnLogout").click(
    function(){
        firebase.auth().signOut().then(function(){
            //successfully log out
        }, function (error) {
        });
    }
);
angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/profile.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', [function() {



}]);
