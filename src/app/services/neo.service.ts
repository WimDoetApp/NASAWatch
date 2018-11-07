import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NeoService {

  readonly ROOT_URL = 'https://api.nasa.gov/neo/rest/v1/';
  readonly API_KEY = 'DMXNZH9gUgbKTDCBVr0KPtEoBUevokKx8cvx3sjN';

  constructor(private http: HttpClient) { }

  getBrowse$(): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY);

    return this.http.get(this.ROOT_URL + "neo/browse", { params })
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

  getFeed$(start_date){
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('start_date', start_date);

      console.log(this.ROOT_URL + "feed" + params);

      return this.http.get<any>(this.ROOT_URL + "feed", { params })
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

  getLookup$(id): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY);

      return this.http.get(this.ROOT_URL + "neo/" + id, { params })
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
