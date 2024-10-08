import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { application } from 'express';
import { json } from 'stream/consumers';
import { WishItem } from '../../shared/models/wishItem';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  constructor(private http: HttpClient) { }

  private getStandaradOptions() : any{
    return {
      headers : new HttpHeaders({
        'Content-type' : 'application/json',
      })
    };
  }

  getWishes(){
    let options = this.getStandaradOptions();

    options.params = new HttpParams({
      fromObject: {
        format: 'json'
      }
    });

    return this.http.get('assets/wishes.json', options).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('There is an issue with the client or network: ', error.error);
    }else{
      console.error('Server-side-error: ', error.error)
    }

    return throwError(() => new Error('Cannot retrieve wishes from the server. Please try again'));
  }

  private addWish(wish: WishItem){
    let options = this.getStandaradOptions();

    options.headers = options.headers.set('Authorization', 'value-needed-for-authorization')
    this.http.post('assets/wishes.json', wish, options);
  }
}
