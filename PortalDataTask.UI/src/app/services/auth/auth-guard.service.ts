import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{

    if (!this.authService.isLogged) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    };

    return true;
  }
}
