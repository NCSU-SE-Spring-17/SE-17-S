'use strict';
/**
 * Created by Eugenedjj on 2/16/17.
 */

//check login
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in
        var firebaseRef = firebase.database().ref();

        initTable(firebaseRef);
        showTable(firebaseRef);
        $("#test1").text("The apply button only available when you are not in a team and your skill fits the requirement");
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

//init table head---------------------------------------
function initTable(firebaseRef){
    //get team info from fiebase

    var teamTable = $("#app3Teams");
    var teamConfig = firebaseRef.child('config');

    teamTable.append("<thead><tr>");
    teamTable.append("<th> ID </th> <th> Name </th>");
    teamConfig.child('positions').on('child_added', function(snapshot){
        teamTable.append("<th>"+ snapshot.val()+"</th>");
    });

    //create team table
    teamTable.append("</tr></thead>");
}

//show all table---------------------------------------
function showTable(firebaseRef) {
    var teamTable = $("#app3Teams");
    var teamConfig = firebaseRef.child('team');
    var user = firebase.auth().currentUser;
    firebaseRef.child('user').child(user.uid).once('value').then(function(snap){
        var skill={
            1:snap.child('skill').child('frontEnd').val(),
            2:snap.child('skill').child('backEnd').val(),
            3:snap.child('skill').child('database').val()
        }
        var u={
            name:snap.val().name,
            team:snap.val().team,
            skills:skill
        }
        return u;
    }).then(function (u) {
        //alert(u.skills.backEnd);
        teamConfig.on("child_added", function (snapshot) {
            if (snapshot.key != "testteam") {
                teamTable.append("<tr>");
                teamTable.append("<th>" + snapshot.key + "</th>");
                teamTable.append("<th>" + snapshot.child('name').val() + "</th>");
                for (var i = 1; i <= snapshot.numChildren() - 1; i++) {
                    if (snapshot.child(i).val() == "no") {
                        var btnid = "btn-"+snapshot.key + "-" + i;
                        teamTable.append('<th> <button id="'+btnid + '" class="mdl-button mdl-js-button" onclick="applyTeam(this.id)"> Apply </button> </th>');

                        if(u.team != "no" ){
                            document.getElementById(btnid).disabled=true;
                            $("#test1").text("You've already been in a team");
                        }

                        for(var j in u.skills){
                            if(j==snapshot.child(i).key && !u.skills[j]) {
                                document.getElementById(btnid).disabled = true;
                            }
                        }
                    }
                    else {
                        if(snapshot.key == u.team){
                            teamTable.append('<th bgcolor="#f0f8ff"> <button id="btnc-' + snapshot.key + '-' + i + '" class="mdl-button mdl-js-button" onclick="cancelTeam(this.id)"> CANCEL </button> </th>');
                        }
                        else{
                            teamTable.append("<th>OCUPIED</th>");
                        }

                    }
                }
                teamTable.append("</tr>");

            }
        });
    });


}
function settxt(str) {
    $("#test1").text(str);
}
function applyTeam(id){
    var btnprop = id.split("-");

    var firebaseRef = firebase.database().ref();
    var user = firebase.auth().currentUser;

    firebaseRef.child('team').child(btnprop[1]).child(btnprop[2]).set(user.uid).then(function() {
        firebaseRef.child('user').child(user.uid).child('team').set(btnprop[1]).then(function(){
            location.reload('approach3.html');
        },function(error){
            firebaseRef.child('team').child(btnprop[1]).child(btnprop[2]).set('no');
            window.alert("Application fails, please try again!");
        });
    },function(e) {
        window.alert(e.message);
    });
}
function cancelTeam(id) {
    var btnprop = id.split("-");

    var firebaseRef = firebase.database().ref();
    var user = firebase.auth().currentUser;

    firebaseRef.child('team').child(btnprop[1]).child(btnprop[2]).set("no").then(function() {
        firebaseRef.child('user').child(user.uid).child('team').set("no").then(function(){
            location.reload('approach3.html');
        },function(error){
            firebaseRef.child('team').child(btnprop[1]).child(btnprop[2]).set(user.uid);
            window.alert("The cancellation can not be done, please try again!");
        });
    },function(e) {
        window.alert(e.message);
    });

}