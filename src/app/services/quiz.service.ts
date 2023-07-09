import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuiz } from '../models/iquiz';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}
  baseurl = 'https://localhost:44383/api/Question';
  jwt: string | null = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.jwt}` };
  getQuiz(id: number): Observable<IQuiz[]> {
    return this.http.get<IQuiz[]>(`${this.baseurl}/${id}`, {
      headers: this.headers,
    });
  }
}
