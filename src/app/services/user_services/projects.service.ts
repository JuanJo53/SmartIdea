import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProjects} from '../../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }
  getAllProjects(){
    return this.http.get<IProjects[]>('http://localhost:8080/user/list/1');
  }
  getAllProjectsfeed(){
    return this.http.get<IProjects[]>('http://localhost:8080/user/1/project-feed');
  }

  getProject(id: number) {
    return this.http.get<IProjects>(`http://localhost:8080/user/1/projects/${id}`);
  }
}
