import { Component, OnInit } from '@angular/core';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/user_services/card.service';

@Component({
  selector: 'app-paymentMethod',
  templateUrl: './paymentMethod.component.html',
  styleUrls: ['./paymentMethod.component.css'],
})
export class PaymentMethodComponent implements OnInit {
  listCard: Card[];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(private service: CardService) {}
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist() {
    this.service.getAllCard(this.userId).subscribe((data) => {
      this.listCard = data;
    });
  }
}
