import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { StudentsComponent } from './maintenances/students/students.component';
import { AuthGuard} from '../guard/auth.guard';
import { CertificadosMatriculasComponent } from './certificados-matriculas/certificados-matriculas.component';
import { GestionGradosComponent } from './gestion-grados/gestion-grados.component';
import { MatriculaEstudianteComponent } from './matricula-estudiante/matricula-estudiante.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { NuevaMatriculaComponent } from './nueva-matricula/nueva-matricula.component';
import { DegreesComponent } from './maintenances/degrees/degrees.component';
import { EditarInformacionComponent } from './editar-informacion/editar-informacion.component';

const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Reportes' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            { path: 'estudiantes', component: StudentsComponent, data: { titulo: 'Estudiantes' }},
            { path: 'certificados', component: CertificadosMatriculasComponent, data: { titulo: 'Certificados de Matriculas' }},
            { path: 'gestionGrados', component: GestionGradosComponent, data: { titulo: 'Gestion de grados' }},
            { path: 'grados/:degree', component: DegreesComponent, data: { titulo: 'Grados' }},
            { path: 'matricula', component: MatriculaEstudianteComponent, data: { titulo: 'Matricula' }},
            { path: 'seguimiento', component: SeguimientoComponent, data: { titulo: 'Seguimiento' }},
            { path: 'perfil', component: PerfilEstudianteComponent, data: { titulo: 'Perfil' }},
            { path: 'nuevaMatricula', component: NuevaMatriculaComponent, data: { titulo: 'Nueva Matricula' }},
            { path: 'editarInformacion', component: EditarInformacionComponent, data: { titulo: 'Editar Informacion' }}
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


