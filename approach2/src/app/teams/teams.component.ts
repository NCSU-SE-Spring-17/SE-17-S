import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class TeamsComponent implements OnInit {

  teams: FirebaseListObservable<any[]>;
  index: number;

  constructor(public af: AngularFire,private router: Router) {
    this.teams = af.database.list('/teamsDemo');
    this.index = 1;
   }

  back() {
    this.router.navigateByUrl('/members');
  }

  logout() {
     this.af.auth.logout();
     console.log('logged out');
     this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
