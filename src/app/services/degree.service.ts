import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
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

    getDegrees() {
      const url = `${url_base}/degrees`;
      return this.http.get<LoadDegrees>(url, this.headers);
    }

    getDegreePerName(name: string) {
      const url = `${url_base}/degrees/${name}`;
      return this.http.get<LoadDegrees>(url, this.headers);
    }

    //Aca hay que tener cuidado con lo que recibe el servicio, hasta donde se no recibe _id, pero si se necesita
    updateDegree(degree: Degree){
      const url = `${url_base}/degrees/${degree._id}`;
      return this.http.put(url, degree, this.headers);
    }
}
