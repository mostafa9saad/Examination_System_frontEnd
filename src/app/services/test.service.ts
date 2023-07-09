import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itest } from '../models/itest';
import { Observable } from 'rxjs';
import { IPostTest } from '../models/ipost-test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  baseural: string = 'https://localhost:44383/api/Test';
  jwt: string | null = localStorage.getItem('token');
  headers = { Authorization: `Bearer ${this.jwt}` };
  constructor(private http: HttpClient) {}
  getAllTest(): Observable<Itest[]> {
    return this.http.get<Itest[]>(this.baseural, { headers: this.headers });
  }
  AddTest(test:IPostTest) {
    return this.http.post(this.baseural, test, { headers: this.headers });
  }
}
