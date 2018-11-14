import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styles: []
})
export class ApodComponent implements OnInit {

  loading = false;
  pictureOfTheDay$: Observable<any>;
  pictureUrl = "";
  media_type = "";

  constructor(private apodService: ApodService) { }

  ngOnInit() {
    this.getPicture();
  }

  getPicture() {
    this.loading = true;
    this.pictureOfTheDay$ = this.apodService.getPicture$()
      .pipe(
        map( data => {
          this.media_type = data.media_type;
          console.log(this.media_type);

          return data;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
  }

  toggleImageModal() {
    $('#apodModal').toggle('is-active');
  }
}
