import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Tag} from "../../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  gettags(){
    return this.http.get<Tag[]>('http://localhost:8080/tags');
  }
  posttag(iduser:number,tag: Tag){
    return this.http.post(`http://localhost:8080/tags/user/${iduser}`,tag)
  }
  posttagproject(idproject:number,tag: Tag){
    return this.http.post(`http://localhost:8080/tags/projects/${idproject}`,tag)
  }
  gettaguser(iduser:number){
    return this.http.get<Tag[]>(`http://localhost:8080/tags/user/${iduser}`);
  }
  gettagproject(idproject:number){
    return this.http.get<Tag[]>(`http://localhost:8080/tags/projects/${idproject}`);
  }
  addprojecttotag(idproject:number,tag:Tag){
    return this.http.post(`http://localhost:8080/tags/projects/${idproject}/add`,tag)
  }
  deleteprojecttotag(tagid: number, projectid: number){
    let httpParams = new HttpParams().set('aaa', '111');
    httpParams.set('bbb', '222');
    let options = { params: httpParams };
    return this.http.delete(`http://localhost:8080/tags/${tagid}/project/${projectid}`,options)
  }
  addusertotag(iduser:number,tag:Tag){
    return this.http.post(`http://localhost:8080/tags/user/${iduser}/add`,tag)
  }
  deleteusertag(tagid: number, userid: number){
    let httpParams = new HttpParams().set('aaa', '111');
    httpParams.set('bbb', '222');
    let options = { params: httpParams };
    return this.http.delete(`http://localhost:8080/tags/${tagid}/user/${userid}`,options)
  }
}
