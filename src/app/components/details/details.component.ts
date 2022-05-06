import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import {Movie} from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
movieRating=0;
movieId:number;
movie: Movie;
routeSub: Subscription;
movieSub: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: AuthService,
  ) { }

  ngOnInit(): void {
    this.routeSub=this.ActivatedRoute.params.subscribe((params: Params)=>{
      this.movieId=params['movieId'];
      this.getMovieDetails(this.movieId);
    });
  }

  getMovieDetails(movieId: number): void{
  this.movieSub= this.httpService.getMovieDetails(movieId).subscribe((movieResp: Movie)=>{
  this.movie=movieResp;
  console.log(movieResp);
  setTimeout(()=>{
    this.movieRating=8.7;
  },1000);
  });
  }

  getColor(rating: number): string{
    if(rating>=8){
      return 'green';
    }else if(rating>=6){
      return 'orange';
    }else{
      return 'red';
    }
  }

}
