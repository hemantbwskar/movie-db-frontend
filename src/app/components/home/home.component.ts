import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Movies, Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public sortBy="";
  public movies: Array<Movie>=[];
  constructor(
    private httpService: HttpService,
    private ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params)=>{
      if (params['title']){
        this.searchMovies('released','title');
      }else{
        this.searchMovies('released');
      }
    });
  }

  searchMovies(sortBy: string, search?: string ): void{
    this.httpService.getMovieList(sortBy, search).subscribe((movieList: Movie[])=>{
      this.movies = movieList;
      console.log(movieList);
    });
  }

}
