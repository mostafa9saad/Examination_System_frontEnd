import { Component, OnInit } from '@angular/core';
import { IExamsINFO } from 'src/app/models/iexams-info';
import { Ipayload } from 'src/app/models/ipayload';
import { ExamService } from 'src/app/services/exam.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private login: LoginService, private examService: ExamService) {}
  stdId: number = 0;
  jwt: string | null = localStorage.getItem('token');
  examINFO: IExamsINFO[] = [];
  user: Ipayload = {
    id: '',
    fName: '',
    lName: '',
    Role: '',
    Email: '',
  };
  ngOnInit(): void {
    if (this.jwt != null) {
      this.user = this.login.getUsers(this.jwt);
      this.stdId = Number(this.user.id);
      // console.log(this.user.id);
    }

    this.examService.getExamsById(this.stdId).subscribe({
      next: (res: IExamsINFO[]) => {
        this.examINFO = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
