import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment} from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Group, NewGroup } from '../models/group.model';
import { Degree } from '../models/degree.model';

const url_base = environment.url_base;

@Injectable({
  providedIn: 'root'
})
export class GruopService {

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

    
    createGroup(group: NewGroup) {
      const url = `${url_base}/groups`;
      return this.http.post(url, group, this.headers);
    }

    getGroupPerId(idGroup: String) {
      const url = `${url_base}/groups/${idGroup}`;
      return this.http.get<Group>(url, this.headers);
    }

    getGroupsPerDegree(idDegree: String) {
      const url = `${url_base}/groups/degree/${idDegree}`;
      return this.http.get<Group[]>(url, this.headers);
    }

    getAvailableQuota(idGroup: String) {
      const url = `${url_base}/enrollments/${idGroup}`;
      return this.http.get<Number>(url, this.headers);
    }

    //Hay que tener cuidado con lo que se envia porque el body no recibe ni el id ni el degree
    updateGroup(group: Group){
      const url = `${url_base}/groups//${group._id}`;
      return this.http.put(url, group, this.headers);
    }

    deleteGroup(_id: string){
      const url = `${url_base}/groups/${_id}`;
      return this.http.delete(url, this.headers);
    }



}
