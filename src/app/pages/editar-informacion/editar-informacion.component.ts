import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-informacion',
  templateUrl: './editar-informacion.component.html',
  styleUrls: ['./editar-informacion.component.css']
})
export class EditarInformacionComponent implements OnInit {

  public studentForm: FormGroup;
  public student: Student;

  constructor(private studentService: StudentService,private fb: FormBuilder,public dialogRef: MatDialogRef<EditarInformacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {student:Student}) { 
      this.studentForm = this.fb.group({
        identityDocument: [`${this.data.student.identityDocument}`, Validators.required],
        fullName: [`${this.data.student.fullName}`, Validators.required],
        age: [`${this.data.student.age}`, Validators.required],
        address: [`${this.data.student.address}`, Validators.required],
        email: [`${this.data.student.email}`, Validators.required],
        contactNumber: [`${this.data.student.contactNumber}`, Validators.required],
        guardianName: [`${this.data.student.guardianName}`, Validators.required],
        guardianContactNumber: [`${this.data.student.guardianContactNumber}`, Validators.required],
        lastApprovedGrade: [`${this.data.student.lastApprovedGrade}`, Validators.required],
        password: [`${this.data.student.password}`, Validators.required]
      });
    }

  ngOnInit(): void {
    
  }
  
  editarStudent(){
    let _id= this.data.student._id;
    let identityDocument= this.studentForm.get("identityDocument").value;
    let fullName= this.studentForm.get("fullName").value;
    let age= this.studentForm.get("age").value;
    let address= this.studentForm.get("address").value;
    let email= this.studentForm.get("email").value;
    let contactNumber= this.studentForm.get("contactNumber").value;
    let guardianName= this.studentForm.get("guardianName").value;
    let guardianContactNumber= this.studentForm.get("guardianContactNumber").value;
    let lastApprovedGrade= this.studentForm.get("lastApprovedGrade").value;

    this.student = new Student(_id,identityDocument,fullName, age, address, email, contactNumber, guardianName, guardianContactNumber, lastApprovedGrade);

    this.studentService.updateStudent(this.student).subscribe(resp =>{
      Swal.fire('Actialización Exitosa', this.student.fullName, 'success');
      localStorage.setItem('user', JSON.stringify(this.student));
      this.dialogRef.close();
    }, (err) => {
      Swal.fire('Error', 'Error al actualizar los datos', 'error');
    })



    

  }

  cancelForm(){
    this.dialogRef.close();
  }

}
