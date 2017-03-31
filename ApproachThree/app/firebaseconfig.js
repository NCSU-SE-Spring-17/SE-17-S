/**
 * Created by Eugenedjj on 2/26/17.
 */

var config = {
    apiKey: "AIzaSyDLpM28KDFcp2LnEs2q1JC6_MU2nTni3Dc",
    authDomain: "test-1ab03.firebaseapp.com",
    databaseURL: "https://test-1ab03.firebaseio.com",
    storageBucket: "test-1ab03.appspot.com",
    messagingSenderId: "542459299256"
};
firebase.initializeApp(config);
var FbApp = firebase.initializeApp(config);
var FBdb = FbApp.database();
var FBauth = FbApp.auth();