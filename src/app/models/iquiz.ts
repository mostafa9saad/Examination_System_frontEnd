import { IAnswer } from './ianswer';

export interface IQuiz {
  body: string;
  type: string;
  answers: IAnswer[];
}
