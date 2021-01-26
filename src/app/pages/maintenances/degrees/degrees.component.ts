import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Degree } from 'src/app/models/degree.model';
import { Group } from 'src/app/models/group.model';

import { DegreeService } from 'src/app/services/degree.service';
import { GroupService } from 'src/app/services/group.service';

import { GroupFormComponent } from './group-form.component';
import { SubjectFormComponent } from './subject-form.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styles: [
  ]
})
export class DegreesComponent implements OnInit {

  public degreeName: string;
  public degree: Degree;

  public subjects: string[] = [];
  public loadingSubjects: boolean = true;

  public groups: Group[] = [];
  public loadingGroups: boolean = true;
  public editingGroupObj: Group;
  public editingGroup: boolean = false;

  constructor(private degreeService: DegreeService,
              private groupService: GroupService,
              private actRoute: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(param => {
      this.degreeName = param.get('degree');
    });
    this.loadDegreeInfo(this.degreeName);
  }

  loadDegreeInfo(degree: string) {
    this.loadingGroups = true;
    this.loadingSubjects = true;
    this.degreeService.getDegreePerName(degree)
      .subscribe((degrees) => {
        this.degree = degrees.degrees[0];
        this.subjects = degrees.degrees[0].subjects.split(',');
        this.loadingSubjects = false;
        this.groupService.getGroupsPerDegree(this.degree._id)
          .subscribe((groups) => {
            this.groups = groups.groups;
            this.loadingGroups = false;
          });
      });
  }

  editGroup(group: Group) {
    this.editingGroup = true;
    this.editingGroupObj = group;
  }

  updateGroup(group: Group) {
    this.editingGroup = false;
    this.groupService.updateGroup(group)
        .subscribe(resp => {
          Swal.fire('Actualizado', 'Grupo actualizado.' ,'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  deleteGroup(group: Group) {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Desea eliminar el grupo?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupService.deleteGroup(group._id)
            .subscribe(resp => {
              this.groupService.getGroupsPerDegree(this.degree._id)
                .subscribe((groups) => {
                  this.groups = groups.groups;
                });
              Swal.fire('Eliminado', 'Grupo eliminado', 'success');
            }, (err) => {
              Swal.fire('Error', err.error.msg, 'error');
            });
      }
    });
  }

  launchGroupForm() {
    const dialogRef = this.dialog.open(GroupFormComponent, {width: '500px', data: this.degree._id});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingGroups = true;
      this.groupService.getGroupsPerDegree(this.degree._id)
        .subscribe((groups) => {
          this.groups = groups.groups;
          this.loadingGroups = false;
        });
    });
  }

  deleteSubject(subject: string) {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Desea eliminar la asignatura?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjects = this.subjects.filter(sub => sub !== subject);
        this.degree.subjects = this.subjects.toString();
        this.degreeService.updateDegree(this.degree)
            .subscribe(resp => {
              this.loadingSubjects = true;
              this.degreeService.getDegreePerName(this.degreeName)
                .subscribe((degrees) => {
                  this.degree = degrees.degrees[0];
                  this.subjects = degrees.degrees[0].subjects.split(',');
                  this.loadingSubjects = false;
                });
              Swal.fire('Eliminada', 'Asignatura eliminada', 'success');
            }, (err) => {
              Swal.fire('Error', err.error.msg, 'error');
            });
      }
    });
  }

  launchSubjectForm() {
    const dialogRef = this.dialog.open(SubjectFormComponent, {width: '500px', data: this.degree});
    dialogRef.afterClosed().subscribe(() => {
      this.loadingSubjects = true;
      this.degreeService.getDegreePerName(this.degreeName)
        .subscribe((degrees) => {
          this.degree = degrees.degrees[0];
          this.subjects = degrees.degrees[0].subjects.split(',');
          this.loadingSubjects = false;
        });
    });
  }

}