import { Component, OnInit } from '@angular/core';
import { PaymentPlanService } from '../../../../services/user_services/paymentPlan.service';
import { PaymentPlan } from '../../../../models/paymentPlan.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-paymentplanbuy',
  templateUrl: './PaymentPlanBuy.component.html',
  styleUrls: ['./PaymentPlanBuy.component.css'],
})
export class PaymentPlanBuyComponent implements OnInit {
  listPaymentPlan: PaymentPlan;
  constructor(private service: PaymentPlanService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllPaymentPlan().subscribe(data => {
      this.listPaymentPlan = data;
    });
  }
}
