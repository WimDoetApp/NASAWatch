import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NASAWatch';

  showBanner = false;
  deferredPrompt: any;

  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit() {
    this.swUpdate.available.subscribe(evt => {
      console.log('evt', evt);
      if (confirm('De website is aangepast. Wil je de nieuwe versie openen?')) {
        window.location.reload();
      }
    });

    window.addEventListener('beforeinstallprompt', evt => {
      console.log('beforeinstallprompt', evt);
      // Voorkomen dat Chrome 67 of eerder de "native" prompt toont
      evt.preventDefault();
      // Bewaar het event zodat je dit later kan activeren
      this.deferredPrompt = evt;
      // Update de UI om aan te geven dat de app kan worden geïnstalleerd
      this.showBanner = true;
      console.log('this.showBanner', this.showBanner);
    });
  }

  addToHomescreen() {
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult) => {
      console.log('choiceResult', choiceResult);
      if (choiceResult.outcome === 'accepted') {
        alert('User accepted the prompt');
      } else {
        alert('User dismissed the prompt');
      }
      this.deferredPrompt = null;
      this.showBanner = false;
    });
  }

  openNav() {
    if($('#mySidenav').hasClass('is-active')){
      document.getElementById("mySidenav").style.width = "0";
      $('#mySidenav').removeClass('is-active');
      $('#burger').removeClass('is-active');
      $('#main').removeClass('lowOpacity');
      $('.user-item').removeClass('break-word');
    }else{
      document.getElementById("mySidenav").style.width = "250px";
      $('#mySidenav').addClass('is-active');
      $('#burger').addClass('is-active');
      $('#main').addClass('lowOpacity');
      $('.user-item').addClass('break-word');
    }
  }

  closeNav(){
    document.getElementById("mySidenav").style.width = "0";
    $('#mySidenav').removeClass('is-active');
    $('#burger').removeClass('is-active');
    $('#main').removeClass('lowOpacity');
    $('.user-item').removeClass('break-word');
  }
}
