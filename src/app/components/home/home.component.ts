import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movies, Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  public search: string;
  public sortBy="";
  public movies: Array<Movie>=[];
  private routeSub: Subscription;
  private movieSub: Subscription;

  constructor(
    private router : Router,
    private httpService: HttpService,
    private ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeSub=this.ActivatedRoute.params.subscribe((params: Params)=>{
      // console.log(params);
      if (params['title']){
        // console.log(params['title']);
        this.searchMovies("released", params['title']);
      }else{
        this.searchMovies('released');
      }
    });
  }

  searchMovies(sortBy: string, search?: string ): void{
   this.movieSub= this.httpService.getMovieList(sortBy, search).subscribe((movieList: Movie[])=>{
      this.movies = movieList;
      console.log(movieList);
    });
  }

  openMovieDetails(movieId: number): void{
    this.router.navigate(['/movie', movieId]);
  }

  ngOnDestroy(): void{
    if(this.routeSub){
    this.routeSub.unsubscribe();
    }
    if(this.movieSub){
    this.movieSub.unsubscribe();
    }
  }

}
