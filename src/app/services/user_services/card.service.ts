import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiKey from '../apiKey';
import {cardRequest } from '../../models/cardRequest.model';
import {Card} from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})

export class CardService {
  constructor(private http: HttpClient) {}
  getCard(id: number) {
    return this.http.get<Card>(apiKey.api + `/user/1/card/${id}`
    );
  }
  postNewCard(card: cardRequest) {
    return this.http.post(apiKey.api + '/user/1/card', card);
  }
  updateCard(id: number, card: cardRequest) {
    return this.http.put(
      apiKey.api + `/user/1/card/${id}`,
      card
    );
  }

}
