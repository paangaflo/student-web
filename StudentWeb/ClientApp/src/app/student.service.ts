import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  url = '/api/students';

  constructor(private http: HttpClient) { }

  getAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  getStudentById(studentId: string): Observable<Student> {
    return this.http.get<Student>(this.url + '/' + studentId);
  }

  createStudent(student: Student): Observable<Student> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Student>(this.url, student, httpOptions);
  }

  updateStudent(student: Student): Observable<Student> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Student>(this.url + '/' + student.id, student, httpOptions);
  }

  deleteStudentsById(studentId: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/' + studentId, httpOptions);
  }
}