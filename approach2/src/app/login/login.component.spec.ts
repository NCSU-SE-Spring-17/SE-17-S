/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../../environments/firebase.config';
import { AngularFireMock } from '../mock/angularfiremock.service';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      declarations: [ LoginComponent ],
      providers: [{provide: AngularFire, useClass: AngularFireMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
