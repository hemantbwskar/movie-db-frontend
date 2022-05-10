import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Movie } from '../models';

const AUTH_API = `${env.AUTH_URL}`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API, {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  getMovieDetails(movieId: number): Observable<Movie>{

    console.log(this.http.get<Movie>(`${env.BASE_URL}movie/${movieId}`,httpOptions));
    return this.http.get<Movie>(`${env.BASE_URL}movie/${movieId}`,httpOptions);
    // console.log(movieInfoRequest);
    // return movieInfoRequest;
  }
  
  addMovie(movie: String): Observable<any>{
    const headers = { 'content-type': 'application/json'} 
    return this.http.post(`${env.BASE_URL}add-movie`, movie,httpOptions );
  }
}