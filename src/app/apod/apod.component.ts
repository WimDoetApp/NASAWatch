import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styles: []
})
export class ApodComponent implements OnInit {

  loading = false;
  pictureOfTheDay$: Observable<any>;
  pictureUrl = "";
  subscription: Subscription;

  constructor(private apodService: ApodService) { }

  ngOnInit() {
    this.getPicture();
  }

  getPicture(){
    this.loading = true;
    this.pictureOfTheDay$ = this.apodService.getPicture$()
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
  }

}
