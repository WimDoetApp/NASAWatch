import { Component, OnInit, Output } from '@angular/core';
import { RoverService } from '../_services/rover.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_interfaces/user';
import { UserPhoto } from '../_interfaces/user-photo';
import { UserPhotoService } from '../_services/user-photo.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-rover-photos',
  templateUrl: './rover-photos.component.html',
  styles: []
})
export class RoverPhotosComponent implements OnInit {

  //Om routing parameter te ontvangen
  tab: String;
  private sub: any;
  private dataSub: any;
  private userSub: any;
  private manifestSub: any;

  //de tab die we gekozen hebben
  currentTab = "0";

  //Voor de api data
  showData$: Observable<any>;
  manifestData$: Observable<any>;
  lookUpData$: Observable<any>;
  userPhotos$: Observable<any>;
  maxDate: String;
  launchDate: String;
  maxSol: String;
  rover: String;

  loading = false;

  //pagination
  currentPage = 1;
  numberOfPages = 0;
  pageSize = 25;

  //models
  user: User;
  dataPhotos: UserPhoto[] = [];
  userPhotos: UserPhoto[] = [];

  constructor(private route: ActivatedRoute, private roverService: RoverService, private authService: AuthService, private userPhotoService: UserPhotoService) { }

  ngOnInit() {
    //userdata ohpalen
    this.authService.userData$.subscribe(data => {
      this.user = data;
    });

    //route parameters ophalen
    this.sub = this.route.params.subscribe(params => {
      this.tab = params['tab'];

      //Switch om te bepalen welke tab we gekozen hebben
      switch (this.tab) {
        case "0":
          this.currentTab = "0";
          this.rover = "spirit"
          this.getLatestPhotos(this.rover);
          this.getManifest(this.rover)
          break;
        case "11":
          this.getUserPhotos();
          break;
      }
    });
  }

  getManifest(rover){
    this.currentPage = 1;
    this.loading = true;
    this.manifestData$ = this.roverService.getManifest$(rover);
    this.manifestSub = this.manifestData$.subscribe(data => {
      this.launchDate = data.photo_manifest.launch_date;
      this.maxDate = data.photo_manifest.max_date;
      this.maxSol = data.photo_manifest.max_sol;
    })
  }

  //per rover de laatste nieuwe fotos ohpalen
  getLatestPhotos(rover) {
    this.currentPage = 1;
    this.loading = true;
    this.showData$ = this.roverService.getLatestPhotos$(rover);
    this.dataSub = this.showData$.subscribe(data => {
      let number = data.latest_photos.length / this.pageSize;
      number = Math.ceil(number);
      this.numberOfPages = number;

      this.dataPhotos = [];

      data.latest_photos.forEach(result => {
        let photo = new UserPhoto;
        photo.date = result.earth_date;
        photo.id = result.id;
        photo.url = result.img_src;
        photo.sol = result.sol;
        photo.cameraFullName = result.camera.name;
        photo.cameraName = result.camera.full_name;

        console.log("test", photo);

        this.dataPhotos.push(photo);
      })

      console.log(this.dataPhotos);

      this.loading = false;
      this.dataSub.unsubscribe();
    })
  }

  getLookUpPhotos(){
    this.currentPage = 1;
    this.loading = true;
    this.dataSub = this.lookUpData$.subscribe(data => {
      let number = data.photos.length / this.pageSize;
      number = Math.ceil(number);
      this.numberOfPages = number;

      this.dataPhotos = [];

      data.photos.forEach(result => {
        let photo = new UserPhoto;
        photo.date = result.earth_date;
        photo.id = result.id;
        photo.url = result.img_src;
        photo.sol = result.sol;
        photo.cameraFullName = result.camera.name;
        photo.cameraName = result.camera.full_name;

        console.log("test", photo);

        this.dataPhotos.push(photo);
      })

      console.log(this.dataPhotos);

      this.loading = false;
      this.dataSub.unsubscribe();
    })
  }

  getUserPhotos() {
    this.currentTab = "11";
    console.log(this.userPhotos.length);
    if (this.userPhotos.length == 0) {
      this.loading = true;
      this.userPhotos$ = this.userPhotoService.getPhotos();
      this.userSub = this.userPhotos$.subscribe(photos => {
        //this.userPhotos = [];

        photos.forEach(document => {
          if (document.userId == this.user.uid) {
            let userPhoto = new UserPhoto;
            userPhoto.date = document.date;
            userPhoto.id = document.id;
            userPhoto.url = document.url;
            userPhoto.sol = document.sol;
            userPhoto.cameraFullName = document.cameraName;
            userPhoto.cameraName = document.cameraFullName;

            this.userPhotos.push(userPhoto);
          }
        })

        this.loading = false;
      });
    }
  }

  onSubmitDate(data){
    var buttonName = document.activeElement.getAttribute("name");
    if(buttonName == "submitDate"){
      this.lookUpData$ = this.roverService.getPhotosByEarthDate$(this.rover, data.datum);
    }
    if(buttonName == "submitSol"){
      this.lookUpData$ = this.roverService.getPhotosBySol$(this.rover, data.sol);
    }

    this.getLookUpPhotos();
  }

  //om door aantal te itereren
  counter(i: number) {
    return new Array(i);
  }

  //vorige pagina
  previousPage() {
    if (this.currentPage != 1) {
      this.currentPage = this.currentPage - 1;
    }
  }

  //volgende pagina
  nextPage() {
    if (this.currentPage != this.numberOfPages) {
      this.currentPage = this.currentPage + 1;
    }
  }

  //pagina kiezen
  choosePage(page) {
    this.currentPage = page;
  }

  //info tabs veranderen
  changeRover(param, rover) {
    $('.infoTabControl').removeClass('is-active');
    $('#roverControl' + param).addClass("is-active");
    this.rover = rover;
    this.getLatestPhotos(rover);
    this.getManifest(rover);
  }

}
