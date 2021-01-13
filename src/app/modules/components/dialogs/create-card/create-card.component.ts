import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CardService } from '../../../../services/user_services/card.service';
import { Card } from '../../../../models/card.model';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  formCard: FormGroup;
  fechaHoy:String;
  userId: number = parseInt(localStorage.getItem('userId'));
  edit: boolean = true;
  lettersPattern = '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$';
  numPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  durationInSeconds = 5;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService,
    public dialogRef: MatDialogRef<CreateCardComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.formCard = this.fromBuilder.group({
      cardName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.noWhitespaceValidator,
          Validators.pattern(this.lettersPattern),
        ],
      ],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(16),
          this.noWhitespaceValidator,
          Validators.pattern(this.numPattern),
        ],
      ],
      expirationYear: [
        '',
        [
          Validators.required,
          Validators.min(2021),
          Validators.max(2025),
          this.noWhitespaceValidator,
          Validators.pattern(this.numPattern),
        ],
      ],
      expirationMonth: ['', [Validators.required]],
      cvc: [
        '',
        [
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(3),
          this.noWhitespaceValidator,
          Validators.pattern(this.numPattern),
        ],
      ],
      creationDate: [new Date().getDate().toString(), [Validators.required]],
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', {
      duration: 5000,
      //  horizontalPosition: this.horizontalPosition,
      //  verticalPosition: this.verticalPosition,
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  get cardName() {
    return this.formCard.get('cardName');
  }
  get cardNumber() {
    return this.formCard.get('cardNumber');
  }
  get expirationYear() {
    return this.formCard.get('expirationYear');
  }
  get expirationMonth() {
    return this.formCard.get('expirationMonth');
  }
  get cvc() {
    return this.formCard.get('cvc');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close(false);
  }
  cancel() {
    this.edit = false;
  }
  ngOnInit(): void {}

  savecard(): void {
    if (this.formCard.valid) {
      const cert = this.formCard.value as Card;
      this.cardService.postnewcard(this.userId, cert).subscribe((card) => {
      },err =>{
        this.openSnackBar(err.error.message);
      });
      this.onNoClick();
    } else {
      this.openSnackBar('Verifique sus datos');
    }
  }
  public space(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  createcard(card: Card): void {
    this.cardService.postnewcard(this.userId, card).subscribe((card) => {
      console.log(card);
    });
    this.onNoClick();
  }
}
