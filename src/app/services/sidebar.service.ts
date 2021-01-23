import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  

  constructor() { }

  verificarMenu(){
    let tipoUsuario = localStorage.getItem('tipoUsuario') || '';
    let submenu;
    if(tipoUsuario === 'Admin'){
      submenu= [
        { titulo: 'Main', url: '/dashboard' },
        { titulo: 'Gestion de Grados', url: 'gestionGrados' },
        { titulo: 'Estudiantes', url: 'estudiantes' },
        { titulo: 'Reportes', url: 'grafica1' }
      ]
    }else{
      submenu= [
        { titulo: 'Main', url: '/dashboard' },
        { titulo: 'Perfil', url: 'perfil' },
        { titulo: 'Matricula', url: 'matricula' },
        { titulo: 'Seguimiento', url: 'seguimiento' },
        { titulo: 'Historia Académica', url: 'certificados' },
      ]
    }

    let menu = [
      {
        titulo: 'Dashboard',
        icono: 'mdi mdi-gauge',
        submenu: submenu
      },
    ];

    return menu;

  }
}
