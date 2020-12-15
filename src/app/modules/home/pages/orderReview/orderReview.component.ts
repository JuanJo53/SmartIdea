import { Bill } from './../../../../models/bill.model';
import { BillService } from './../../../../services/user_services/bill.service';
import { Component, OnInit } from '@angular/core';
import { Card } from '../../../../models/card.model';
import { ActivatedRoute } from '@angular/router';
import { PaymentPlanService } from '../../../../services/user_services/paymentPlan.service';
import { CardService } from '../../../../services/user_services/card.service';
import { PaymentPlan } from '../../../../models/paymentPlan.model';
import { IProjects } from '../../../../models/projects.model';
import { ProjectsService } from '../../../../services/user_services/projects.service';
import { CreateBillComponent } from '../../../components/dialogs/create-bill/create-bill.component';
import {CreateCardComponent} from '../../../components/dialogs/create-card/create-card.component';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-orderReview',
  templateUrl: './orderReview.component.html',
  styleUrls: ['./orderReview.component.css'],
})
export class OrderReviewComponent implements OnInit {
  bill: Bill;
  paymentplan: PaymentPlan;
  card: Card;
  project: IProjects;
  userId: number = parseInt(localStorage.getItem('userId'));
  projectid = this.activatedRoute.snapshot.params.id;
  paymentid = this.activatedRoute.snapshot.params.pid;
  cardid = this.activatedRoute.snapshot.params.cid;
  constructor(
    private service: CardService,
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService,
    private paymentPlanService: PaymentPlanService,
    private billService: BillService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.projectid);
    console.log(this.paymentid);
    console.log(this.cardid);
    this.loadcard();
    this.loadpaymentplan();
    this.loadproject();
    this.newBill();
  }

  loadcard() {
    this.service.getCard(this.userId, this.cardid).subscribe(
      (data) => {
        this.card = data;
        console.log('CARD: ' + this.card);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadpaymentplan() {
    const id = this.activatedRoute.snapshot.params.id;
    this.paymentPlanService.getPaymentPlan(this.paymentid).subscribe((data) => {
      this.paymentplan = data;
      console.log('PLAN: ' + this.paymentplan);
    });
  }
  loadproject() {
    this.projectsService
      .getProject(this.projectid, this.userId)
      .subscribe((data) => {
        this.project = data;
        console.log('PROJECT: ' + this.project);
      });
  }
  createBill(): void {
    const dialogRef = this.dialog.open(CreateBillComponent, {
      width: '500px',
      data: {
        status: 1,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  newBill() {
    this.billService
      .postnewbill(
        this.userId,
        this.projectid,
        this.paymentid,
        this.cardid,
        this.bill
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
