import { Component, OnInit, Output } from '@angular/core';
import { RoverService } from '../_services/rover.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-rover-manifest',
  templateUrl: './rover-manifest.component.html',
  styles: []
})
export class RoverManifestComponent implements OnInit {

  //Voor de api data
  showData$: Observable<any>;

  loading = false;

  //pagination
  currentPage = 1;
  numberOfPages = 0;
  pageSize = 10;

  constructor(private roverService: RoverService) { }

  ngOnInit() {
    this.getManifest('spirit');
  }

  getManifest(rover){
    this.currentPage = 1;
    this.loading = true;
    this.showData$ = this.roverService.getManifest$(rover)
    .pipe(
      map(data => {
        let number = data.photo_manifest.photos.length / this.pageSize;
        number = Math.ceil(number);
        this.numberOfPages = number;

        return data.photo_manifest;
      }),
      finalize(() => {
        this.loading = false;
      })
    )
  }

  //om door aantal te itereren
  counter(i: number){
    return new Array(i);
  }

  //vorige pagina
  previousPage(){
    if(this.currentPage != 1){
      this.currentPage = this.currentPage-1;
    }
  }

  //volgende pagina
  nextPage(){
    if(this.currentPage != this.numberOfPages){
      this.currentPage = this.currentPage+1;
    }
  }
  
  //pagina kiezen
  choosePage(page){
    this.currentPage = page;
  }

  //info tabs veranderen
  changeRover(param, rover) {
    $('.infoTabControl').removeClass('is-active');
    $('#roverControl' + param).addClass("is-active");
    this.getManifest(rover);
  }
}
