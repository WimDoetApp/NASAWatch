import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.user = data);
  }

}
