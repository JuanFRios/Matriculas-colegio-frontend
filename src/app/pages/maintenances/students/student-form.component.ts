import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styles: [
  ]
})
export class StudentFormComponent implements OnInit {

  public studentForm: FormGroup;

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              public dialogRef: MatDialogRef<StudentFormComponent>) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      identityDocument: ['', Validators.required],
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      guardianName: ['', Validators.required],
      guardianContactNumber: ['', Validators.required],
      lastApprovedGrade: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  createStudent() {
    this.studentService.createStudent(this.studentForm.value)
    .subscribe(resp => {
      Swal.fire('Agregado', 'Estudiante agregado correctamente', 'success');
      this.dialogRef.close();
    });
  }

  cancelForm() {
    this.dialogRef.close();
  }
}
