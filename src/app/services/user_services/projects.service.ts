import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Projects} from '../../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  getAllProjects(){
    return this.http.get<Projects[]>('http://localhost:8080/user/list/1');
  }

  getProject(id: number) {
    return this.http.get<Projects>(`http://localhost:8080/user/1/projects/${id}`);
  }
}
