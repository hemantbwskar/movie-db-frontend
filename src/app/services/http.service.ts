import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Movies, Movie } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

getMovieList(
ordering: string,
search?: string,
): Observable<Movie[]>{
  let params = new HttpParams().set('ordering', ordering);

  if(search){
    params=new HttpParams().set('ordering', ordering).set('title', search);
  }

  return this.http.get<Movie[]>(`${env.BASE_URL}search`, {
    params: params,});
  
}

}
