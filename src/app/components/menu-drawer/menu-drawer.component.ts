import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { CustomItem} from 'src/app/models';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-menu-drawer',
  templateUrl: './menu-drawer.component.html',
  styleUrls: ['./menu-drawer.component.scss']
})
export class MenuDrawerComponent  {
    @ViewChild(IgxNavigationDrawerComponent, { static: true })
    public drawer: IgxNavigationDrawerComponent;
    currentUser:any=localStorage.getItem("CurrentUser");
    private routeSub: Subscription;


    constructor(private tokenStorageService: TokenStorageService,
      
    private ActivatedRoute: ActivatedRoute) { }

    public navItems = [
        { name: 'account_circle', text: 'login' },
        { name: 'error', text: 'Badge' },
        { name: 'group_work', text: 'Button Group' }
    ];

    public selected = 'Avatar';

    public navigate(item:CustomItem) {
        this.selected = item.text;
        this.drawer.close();
    }

    private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  status:boolean=false;
  ngOnInit(): void {
    this.routeSub=this.ActivatedRoute.params.subscribe(()=>{
      // window.location.reload();
    });

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  loggedIn() {
    this.isLoggedIn=true;
  }

  drawerFunc(){
 this.status=!this.status;
 this.drawer.toggle();

    
  }
}