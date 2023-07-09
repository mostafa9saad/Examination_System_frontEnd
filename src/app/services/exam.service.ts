import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../models/iexam';
import { IExamsINFO } from '../models/iexams-info';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://localhost:44383/api';
  jwt: string | null = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.jwt}` };
  AddExam(exam: IExam): Observable<IExam> {
    return this.http.post<IExam>(`${this.baseUrl}/Exam`, exam, {
      headers: this.headers,
    });
  }
  updateExam(exam: IExam): Observable<IExam> {
    return this.http.put<IExam>(`${this.baseUrl}/Exam`, exam, {
      headers: this.headers,
    });
  }
  getExamsINFO(): Observable<IExamsINFO[]> {
    return this.http.get<IExamsINFO[]>(`${this.baseUrl}/Exam`, {
      headers: this.headers,
    });
  }
  getExamsById(id: number): Observable<IExamsINFO[]> {
    return this.http.get<IExamsINFO[]>(`${this.baseUrl}/Exam/${id}`, {
      headers: this.headers,
    });
  }
}
