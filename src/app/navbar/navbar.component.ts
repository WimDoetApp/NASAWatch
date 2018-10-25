import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    $('#mySidenav').removeClass('is-active');
    $('#burger').removeClass('is-active');
    $('#main').removeClass('lowOpacity');
  }
}
