import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CardService } from '../../../../services/user_services/card.service';
import { Card } from '../../../../models/card.model';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  formCard: FormGroup;
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService,
    public dialogRef: MatDialogRef<CreateCardComponent>
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
    this.editcard();
  }
  editcard(): void {
    this.edit = true;
    this.formCard = this.fromBuilder.group({
      cardName: ['', [Validators.required, Validators.minLength(4), this.space]],
      cardNumber: ['', [Validators.required, Validators.max(2147483647), Validators.min(1000000000), ]],
      expirationYear: ['', [Validators.required, Validators.min(2021), Validators.max(2025), ]],
      expirationMonth: ['', [Validators.required, Validators.max(12), Validators.min(1), ]],
      cvc: ['', [Validators.required, Validators.max(9999), Validators.min(1000), ]],
      creationDate: ['', [Validators.required]],
    });
  }
  savecard(): void {
    if (this.formCard.valid) {
      const cert = this.formCard.value;
      console.log(cert);
      this.createcard(cert);
    }else{
      window.alert("Error");
    }
  }
  public space(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  createcard(card: Card): void {
    this.cardService.postnewcard(this.userId, card).subscribe((card) => {
      console.log(card);
    });
    this.onNoClick();
  }
}
