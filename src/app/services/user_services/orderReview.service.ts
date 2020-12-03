import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaymentPlan} from '../../models/paymentPlan.model';
import {Card} from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class OrderReviewService {

  constructor(private http: HttpClient) { }
  getAllOrderReview(){
    return this.http.get<Card[]>('http://localhost:8080/user/1/card');
  }
  getCard(id: number) {
    return this.http.get<Card>(`http://localhost:8080/user/1/card/${id}`);
  }
}
