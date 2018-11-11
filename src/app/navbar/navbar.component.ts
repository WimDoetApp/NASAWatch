import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {User} from '../interfaces/user';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe( data => this.user = data);
  }

  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    $('#mySidenav').removeClass('is-active');
    $('#burger').removeClass('is-active');
    $('#main').removeClass('lowOpacity');
  }
}
