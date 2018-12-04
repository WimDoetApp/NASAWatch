import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { EarthImage } from '../_interfaces/earth-image';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { UserImage } from '../_interfaces/user-image';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  private collection = "user-images";

  user: User;
  userImage$: Observable<UserImage[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.userImage$ = this.afs.collection<UserImage>(this.collection).valueChanges();
    this.authService.userData$.subscribe(data => this.user = data);
  }

  getImages(){
    return this.userImage$;
  }

  addImage(earthImage){
    const imageKey = this.afs.createId();
    const document = this.collection + "/" + imageKey;
    this.afs.doc(document).set({
      imageKey: imageKey,
      id: earthImage.id,
      date: earthImage.date,
      url: earthImage.url,
      userId: this.user.uid,
      lat: earthImage.lat,
      lon: earthImage.lon,
      dim: earthImage.dim,
    }).catch(
      error => console.error('Error writing document: ', error)
    );
  }

  delete(id){
    //images met deze id ophalen
    console.log(id);
    var imageSub = this.afs.collection<any>(this.collection, ref => ref.where('id', '==', id)).valueChanges().subscribe(imageCollection => {
      imageCollection.forEach(image => {
        //van deze images bepalen of ze door de user zijn aangemaakt
        if(this.user.uid == image.userId){
          const path = this.collection + '/' + image.imageKey;
          this.afs.doc(path).delete().catch(
            error => console.error('Error writing document: ', error)
          );
        }
      })
      imageSub.unsubscribe();
    });
  }
}
