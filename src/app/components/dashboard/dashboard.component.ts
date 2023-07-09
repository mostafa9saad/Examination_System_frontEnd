import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router, private login: LoginService) {}
  flag = false;
  close(bar: any) {
    this.flag = !this.flag;
  }
  logout() {
    this.login.logout();
    this.router.navigate(['/home']);
  }
}
