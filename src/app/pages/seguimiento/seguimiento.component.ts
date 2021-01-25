import { Component, OnInit } from '@angular/core';
import { Degree } from 'src/app/models/degree.model';
import { Enrollment } from 'src/app/models/enrollment.model';
import { Student } from 'src/app/models/student.model';
import { DegreeService } from 'src/app/services/degree.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  public student: Student = JSON.parse(localStorage.getItem('user'));
  public currentEnrollment: Enrollment;

  public subjects: string[] = [];
  public loadingSubjects: boolean = true;

  public currentlyEnrolled: boolean = false;
  public year = new Date().getFullYear().toString();


  constructor(private enrollmentService: EnrollmentService,
              private degreeService: DegreeService) { }

  ngOnInit(): void {
    this.loadEnrollments(this.student._id);
  }

  loadEnrollments(idStudent: string) {
    this.enrollmentService.getEnrollmentsPerStudent(idStudent)
      .subscribe(({enrollments}) => {
        this.loadingSubjects = true;
        enrollments.map(enrollment => {
          if (enrollment.enrollmentYear == this.year) {
            this.currentEnrollment = enrollment;
            this.currentlyEnrolled = true;
          }
        });
        if (this.currentEnrollment) {
          this.degreeService.getDegrees()
            .subscribe(({degrees}) => {
              degrees.map(({_id, degree, subjects}) => {
                if (_id === this.currentEnrollment.group.degree) {
                  this.currentEnrollment.group.degree = degree;
                  this.subjects = subjects.split(',');
                  this.loadingSubjects = false;
                }
              });
            });
        }
      });
  }
}
