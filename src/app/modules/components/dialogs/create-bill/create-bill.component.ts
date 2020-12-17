import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { BillService } from '../../../../services/user_services/bill.service';
import { Bill} from '../../../../models/bill.model';
import {BillRequest} from '../../../../models/billRequest.model';
import {Card} from '../../../../models/card.model';


@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css'],
})
export class CreateBillComponent implements OnInit {
  formBill: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private billService: BillService,
    public dialogRef: MatDialogRef<CreateBillComponent>
  ) {}
  edit = false;
  onNoClick(): void {
    this.dialogRef.close();
  }
  close(bill:Bill) {
    this.dialogRef.close(bill);
  }
  cancel() {
    this.edit = false;
  }
  ngOnInit(): void {
    this.editBill();
  }
  editBill(): void {
    this.edit = true;
    this.formBill = this.fromBuilder.group({
      billingAddress: ['',[Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
  savebill(): void {
    if (this.formBill.valid) {
      let cert:Bill ={billId: null,
        userId: null,
        paymentPlanId: null,
        cardId: null,
        projectsId: null,
        buyDate: null,
        billingAddress: this.formBill.value.billingAddress,
        country: this.formBill.value.country,
        city: this.formBill.value.city,
        projectTitle: null,
        paymentPlanName: null,
        paymentPlanCost: null,
      };
      console.log(cert);
      this.close(cert);
    }

  }

}
