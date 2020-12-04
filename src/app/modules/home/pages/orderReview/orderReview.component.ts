import { Component, OnInit } from '@angular/core';
import {Card} from '../../../../models/card.model';
import { ActivatedRoute } from '@angular/router';
import {PaymentPlanService} from '../../../../services/user_services/paymentPlan.service';
import {CardService} from '../../../../services/user_services/card.service';
import {PaymentPlan} from '../../../../models/paymentPlan.model';
import {IProjects} from '../../../../models/projects.model';
import {ProjectsService} from '../../../../services/user_services/projects.service';

@Component({
  selector: 'app-orderReview',
  templateUrl: './orderReview.component.html',
  styleUrls: ['./orderReview.component.css']
})

export class OrderReviewComponent implements OnInit {
  paymentplan: PaymentPlan;
  card: Card;
  project:IProjects;
  constructor(
    private service: CardService,
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private paymentPlanService:PaymentPlanService,
  ) {}

  ngOnInit(): void {

    this.loadcard();
    this.loadproject();
    this.loadpaymentplan();

  }

  loadcard() {
    const id = this.activatedRoute.snapshot.params.id;
    this.service.getCard(id).subscribe(
      (data) => {
        this.card = data;
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
<<<<<<< HEAD
    this.projectsService.getProject(idpr).subscribe((data) => {
      console.log(data);
=======
    this.projectService.getProject(idpr,iduser).subscribe((data) => {
>>>>>>> b6a247b8139dc1e6869e0d361ac8b349d4e5c223
      this.project = data;
    });
  }
  loadpaymentplan() {
    const idp = this.activatedRoute.snapshot.params.id;
    this.paymentPlanService.getPaymentPlan(idp).subscribe((data) => {
      console.log(data);
      this.paymentplan = data;
    });
  }


}
