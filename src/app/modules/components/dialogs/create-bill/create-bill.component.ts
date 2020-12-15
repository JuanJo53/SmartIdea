import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { BillService } from '../../../../services/user_services/bill.service';
import { Bill } from '../../../../models/bill.model';
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
  close() {
    this.dialogRef.close(false);
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
      billId: [0, [Validators.required]],
      buyDate: ['', [Validators.required]],
      billingAddress: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
  savebill(): void {
    if (this.formBill.valid) {
      const cert = this.formBill.value;
      console.log(cert);
      this.createbill(cert);
    }
  }
   createbill(bill: Bill): void {
    // this.billService
    //   .postnewbill(bill)
    //   .subscribe((bill) => {
    //     console.log(bill);
    //   });
    // this.onNoClick();
  }
}
