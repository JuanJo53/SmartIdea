import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiKey from '../apiKey';
import { IProjects } from '../../models/projects.model';
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root',
})
export class ReferencesService {
  constructor(private http: HttpClient) {}
  getAllReferences(userid: number) {
    return this.http.get<IProjects[]>(
      `http://localhost:8080/user/list/work_on/${userid}`
    );
  }

  getProject(userid: number, id: number) {
    return this.http.get<IProjects>(
      `http://localhost:8080/user/${userid}/projects/${id}`
    );
  }
  getUserMembers(idproject:number){
    return this.http.get<User[]>(`http://localhost:8080/user/${idproject}/user-members`);
  }
}
