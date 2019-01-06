import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoverService {

  readonly ROOT_URL = 'https://api.nasa.gov/mars-photos/api/v1/';
  readonly API_KEY = 'DMXNZH9gUgbKTDCBVr0KPtEoBUevokKx8cvx3sjN';

  constructor(private http: HttpClient) { }

  getManifest$(rover): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY);

    return this.http.get(this.ROOT_URL + "manifests/" + rover, { params })
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError(
          (error) => {
            console.log(error);
            alert(error.message);
            return EMPTY;
          }),
        share()
      );
  }

  getLatestPhotos$(rover): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY);

    return this.http.get(this.ROOT_URL + "rovers/" + rover + "/latest_photos", { params })
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError(
          (error) => {
            console.log(error);
            alert(error.message);
            return EMPTY;
          }),
        share()
      );
  }

  getPhotosBySol$(rover, sol): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('sol', sol);

    console.log(this.ROOT_URL + "rovers/" + rover + "/photos" + "?api_key=" + this.API_KEY + "&sol=" + sol);

    return this.http.get(this.ROOT_URL + "rovers/" + rover + "/photos", { params })
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError(
          (error) => {
            console.log(error);
            alert(error.message);
            return EMPTY;
          }),
        share()
      );
  }

  getPhotosByEarthDate$(rover, earthDate): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('earth_date', earthDate);

    return this.http.get(this.ROOT_URL + "rovers/" + rover + "/photos", { params })
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError(
          (error) => {
            console.log(error);
            alert(error.message);
            return EMPTY;
          }),
        share()
      );
  }
}
