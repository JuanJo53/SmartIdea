import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiKey from '../apiKey';
import {Card} from '../../models/card.model';
@Injectable({
  providedIn: 'root',
})

export class CardService {

  constructor(private http: HttpClient) { }
  getAllCard(){
    return this.http.get<Card[]>('http://localhost:8080/user/1/card');
  }
  postnewcard(card: Card) {
    return this.http.post('http://localhost:8080/user/1/card', card);
  }
}


