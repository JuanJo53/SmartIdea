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
  constructor(
    private service: PaymentPlanService,
    private projectService: ProjectsService,
    private activatedRoute: ActivatedRoute
  ) {}
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
    var iduser = parseInt(localStorage.getItem('userId'));
    const idpr = this.activatedRoute.snapshot.params.id;
    this.projectService.getProject(idpr, iduser).subscribe((data) => {
     console.log(data);
      this.project = data;
    });
  }
}
