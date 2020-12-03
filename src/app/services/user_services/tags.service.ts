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
  posttag(iduser: number, tag: Tag){
    return this.http.post<Tag>(`http://localhost:8080/tags/user/${iduser}`,tag)
  }
}
