import { Injectable } from '@angular/core';
import { User } from '../_interfaces/user';
import { Observable } from 'rxjs';
import { UserImage } from '../_interfaces/user-image';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserPhotoService {

  private collection = "user-photos";

  user: User;
  userPhotos$: Observable<UserImage[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.userPhotos$ = this.afs.collection<UserImage>(this.collection).valueChanges();
    this.authService.userData$.subscribe(data => this.user = data);
  }

  getPhotos(){
    return this.userPhotos$;
  }

  addPhoto(roverPhoto){
    const imageKey = this.afs.createId();
    const document = this.collection + "/" + imageKey;
    this.afs.doc(document).set({
      imageKey: imageKey,
      id: roverPhoto.id,
      date: roverPhoto.date,
      url: roverPhoto.url,
      userId: this.user.uid,
      sol: roverPhoto.sol,
      cameraName: roverPhoto.cameraName,
      cameraFullName: roverPhoto.cameraFullName,
    }).catch(
      error => console.error('Error writing document: ', error)
    );
  }

  delete(id){
    //images met deze id ophalen
    console.log(id);
    var photoSub = this.afs.collection<any>(this.collection, ref => ref.where('id', '==', id)).valueChanges().subscribe(photoCollection => {
      photoCollection.forEach(photo => {
        //van deze images bepalen of ze door de user zijn aangemaakt
        if(this.user.uid == photo.userId){
          const path = this.collection + '/' + photo.imageKey;
          this.afs.doc(path).delete().catch(
            error => console.error('Error writing document: ', error)
          );
        }
      })
      photoSub.unsubscribe();
    });
  }
}
