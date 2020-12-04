import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {User} from "../../models/user.model";
import {Skill} from "../../models/skill.model";
import {IProjects} from '../../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  postuser(user: User){
    return this.http.post(`http://localhost:8080/users`,user)
  }
  getUserDeatails(iduser:number) {
    return this.http.get<User>(`http://localhost:8080/users/${iduser}`);
  }

  updateProfile(iduser:number,user: User){
    return this.http.put<User>(`http://localhost:8080/users/${iduser}`,user);
  }

  updateImage(iduser:number,image: User){
    return this.http.put<User>(`http://localhost:8080/users/${iduser}/image`,image);
  }

  getAlluserrequest(idproject: number){
    return this.http.get<User[]>(`http://localhost:8080/user/${idproject}/user-request`);
  }
  loginclient(user: User){
    return this.http.post<User>('http://localhost:8080/users/login',user)
  }
}
