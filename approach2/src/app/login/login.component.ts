import {Component, OnInit, HostBinding} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable} from 'angularfire2';
import {Router} from '@angular/router';
import {moveIn} from '../router.animations';
import auth = firebase.auth;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  user: FirebaseObjectObservable<any[]>;


  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      //if already logged in redirect to members
      if (auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        var userID = success.uid;
        var userData = this.af.database.object('/users/'+userID, {preserveSnapshot: true})
        userData.subscribe(data => {
          if (data.val()) {
            this.router.navigateByUrl('/members');
          } else {
            this.router.navigateByUrl('/profile');
          }
        });
      }).catch(
      (err) => {
        console.log(err);
        this.error = err;
      })
  }

  ngOnInit() {
  }

}
