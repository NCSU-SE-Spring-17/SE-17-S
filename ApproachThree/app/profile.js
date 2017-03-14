/**
 * Created by Eugenedjj on 2/16/17.
 */
//get element input


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
        //window.alert("Update succeed!");
    }

}

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in


        //get profile and skill info from database
        var userId = firebase.auth().currentUser.uid;
        var currentUser = firebase.database().ref().child('user').child(userId);

        currentUser.on("value", function(snapshot){
            $("#showEmail").val(snapshot.child("email").val());
            $("#changeName").val(snapshot.child("name").val());
            if(snapshot.child("team").val() == "no"){
                $("#teamInfo").text("No team");
                document.getElementById("teamInfo").href = "#";
            }
            else{
                $("#teamInfo").text(snapshot.child("team").val());
            }
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
    else{
        window.location = 'index.html';
    }
});
function logout(){
    firebase.auth().signOut().then(function(){
        //successfully log out
        window.location='index.html';
    }, function (error) {
    });
}