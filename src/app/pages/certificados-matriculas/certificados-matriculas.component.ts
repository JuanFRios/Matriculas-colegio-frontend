import { Component, OnInit } from '@angular/core';
import { Degree } from 'src/app/models/degree.model';
import { Enrollment } from 'src/app/models/enrollment.model';
import { Student } from 'src/app/models/student.model';
import { DegreeService } from 'src/app/services/degree.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-certificados-matriculas',
  templateUrl: './certificados-matriculas.component.html',
  styleUrls: ['./certificados-matriculas.component.css']
})
export class CertificadosMatriculasComponent implements OnInit {

  public student: Student = JSON.parse(localStorage.getItem('user'));
  public enrollments: Enrollment[] = [];
  public loadingEnrollments: boolean = true;

  public degrees: Degree[] = [];

  constructor(private enrollmentService: EnrollmentService,
              private degreeService: DegreeService) { }

  ngOnInit(): void {
    this.loadEnrollments(this.student._id);
  }

  loadEnrollments(idStudent: string) {
    this.loadingEnrollments = true;
    this.enrollmentService.getEnrollmentsPerStudent(idStudent)
      .subscribe(({enrollments}) => {
        this.degreeService.getDegrees()
          .subscribe(({degrees}) => {
            this.degrees = degrees;
            enrollments.map(enrollment => {
              this.degrees.forEach(({_id, degree}) => {
                if (_id === enrollment.group.degree) {
                  enrollment.group.degree = degree;
                }
              });
            });
          });
        this.enrollments = enrollments;
        this.loadingEnrollments = false;
      });
  }
}
