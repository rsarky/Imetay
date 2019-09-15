import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>
  private userDetails: firebase.User = null;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.user;
    this.user.subscribe((user) => {
      if (user !== null) {
        this.userDetails = user;
        console.log(this.userDetails);
      } else {
        console.log(this.userDetails)
        this.userDetails = null;
      }
    })
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  emailSignup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  isLoggedIn() {
    return this.user.pipe(first()).toPromise()
  }

  userObservable() {
    return this.afAuth.user;
  }
}
