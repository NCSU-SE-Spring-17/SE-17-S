/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeamsComponent } from './teams.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../../environments/firebase.config';
import { AngularFireMock } from '../mock/angularfiremock.service';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      declarations: [ TeamsComponent ],
      providers: [{provide: AngularFire, useClass: AngularFireMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
