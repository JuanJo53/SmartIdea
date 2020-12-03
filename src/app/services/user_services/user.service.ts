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
  getUserDeatails() {
    return this.http.get<User>('http://localhost:8080/users/1');
  }

  updateProfile(user: User){
    return this.http.put<User>('http://localhost:8080/users/1',user);
  }

  updateImage(image: User){
    return this.http.put<User>('http://localhost:8080/users/1/image',image);
  }

  getAlluserrequest(idproject: number){
    return this.http.get<User[]>(`http://localhost:8080/user/${idproject}/user-request`);
  }
}
