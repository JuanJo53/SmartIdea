import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProjects} from '../../models/projects.model';
import {Bill} from '../../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
  getAllBill(){
    return this.http.get<Bill[]>('http://localhost:8080/user/1/bill');
  }

}
