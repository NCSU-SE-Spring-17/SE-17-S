import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable} from 'angularfire2';
import {Router} from '@angular/router';
import {moveIn, fallIn, moveInLeft} from '../router.animations';
import auth = firebase.auth;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})

export class ProfileComponent implements OnInit {

  state: string = '';
  error: any
  currentUser: any;
  user: FirebaseObjectObservable<any[]>;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.currentUser = auth;
        this.user = this.af.database.object('/users/' + this.currentUser.uid);
      }
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.user.update({
        name: this.currentUser.auth.displayName,
        email: this.currentUser.auth.email,
        skills: {
          backend: formData.value.backend,
          frontend: formData.value.frontend,
          database: formData.value.database
        }
      })
    }
    this.router.navigateByUrl('/members');
  }

  ngOnInit() {
  }

}
