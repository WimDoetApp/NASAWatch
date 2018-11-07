import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NeoService } from '../services/neo.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-neo-detail',
  templateUrl: './neo-detail.component.html',
  styles: []
})
export class NeoDetailComponent implements OnInit {

  id: String;
  private sub: any;
  showApproach = false;

  loading = false;
  getLookup$: Observable<any>;
  subscription: Subscription;

  constructor(private route :ActivatedRoute,private neoService: NeoService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.getLookup(this.id);
    });
  }

  getLookup(id) {
    this.loading = true;
    this.getLookup$ = this.neoService.getLookup$(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
  }

}
