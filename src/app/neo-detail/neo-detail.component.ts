import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NeoService } from '../services/neo.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { UserAsteroidService } from '../services/user-asteroid.service';

@Component({
  selector: 'app-neo-detail',
  templateUrl: './neo-detail.component.html',
  styles: []
})
export class NeoDetailComponent implements OnInit {

  id: String;
  private sub: any;
  private astroSub: any;
  showApproach = false;

  loading = false;
  getLookup$: Observable<any>;
  subscription: Subscription;

  user: User;
  hasAsteroid = false;
  userAsteroid$: Observable<any>;

  constructor(private route: ActivatedRoute, private neoService: NeoService, private authService: AuthService, public userAsteroidService: UserAsteroidService) { }

  ngOnInit() {
    //user data
    this.authService.userData$.subscribe(data => {
      this.user = data;

      //alle asteroiden ophalen
      this.userAsteroid$ = this.userAsteroidService.getAsteroids();

      //bepalen of deze user deze asteroide al heeft opgeslagen
      this.astroSub = this.userAsteroid$.subscribe(asteroids => {
        asteroids.forEach(document => {
          if (document.asteroidId == this.id && document.userId == this.user.uid) {
            this.hasAsteroid = true;
            console.log("test: ", this.hasAsteroid);
          }
          console.log(document);
        });
        this.astroSub.unsubscribe();
      });
    });

    //asteroid id binnen krijgen
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

  addAsteroid(id) {
    this.userAsteroidService.addAsteroid(id);
    this.hasAsteroid = true;;
  }

  removeAsteroid(id){
    this.userAsteroidService.deleteAsteroid(id);
    this.hasAsteroid = false;
  }
}
