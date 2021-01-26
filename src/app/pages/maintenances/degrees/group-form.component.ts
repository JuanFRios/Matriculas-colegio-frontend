import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',  
  styleUrls: ['./degrees.component.css']
})
export class GroupFormComponent implements OnInit {

  public groupForm: FormGroup;
  public jornadas: string[];

  constructor(private fb: FormBuilder,
              private groupService: GroupService,
              public dialogRef: MatDialogRef<GroupFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.jornadas = ["Mañana", "Tarde"];
    this.groupForm = this.fb.group({
      mainTeacher: ['', Validators.required],
      dayShift: ['', Validators.required],
      quota: [0, Validators.required],
      degree: [this.data, Validators.required]
    });
  }

  createGroup() {
    this.groupService.createGroup(this.groupForm.value)
      .subscribe(resp => {
        Swal.fire('Agregado', 'Grupo agregado correctamente', 'success');
        this.dialogRef.close();
      }, err => {console.log(err);});
  }

  cancelForm() {
    this.dialogRef.close();
  }

}
