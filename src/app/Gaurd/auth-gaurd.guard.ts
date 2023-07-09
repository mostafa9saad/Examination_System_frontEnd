import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class authGaurdGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let jwtHelper = new JwtHelperService();
    let token: string | null = localStorage.getItem('token');
    let time: any = jwtHelper.isTokenExpired(token);
    if (token) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}

// import { CanActivateFn } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

// export const authGaurdGuard: CanActivateFn = (route, state) => {
//   let jwtHelper = new JwtHelperService();
//   let token: string | null = localStorage.getItem('token');
//   let time: any = jwtHelper.isTokenExpired(token);

//   if (token) {
//     return true;
//   } else {
//     return false;
//   }
// };
