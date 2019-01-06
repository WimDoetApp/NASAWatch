import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_interfaces/user';
import { Observable } from 'rxjs';
import { UserPhotoService } from 'src/app/_services/user-photo.service';
import { UserPhoto } from 'src/app/_interfaces/user-photo';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html'
})
export class PhotoItemComponent implements OnInit {

  @Input() photo: any;
  @Input() tab:String;

  hasImage = false;

  //user & db
  user: User;
  userPhotos$: Observable<any>;
  private imageSub: any;

  constructor(private authService: AuthService, private userPhotoService: UserPhotoService) { }

  ngOnInit() {
    //userdata ohpalen
    this.authService.userData$.subscribe(data => {
      this.user = data;
    });

    //alle images ophalen
    this.userPhotos$ = this.userPhotoService.getPhotos();

    //bepalen of deze user deze asteroide al heeft opgeslagen
    this.imageSub = this.userPhotos$.subscribe(photos => {
      photos.forEach(document => {
        console.log("test", document.id, this.photo.id);
        console.log("test", document.userId, this.user.uid);
        if (document.id == this.photo.id && document.userId == this.user.uid) {
          console.log("hoi");
          this.hasImage = true;
        }
      });
      this.imageSub.unsubscribe();
    });
  }

  addPhoto(photo){
    this.userPhotoService.addPhoto(photo);
    this.hasImage = true;
  }

  removePhoto(photo){
    this.userPhotoService.delete(photo.id);
    this.hasImage = false;
  }

}
