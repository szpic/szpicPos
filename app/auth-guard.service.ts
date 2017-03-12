import { Injectable }     from '@angular/core';
import { CanActivate, Router,NavigationExtras }    from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    console.log('AuthGuard#canActivate called');
    return this.checkLogin();

  }
  checkLogin(): boolean{
    if(this.authService.isLoggedIn){ return true};
    this.router.navigate(['/login']);
    return false;
  }
}