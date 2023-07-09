import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../models/iquestion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://localhost:44383/api/Question';
  jwt: string | null = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.jwt}` };
  public AddQuestion(question: IQuestion): Observable<IQuestion> {
    return this.http.post<IQuestion>(this.baseUrl, question, {
      headers: this.headers,
    });
  }
}
