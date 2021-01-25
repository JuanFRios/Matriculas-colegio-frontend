import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { StudentsComponent } from './maintenances/students/students.component';
import { StudentFormComponent } from './maintenances/students/student-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatriculaEstudianteComponent } from './matricula-estudiante/matricula-estudiante.component';
import { CertificadosMatriculasComponent } from './certificados-matriculas/certificados-matriculas.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { GestionGradosComponent } from './gestion-grados/gestion-grados.component';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { NuevaMatriculaComponent } from './nueva-matricula/nueva-matricula.component';
import { MatriculaAdminComponent } from './matricula-admin/matricula-admin.component';
import { DegreesComponent } from './maintenances/degrees/degrees.component';
import { GroupFormComponent } from './maintenances/degrees/group-form.component';
import { SubjectFormComponent } from './maintenances/degrees/subject-form.component';
import { EditarInformacionComponent } from './editar-informacion/editar-informacion.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    StudentsComponent,
    StudentFormComponent,
    MatriculaEstudianteComponent,
    CertificadosMatriculasComponent,
    SeguimientoComponent,
    GestionGradosComponent,
    PerfilEstudianteComponent,
    NuevaMatriculaComponent,
    MatriculaAdminComponent,
    DegreesComponent,
    GroupFormComponent,
    SubjectFormComponent,
    EditarInformacionComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class PagesModule { }
