import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  esEstudiante: boolean;
  esAdmin: boolean;
  usuario;

  constructor(private adminService: AdminService) { 
    let tipoUsuario= localStorage.getItem('tipoUsuario');
    this.esEstudiante = (tipoUsuario === "Student")? true : false;
    this.esAdmin = (tipoUsuario === "Admin")? true : false;
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }

  logout(){
    this.adminService.logout();
  }

}
