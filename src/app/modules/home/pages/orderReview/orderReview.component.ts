import { Component, OnInit } from '@angular/core';
import {OrderReviewService} from '../../../../services/user_services/orderReview.service';
import {Bill} from '../../../../models/bill.model';
import {PaymentPlan} from '../../../../models/paymentPlan.model';
import {Card} from '../../../../models/card.model';

@Component({
  selector: 'app-orderReview',
  templateUrl: './orderReview.component.html',
  styleUrls: ['./orderReview.component.css']
})
export class OrderReviewComponent implements OnInit {
  listCard: Card[];
  constructor(private service: OrderReviewService) { }
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllOrderReview().subscribe(data => {
      this.listCard = data;
    });
  }
}
