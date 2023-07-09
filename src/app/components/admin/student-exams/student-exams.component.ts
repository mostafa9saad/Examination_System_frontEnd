import { Component, OnInit } from '@angular/core';
import { IExamsINFO } from 'src/app/models/iexams-info';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-student-exams',
  templateUrl: './student-exams.component.html',
  styleUrls: ['./student-exams.component.css'],
})
export class StudentExamsComponent implements OnInit {
  constructor(private examService: ExamService) {}
  examINFO: IExamsINFO[] = [];
  ngOnInit(): void {
    this.examService.getExamsINFO().subscribe({
      next: (result: IExamsINFO[]) => {
        this.examINFO = result;
      },
    });
  }
}
