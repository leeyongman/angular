
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { throwError, Observable } from 'rxjs';


const api = '/api';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class HeroService {
  constructor(private http: HttpClient) {}



  deleteHero(hero: any) {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    return this.http.delete(`${api}/heroes/${hero._id}`, {
      headers: httpHeaders,
      observe: 'response'
    }).pipe(
      catchError(this.handleError)
    );
  }

  addHero(hero: Hero): Observable<any> {
    console.log('log start');
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

    console.log('log start22');
    return this.http.post<Hero>(`${api}/heroes`, hero, {
      headers: httpHeaders,
      observe: 'response'
    }).pipe(
      catchError(this.handleError)
    );
    /*.map(this.extractData)
      .catch(this.handleErrorObservable);
*/
    /*.pipe(
      catchError(this.handleError)
    );*/


  }
  /*addHero(hero: Hero): Observable<Hero> {

    console.log('log start');
    console.log(hero);
    const body = new URLSearchParams();
      body.set('id', hero.id.toString());
      body.set('name', hero.name);

      console.log('id : ' + body.get('id'));
      console.log('name : ' + body.get('name'));

      console.log('post url :' + `${api}/heroes`);

    return this.http.post(`${api}/heroes`, hero, {
      headers: httpOptions.headers,
      observe: 'response'
    }).toPromise()
    .then(Response.json());
  }*/
  getHeroes() {
    return this.http.get<Array<Hero>>(`${api}/heroes`).pipe(
      catchError(this.handleError)
    );
  }

  /*addHero(hero: Hero) {
    console.log(hero);
    return this.http.post<Hero>(`${api}/heroes`, hero, httpOptions).pipe(
      catchError(this.handleError)
    );
  }*/



  updateHero(hero: Hero) {
    return this.http.put<Hero>(`${api}/hero/${hero.id}`, hero);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
