import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProjects} from '../../models/projects.model';
import {Bill} from '../../models/bill.model';
import {Card} from '../../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
  getAllBill(){
    return this.http.get<Bill[]>('http://localhost:8080/user/1/bill');
  }
  postnewbill(bill: Bill) {
    return this.http.post('http://localhost:8080/user/1/projects/1/paymentplan/1/1', bill);
  }
  getBill(){
    return this.http.get<Bill>('http://localhost:8080/user/1/bill');
  }


}
