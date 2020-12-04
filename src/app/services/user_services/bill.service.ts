import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProjects } from '../../models/projects.model';
import { Bill } from '../../models/bill.model';
import { Card } from '../../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}
  getAllBill(userid: number) {
    return this.http.get<Bill[]>(`http://localhost:8080/user/${userid}/bill`);
  }
  postnewbill(userid: number, bill: Bill) {
    return this.http.post(
      `http://localhost:8080/user/${userid}/projects/1/paymentplan/1/1`,
      bill
    );
  }
  getBill(userid: number) {
    return this.http.get<Bill>(`http://localhost:8080/user/${userid}/bill`);
  }
}
