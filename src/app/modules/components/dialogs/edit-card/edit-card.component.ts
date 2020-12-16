import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CardService } from '../../../../services/user_services/card.service';
import { Card } from '../../../../models/card.model';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css'],
})
export class EditCardComponent implements OnInit {
  formCard: FormGroup;
  listCard: Card[];
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditCardComponent>,
    private cardService: CardService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cardId: number;
      cardNumber: number;
      cardName: string;
      expirationYear: number;
      expirationMonth: number;
      cvc: number;
    }
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
    this.editCard();
  }
  editCard(): void {
    this.edit = true;
    this.formCard = this.fromBuilder.group({
      cardName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expirationYear: ['', [Validators.required]],
      expirationMonth: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
    });
  }
  updateCard(): void {
    if (this.formCard.valid) {
      const card = this.formCard.value;
      console.log(card);
      this.update(this.data.cardId, card);
    }
  }
  update(cardId: number, card: Card): void {
    var iduser = parseInt(localStorage.getItem('userId'));
    this.cardService
      .updatecard( card, cardId, iduser)
      .subscribe((card) => {
      console.log(card);
    });
    this.onNoClick();
  }
}
