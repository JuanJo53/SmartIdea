import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProjects} from '../../models/projects.model';
import {Skill} from '../../models/skill.model';

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

  postnewproject(project: IProjects) {
    return this.http.post('http://localhost:8080/user/1/projects', project);
  }
  updateproject(project: IProjects, id: number){
    return this.http.put(`http://localhost:8080/user/1/projects/${id}`, project);
  }

  afiliarproyect(id: number, iduser: number, project: IProjects){
    return this.http.post<IProjects>(`http://localhost:8080/user/${iduser}/projects/${id}/recuest`, project);
    //return 'si se puso ';
  }
  rejectuser(id: number, iduser: number, project: IProjects){
    return this.http.put<number>(`http://localhost:8080/user/${iduser}/projects/${id}/reject`, project);
    //return 'si se puso ';
  }
  aceptuser(id: number, iduser: number, project: IProjects){
    return this.http.put<number>(`http://localhost:8080/user/${iduser}/projects/${id}/acept`, project);
    //return 'si se puso ';
  }
}
