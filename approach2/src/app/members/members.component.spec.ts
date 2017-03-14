/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembersComponent } from './members.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../../environments/firebase.config';
import { AngularFireMock } from '../mock/angularfiremock.service';
import { FormsModule } from '@angular/forms';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(firebaseConfig)
      ],
      declarations: [ MembersComponent ],
      providers: [{provide: AngularFire, useClass: AngularFireMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
