/**
 * Created by Eugenedjj on 2/24/17.
 */
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        //signed in
        var firebaseRef = firebase.database().ref();
        firebaseRef.child('config').on('value',function (snapshot) {
            $("#teamnumber").val(snapshot.child("teamNumber").val());
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

function submitClick(){
    var teamnum = $("#teamnumber").val();
    var frontend = $("#frontend").val();
    var backend = $("#backend").val();
    var database = $("#database").val();
    var other = $("#other").val();

    var msg = "Change configuration  will delete all existing teams information";

    if(teamnum*frontend*backend*database*other>0){
        if(confirm(msg) == true) {
            var firebaseRef = firebase.database().ref();
            var config=configinfo(teamnum,frontend,backend,database,other);
            var pnum=Object.keys(config["positions"]).length;
            firebaseRef.child('config').set(config).then(function() {
            },function(error) {
                alert(error.message);
            });
            var teams={};
            for(var i=1;i<=teamnum;i++) {
                var tid = "team"+i;
                var team = teaminfo(pnum, tid);
                teams[tid]=team;
            }
            firebaseRef.child('team').set(teams).then(function () {
                alert("Update team configuration succeed!");
            },function (err) {
                alert("fail:"+err.message);
            });
        }
    }
    else{
        $("#test1").text("Please fill in all information");
    }

}
function configinfo(n,frontend,backend,database,other) {
    var positions={};
    var j=0;
    while(j<frontend){
        j=j+1;
        positions[j]="frontEnd";
    }
    while(j<Number(frontend)+Number(backend)){
        j=j+1;
        positions[j]="backEnd";
    }
    while(j<Number(frontend)+Number(backend)+Number(database)){
        j=j+1;
        positions[j]="database";
    }
    while(j<Number(frontend)+Number(backend)+Number(database)+Number(other)){
        j=j+1;
        positions[j]="other";
    }

    var config ={
        teamNumber:n,
        positions:positions
    };
    return config;
}

function teaminfo(pnum,id){
    var team={};
    var j=1;
    while(j<=pnum){
        team[j]="no";
        j++;
    }
    return team;
}
