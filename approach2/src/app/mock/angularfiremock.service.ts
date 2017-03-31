import {AngularFire, AngularFireDatabase, AngularFireAuth} from 'angularfire2';

class AngularFireDatabaseMock extends AngularFireDatabase {

}

export class AngularFireAuthMock extends AngularFireAuth {
  
}

export class AngularFireMock extends AngularFire {
  public database: AngularFireDatabaseMock;
  public auth: AngularFireAuthMock;
} 