import { Ipayload } from './../models/ipayload';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class hasRoleGuard implements CanActivate {
  constructor(private router: Router, private loginservice: LoginService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let jwt: string | null = localStorage.getItem('token');
    let user: Ipayload = {
      id: '',
      fName: '',
      lName: '',
      Role: '',
      Email: '',
    };
    if (jwt != null) {
      user = this.loginservice.getUsers(jwt);
    }
    if (user.Role.includes('admin')) {
      return true;
    } else {
      this.router.navigate(['/examlist']);
      return false;
    }
  }
}

// import { CanActivateFn } from '@angular/router';
// import { LoginService } from '../services/login.service';
// import { Ipayload } from '../models/ipayload';

// export const hasRoleGuard: CanActivateFn = (route, state) => {
//   let jwt: string | null = localStorage.getItem('token');
//   let user: Ipayload;
//   if (jwt != null) {
//     let obj: any = JSON.parse(atob(jwt.split('.')[1]));

//     user = {
//       id: obj.id,
//       fName: obj.fName,
//       lName: obj.lName,
//       Email: obj.Email,
//       Role: obj.role,
//     };
//     return user.Role.includes(route.data['role']);
//   }
//   return false;
// };
