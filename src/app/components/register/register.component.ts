import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email:null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isVisible:boolean;
  errorMessage = '';
  roles: string[] = [];
  user:any;
  isSuccess:any="";
  constructor(private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router : Router,
    private route:ActivatedRoute) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.isVisible=false;
      this.user=localStorage.getItem("CurrentUser");
    }
  }
  onSubmit(): void {
    const { username,email, password } = this.form;
    this.authService.register(username,email, password).subscribe(
      data => {
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);
        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        // localStorage.setItem("CurrentUser", username);
        // this.user=localStorage.getItem("CurrentUser");
        this.isVisible=true;
        setTimeout(() => {
        //   this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
        //     this.router.navigate(['MenuDrawerComponent']);
        // }); 
          this.router.navigate(['/login'])
          .then(() => {
            window.location.reload()
          })
        // window.location.reload();
        // this.reloadPage();
          // this.router.navigate(['/']);
        }, 2000);
        
        
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
   
}