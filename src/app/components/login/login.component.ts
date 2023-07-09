import { Ipayload } from './../../models/ipayload';
import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ilogin } from 'src/app/models/ilogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  Loginfrom = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,4}'),
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get getpassword() {
    return this.Loginfrom.controls['Password'];
  }
  get getEmail() {
    return this.Loginfrom.controls['Email'];
  }

  Login() {
    if (this.Loginfrom.status == 'VALID') {
      let loginModal: Ilogin = {
        Email: `${this.getEmail.value}`,
        Password: `${this.getpassword.value}`,
      };

      this.loginService.checkLogin(loginModal).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/examlist']);
          // user: Ipayload = this.loginService.getUsers(response.token);
          // console.log(this.loginService.getUsers(response.token));
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
