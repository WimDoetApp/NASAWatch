import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: []
})
export class UserInfoComponent implements OnInit {

  isCollapsed = true;
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.user = data);
  }

}