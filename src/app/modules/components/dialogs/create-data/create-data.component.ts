import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { BillService } from '../../../../services/user_services/bill.service';
import { Bill } from '../../../../models/bill.model';

@Component({
  selector: 'app-create-data',
  templateUrl: './create-data.component.html',
  styleUrls: ['./create-data.component.css'],
})
export class CreateDataComponent implements OnInit {
  formData: FormGroup;
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private billService: BillService,
    public dialogRef: MatDialogRef<CreateDataComponent>
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
    this.formData = this.fromBuilder.group({
      billId: [0, [Validators.required]],
      buyDate: ['', [Validators.required]],
      billingAddress: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }
  savedata(): void {
    if (this.formData.valid) {
      const cert = this.formData.value;
      console.log(cert);
      this.createbill(cert);
    }
  }

  createbill(bill: Bill): void {
    this.billService.postnewbill(this.userId, bill).subscribe((bill) => {
      console.log(bill);
    });
    this.onNoClick();
  }
}
