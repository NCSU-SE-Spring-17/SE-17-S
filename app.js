//module
var TeamApp = angular.module('TeamApp',['ngRoute' , 'ngResource' , 'firebase']);


//Routes

TeamApp.config(function ($routeProvider , $locationProvider) {

    $routeProvider
    .when('/', {
      templateUrl:'pages/login.html',
      controller:'AuthCtrl'
    })
    .when('/:id', {
      templateUrl:'pages/home.htm',
      controller:'homeController',
    })
        .when('/:id/result', {
            templateUrl:'pages/list.htm',
            controller:'listController',
        });
     $locationProvider.hashPrefix('');
});

//services
TeamApp.factory('Auth' , function($firebaseAuth) {
var auth = $firebaseAuth();
    return auth;
});


//controllers
TeamApp.controller('AuthCtrl' ,['$rootScope','$scope', '$window','Auth','$location' ,'$firebaseArray' , '$firebaseObject',
    function($rootScope,$scope , $window,Auth, $location , $firebaseArray , $firebaseObject) {

    $scope.test = "I am login";
    var authCtrl = this;
    $scope.email = "";
    $scope.password = "";

// HELPER FUNCTION TO NAVIGATE TO PATH
   $scope.go = function (path) {
       $location.path(path);
   };

   $scope.authChanged = function () {
       console.log("in Auth Changed");
       Auth.$onAuthStateChanged( function (user) {

               console.log("Logged in as: " + user.uid);
               $scope.uid = user.uid;
               $scope.go("/"+$scope.uid);
               const dbRef = firebase.database().ref();
               const userRef = dbRef.child(user.uid);
               $scope.object = $firebaseObject(userRef) ;
               console.log($scope.object);

               //make database model


       });
   };

    $scope.login = function () {
        console.log("In Login Method");
        Auth.$signInWithEmailAndPassword($scope.email , $scope.password).then(function (auth) {
            console.log("Logged in successfully");
            $scope.authChanged();

        }, function (error) {


                console.log("Error Occured" + error.message);
            });
    };

    $scope.createUser = function () {

       $scope.user.uid = {
           "email":"",
           "name":"",
           //COMPLETE THIS HOOK IT UPTO MODEL IN MODAL. CREATE USER IS DISCONNECTED 

       }
        console.log("In create Method");
        Auth.$createUserWithEmailAndPassword($scope.email , $scope.password).then(function (auth) {
            console.log("User Created Successfully");
            //OPEN FORM AND ADD SKILL



            $scope.login();
        }, function (error) {
            console.log("Error Occured" + error.message);
        });
    };
}]);

TeamApp.controller('homeController' ,['$scope', '$route', '$routeParams' , function($scope , $route, $routeParams) {

    $scope.test = "I am Home ";
    $scope.param = $routeParams.id;
    console.log($scope.param);


}]);


TeamApp.controller('listController' ,['$scope', '$http','Service','$route', '$routeParams' ,
    function($scope , $http, Service, $route, $routeParams ) {

    $scope.test = "I am List";
    $scope.param = $routeParams.id;
    console.log($scope.param);




}]);
