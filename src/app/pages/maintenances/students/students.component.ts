import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student.model';
import { StudentFormComponent } from './student-form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styles: [
  ]
})
export class StudentsComponent implements OnInit {

  public totalStudents: number = 0;
  public editingStudent: Student;
  public students: Student[] = [];
  public loading: boolean = true;
  public editing: boolean = false;
  public since: number = 0;

  constructor(private studentService: StudentService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.loadStudents(this.since)
        .subscribe(({total, students}) => {
          this.loading = false;
          this.totalStudents = total;
          this.students = students;
        })
  }

  editStudent(student: Student) {
    this.editing = true;
    this.editingStudent = student;
  }

  updateStudent(student: Student) {
    this.editing = false;
    this.studentService.updateStudent(student)
        .subscribe(resp => {
          Swal.fire('Actualizado', student.fullName, 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  deleteStudent(student: Student) {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Desea eliminar el estudiante?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(student._id)
            .subscribe(resp => {
              this.loadStudents();
              Swal.fire('Eliminado', student.fullName, 'success');
            }, (err) => {
              Swal.fire('Error', err.error.msg, 'error');
            });
      }
    });
  }

  launchStudentForm() {
    const dialogRef = this.dialog.open(StudentFormComponent, {width: '700px'});
    dialogRef.afterClosed().subscribe(() => {
      this.loadStudents();
    })
  }

  changePage(value: number) {
    this.since += value;
    if (this.since < 0) {
      this.since = 0;
    } else if (this.since >= this.totalStudents) {
      this.since -= value;
    }
    this.loadStudents();
  }

}
