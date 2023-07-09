import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iregister } from '../models/iregister';
import { Observable } from 'rxjs';
import { Istudent } from '../models/istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://localhost:44383/api';
  jwt: string | null = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.jwt}` };
  register(register: Iregister) {
    return this.http.post(`${this.baseUrl}/student`, register, {
      headers: this.headers,
    });
  }
  getAll(): Observable<Istudent[]> {
    return this.http.get<Istudent[]>(`${this.baseUrl}/student`, {
      headers: this.headers,
    });
  }
}
