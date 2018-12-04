import { Component, OnInit, Input, TestabilityRegistry } from '@angular/core';
import { EarthImage } from 'src/app/_interfaces/earth-image';
import { Observable } from 'rxjs';
import { User } from 'src/app/_interfaces/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserImageService } from 'src/app/_services/user-image.service';

@Component({
  selector: 'app-landsat-item',
  templateUrl: './landsat-item.component.html'
})
export class LandsatItemComponent implements OnInit {

  @Input() image: EarthImage;
  @Input() tab: String;
  
  hasImage = false;

  //user & db
  user: User;
  userImages$: Observable<any>;
  private imageSub: any;

  constructor(private authService: AuthService, private userImageService: UserImageService) { }

  ngOnInit() {
    //userdata ohpalen
    this.authService.userData$.subscribe(data => {
      this.user = data;
    });

    //alle images ophalen
    this.userImages$ = this.userImageService.getImages();

    //bepalen of deze user deze asteroide al heeft opgeslagen
    this.imageSub = this.userImages$.subscribe(images => {
      images.forEach(document => {
        if (document.id == this.image.id && document.userId == this.user.uid) {
          this.hasImage = true;
        }
      });
      this.imageSub.unsubscribe();
    });
  }

  addImage(image: EarthImage){
    this.userImageService.addImage(image);
    this.hasImage = true;
  }

  removeImage(image: EarthImage){
    this.userImageService.delete(image.id);
    this.hasImage = false;
  }

}
