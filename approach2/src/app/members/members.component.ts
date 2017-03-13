import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import {Router} from '@angular/router';
import {moveIn, fallIn, moveInLeft} from '../router.animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})

export class MembersComponent implements OnInit {

  name: any;
  state: string = '';

  users: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, private router: Router) {

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
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
    console.log("Inside generate teams");

    function team(teamSkills, userArr) {
      this.teamSkills = teamSkills;
      this.userArr = userArr;
    }

    var usersInArray = [];

    console.log(usersInArray);

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
      while (index < extraMembers.length) {
        for (var i = 0; i < teams.length; i++) {
          if (teams[i].userArr.length < 3) {
            var skillDiff = getSkillDiff(teams[i].teamSkills, extraMembers[index].skills);
            teams[i % teams.length] = addUserToTeam(teams[i], extraMembers[index++], skillDiff);
          }
        }
      }
    }


    teamGeneration();
    divideExtraPeople();

    for (var i = 0; i < teams.length; i++) {
      console.log(teams[i]);
      console.log("");
    }

    this.router.navigateByUrl('/teams');
  }

  ngOnInit() {
  }

}
