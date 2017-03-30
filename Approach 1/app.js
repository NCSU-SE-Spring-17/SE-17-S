/**
 * Created by Bhaskar Sinha on 2/26/17
 */


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
            controller:'homeController'
        })
        .when('/:id/list.htm', {
            templateUrl:'pages/list.htm',
            controller:'listController'
        })
        .when('/:id/editSkills.html', {
            templateUrl:'pages/editSkills.html',
            controller:'editController'
        })
        .when('/:id/newUserDetails.html', {
            templateUrl:'pages/newUserDetails.html',
            controller:'newUserController'
        });


    $locationProvider.hashPrefix('');
});

//services

TeamApp.factory('Auth' , function($firebaseAuth) {
    var auth = $firebaseAuth();
    return auth;
});

TeamApp.factory('Ref' , function ($firebaseArray , $firebaseObject) {

    var usersRef = firebase.database().ref('');
    var users = $firebaseArray(usersRef);
    var Users = {
        getProfile: function(uid){
            return $firebaseObject(usersRef.child(uid));
        },
        getDisplayName: function(uid){
            return users.$getRecord(uid).displayName;
        },
        all: users
    };

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

            Auth.$onAuthStateChanged( function (user) {

                if(user === null){
                    $scope.go("/");
                }

                else {
                    $scope.uid = user.uid;
                    $scope.go("/" + $scope.uid);
                    const dbRef = firebase.database().ref();
                    const userRef = dbRef.child(user.uid);
                    $scope.object = $firebaseObject(userRef);
                }
            });
        };

        $scope.login = function () {
            Auth.$signInWithEmailAndPassword($scope.email , $scope.password).then(function (auth) {
                $scope.authChanged();

            }, function (error) {
                console.log("Error Occured" + error.message);
            });
        };

        $scope.createUser = function () {

            Auth.$createUserWithEmailAndPassword($scope.email , $scope.password).then(function (auth) {
                console.log("User Created Successfully");
                $scope.login();
            }, function (error) {
                console.log("Error Occured" + error.message);
            });
        };
}]);


TeamApp.controller('homeController' ,['$scope', '$route', '$routeParams', '$location' , 'Auth' , function($scope , $route, $routeParams, $location, Auth) {

    $scope.param = $routeParams.id;

    // Fetching data from firebase:

    var userId = firebase.auth().currentUser.uid;

    var phone,name,email,skills;

    firebase.database().ref(userId+'/email').on('value', function(snapshot){
        $scope.email = snapshot.val();
    });

    firebase.database().ref(userId+'/phone').on('value', function(snapshot){
        $scope.phone = snapshot.val();
    });

    firebase.database().ref(userId+'/skills').on('value', function(snapshot){
        $scope.skills = snapshot.val();
    });

    firebase.database().ref(userId+'/name').on('value', function(snapshot){
        $scope.name = snapshot.val();
    });

    $scope.redirect = function(){
        $location.path('#/list.htm');
    }

    $scope.redirect2 = function(){
        $location.path('#/editSkills.html');
    }

    $scope.redirect3 = function(){
        $location.path('#/newUserDetails.html');
    }

    $scope.signOut = function () {
        Auth.$signOut();
    }


}]);


TeamApp.controller('listController' ,['$scope', '$route', '$routeParams', '$location' , function($scope , $route, $routeParams, $location) {

    $scope.param = $routeParams.id;
    var userId = firebase.auth().currentUser.uid;

    var userEmail;

    firebase.database().ref(userId+'/email').on('value', function(snapshot){
        userEmail = snapshot.val();
    });

    $scope.searchForSkills = function(value2){

        var details = [];

        value2 = value2.toLowerCase();
        value2 = value2.trim();

        var searchSkills = value2.split(',');

        firebase.database().ref().on('value', function(snapshot){

            snapshot.forEach(function (childSnap) {

                var count=0;
                var tempSkills=[];

                for(var j=0 ; j<searchSkills.length ;j++) {
                    for (var i=0 ; i < childSnap.val().skills.length ; i++) {
                        if (childSnap.val().skills[i] == searchSkills[j] && childSnap.val().email != userEmail){
                            count++;
                            tempSkills.push(searchSkills[j]);
                        }
                    }
                }

                if (count>0 && childSnap.val().email != userEmail) {
                    var temp = [];
                    temp.push(childSnap.val().name);
                    temp.push(childSnap.val().email);
                    temp.push(childSnap.val().phone);
                    temp.push(count);
                    temp.push(tempSkills);
                    details.push(temp);
                }

            });

        });


        details.sort(sortFunction);

        function sortFunction(a, b) {
            if (a[3] === b[3]) {
                return 0;
            }
            else {
                return (a[3] > b[3]) ? -1 : 1;
            }
        }

        $scope.details = details;

    }

}]);


TeamApp.controller('editController' ,['$scope', '$route', '$routeParams', '$location' , function($scope , $route, $routeParams, $location) {

    var userId = firebase.auth().currentUser.uid;
    var skills;
    $scope.param = $routeParams.id;

    firebase.database().ref(userId+'/skills').on('value', function(snapshot){
        $scope.skills = snapshot.val();
    });

    var phone,name,email;

    firebase.database().ref(userId+'/email').on('value', function(snapshot){
        $scope.email = snapshot.val();
    });

    firebase.database().ref(userId+'/phone').on('value', function(snapshot){
        $scope.phone = snapshot.val();
    });

    firebase.database().ref(userId+'/name').on('value', function(snapshot){
        $scope.name = snapshot.val();
    });


    $scope.addThisSkill = function(value3){

        value3 = value3.toLowerCase();
        value3 = value3.trim();

        $scope.skills.push(value3);

        firebase.database().ref(userId).set({
            email: $scope.email ,
            name : $scope.name ,
            phone : $scope.phone ,
            skills : $scope.skills
        });

    }

    $scope.removeThisSkill = function(value4){

        value4 = value4.toLowerCase();
        value4 = value4.trim();

        var newSkills = [];

        for(var i=0;i<$scope.skills.length;i++){
            var item = $scope.skills[i];
            if(item!=value4){
                newSkills.push(item);
            }
        }

        $scope.skills=newSkills;

        firebase.database().ref(userId).set({
            email: $scope.email ,
            name : $scope.name ,
            phone : $scope.phone ,
            skills : $scope.skills
        });

    }

}]);


TeamApp.controller('newUserController' ,['$scope', '$route', '$routeParams', '$location' , function($scope , $route, $routeParams, $location) {

    var userId = firebase.auth().currentUser.uid;
    var userEmail = firebase.auth().currentUser.email;

    $scope.param = $routeParams.id;

    $scope.addNewUserToDatabase = function(userName,userPhone,userSkill){

        userName = userName.trim();
        userPhone = userPhone.trim();
        userSkill = userSkill.trim();
        userSkill = userSkill.toLowerCase();
        var skills = userSkill.split(',');

        firebase.database().ref(userId).set({
            email: userEmail ,
            name : userName ,
            phone : userPhone ,
            skills : skills
        });

        $location.path(userId);
    }

}]);