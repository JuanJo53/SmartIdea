import { Component, OnInit } from '@angular/core';
import { PaymentPlanService } from '../../../../services/user_services/paymentPlan.service';
import { PaymentPlan } from '../../../../models/paymentPlan.model';
import { ActivatedRoute } from '@angular/router';
import { IProjects } from '../../../../models/projects.model';
import { ProjectsService } from '../../../../services/user_services/projects.service';

@Component({
  selector: 'app-paymentPlanBuy',
  templateUrl: './paymentPlanBuy.component.html',
  styleUrls: ['./paymentPlanBuy.component.css'],
})
export class PaymentPlanBuyComponent implements OnInit {
  paymentplan: PaymentPlan;
  project: IProjects;
<<<<<<< HEAD
  constructor(private service: PaymentPlanService,private projectService: ProjectsService , private activatedRoute: ActivatedRoute) { }
=======

  constructor(
    private service: PaymentPlanService,
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute
  ) {}
>>>>>>> 5c9c1faab7225c50a6f53727a368eac8e00796c7
  ngOnInit(): void {
    this.loadpaymentplan();
    this.loadproject();
  }

  loadpaymentplan() {
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getPaymentPlan(id).subscribe(
      (data) => {
        this.paymentplan = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadproject() {
    const idpr = this.activatedRoute.snapshot.params.id;
<<<<<<< HEAD
    this.projectService.getProject(idpr).subscribe(data=>{
      this.project= data;
=======
    this.projectService.getProject(idpr).subscribe((data) => {
      console.log(data);
      this.project = data;
>>>>>>> 5c9c1faab7225c50a6f53727a368eac8e00796c7
    });
  }
}
