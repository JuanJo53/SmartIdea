import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PaymentPlan} from '../../models/paymentPlan.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentPlanService {

  constructor(private http: HttpClient) { }
  getAllPaymentPlan(){
    return this.http.get<PaymentPlan[]>('http://localhost:8080/paymentPlan');
  }

  getPaymentPlan(id: number) {
    return this.http.get<PaymentPlan>(`http://localhost:8080/paymentPlan/${id}`);
  }

}
