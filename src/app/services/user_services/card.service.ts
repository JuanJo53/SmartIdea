import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Card} from '../../models/card.model';
import apiKey from '../apiKey';
import {IProjects} from '../../models/projects.model';
@Injectable({
  providedIn: 'root',
})

export class CardService {

  constructor(private http: HttpClient) { }
  getAllCard(){
    return this.http.get<Card[]>('http://localhost:8080/user/1/card');
  }
  getCard(id: number) {
    return this.http.get<Card>(`http://localhost:8080/user/1/card/${id}`);
  }

  postnewcard(card: Card) {
    return this.http.post('http://localhost:8080/user/1/card', card);
  }
  updatecard(card: Card, id: number){
    return this.http.put(`http://localhost:8080/user/1/card/1/${id}`, card);
  }
  deleteCard(id: number) {
    return this.http.delete(apiKey.api + `/user/1/card/${id}`);
  }
}


