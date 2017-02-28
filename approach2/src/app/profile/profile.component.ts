import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable} from 'angularfire2';
import {Router} from '@angular/router';
import {moveIn, fallIn, moveInLeft} from '../router.animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})

export class ProfileComponent implements OnInit {

  state: string = '';
  error: any;
  user: FirebaseObjectObservable<any[]>;

  constructor(public af: AngularFire, private router: Router) {
  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.af.auth.subscribe(auth => {
        if (auth) {
          var userID = auth.uid;
          this.user = this.af.database.object('/users/' + userID);
          this.user.update ({
            skills: {
              backend: formData.value.backend,
              frontend: formData.value.frontend,
              database: formData.value.database
            }
          });
        }
      });
      this.router.navigate(['/members']);
    }
  }

  logout() {
    this.af.auth.logout();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }


  ngOnInit() {
  }

}
