import { Component, OnInit } from '@angular/core';
import { NgForm, FormArray,FormArrayName, FormControl, FormGroup } from '@angular/forms';
import { Movie } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  genres: string[] = [];
  platforms: string[] = [];
  trailerList: string[] = [];
 
  ratings: string[] = [];
  screenshots: string[] = [];
  movie:Movie=new Movie();
  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
  }

      
addTrailer() {
  let v=document.getElementById('trailer') as HTMLInputElement;
  this.trailerList.push(v.value);
  v.value='';
}
addRating() {
  let v=document.getElementById('rating') as HTMLInputElement;
  this.ratings.push(v.value);
  v.value='';
}
addGenre() {
  let v=document.getElementById('genre') as HTMLInputElement;
  this.genres.push(v.value);
  v.value='';
}
addScreenShot() {
  let v=document.getElementById('screenshot') as HTMLInputElement;
  this.screenshots.push(v.value);
  v.value='';
}
addPlatform() {
  let v=document.getElementById('platform') as HTMLInputElement;
  this.platforms.push(v.value);
  v.value='';
}

  onSubmit(form: NgForm) {
    
    this.movie.genres = this.genres;
    this.movie.platforms = this.platforms;
    this.movie.trailers=this.trailerList;
    this.movie.ratings = this.ratings;
    this.movie.screenshots = this.screenshots;
    
    const headers = { 'content-type': 'application/json'} 
const movie=JSON.stringify(this.movie);
this.httpService.addMovie(movie).subscribe((movieResp: Movie)=>{

    console.log(this.movie);
  });
  }
}
