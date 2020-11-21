import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiKey from '../apiKey';
import {Projects} from '../../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ReferencesService {

  constructor(private http: HttpClient) {}
    getAllReferences() {
      return this.http.get<Projects[]>('http://localhost:8080/user/list/work_on/1');
    }

    getProject(id: number) {
      return this.http.get<Projects>(`http://localhost:8080/user/1/projects/${id}`);
    }

}
