import { Component, OnInit } from '@angular/core';
import { NeoService } from '../services/neo.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-neo',
  templateUrl: './neo.component.html',
  styles: []
})
export class NeoComponent implements OnInit {

  loading = false;
  getBrowse$: Observable<any>;
  pictureUrl = "";
  subscription: Subscription;

  constructor(private neoService: NeoService) { }

  ngOnInit() {
    this.getBrowse();
  }

  getBrowse() {
    this.loading = true;
    this.getBrowse$ = this.neoService.getBrowse$()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
  }

}
