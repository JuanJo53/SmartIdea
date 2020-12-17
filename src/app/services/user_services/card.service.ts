import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../models/card.model';
import apiKey from '../apiKey';
@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}
  getAllCard(userid: number) {
    return this.http.get<Card[]>(`http://localhost:8080/user/${userid}/card`);
  }
  getCard(userid: number, id: number) {
    return this.http.get<Card>(
      `http://localhost:8080/user/${userid}/card/${id}`
    );
  }

  postnewcard(userid: number, card: Card) {
    return this.http.post(`http://localhost:8080/user/${userid}/card`, card);
  }
  updatecard(card: Card, id: number,userid: number) {
    return this.http.put(
      `http://localhost:8080/user/${userid}/card/${id}`,card);
  }
  deleteCard(userid: number, id: number) {
    return this.http.delete(apiKey.api + `/user/${userid}/card/${id}`);
  }
}

