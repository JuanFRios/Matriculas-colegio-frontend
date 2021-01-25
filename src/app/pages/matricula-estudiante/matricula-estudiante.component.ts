import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { MatDialog } from '@angular/material/dialog';
import { NuevaMatriculaComponent } from '../nueva-matricula/nueva-matricula.component';
import { DegreeService } from '../../services/degree.service'
import { GruopService } from '../../services/gruop.service'
import { EnrollmentService } from '../../services/enrollment.service'
import { Degree } from 'src/app/models/degree.model';
import { Group } from '../../models/group.model';
import { Enrollment } from '../../models/enrollment.model';
import Swal from 'sweetalert2';

export class dataDialog {
  student: Student;
  degree: Degree;
  groups: Group[]
  constructor(student: Student,
    degree: Degree, groups: Group[]) {
    this.student = student;
    this.degree = degree;
    this.groups = groups;

  }
}

@Component({
  selector: 'app-matricula-estudiante',
  templateUrl: './matricula-estudiante.component.html',
  styleUrls: ['./matricula-estudiante.component.scss']
})
export class MatriculaEstudianteComponent implements OnInit {
  student: Student;
  siguienteGrado: String;
  nextDegree: Degree;
  yaMatriculado: boolean;
  enroll : Enrollment;
  
  constructor(private dialog: MatDialog, public degreeService: DegreeService, public gruopService: GruopService, public enrollmentService: EnrollmentService) {
    this.student = JSON.parse(localStorage.getItem('user'));
    
    this.verificarMatriculaAsociada();
  }

  ngOnInit(): void {
  }

  verificarMatriculaAsociada(){
    this.enrollmentService.getEnrollmentsPerStudent(this.student._id).subscribe(({enrollments}) =>{
      let date = new Date();
      let año = date.getFullYear();
      console.log(año)
      this.yaMatriculado=false;
      enrollments.forEach(m => {
        if(m.enrollmentYear === año.toString()){
          this.yaMatriculado= true;
          this.enroll= m;
          this.degreeService.getDegrees().subscribe(({degrees}) => {
            degrees.forEach(d =>{
              if(d._id=== m.group.degree){
                this.nextDegree=d
              }
            });
          });
        }
      });
    })
  }

  openDialog(): void {
    Swal.fire({
      icon: 'info',
      title: '',
      text: 'Espere por favor...',
      allowOutsideClick: false
    });

    Swal.showLoading();
    this.siguienteGrado = this.degreeService.siguienteGrado(this.student.lastApprovedGrade);
    this.degreeService.getDegreePerName(this.siguienteGrado).subscribe(({degrees}) => {
       this.nextDegree = degrees[0];
       this.gruopService.getGroupsPerDegree(this.nextDegree._id).subscribe(({groups}) => {
        let availableGroups: Group[]=[];
        groups.forEach(group =>{
          this.gruopService.getAvailableQuota(group._id).subscribe(({availableQuota}) => {
            console.log(group._id)
            group.quota= availableQuota;
            if(group.quota >0){
              availableGroups.push(group);
            }
            
          });
        })

        Swal.close();
        const dialogRef = this.dialog.open(NuevaMatriculaComponent, {
          width: '575px',
          data: new dataDialog(this.student,this.nextDegree, availableGroups)
        });
       })
      
    });
    this.dialog.afterAllClosed.subscribe(() => {this.verificarMatriculaAsociada() });
  }

}
