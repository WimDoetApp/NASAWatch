import { Component, OnInit } from '@angular/core';
import { NeoService } from '../services/neo.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: []
})
export class NeoComponent implements OnInit {

  //Om routing parameter te ontvangen
  tab: String;
  private sub: any;

  //Voor de api data
  getData$: Observable<any>;
  subscription: Subscription;

  //de tab die we gekozen hebben
  currentTab = "0";
  //arrays
  dataArray = [];
  dataProps = [];

  //andere
  today = new Date().toISOString().slice(0, 10);
  loading = false;
  pictureUrl = "";

  constructor(private neoService: NeoService, private route: ActivatedRoute) { }

  ngOnInit() {
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
      }
    });
  }

  //data ophalen voor browse tab
  getBrowse() {
    this.loading = true;
    this.getData$ = this.neoService.getBrowse$()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
  }

  //data ophalen voor feed tab
  getFeed(date) {
    this.loading = true;
    this.getData$ = this.neoService.getFeed$(date)
      .pipe(
        map( data => {
          console.log("Near earth objects:", data.near_earth_objects);

          //de data in een array zetten zodat we erover kunnen itereren met *ngFo
          this.dataProps = Object.keys(data.near_earth_objects);
          console.log(this.dataProps);

          for (let prop of this.dataProps){
            this.dataArray.push(data.near_earth_objects[prop]);
          }

          console.log("Array:", this.dataArray);
          return this.dataArray;
        }),
        finalize(() => {
          this.loading = false;
          //aangeven welke tab er gekozen is
          this.currentTab = "1";
        })
      );
  }

  //bij gekozen datum opnieuw request naar de api
  onSubmitDatum(data){
    console.log(data.datum);
    this.getFeed(this.today);
  }
}
