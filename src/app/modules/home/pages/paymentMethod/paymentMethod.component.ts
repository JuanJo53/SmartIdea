import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  projectid = this.activatedRoute.snapshot.params.id;
  paymentid = this.activatedRoute.snapshot.params.pid;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: CardService
  ) {}
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(): void {
    this.service.getAllCard(this.userId).subscribe((data) => {
      this.listCard = data;
    });
  }
}
