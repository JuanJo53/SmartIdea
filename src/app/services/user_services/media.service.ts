import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Media} from "../../models/media.model";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  getmedia(idproject: number){
    return this.http.get<Media[]>(`http://localhost:8080/projects/${idproject}/media`);
  }

  postmedia(idproject: number, media: Media){
    return this.http.post<Media>(`http://localhost:8080/projects/${idproject}/media`,media);
  }
}
