import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  islogin: boolean = false;
  role: String = '';
  jwt: string | null = localStorage.getItem('token');
  ngOnInit(): void {
    this.loginService.loggedIn().subscribe({
      next: (value) => {
        this.islogin = value;
      },
    });
    if (this.jwt != null) {
      this.role = this.loginService.getUsers(this.jwt).Role;
    }
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
}
