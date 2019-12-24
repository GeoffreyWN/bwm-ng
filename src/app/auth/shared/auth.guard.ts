import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private url: string
  constructor(private authService: AuthService,
              private router: Router) {}

  private handleAuthstate(): boolean {
      if (this.isLoginOrRegister()) {
          this.router.navigate(['/rentals'])

          return false;
      }
      return true;
  }

  private handleNotAuthstate(): boolean {
      if (this.isLoginOrRegister()) {
          return true;
      }

      this.router.navigate(['/login'])
      return false;
    
}

private isLoginOrRegister(): boolean {
    if (this.url.includes('login') || this.url.includes('register')) {
        return true
    }
    return false;
}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.url = state.url; // state url is the url that we are navigating to
    if (this.authService.isAuthenticated()) {
        return this.handleAuthstate();
    }
    return this.handleNotAuthstate()
  }
}


