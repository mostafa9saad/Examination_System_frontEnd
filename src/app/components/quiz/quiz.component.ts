import { NavComponent } from './../nav/nav.component';
import { ExamService } from './../../services/exam.service';
import { LoginService } from './../../services/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuiz } from 'src/app/models/iquiz';
import { IExam } from 'src/app/models/iexam';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private LoginService: LoginService,
    private examService: ExamService
  ) {}
  testID: number = 0;
  stdId: number = 0;
  jwt: string | null = localStorage.getItem('token');
  questionList: IQuiz[] = [];
  nextQuestion: IQuiz = {
    body: '',
    type: '',
    answers: [],
  };
  exam: IExam = {
    stdId: 0,
    testId: 0,
    degree: 0,
  };

  i: number = 0;
  degree: number = 0;
  flag: boolean = false;
  answerslist: boolean[] = [];
  checked: boolean[] = [];
  FristAns: boolean = false;
  SecondAns: boolean = false;
  ThirdAns: boolean = false;
  FourthAns: boolean = false;

  ngOnInit(): void {
    this.testID = Number(this.activateRouter.snapshot.paramMap.get('id'));
    if (this.jwt != null) {
      this.stdId = Number(this.LoginService.getUsers(this.jwt).id);
    }
    // console.log(this.stdId);

    this.quizService.getQuiz(this.testID).subscribe({
      next: (data: IQuiz[]) => {
        this.questionList = data;

        this.nextQuestion = this.questionList[0];
        for (let i = 0; i < this.nextQuestion.answers.length; i++) {
          this.answerslist.push(this.nextQuestion.answers[i].isTrue);
        }
      },
    });
  }
  onclick() {
    // console.log(this.checked);
    this.checked.push(this.FristAns ? true : false);
    this.checked.push(this.SecondAns ? true : false);
    this.checked.push(this.ThirdAns ? true : false);
    this.checked.push(this.FourthAns ? true : false);
    // console.log(this.checked);
    // console.log(this.answerslist);
    for (var i = 0; i < this.answerslist.length; i++) {
      if (this.answerslist[i] == this.checked[i]) {
        this.flag = true;
      } else {
        this.flag = false;
        break;
      }
    }
    if (this.flag) {
      this.degree++;
    }
    // console.log(this.degree);

    this.i++;
    if (this.i < this.questionList.length) {
      this.nextQuestion = this.questionList[this.i];
    } else {
      this.degree = (this.degree / this.questionList.length) * 100;
      this.exam.degree = this.degree;
      this.exam.stdId = this.stdId;
      this.exam.testId = this.testID;

      this.examService.AddExam(this.exam).subscribe({
        next: (result) => {},
        error: (err) => {
          this.examService.updateExam(this.exam).subscribe({
            next: (result) => {},
          });
        },
      });
      alert('Quiz is End');
      this.router.navigate(['/examlist']);
    }
    // console.log(this.ans1);
    this.checked = [];
    this.answerslist = [];
    for (let i = 0; i < this.nextQuestion.answers.length; i++) {
      this.answerslist.push(this.nextQuestion.answers[i].isTrue);
    }
  }
}
