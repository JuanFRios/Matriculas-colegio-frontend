import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm} from '../interfaces/login-form.interface';
import { environment} from '../../environments/environment';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const base_Url = environment.base_Url;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
              private router: Router) { }

  login(formData: LoginForm) {
    return this.http.post(`/api/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token2', resp.token );
                  })
                );
  }

  validarToken(){
    const token = localStorage.getItem('token2') || '';
    return this.http.get(`/api/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token2', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }

  logout(){
    localStorage.removeItem('token2');
    this.router.navigateByUrl('/login');
  }
}
