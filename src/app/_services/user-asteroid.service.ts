import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthService } from '../_services/auth.service';
import { UserAsteroid } from '../_interfaces/user-asteroid';
import { User } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAsteroidService {
  private collection = "user-asteroids";

  user: User;
  userAsteroid$: Observable<UserAsteroid[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.userAsteroid$ = this.afs.collection<UserAsteroid>(this.collection).valueChanges();
    this.authService.userData$.subscribe(data => this.user = data);
  }

  getAsteroids(){
    return this.userAsteroid$;
  }

  addAsteroid(asteroid) {
    const neoKey = this.afs.createId();
    const document = this.collection + "/" + neoKey;
    this.afs.doc(document).set({
      neoKey: neoKey,
      userId: this.user.uid,
      asteroidId: asteroid,
    }).catch(
      error => console.error('Error writing document: ', error)
    );
  }

  deleteAsteroid(id) {
    //asteroiden met deze id ophalen
    var asteroidSubscription = this.afs.collection<any>(this.collection, ref => ref.where('asteroidId', '==', id)).valueChanges().subscribe(asteroidCollection => {
      asteroidCollection.forEach(asteroid => {
        //van deze asteroiden bepalen of ze door deze user zijn opgeslagen
        if (this.user.uid == asteroid.userId) {
          const path = this.collection + '/' + asteroid.neoKey;
          this.afs.doc(path).delete().catch(
            error => console.error('Error writing document: ', error)
          );
        }
      });
      asteroidSubscription.unsubscribe();
    });
  }
}
