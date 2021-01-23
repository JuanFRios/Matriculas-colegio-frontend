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
  usuario;
  constructor( private sidebarService: SidebarService,
                private adminService: AdminService ) {
    this.verificar();
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
