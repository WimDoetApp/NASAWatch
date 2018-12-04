import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_interfaces/user';
import { LandsatService } from '../_services/landsat.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EarthImage } from '../_interfaces/earth-image';
import { UserImageService } from '../_services/user-image.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-landsat',
  templateUrl: './landsat.component.html',
  styles: []
})
export class LandsatComponent implements OnInit {

  //Om routing parameter te ontvangen
  tab: String;
  private sub: any;

  //de tab die we gekozen hebben
  currentTab = "0";

  //observables
  getAssets$: Observable<any>;
  getImagery$: Observable<any>;
  userImages$: Observable<any>;
  //subs voor observables
  private assetsSub: any;
  private imagerySub: any;

  //models
  user: User;
  earthImages: EarthImage[] = [];
  userImages: EarthImage[] = [];

  //andere
  dim: number;
  lat: number;
  lon: number;
  loading = false;
  noResults = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private landsatService: LandsatService, private userImageService: UserImageService) { }

  ngOnInit() {
    //userdata ohpalen
    this.authService.userData$.subscribe(data => {
      this.user = data;
    });

    //images van de user alvast ophalen
    this.getUserImages();

    //route parameters ophalen
    this.sub = this.route.params.subscribe(params => {
      this.tab = params['tab'];

      //Switch om te bepalen welke tab we gekozen hebben
      switch (this.tab) {
        case "0":
          this.currentTab = "0";
          break;
        case "11":
          this.showUserImages();
          break;
      }
    });
  }

  //info tabs veranderen
  changeInfoTab(param) {
    $('.infoTabControl').removeClass('is-active');
    $('#infoTabControl' + param).addClass("is-active");
    $('.infoTab').addClass('invisible');
    $('#infoTab' + param).removeClass('invisible');
  }

  //op submit van de user-data
  onSubmitSearchLandsat(data) {
    //data leegmaken
    this.earthImages = [];
    //loader aanzetten
    this.loading = true;

    //de parameters opslagen voor wanneer we de imagery ophalen
    this.dim = data.dim;
    this.lat = data.lat;
    this.lon = data.lon;

    //Alle assets ophalen
    this.getAssets$ = this.landsatService.getAssets$(data.lat, data.lon, data.begin, data.end)
      .pipe(
        map(data => {
          return data.results;
        })
      );
    this.getAssets();
  }

  //image voor elke asset ophalen
  getAssets() {
    this.assetsSub = this.getAssets$.subscribe(results => {
      //voor elke asset
      results.forEach(result => {
        let date = new Date(result.date);
        let month = date.getMonth() + 1
        let dateString = date.getFullYear() + '-' + month + '-' + date.getDate();

        //image van de asset ophalen
        this.getImagery$ = this.landsatService.getImagery$(this.lat, this.lon, dateString, this.dim);
        this.getImagery$.subscribe(image => {
          //data wegschrijven naar model voor gebruik in subcomponent
          let earthImage = new EarthImage;
          earthImage.date = dateString;
          earthImage.fullDate = date;
          earthImage.id = image.id;
          earthImage.url = image.url;
          earthImage.lat = this.lat;
          earthImage.lon = this.lon;
          earthImage.dim = this.dim;

          this.earthImages.push(earthImage);
        })
      });

      this.loading = false;
    });
  }

  //images van de user ophalen
  getUserImages() {
    /*Ids van alle opgeslagen images voor de ingelogde user in een feed zetten*/
    this.userImages$ = this.userImageService.getImages();
    //images van de user ophalen en in een array stoppen
    this.imagerySub = this.userImages$.subscribe(images => {
      //image ids leegmaken
      this.userImages = [];

      //image ids in array zetten
      images.forEach(document => {
        if (document.userId == this.user.uid) {
          //voor elke document de image opzoeken in de api en in een array plaatsen
          var data$;
          data$ = this.landsatService.getImagery$(document.lat, document.lon, document.date, document.dim);

          //data wegschrijven naar model voor gebruik in subcomponent
          data$.subscribe(image => {
            let earthImage = new EarthImage;
            earthImage.date = image.date;
            earthImage.fullDate = new Date(image.date);
            earthImage.id = image.id;
            earthImage.url = image.url;
            earthImage.lat = image.lat;
            earthImage.lon = image.lon;
            earthImage.dim = image.dim;

            this.userImages.push(earthImage);
          })
        }
      });
      this.imagerySub.unsubscribe();
    })
    this.loading = false;
  }

  //user images laten zien
  showUserImages() {
    this.currentTab = "11";
  }

}
