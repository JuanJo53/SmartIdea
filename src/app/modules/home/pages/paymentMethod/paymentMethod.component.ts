import { Component, OnInit } from '@angular/core';
import {PaymentMethodService} from '../../../../services/user_services/paymentMethod.service';
import {Card} from '../../../../models/card.model';

@Component({
  selector: 'app-paymentMethod',
  templateUrl: './paymentMethod.component.html',
  styleUrls: ['./paymentMethod.component.css']
})
export class PaymentMethodComponent implements OnInit {
  listCard: Card[];

  constructor(private service: PaymentMethodService) { }
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllPaymentMethod().subscribe(data => {
      this.listCard = data;
    });
  }
}
