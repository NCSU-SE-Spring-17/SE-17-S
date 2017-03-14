/**
 * Created by Eugenedjj on 2/16/17.
 */
//get element input

//check login

var config = {
    apiKey: "AIzaSyDLpM28KDFcp2LnEs2q1JC6_MU2nTni3Dc",
    authDomain: "test-1ab03.firebaseapp.com",
    databaseURL: "https://test-1ab03.firebaseio.com",
    storageBucket: "test-1ab03.appspot.com",
    messagingSenderId: "542459299256"
};
firebase.initializeApp(config);

//
function login(email,password){
    var showError=document.getElementById("showError");
        if(email != "" && password != ""){
            firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
                var firebaseRef = firebase.database().ref();
                var user=firebase.auth().currentUser;

                firebaseRef.child('user').child(user.uid).on('value',function(snapshot) {
                    if(snapshot.child('team').val()=='admin'){
                        window.location = 'config.html';
                    }
                    else
                        window.location = 'profile.html';
                });
            },function(error){
                showError.innerHTML= error.message;
                console.log(showError.innerHTML);
            });
        }
        else{
            showError.innerHTML= 'Please input email and password';
        }
}

//sign up
function signup(email,password) {
    var firebaseRef = firebase.database().ref();

    if (email != "" && password != "") {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            //init user information when first sign up----------------------
            var user = firebase.auth().currentUser;
            var skills = {
                FrontEnd: false,
                BackEnd: false,
                Database: false
            };
            var postData = {//new user
                email: email,
                name: "",
                skill: skills,
                team: "no"
            };
            //init end------------------------------------------------------
            firebaseRef.child('user').child(user.uid).set(postData).then(function () {
            }, function (error) {
                window.alert(error.message);
            });
            window.location = 'profile.html';
            //firebase.auth().signInWithEmailAndPassword(email,password);
        }, function (error) {
            $("#showError").show();
            document.getElementById('showError').innerHTML = error.message;
        });
    }
    else {
        $("#showError").show();
        //noinspection JSAnnotator
        document.getElementById('showError').innerHTML = 'Please input email and password';
    }

}
