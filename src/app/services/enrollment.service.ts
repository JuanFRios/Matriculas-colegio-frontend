import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Enrollment, NewEnrollment } from '../models/enrollment.model';
import { LoadEnrollments } from '../interfaces/load-enrollments.interface';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient,
    private router: Router) { }

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

  createEnrollment(enrollment: NewEnrollment) {
    const url = `${url_base}/enrollments`;
    return this.http.post(url, enrollment, this.headers);
  }

  getEnrollmentsPerStudent(idStudent: String) {
    const url = `${url_base}/enrollments/studentEnrollments/${idStudent}`;
    return this.http.get<LoadEnrollments>(url, this.headers);
  }

  getEnrollmentsPerDayShift(dayShift: String) {
    const url = `${url_base}/enrollments/perDayShift/${dayShift}`;
    return this.http.get<LoadEnrollments>(url, this.headers);
  }

  deleteEnrollment(_id: string){
    const url = `${url_base}/enrollments/${_id}`;
    return this.http.delete(url, this.headers);
  }

}
