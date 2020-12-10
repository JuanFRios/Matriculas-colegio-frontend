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

  constructor( private sidebarService: SidebarService,
                private adminService: AdminService ) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

  logout(){
    this.adminService.logout();
  }

}
