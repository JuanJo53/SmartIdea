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

  projectid = this.activatedRoute.snapshot.params.id;
  constructor(
    private service: PaymentPlanService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadlist();
  }

  loadlist() {
    console.log('Project id: ' + this.projectid);
    this.service.getAllPaymentPlan().subscribe((data) => {
      this.listPaymentPlan = data;
    });
  }
}
