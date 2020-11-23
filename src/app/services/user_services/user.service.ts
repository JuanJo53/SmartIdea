import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  getUserDeatails() {
    return this.http.get<User>('http://localhost:8080/users/1');
  }

  updateProfile(user: User){
    // const data = JSON.stringify(user);
    return this.http.put<User>('http://localhost:8080/users/1',user);
  }

}
