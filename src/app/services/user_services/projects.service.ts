import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProjects } from '../../models/projects.model';
import { Skill } from '../../models/skill.model';
import {Donation} from '../../models/donation.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getAllProjects(iduser: number) {
    return this.http.get<IProjects[]>(`http://localhost:8080/user/list/${iduser}`);
  }
  getAllProjectsfeed() {
    return this.http.get<IProjects[]>(
      'http://localhost:8080/user/1/project-feed'
    );
  }

  getProject(id: number, iduser: number) {
    return this.http.get<IProjects>(
      `http://localhost:8080/user/${iduser}/projects/${id}`
    );
  }
  getProjecttags(id: number, iduser: number) {
    return this.http.get<IProjects[]>(
      `http://localhost:8080/user/${iduser}/tag/${id}`
    );
  }
  getProjecssherche(Buscar: string, iduser: number) {
    return this.http.get<IProjects[]>(
      `http://localhost:8080/user/1/buscar/${Buscar}`
    );
  }
  postnewproject(project: IProjects , iduser: number) {
    return this.http.post(`http://localhost:8080/user/${iduser}/projects`, project);
  }
  updateproject(project: IProjects, id: number, iduser: number) {
    return this.http.put(
      `http://localhost:8080/user/${iduser}/projects/${id}`,
      project
    );
  }

  afiliarproyect(id: number, iduser: number, project: IProjects) {
    return this.http.post<IProjects>(
      `http://localhost:8080/user/${iduser}/projects/${id}/recuest`,
      project
    );
    //return 'si se puso ';
  }
  rejectuser(id: number, iduser: number, project: IProjects) {
    return this.http.put<number>(
      `http://localhost:8080/user/${iduser}/projects/${id}/reject`,
      project
    );
    //return 'si se puso ';
  }
  aceptuser(id: number, iduser: number, project: IProjects) {
    return this.http.put<number>(
      `http://localhost:8080/user/${iduser}/projects/${id}/acept`,
      project
    );
    //return 'si se puso ';
  }
  viewProject(iduser: number, project: IProjects, idprojectid: number) {
    return this.http.put<number>(
      `http://localhost:8080/user/${iduser}/project-feed/${idprojectid}`,
      project
    );
  }
  yaexiste(idproject: number, iduser: number) {
    let var1=this.http.get<number>(
      `http://localhost:8080/user/${iduser}/projectos/${idproject}`);
    console.log(var1);
    return var1;
  }
}
