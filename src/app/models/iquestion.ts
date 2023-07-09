import { IAnswer } from './ianswer';

export interface IQuestion {
  body: string | null;
  type: string | null;
  TestId: number | null;
  answers: IAnswer[];
}
