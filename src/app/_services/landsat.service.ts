import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandsatService {

  readonly ROOT_URL = 'https://api.nasa.gov/planetary/earth/';
  readonly API_KEY = 'DMXNZH9gUgbKTDCBVr0KPtEoBUevokKx8cvx3sjN';

  today = new Date().toISOString().slice(0, 10);

  constructor(private http: HttpClient) { }

  getAssets$(lat, lon, begin, end?): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('lat', lat)
      .set('lon', lon)
      .set('begin', begin)
      .set('end', end || this.today)

    return this.http.get(this.ROOT_URL + "assets", { params })
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

  getImagery$(lat, lon, date, dim?): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('lat', lat)
      .set('lon', lon)
      .set('date', date)
      .set('dim', dim || 0.1)
      .set('cloud_score', 'True')

    return this.http.get(this.ROOT_URL + "imagery", { params })
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError(
          (error) => {
            console.log(error);
            return EMPTY;
          }),
        share()
      );
  }
}
