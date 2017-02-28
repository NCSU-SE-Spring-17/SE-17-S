import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;
  user: FirebaseObjectObservable<any[]>;

  constructor(public af: AngularFire,private router: Router) {
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
          console.log(success);
          this.af.auth.subscribe(auth => {
            if(auth) {
              var userID = auth.uid;
              this.user = this.af.database.object('/users/' + userID);
              this.user.set({
                name: formData.value.name,
                email: formData.value.email,
                skills: {
                  backend: formData.value.backend,
                  frontend: formData.value.frontend,
                  database: formData.value.database
                }
              });
            }
          });
          this.router.navigate(['/members'])
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        })
    }
  }

  ngOnInit() {
  }

}
