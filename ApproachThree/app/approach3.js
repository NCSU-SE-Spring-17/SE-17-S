'use strict';
/**
 * Created by Eugenedjj on 2/16/17.
 */

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

function logout(){
    firebase.auth().signOut().then(function(){
        //successfully log out
        window.location='index.html';
    }, function (error) {
    });
}