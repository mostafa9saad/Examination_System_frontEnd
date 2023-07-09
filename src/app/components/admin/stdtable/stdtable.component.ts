import { Component, OnInit } from '@angular/core';
import { Istudent } from 'src/app/models/istudent';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-stdtable',
  templateUrl: './stdtable.component.html',
  styleUrls: ['./stdtable.component.css'],
})
export class StdtableComponent implements OnInit {
  constructor(private studentService: StudentService) {}
  students: Istudent[] = [];
  ngOnInit(): void {
    this.studentService.getAll().subscribe({
      next: (res: Istudent[]) => {
        this.students = res;
      },
    });
  }
}
