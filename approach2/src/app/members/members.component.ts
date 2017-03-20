import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Router} from '@angular/router';
import {moveIn, fallIn, moveInLeft} from '../router.animations';
import auth = firebase.auth;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})

export class MembersComponent implements OnInit {

  authState: any;
  state: string = '';
  users: FirebaseListObservable<any[]>;
  currentUser: FirebaseObjectObservable<any[]>;

  constructor(public af: AngularFire, private router: Router) {

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.authState = auth;
        this.currentUser = this.af.database.object('/users/' + this.authState.uid);
        console.log(this.currentUser);
      }
    });

    this.users = af.database.list('/users');
  }

  logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

  generateTeams() {
    //create team functionality will go here.
    function team(teamSkills, userArr) {
      this.teamSkills = teamSkills;
      this.userArr = userArr;
    }

    function user(email, skills) {
      this.email = email;
      this.skills = skills;
    }

    var usersInArray = [];

    this.af.database.list('/users', {preserveSnapshot: true})
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          var tmpEmail = snapshot.val().email;
          var tmpSkillsObject = snapshot.val().skills;
          var tmpSkills = [];
          for (var key in tmpSkillsObject) {
            tmpSkills.push(key);
          }
          var tmpUser = new user(tmpEmail, tmpSkills);
          usersInArray.push(tmpUser);
        });
      })

    var teams = [];

    for (var i = 0; i < Math.ceil(usersInArray.length / 3); i++) {
      teams[i] = new team([], []);
    }

    var extraMembers = [];

    var getSkillDiff = function (teamSkills, userSkills) {
      var skillDiff = [];
      for (var i in userSkills) {
        if (teamSkills.indexOf(userSkills[i]) == -1) {
          skillDiff.push(userSkills[i]);
        }
      }
      return skillDiff;
    };


    var addUserToTeam = function (team, user, skillDiff) {
      var newTeamSkills = [];
      newTeamSkills = newTeamSkills.concat(team.teamSkills, skillDiff);
      var newUserArr = [];
      newUserArr = newUserArr.concat(team.userArr, user);
      team.teamSkills = newTeamSkills;
      team.userArr = newUserArr;
      return team;
    };


    var teamGeneration = function () {
      for (var i = 0; i < usersInArray.length; i++) {
        for (var j = 0; j < teams.length; j++) {
          var userAdded = false;
          var skillDiff = getSkillDiff(teams[j].teamSkills, usersInArray[i].skills);
          if (skillDiff.length > 0) {
            teams[j] = addUserToTeam(teams[j], usersInArray[i], skillDiff);
            userAdded = true;
            break;
          }
        }
        if (!userAdded) {
          extraMembers.push(usersInArray[i]);
        }
      }
    };

    var divideExtraPeople = function () {
      var index = 0;
      var i = 0;
      while (index < extraMembers.length) {
        i = i % teams.length;
        if (teams[i].userArr.length < 3) {
          console.log(teams[i].userArr.length);
          var skillDiff = getSkillDiff(teams[i].teamSkills, extraMembers[index].skills);
          teams[i] = addUserToTeam(teams[i], extraMembers[index], skillDiff);
          index++;
        }
        i++;
      }
    };


    teamGeneration();
    divideExtraPeople();

    console.log("Inside database saving");
    var teamsInDatabase = this.af.database.list('/teamsDemo');
    teamsInDatabase.remove();
    for (var i = 0; i < teams.length; i++) {
      teamsInDatabase.push({
        skills: teams[i].teamSkills,
        users: teams[i].userArr
      });
    }


    for (var i = 0; i < teams.length; i++) {
      console.log("TEAM " + i);
      console.log(teams[i].teamSkills);
      for (var j in teams[i].userArr) {
        console.log(teams[i].userArr[j]);
      }
      console.log("");
    }


    this.router.navigateByUrl('/teams');
  }

  ngOnInit() {
  }

}
