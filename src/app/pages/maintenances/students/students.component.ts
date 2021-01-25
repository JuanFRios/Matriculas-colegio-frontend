import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student.model';
import { StudentFormComponent } from './student-form.component';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { Enrollment } from 'src/app/models/enrollment.model';
import { MatriculaAdminComponent } from '../../matricula-admin/matricula-admin.component';
import { DegreeService } from 'src/app/services/degree.service';
import { GroupService } from 'src/app/services/group.service';
import { Degree } from 'src/app/models/degree.model';
import { Group } from 'src/app/models/group.model';

export class dataDialog {
  student: Student;
  enrollment: Enrollment;
  degree: Degree;
  groups: Group[];
  group: Group;
  constructor(student: Student, enrollment: Enrollment, degree: Degree, groups: Group[], group: Group) {
    this.student = student;
    this.enrollment = enrollment;
    this.degree = degree;
    this.groups = groups;
    this.group = group;
  }
}

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
  public nextDegree: Degree = new Degree;

  constructor(private studentService: StudentService,
    private dialog: MatDialog, public degreeService: DegreeService, public gruopService: GroupService, public enrollmentService: EnrollmentService) { }


  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.loadStudents(this.since)
      .subscribe(({ total, students }) => {
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
    const dialogRef = this.dialog.open(StudentFormComponent, { width: '700px' });
    dialogRef.afterClosed().subscribe(() => {
      this.loadStudents();
    });
  }

  searchStudent(term: string) {
    if (term.length === 0) {
      return this.loadStudents();
    }
    this.studentService.searchStudent(term)
      .subscribe(result => {
        this.students = result;
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

  gestionMatricula(student: Student) {
    Swal.fire({
      icon: 'info',
      title: '',
      text: 'Espere por favor...',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let enroll: Enrollment;
    this.enrollmentService.getEnrollmentsPerStudent(student._id).subscribe(({ enrollments }) => {
      let date = new Date();
      let año = date.getFullYear();
      enrollments.forEach(m => {
        if (m.enrollmentYear === año.toString()) {
          enroll = m;
        }
      });

      let siguienteGrado = this.degreeService.siguienteGrado(student.lastApprovedGrade);
      this.degreeService.getDegreePerName(siguienteGrado).subscribe(({ degrees }) => {
        this.nextDegree = degrees[0];
        this.gruopService.getGroupsPerDegree(this.nextDegree._id).subscribe(({ groups }) => {
          let availableGroups: Group[] = [];
          groups.forEach(group => {
            this.gruopService.getAvailableQuota(group._id).subscribe(({ availableQuota }) => {
              group.quota = availableQuota;
              if (group.quota > 0) {
                availableGroups.push(group);
              }

            });
          })
          if(enroll != undefined){
            this.gruopService.getGroupPerId(enroll.group._id).subscribe(({group}) => {
              console.log(group)
              availableGroups.forEach(a =>{
                if(a._id === group._id){
                  group=a;
                  availableGroups.splice(availableGroups.indexOf(a),1);
                }
              });
              Swal.close();
              const dialogRef = this.dialog.open(MatriculaAdminComponent, {
                width: '575px',
                data: new dataDialog(student, enroll, this.nextDegree, availableGroups, group)
              });
            });
          }else{
            Swal.close();
            const dialogRef = this.dialog.open(MatriculaAdminComponent, {
              width: '575px',
              data: new dataDialog(student, enroll, this.nextDegree, availableGroups, undefined)
            });
          }
          

          
        });

      });


    });
  }

}
