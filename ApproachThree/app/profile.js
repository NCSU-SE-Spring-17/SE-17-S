'use strict';
/**
 * Created by Eugenedjj on 2/16/17.
 */
//get element input

var userId = firebase.auth().currentUser.uid;
$("test1").val(userId);
function submitClick(){
    window.alert("yes");
}

//var firebaseRef = firebase.database().ref();
//add data to database push(unique id)-----------
//var txtvalue = input.value;
//firebaseRef.child("text").set(txtvalue);

//get data from database-------------------------
// var firebaseGet = firebaseRef.child("item1");
// firebaseGet.on('value', function(datasnapshot){
//     output.innerHTML = datasnapshot.val();
// });

//retrieve multiple data-------------------------

// var p1 = document.getElementById('read1');
// var p2 = document.getElementById('read2');
// var p3 = document.getElementById('read3');
// $(document).ready(function(){
//    var rootRef = firebase.database().ref().child("cluster");
//    rootRef.on("child_added",snap => {
//        p1.innerHTML = snap.val();
//         var name = snap.child("name").val();
//         var email = snap.child("email").val();
//         var user = snap.child("user").val();
//
//         $("#datatable").append("<tr><td>" + name + "</td><td>" + email + "</td><td>" + user +"</td></tr>");
//
//    });
// });

//check login
// firebase.auth().onAuthStateChanged(function(user){
//     if(user){
//         //signed in
//         $("#loginContainer").hide();
//         $("#header").show();
//         $("#pro").show();
//     }
//     else{
//         //not signed in
//         $("#loginContainer").show();
//         $("#header").hide();
//         $("#pro").hide();
//     }
// });
//

var userId = firebase.auth().currentUser.uid;

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //$("input[type='checkbox']").prop("checked",true);
        //signed in
        $("#loginContainer").hide();
        $("#approach").show();
        $("#pro").show();
        $("#showError").hide();
        $("#changePassword").val("");


        //get profile and skill info from database
        var userId = firebase.auth().currentUser.uid;
        var currentUser = firebase.database().ref().child('user').orderByChild(userId);

        currentUser.on("child_added", function(snapshot){
            $("#showEmail").val(snapshot.child("email").val());
            $("#changeName").val(snapshot.child("name").val());
        });

        var skills = firebase.database().ref().child('user').child(userId).child("skill");
        $("#test1").val(userId);
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
    }
});
$("#btnLogout").click(
    function(){
        firebase.auth().signOut().then(function(){
            //successfully log out
            window.location = 'index.html';
        }, function (error) {
        });
    }
);
// }
