import { Component, OnInit } from '@angular/core';
import { NeoService } from '../_services/neo.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_interfaces/user';
import { finalize, map } from 'rxjs/operators';
import { UserAsteroidService } from '../_services/user-asteroid.service';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: []
})
export class NeoComponent implements OnInit {

  //Om routing parameter te ontvangen
  tab: String;
  private sub: any;
  private astroSub: any;

  //Voor de api data
  getData$: Observable<any>;

  //de tab die we gekozen hebben
  currentTab = "0";
  //arrays
  dataArray = [];
  dataUserArray = [];
  dataProps = [];
  asteroidIds = [];

  //andere
  today = new Date().toISOString().slice(0, 10);
  loading = false;
  pictureUrl = "";

  //user & db
  user: User;
  userAsteroid$: Observable<any>;

  constructor(private neoService: NeoService, private route: ActivatedRoute, private authService: AuthService, public userAsteroidService: UserAsteroidService) { }

  ngOnInit() {
    //userdata ohpalen
    this.authService.userData$.subscribe(data => {
      console.log("we hebben een user!");
      this.user = data;
    });
    this.getUserFeed();

    this.sub = this.route.params.subscribe(params => {
      this.tab = params['tab'];

      //Switch om te bepalen welke tab we gekozen hebben
      switch (this.tab) {
        case "0":
          this.getBrowse();
          break;
        case "1":
          this.getFeed(this.today);
          break;
        case "11":
          this.showUserFeed();
          break;
      }
    });
  }

  //data ophalen voor browse tab
  getBrowse() {
    console.log('testBrowse');
    //van tab veranderen
    this.currentTab = "0";
    this.loading = true;
    this.getData$ = this.neoService.getBrowse$()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )

    this.getData$.subscribe();
  }

  //data ophalen voor feed tab
  getFeed(date) {
    console.log('testDate');
    //van tab veranderen
    this.currentTab = "1";
    //data array terug leegmaken, loading op true zetten
    this.dataArray = [];
    this.loading = true;

    this.getData$ = this.neoService.getFeed$(date)
      .pipe(
        map(data => {
          console.log("test");
          console.log("Near earth objects:", data.near_earth_objects);

          //de data in een array zetten zodat we erover kunnen itereren met *ngFo
          this.dataProps = Object.keys(data.near_earth_objects);
          console.log(this.dataProps);

          for (let prop of this.dataProps) {
            this.dataArray.push(data.near_earth_objects[prop]);
          }

          console.log("Array:", this.dataArray);
          return this.dataArray;
        }),
        finalize(() => {
          this.loading = false;
        })
      )

    this.getData$.subscribe();
  }

  //bij gekozen datum opnieuw request naar de api
  onSubmitDatum(data) {
    console.log(data.datum);
    this.getFeed(data.datum);
  }

  //feed voor een user aanmaken
  getUserFeed() {
    console.log("we maken een feed voor de user!");
    //loading op true zetten
    this.loading = true;

    /*Ids van alle opgeslagen asteroiden voor de ingelogde user in een feed zetten*/
    //asteroiden van de user ophalen en in een array stoppen
    this.userAsteroid$ = this.userAsteroidService.getAsteroids();
    this.astroSub = this.userAsteroid$.subscribe(asteroids => {
      console.log("De user feed is gemaakt!", this.userAsteroid$);
      //asteroid ids leegmaken
      this.asteroidIds = [];

      //asteroid ids in array zetten
      asteroids.forEach(document => {
        if (document.userId == this.user.uid) {
          this.asteroidIds.push(document.asteroidId);
        }
      });

      //voor elke id de ateroide opzoeken in de api en in een array plaatsen
      this.asteroidIds.forEach(asteroidObservable => {
        console.log("test:", asteroidObservable);
        var data$;
        data$ = this.neoService.getLookup$(asteroidObservable);

        data$.subscribe(asteroid => {
          this.dataUserArray.push(asteroid);
        });
      });

      this.loading = false;

      //unsubscriben
      this.astroSub.unsubscribe();
      console.log("data & asteroids", this.dataUserArray, this.asteroidIds);
    });
  }

  //feed van de user laten zien
  showUserFeed() {
    //van tab veranderen
    this.currentTab = "11";
    console.log("we laten de user feed zien!");
  }
}
