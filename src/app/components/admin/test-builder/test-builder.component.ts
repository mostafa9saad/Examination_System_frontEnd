import { Ipayload } from './../../../models/ipayload';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IQuestion } from 'src/app/models/iquestion';
import { Istudent } from 'src/app/models/istudent';
import { Itest } from 'src/app/models/itest';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-builder',
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.css'],
})
export class TestBuilderComponent implements OnInit {
  constructor(
    private question: QuestionService,
    private testservice: TestService,
    private login: LoginService
  ) {}
  testList: Itest[] = [];
  testName: any;
  questions: string = '';
  jwt: string | null = localStorage.getItem('token');

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
    }
    this.testservice.getAllTest().subscribe({
      next: (test: Itest[]) => {
        this.testList = test;
        console.log(test);
      },
    });
  }
  checked: boolean[] = [];
  FristAns: boolean = false;
  SecondAns: boolean = false;
  ThirdAns: boolean = false;
  FourthAns: boolean = false;
  testbuild = new FormGroup({
    questionBody: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    testName: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required]),
    mark: new FormControl('', [Validators.required]),
    answer1: new FormControl('', [Validators.required]),
    answer2: new FormControl('', [Validators.required]),
    answer3: new FormControl('', [Validators.required]),
    answer4: new FormControl('', [Validators.required]),
    isTrue1: new FormControl('', []),
    isTrue2: new FormControl('', []),
    isTrue3: new FormControl('', []),
    isTrue4: new FormControl('', []),
  });
  get getType() {
    return this.testbuild.controls['type'];
  }
  get getQuestionBody() {
    return this.testbuild.controls['questionBody'];
  }
  get getquestionBody() {
    return this.testbuild.controls['questionBody'];
  }
  get gettestName() {
    return this.testbuild.controls['testName'];
  }
  get getdifficulty() {
    return this.testbuild.controls['difficulty'];
  }
  get getmark() {
    return this.testbuild.controls['mark'];
  }
  get getanswer1() {
    return this.testbuild.controls['answer1'];
  }
  get getanswer2() {
    return this.testbuild.controls['answer2'];
  }
  get getanswer3() {
    return this.testbuild.controls['answer3'];
  }
  get getanswer4() {
    return this.testbuild.controls['answer4'];
  }
  get getisTrue1() {
    return this.testbuild.controls['isTrue1'];
  }
  get getisTrue2() {
    return this.testbuild.controls['isTrue2'];
  }
  get getisTrue3() {
    return this.testbuild.controls['isTrue3'];
  }
  get getisTrue4() {
    return this.testbuild.controls['isTrue4'];
  }
  onpublich(e: any) {
    this.checked.push(this.getisTrue1.value ? true : false);
    this.checked.push(this.getisTrue2.value ? true : false);
    this.checked.push(this.getisTrue3.value ? true : false);
    this.checked.push(this.getisTrue4.value ? true : false);
    // console.log(this.testbuild.value);
    // console.log(this.testbuild);
    // console.log(this.checked);
    // console.log(this.FristAns);
    // console.log(this.SecondAns);
    // console.log(this.ThirdAns);
    // console.log(this.FourthAns);

    if (this.testbuild.status == 'VALID') {
      // console.log('sdasdsad');

      let build: IQuestion = {
        body: this.getquestionBody.value,
        type: this.getType.value,
        TestId: Number(this.gettestName.value),
        answers: [
          {
            answer: this.getanswer1.value,
            isTrue: this.checked[0],
          },
          {
            answer: this.getanswer2.value,
            isTrue: this.checked[1],
          },
          {
            answer: this.getanswer3.value,
            isTrue: this.checked[2],
          },
          {
            answer: this.getanswer4.value,
            isTrue: this.checked[3],
          },
        ],
      };
      this.question.AddQuestion(build).subscribe({
        next: (data) => {},
        error: (err) => {
          console.log(err);
        },
      });
    }
    this.checked = [];
    e.preventDefault();
  }
}
