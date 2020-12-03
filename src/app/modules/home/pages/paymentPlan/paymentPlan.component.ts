import { Component, OnInit } from '@angular/core';
import { PaymentPlanService } from '../../../../services/user_services/paymentPlan.service';
import { PaymentPlan } from '../../../../models/paymentPlan.model';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-paymentplan',
  templateUrl: './paymentPlan.component.html',
  styleUrls: ['./paymentPlan.component.css'],
})
export class PaymentPlanComponent implements OnInit {
  listPaymentPlan: PaymentPlan;
  constructor(private service: PaymentPlanService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllPaymentPlan().subscribe(data => {
      this.listPaymentPlan = data;
    });
 }
}
