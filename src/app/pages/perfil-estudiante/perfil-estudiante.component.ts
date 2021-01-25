import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditarInformacionComponent } from '../editar-informacion/editar-informacion.component';

export class dataDialog {
  student: Student;  
  constructor(student: Student) {
    this.student = student;
  }
}

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.scss']
})
export class PerfilEstudianteComponent implements OnInit {

  student: Student;
  

  constructor(private dialog: MatDialog) {
    this.student = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
  }

  editarInformacion(): void {    
    const dialogRef = this.dialog.open(EditarInformacionComponent, {
      width: '575px',
      data: new dataDialog(this.student)
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.student = JSON.parse(localStorage.getItem('user')); });
  }
}
