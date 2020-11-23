import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiKey from '../apiKey';
import {IProjects} from '../../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class AfiliarService {

  constructor(private http: HttpClient) {}
    getAllAfiliar() {
      return this.http.get<IProjects[]>('http://localhost:8080/user/list/work_on/1');
    }
    getProject(id: number) {
      return this.http.get<IProjects>(`http://localhost:8080/user/1/projects/${id}`);
    }
}
