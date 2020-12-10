import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/dashboard' },
        { titulo: 'Estudiantes', url: 'estudiantes' },
        { titulo: 'Reportes', url: 'grafica1' }
      ]
    },
  ];

  constructor() { }
}
