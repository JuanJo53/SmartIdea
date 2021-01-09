import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  lettersPattern = '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$';
  numPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
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
      billingAddress: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15), this.noWhitespaceValidator, Validators.pattern(this.lettersPattern) ]],
      country: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.noWhitespaceValidator, Validators.pattern(this.lettersPattern) ]],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), this.noWhitespaceValidator, Validators.pattern(this.lettersPattern) ]],
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  get billingAddress() { return this.formBill.get('billingAddress'); }
  get country() { return this.formBill.get('country'); }
  get city() { return this.formBill.get('city'); }
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
