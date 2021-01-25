import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../models/student.model';
import { Enrollment, NewEnrollment } from '../../models/enrollment.model';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { DegreeService } from '../../services/degree.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/models/group.model';
import { Degree } from 'src/app/models/degree.model';
import { GroupService} from 'src/app/services/group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matricula-admin',
  templateUrl: './matricula-admin.component.html',
  styleUrls: ['./matricula-admin.component.css']
})
export class MatriculaAdminComponent implements OnInit {

  matriculaFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<MatriculaAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student, enrollment: Enrollment, degree: Degree, groups: Group[], group: Group }, private formBuilder: FormBuilder, public gruopService: GroupService, public enrollmentService: EnrollmentService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm(): void {

    this.matriculaFormGroup = this.formBuilder.group(
      {
        grupo: ['', [Validators.required]]
      });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarMatricula(){
    let idGroup: string;
    let date = new Date();
    let año = date.getFullYear();
    let newEnrollment= new NewEnrollment;
    newEnrollment.enrollmentYear = año.toString();
    newEnrollment.group= this.matriculaFormGroup.get('grupo').value;
    newEnrollment.student= this.data.student._id;

    this.enrollmentService.createEnrollment(newEnrollment).subscribe(resp =>{
      this.dialogRef.close();
      Swal.fire('Matricula exitosa', this.data.student.fullName, 'success');
    }, (err) => {
      Swal.fire('Error', 'Error al enviar la matricula', 'error');
    })
    
  }

  eliminarMatricula(){
    this.enrollmentService.deleteEnrollment(this.data.student._id).subscribe(resp =>{
      this.dialogRef.close();
      Swal.fire('Matricula eliminada', this.data.student.fullName, 'success');
    }, (err) => {
      Swal.fire('Error', 'Error al eliminar la matricula', 'error');
    })
  }

}
