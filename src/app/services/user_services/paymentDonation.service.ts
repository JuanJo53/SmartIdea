import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentDonationService {
  constructor(private http: HttpClient) {}
  getAllPaymentDonation(userid: number) {
    return this.http.get<Card[]>(`http://localhost:8080/user/${userid}/card`);
  }
}
