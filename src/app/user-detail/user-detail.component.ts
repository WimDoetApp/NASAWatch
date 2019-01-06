import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { UserImageService } from '../_services/user-image.service';
import { UserAsteroidService } from '../_services/user-asteroid.service';
import { UserPhotoService } from '../_services/user-photo.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  user: User;
  //observables
  userImages$: Observable<any>;
  userAsteroids$: Observable<any>;
  userPhoto$: Observable<any>;
  //tellers
  tellerImage = 0;
  tellerAsteroid = 0;
  tellerPhoto = 0;
  //sub
  private sub: any;
  private anderesub: any;
  private derdesub: any;

  constructor(private authService: AuthService, private userImageService: UserImageService, private userAsteroidService: UserAsteroidService, private userPhotoService: UserPhotoService) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.user = data);
    this.countUserObjects();
  }

  countUserObjects() {
    this.userImages$ = this.userImageService.getImages();
    this.userAsteroids$ = this.userAsteroidService.getAsteroids();
    this.userPhoto$ = this.userPhotoService.getPhotos();

    this.sub = this.userImages$.subscribe(results => {
      results.forEach(result => {
        if (result.userId == this.user.uid) {
          this.tellerImage++;
        }
      });

      this.sub.unsubscribe();
    })

    this.anderesub = this.userAsteroids$.subscribe(results => {
      results.forEach(result => {
        if (result.userId == this.user.uid) {
          this.tellerAsteroid++;
        }
      });

      this.anderesub.unsubscribe();
    })

    this.derdesub = this.userPhoto$.subscribe(results => {
      results.forEach(result => {
        if (result.userId == this.user.uid) {
          this.tellerPhoto++;
        }
      });

      this.derdesub.unsubscribe();
    })
  }

}
