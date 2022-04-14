import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
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
    console.log(params);
  }

  return this.http.get<Movie[]>(`${env.BASE_URL}search`, {
    params: params,});
  
}

getMovieDetails(movieId: number): Observable<Movie>{
  const movieInfoRequest= this.http.get<Movie>(`${env.BASE_URL}movie/${movieId}`);
  return movieInfoRequest;
  // const movieTrailersRequest=this.http.get<Movie>(`${env.BASE_URL}movie/${movieId}/videos`);
  // const movieScreenShotsRequest=this.http.get<Movie>(`${env.BASE_URL}movie/${movieId}/images`);

  // forkJoin({
  //   movieInfo: movieInfoRequest,
  //   movieTrailers: movieTrailersRequest,
  //   movieScreenShots: movieScreenShotsRequest,
  // }).pipe(
  //   map((resp:any)=>{
  //     return {
  //       ...resp['movieInfo'],
  //       trailers: resp['movieTrailers']?.results,
  //       screenShots: resp['movieScreenShots']?.results,
  //     }
  //   })
  // )
}

addMovie(movie: String): Observable<any>{
  const headers = { 'content-type': 'application/json'} 
  return this.http.post(`${env.BASE_URL}add-movie`, movie,{'headers':headers} );
}

}
