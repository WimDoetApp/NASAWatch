import { Component, OnInit } from '@angular/core';
import { ApodService } from '../_services/apod.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styles: []
})
export class ApodComponent implements OnInit {

  loading = false;
  safeUrl;
  pictureOfTheDay$: Observable<any>;
  media_type = "";

  constructor(private apodService: ApodService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getPicture();
  }

  getPicture() {
    this.loading = true;
    this.pictureOfTheDay$ = this.apodService.getPicture$()
      .pipe(
        map( data => {
          this.media_type = data.media_type;
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
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
