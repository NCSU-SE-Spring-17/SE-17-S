/**
 * Created by Eugenedjj on 2/16/17.
 */
//get element input

//check login
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in
        $("#showError").hide();
    }
    else{
        //not signed in
        $("#showError").show();
    }
});
//
$("#btnLogin").click(
    function(){
        var email = $("#txtEmail").val();
        var password = $("#txtPassword").val();
        if(email != "" && password != ""){
            firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
                window.location = 'profile.html';
            },function(error){
                $("#showError").show();
                document.getElementById('showError').innerHTML= error.message;
            });
        }
        else{
            $("#showError").show();
            document.getElementById('showError').innerHTML= 'Please input email and password';
        }
    }
);

//sign up
$("#btnSignUp").click(
    function(){
        var email = $("#txtEmail").val();
        var password = $("#txtPassword").val();
        var firebaseRef = firebase.database().ref();

        if(email !="" && password!=""){
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
                //init user information when first sign up----------------------
                var user = firebase.auth().currentUser;
                var skills = {
                    FrontEnd: false,
                    BackEnd: false,
                    Database:false
                };
                var postData = {//new user
                    email: email,
                    name: "",
                    skill: skills,
                    team: "no"
                };
                //init end------------------------------------------------------
                firebaseRef.child('user').child(user.uid).set(postData).then(function() {
                }, function(error) {
                    window.alert(error.message);
                });
                window.location='profile.html';
                //firebase.auth().signInWithEmailAndPassword(email,password);
            }, function (error) {
                $("#showError").show();
                document.getElementById('showError').innerHTML= error.message;
            });
        }
        else{
            $("#showError").show();
            //noinspection JSAnnotator
            document.getElementById('showError').innerHTML= 'Please input email and password';
        }

    });
