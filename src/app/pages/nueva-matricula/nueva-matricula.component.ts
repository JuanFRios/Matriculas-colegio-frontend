import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Degree } from 'src/app/models/degree.model';
import { Student } from '../../models/student.model';
import { Group } from '../../models/group.model';
import { DegreeService } from '../../services/degree.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewEnrollment } from '../../models/enrollment.model';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nueva-matricula',
  templateUrl: './nueva-matricula.component.html',
  styleUrls: ['./nueva-matricula.component.css']
})
export class NuevaMatriculaComponent implements OnInit {

  matriculaFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<NuevaMatriculaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {student:Student, degree:Degree, groups: Group[] }, private formBuilder: FormBuilder, public enrollmentService: EnrollmentService) { 
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
      Swal.fire('Matricula exitosa', this.data.student.fullName, 'success');
      this.dialogRef.close();
    }, (err) => {
      Swal.fire('Error', 'Error al enviar la matricula', 'error');
    })
    
  }
  

}
