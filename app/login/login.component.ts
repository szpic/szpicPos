import { Component, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  message: string;
  model: any = {};
  subcriber: any;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  public login() {
    this.message = 'Trying to log in ...';

    this.subcriber = this.authService.login(this.model.username, this.model.password)
      .subscribe(data => {
        console.log("subscribe?");
        this.setMessage();
        if (data.status) {
          this.authService.isLoggedIn = true;

          let redirect = '/main';

          let navigationExtras: NavigationExtras = {
            preserveQueryParams: true,
            preserveFragment: true
          };

          // Redirect the user
          this.router.navigate([redirect], navigationExtras);
        }
      },
      error => {
        console.log("wtf");
      });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.setMessage();
  }
  public ngOnDestroy(): void {
    this.subcriber.unsubscribe();
  }
}
