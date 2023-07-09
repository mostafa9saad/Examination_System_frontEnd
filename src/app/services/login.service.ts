import { Ipayload } from './../models/ipayload';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: BehaviorSubject<boolean>;

  baseUrl: string = 'https://localhost:44383/api/Acount';

  constructor(private http: HttpClient) {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
  }
  checkLogin(loginObj: any) {
    this.isLoggedIn.next(true);
    return this.http.post(this.baseUrl, loginObj);
  }

  getUsers(jwt: string): Ipayload {
    let obj: any = JSON.parse(atob(jwt.split('.')[1]));
    console.log(obj);

    let user: Ipayload = {
      id: obj.id,
      fName: obj.fName,
      lName: obj.lName,
      Email: obj.Email,
      Role: obj.role,
    };
    return user;
    // return JSON.parse(atob(jwt.split('.')[1])) as Ipayload;
  }
  logout() {
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
  }
  loggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable(); //
  }
}
