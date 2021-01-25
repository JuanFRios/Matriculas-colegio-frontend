import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { LoadDegrees } from '../interfaces/load-degrees.interface';
import { Degree } from '../models/degree.model';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  constructor(private http: HttpClient,
    private router: Router) { }

    get token() {
      return localStorage.getItem('token2') || '';
    }
  
    get headers() {
      return {
        headers: {
          'x-token': this.token
        }
      }
    }

    siguienteGrado(grado: String){
      let siguiente: String;
      switch(grado){
        case "Ninguno":
          siguiente= "Primero"
          break;
        case "Primero":
          siguiente= "Segundo";
          break;
        case "Segundo":
          siguiente= "Tercero";
          break;
        case "Tercero":
          siguiente= "Cuarto";
          break;
        case "Cuarto":
          siguiente= "Quinto";
          break;
        case "Quinto":
          siguiente= "Sexto";
          break;
        case "Sexto":
          siguiente= "Septimo";
          break;
        case "Septimo":
          siguiente= "Octavo";
          break;
        case "Octavo":
          siguiente= "Noveno";
          break;
        case "Noveno":
          siguiente= "Decimo"
          break;
        case "Decimo":
          siguiente= "Once"
          break;
        
      }
  
      return siguiente;
  
    }

    getDegrees() {
      const url = `${url_base}/degrees`;
      return this.http.get<LoadDegrees>(url, this.headers);
    }

    getDegreePerName(name: String) {
      const url = `${url_base}/degrees/${name}`;
      return this.http.get<LoadDegrees>(url, this.headers);
    }

    //Aca hay que tener cuidado con lo que recibe el servicio, hasta donde se no recibe _id, pero si se necesita
    updateDegree(degree: Degree){
      const url = `${url_base}/degrees//${degree._id}`;
      return this.http.put(url, degree, this.headers);
    }
}
