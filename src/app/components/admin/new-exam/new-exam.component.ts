import { IPostTest } from './../../../models/ipost-test';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css'],
})
export class NewExamComponent {
  constructor(private test: TestService) {}
  testExam: IPostTest = {
    name: '',
    img: '',
  };
  formExam = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  get getname() {
    return this.formExam.controls['name'];
  }
  get getimage() {
    return this.formExam.controls['image'];
  }
  onsubmit(e: any) {
    if (this.formExam.status == 'VALID') {
      this.testExam.name = this.getname.value;
      this.testExam.img = this.getimage.value;

      this.test.AddTest(this.testExam).subscribe({
        next: (res) => {
          // console.log(res);
        },
      });
      this.getname.reset();
      this.getimage.reset();
    } else {
      e.preventDefault();
    }
  }
}
