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
                    team: "no"
                };
                //init end------------------------------------------------------
                firebaseRef.child('user').child(userId).set(postData);
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

    }
)



// function showApproach3(){
//     setPanel("approach3");
//     controlPanel();
//     //get team info from fiebase
//     var user = firebase.auth().currentUser;
//     var firebaseRef = firebase.database().ref();
//     var teamConfig = firebaseRef.child('config').child('app3');
//     var teamPosition = teamConfig.child('Positions');
//     var positions = {};
//
//     teamConfig.on("value",function(snapshot){
//         var teamNumber = snapshot.child('teamNumber').val();
//         $("#test1").text(snapshot.child('teamNumber').key);
//     });
//
//     teamConfig.child('Positions').on('child_added', function(snapshot){
//             positions[snapshot.key] = snapshot.val();
//     });
//
//     //create team table
//     var teamTable = $("#app3Teams");
//     teamTable.append("<thead><tr>");  //init table head
//     teamTable.append("<td> ID </td>");
//     teamTable.append("<td> Name </td>");
//     for(var p in positions){
//         teamTable.append("<td>"+ positions[p]+"</td>");
//     }
//     teamTable.append("</tr></thead>");
//     //$("#app3Teams").append("<thead><tr><td>" + "1" + "</td><td>" + "2" + "</td><td>" + "3" +"</td></tr></thead>");
// }