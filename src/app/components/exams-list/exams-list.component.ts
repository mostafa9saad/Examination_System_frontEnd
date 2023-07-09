import { Itest } from 'src/app/models/itest';
import { TestService } from './../../services/test.service';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.css'],
})
export class ExamsListComponent implements OnInit {
  constructor(private testService: TestService) {}
  testList: Itest[] = [];
  ngOnInit(): void {
    this.testService.getAllTest().subscribe({
      next: (response) => {
        this.testList = response;
        // console.log(this.testList);
      },
    });
  }
}
