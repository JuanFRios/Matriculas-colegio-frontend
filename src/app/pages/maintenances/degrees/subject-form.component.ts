import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Degree } from 'src/app/models/degree.model';
import { DegreeService } from 'src/app/services/degree.service';
import { GroupFormComponent } from './group-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./degrees.component.css']
})
export class SubjectFormComponent implements OnInit {

  public subjectForm: FormGroup;

  constructor(private fb: FormBuilder,
              private degreeService: DegreeService,
              public dialogRef: MatDialogRef<GroupFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Degree) { }

  ngOnInit(): void {
    this.subjectForm = this.fb.group({
      subjects: ['', Validators.required]
    });
  }

  updateDegree() {
    const newSubject = this.subjectForm.value.subjects;
    let degree: Degree = new Degree;
    degree._id = this.data._id;
    degree.degree = this.data.degree;
    degree.subjects = `${ this.data.subjects },${ newSubject }`;
    this.degreeService.updateDegree(degree)
      .subscribe(resp => {
        Swal.fire('Agregada', 'Asignatura agregada correctamente', 'success');
        this.dialogRef.close();
      }, err => {console.log(err);});
  }

  cancelForm() {
    this.dialogRef.close();
  }

}
