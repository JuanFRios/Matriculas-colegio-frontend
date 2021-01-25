import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm} from '../interfaces/login-form.interface';
import { environment} from '../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
              private router: Router) { }

  login(formData: LoginForm) {
    return this.http.post(`${url_base}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token2', resp.token );
                    localStorage.setItem('tipoUsuario', resp.tipoUsuario );
                  })
                );
  }

  validarToken(){
    const token = localStorage.getItem('token2') || '';
    return this.http.get(`${url_base}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token2', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }

  logout(){
    localStorage.removeItem('token2');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
