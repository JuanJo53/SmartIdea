import { Component, OnInit } from '@angular/core';
import { PaymentPlanService } from '../../../../services/user_services/paymentPlan.service';
import { PaymentPlan } from '../../../../models/paymentPlan.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paymentPlan',
  templateUrl: './paymentPlan.component.html',
  styleUrls: ['./paymentPlan.component.css'],
})
export class PaymentPlanComponent implements OnInit {
  listPaymentPlan: PaymentPlan[];

  constructor(
    private service: PaymentPlanService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadlist();
  }

  loadlist() {
    const id = this.activatedRoute.snapshot.params.id;
    console.log('Project id: ' + id);
    this.service.getAllPaymentPlan().subscribe((data) => {
      this.listPaymentPlan = data;
    });
  }
}
