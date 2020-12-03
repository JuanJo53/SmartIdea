import { Component, OnInit } from '@angular/core';
import {PaymentPlanService} from '../../../../services/user_services/paymentPlan.service';
import {PaymentPlan} from '../../../../models/paymentPlan.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paymentPlanBuy',
  templateUrl: './paymentPlanBuy.component.html',
  styleUrls: ['./paymentPlanBuy.component.css']
})
export class PaymentPlanBuyComponent implements OnInit {
  paymentplan: PaymentPlan;

  constructor(private service: PaymentPlanService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.loadpaymentplan();
  }

  loadpaymentplan(){
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getPaymentPlan(id).subscribe(
      data => {
        this.paymentplan = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
