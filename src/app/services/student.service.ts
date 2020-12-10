import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { LoadStudents } from '../interfaces/load-students.interface';

import { Student } from '../models/student.model';
import { map } from 'rxjs/operators';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token2') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadStudents(since: number = 0) {
    const url = `${url_base}/students?desde=${since}`;
    return this.http.get<LoadStudents>(url, this.headers);
  }
  
  createStudent(student: {identityDocument: string, fullName: string, age: number, address: string, email: string, contactNumber: string, guardianName: string, guardianContactNumber: string, lastApprovedGrade: number,}) {
    const url = `${url_base}/students`;
    return this.http.post(url, student, this.headers);
  }

  updateStudent(student: Student){
    const url = `${url_base}/students/${student._id}`;
    return this.http.put(url, student, this.headers);
  }
  
  deleteStudent(_id: string){
    const url = `${url_base}/students/${_id}`;
    return this.http.delete(url, this.headers);
  }

  searchStudent(term: string = '') {
    const url = `${url_base}/todo/collection/students/${term}`;
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map((resp: any) => resp.results)
            );
  }
}
