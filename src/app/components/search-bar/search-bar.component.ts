import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router,private tokenStorageService: TokenStorageService) { }


  onSubmit(form:NgForm) {
    let search: String = form.value.search;
    this.router.navigate(['search',search]);
  }

  onAddMovie(){
    this.router.navigate(['add-movie']);
  }

  ngOnInit(): void {
    }
  

}