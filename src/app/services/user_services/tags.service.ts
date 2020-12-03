import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tag} from "../../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  gettags(){
    return this.http.get<Tag[]>('http://localhost:8080/tags');
  }
  posttag(tag: Tag){
    return this.http.post('http://localhost:8080/tags/user/1',tag)
  }
  gettaguser(){
    return this.http.get<Tag[]>('http://localhost:8080/tags/user/1');
  }
  deleteusertag(tagid: number, userid: number){
    return this.http.delete(`http://localhost:8080/tags/${tagid}/user/${userid}`)
  }
}
