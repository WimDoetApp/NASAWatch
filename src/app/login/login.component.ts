import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertBox } from '../interfaces/alert-box';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginData = {
    email: '',
    password: '',
  };

  registerData  = {
    signupMail: '',
    singupPassword: '',
    passwordConfirm: ''
  };

  alertBox: AlertBox = {
    message: '',
    color: ''
  };

  constructor(public authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('loginData')) {
      this.loginData = JSON.parse(localStorage.getItem('loginData'));
    }
    this.authService.alertBox$.subscribe(data => {
      this.alertBox = data;
    });
  }

  emailSignUp(data: any, isValid: string) {
    this.authService.clearMessage();
    if (isValid && data.singupPassword == data.passwordConfirm) {
      this.authService.emailSignUp(data.signupMail, data.singupPassword);
    } else {
      this.authService.setMessage('Email/password not valid', 'is-danger');
    }
  }

  emailLogin(data: any, isValid: string) {
    this.authService.clearMessage();
    if (isValid) {
      this.authService.emailLogin(data.email, data.password);
      localStorage.setItem('loginData', JSON.stringify(data));
    } else {
      this.authService.setMessage('Email/password not valid...', 'is-danger');
    }
  }

}
