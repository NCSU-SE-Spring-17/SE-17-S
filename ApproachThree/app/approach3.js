'use strict';

//check login
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in
    }
    else{
        //not signed in
       //
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
/**
 * Created by Eugenedjj on 2/16/17.
 */
var input = document.getElementById('write');
var sumbitBtn = document.getElementById('submitBtn');
var p1 = document.getElementById('read1');
var p2 = document.getElementById('read2');
var p3 = document.getElementById('read3');

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

//sign up
//log out
$("#btnLogout").click(
    function(){
        firebase.auth().signOut().then(function(){
            //successfully log out
            window.location.replace('index.html');
        }, function (error) {
            p1.innerHTML = "log out fail:"+ error.message;
        });
    }
);