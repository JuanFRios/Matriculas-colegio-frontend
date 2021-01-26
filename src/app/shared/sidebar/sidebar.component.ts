import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  esEstudiante: boolean;
  esAdmin: boolean;
  usuario;
  constructor( private sidebarService: SidebarService,
                private adminService: AdminService ) {
    this.verificar();
    let tipoUsuario= localStorage.getItem('tipoUsuario');
    this.esEstudiante = (tipoUsuario === "Student")? true : false;
    this.esAdmin = (tipoUsuario === "Admin")? true : false;
    this.usuario = JSON.parse(localStorage.getItem('user'));
    //this.menuItems = sidebarService.menu;
  }

  async verificar(){
    this.menuItems = await this.sidebarService.verificarMenu();
  }
  ngOnInit(): void {
  }

  logout(){
    this.adminService.logout();
  }

}
