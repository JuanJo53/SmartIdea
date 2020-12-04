import { Component, OnInit } from '@angular/core';
import {Card} from '../../../../models/card.model';
import { ActivatedRoute } from '@angular/router';
import {PaymentPlanService} from '../../../../services/user_services/paymentPlan.service';
import {CardService} from '../../../../services/user_services/card.service';
import {PaymentPlan} from '../../../../models/paymentPlan.model';
import {IProjects} from '../../../../models/projects.model';
import {Bill} from '../../../../models/bill.model';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {BillService} from '../../../../services/user_services/bill.service';

@Component({
  selector: 'app-orderReview',
  templateUrl: './orderReview.component.html',
  styleUrls: ['./orderReview.component.css']
})
export class OrderReviewComponent implements OnInit {
  card: Card;
  paymentPlan: PaymentPlan;
  project: IProjects;
  bill: Bill;

  constructor(private service: CardService, private paymentPlanService:PaymentPlanService, private projectService: ProjectsService,private billService: BillService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadcard();
    this.loadpaymentplan();
    this.loadproject();
    this.loadbill();

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

  loadpaymentplan() {
    const idp = this.activatedRoute.snapshot.params.id;
    this.paymentPlanService.getPaymentPlan(idp).subscribe((data) => {
      this.paymentPlan = data;
  });
  }

  loadproject() {
    const idpr = this.activatedRoute.snapshot.params.id;
    this.projectService.getProject(idpr).subscribe((data) => {
      this.project = data;
    });
  }

  loadbill()
  {
   /* const idbib= this.activatedRoute.snapshot.params.id;
    this.billService.getBill(idbi).subscribe(data=>{
      this.bill= data;
    });*/
  }

}
