import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { AlertBox } from '../interfaces/alert-box';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  alertBox$: BehaviorSubject<AlertBox> = new BehaviorSubject(null);
  userData$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.setUserData(user);
    });
  }

  // Email/password sing up
  emailSignUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.afAuth.auth.currentUser.sendEmailVerification()
          .then(success => {
            this.logout();
            this.setMessage(`We have sent a confirmation email.<br>
                        Please check your mailbox`, 'is-success');
          })
          .catch(error => this.setMessage(error, 'is-danger'));
      })
      .catch(error => {
        this.setMessage(error.message, 'is-danger');
      });
  }

  // Reset password
  emailResetPassword(email: string) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => this.setMessage('We have send an email to reset your password, please check your inbox.', 'is-success'))
      .catch(error => this.setMessage(error, 'is-danger'));
  }

  // Email/password login
  emailLogin(email: string, password: string) {
    this.logout();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (!user.user.emailVerified) {
          this.logout();
          this.setMessage(`Your account has not been verified. Please confirm your account!<br>
                    Check your mailbox: ${user.user.email}`, 'is-danger');
        } else {
          this.setUserData(user.user);
          this.setMessage(`Succesfully logged in as ${user.user.email}`, 'is-success');
        }
      })
      .catch(error => this.setMessage(error.message, 'is-danger'));
  }

  //social login
  googleLogin() {
    this.logout();
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .catch(error => this.setMessage(error.message, 'is-danger'));
  }

  // Logout
  logout() {
    this.setMessage('Logged out', 'is-success');
    this.afAuth.auth.signOut();
    this.userData$.next(null);
  }

  // Message BS4 alert-box
  setMessage(msg: string, color: string) {
    this.alertBox$.next({
      message: msg,
      color: color
    });
  }

  clearMessage() {
    this.alertBox$.next(null);
  }

  // Copy fields from authState to userData$
  private setUserData(user) {
    if (user !== null) {
      this.userData$.next({
        uid: user.uid,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL || '/assets/icons/icon-72x72.png',
        email: user.email,
      });
    } else {
      this.userData$.next(null);
    }
    //console.trace();
  }

  // Debug-info op loginpagina
  getAuthState$() {
    return this.afAuth.authState;
  }
}
