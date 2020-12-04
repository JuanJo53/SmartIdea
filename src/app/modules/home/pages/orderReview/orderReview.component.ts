import { Component, OnInit } from '@angular/core';
import {Card} from '../../../../models/card.model';
import { ActivatedRoute } from '@angular/router';
import {PaymentPlanService} from '../../../../services/user_services/paymentPlan.service';
import {CardService} from '../../../../services/user_services/card.service';
import {PaymentPlan} from '../../../../models/paymentPlan.model';

@Component({
  selector: 'app-orderReview',
  templateUrl: './orderReview.component.html',
  styleUrls: ['./orderReview.component.css']
})
export class OrderReviewComponent implements OnInit {
  card: Card;
  paymentPlan: PaymentPlan;

  constructor(private service: CardService, private paymentPlanService:PaymentPlanService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadcard();
    this.loadpaymentplan();
  }
  loadcard(){
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getCard(id).subscribe(
      data => {
        this.card = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  loadpaymentplan(){
    const idpp = this.activatedRoute.snapshot.params.id;
    this.paymentPlanService.getPaymentPlan(idpp).subscribe(data=>{
      this.paymentPlan = data;
    });
  }
}
