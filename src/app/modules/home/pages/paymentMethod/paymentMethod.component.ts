import { Component, OnInit } from '@angular/core';
import {Card} from '../../../../models/card.model';
import {CardService} from '../../../../services/user_services/card.service';

@Component({
  selector: 'app-paymentMethod',
  templateUrl: './paymentMethod.component.html',
  styleUrls: ['./paymentMethod.component.css']
})
export class PaymentMethodComponent implements OnInit {
  listCard: Card[];

  constructor(private service: CardService) { }
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllCard().subscribe(data => {
      this.listCard = data;
    });
  }
}
