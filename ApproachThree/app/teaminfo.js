/**
 * Created by Eugenedjj on 2/25/17.
 */
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in
        var firebaseRef = firebase.database().ref();

        initTable(firebaseRef);
        showTable(firebaseRef);
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

    var teamTable = $("#teaminfo");
    var teamConfig = firebaseRef.child('config');

    teamTable.append("<thead><tr>");
    teamTable.append("<th><div class='td2'>Email</div></th>");
    teamTable.append("<th><div class='td2'>Name</div></th>");
    teamTable.append("<th><div class='td2'>Position</div></th>");
    //create team table
    teamTable.append("</tr></thead>");
}
function showTable(firebaseRef) {
    var teamTable = $("#teaminfo");
    var user = firebase.auth().currentUser;
    firebaseRef.child('user').child(user.uid).once('value').then(function(snap1){
        var team=snap1.child('team').val();
        return team;
    }).then(function (team) {
        var positions = firebaseRef.child('config').child('positions');
        positions.once('value').then(function(snap2) {
            return snap2.val();
        }).then(function (position) {
            var pos = firebaseRef.child('team').child(team);
            pos.on('child_added',function (snap3) {
                if(snap3.val()!="no"){
                    var teammate = firebaseRef.child('user').child(snap3.val());
                    teammate.once('value').then(function (snap4) {
                        teamTable.append("<tr>");
                        teamTable.append("<td><div class='td2'>" + snap4.val().email + "</div></td>");
                        teamTable.append("<td><div class='td2'>" + snap4.val().name + "</div></td>");
                        teamTable.append("<td><div class='td2'>" + position[snap3.key] + "</div></td>");
                        teamTable.append("</tr>");
                    });
                }
                else{
                    teamTable.append("<tr>");
                    teamTable.append("<td><div class='td2'> available </div></td>");
                    teamTable.append("<td><div class='td2'> available </div></td>");
                    teamTable.append("<td><div class='td2'>" + position[snap3.key] + "</div></td>");
                    teamTable.append("</tr>");
                }
            });
        });
    });


}
