/**
 * Created by Eugenedjj on 2/16/17.
 */
//get element input
const panelState = new Array(
    {panel:"pro",state:false},
    {panel:"approach1",state:false},
    {panel:"approach2",state:false},
    {panel:"approach3",state:false}
);
function controlPanel(){
    for(var i=0; i< panelState.length;i++){
        var x = panelState[i];
        if(x.state) {
            $('#'+x.panel).show();
        }
        else {
            $('#'+x.panel).hide();
        }
    }
}
function setPanel(p){
    for(var i=0; i< panelState.length;i++){
        panelState[i].state = panelState[i].panel == p;
    }
}

//change profile, submit button----------------------------------------------
function submitClick(){
    var name = $("#changeName").val();

    var user = firebase.auth().currentUser;
    var firebaseRef = firebase.database().ref();

    var skills = {
        frontEnd: $("#frontEnd").is(':checked'),
        backEnd: $("#backEnd").is(':checked'),
        database: $("#database").is(':checked')
    };

    firebaseRef.child('user').child(user.uid).child('name').set(name);
    firebaseRef.child('user').child(user.uid).child('skill').set(skills);

    //change password
    var password = $("#changePassword").val();
    if(password != ""){
        user.updatePassword(password).then(function() {
            // Update successful.
            window.alert("Update succeed!");
        }, function(error) {
            // An error happened.
            window.alert(error.message);
        });
    }
    else{
        window.alert("Update succeed!");
    }

}


//check login
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in
        $("#loginContainer").hide();
        $("#showError").hide();
        $("#approach").show();
        controlPanel();
    }
    else{
        //not signed in
        controlPanel();
        $("#approach").hide();
        $("#pro").hide();
        $("#loginContainer").show();
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
                setPanel("pro");
                controlPanel();
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
        if(email !="" && password!=""){
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {

                //init user information when first sign up----------------------
                var firebaseRef = firebase.database().ref();
                var userId = firebase.auth().currentUser.uid;
                var skills = {
                    FrontEnd: false,
                    BackEnd: false,
                    Database:false
                }
                var postData = {//new user
                    email: email,
                    name: "",
                    skill: skills,
                    team: 0
                };
                //init end------------------------------------------------------
                firebaseRef.child('user').child(userId).set(postData);

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

    }
)

//log out
$("#btnLogout").click(
    function(){
        firebase.auth().signOut().then(function(){
            //successfully log out
            setPanel("");
        }, function (error) {
        });
    }
);

function showProfile() {
    //get profile and skill info from database
    setPanel("pro");
    controlPanel();

    $("#changePassword").val("");

    var userId = firebase.auth().currentUser.uid;
    var currentUser = firebase.database().ref().child('user').orderByChild(userId);

    currentUser.on("child_added", function(snapshot){
        $("#showEmail").val(snapshot.child("email").val());
        $("#changeName").val(snapshot.child("name").val());
    });

    var skills = firebase.database().ref().child('user').child(userId).child("skill");
    skills.on("value", function(snapshot){
        if(snapshot.child("frontEnd").val() == 1){
            $("#frontEnd").prop("checked",true);
            $("#frontEnd").click();
            $("#frontEnd").click();
        }
        if(snapshot.child("backEnd").val() == 1){
            $("#backEnd").prop("checked",true);
            $("#backEnd").click();
            $("#backEnd").click();
        }
        if(snapshot.child("database").val() == 1){
            $("#database").prop("checked",true);
            $("#database").click();
            $("#database").click();
        }
    });
}

function showApproach3(){
    setPanel("approach3");
    controlPanel();
    //$("#app3Teams").append("<thead><tr><td>" + "1" + "</td><td>" + "2" + "</td><td>" + "3" +"</td></tr></thead>");
}