import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
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

  constructor(public af: AngularFire,private router: Router) { }

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
