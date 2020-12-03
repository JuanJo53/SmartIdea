import { Component, OnInit } from '@angular/core';
import {OrderReviewService} from '../../../../services/user_services/orderReview.service';
import {Card} from '../../../../models/card.model';
import { ActivatedRoute } from '@angular/router';
import {PaymentPlanService} from '../../../../services/user_services/paymentPlan.service';

@Component({
  selector: 'app-orderReview',
  templateUrl: './orderReview.component.html',
  styleUrls: ['./orderReview.component.css']
})
export class OrderReviewComponent implements OnInit {
  listCard: Card;

  constructor(private service: OrderReviewService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadcard();
  }
  loadcard(){
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getCard(id).subscribe(
      data => {
        this.listCard = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
