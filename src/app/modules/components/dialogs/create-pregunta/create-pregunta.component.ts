import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from '../../../../services/user_services/card.service';
import { Card } from '../../../../models/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreguntaService } from 'src/app/services/user_services/pregunta.service';

@Component({
  selector: 'app-create-pregunta',
  templateUrl: './create-pregunta.component.html',
  styleUrls: ['./create-pregunta.component.css'],
})
export class CreatePreguntaComponent implements OnInit {
  formPregunta: FormGroup;
  data:any;
  userId: number = parseInt(localStorage.getItem('userId'));
  lettersPattern = '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$';
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,

    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreatePreguntaComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    this.formPregunta = this.fromBuilder.group({
      pregunta: ['', [Validators.required,this.noWhitespaceValidator, Validators.minLength(3), Validators.pattern(this.lettersPattern)]],
      projectsId: [this.data.proyectId, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get pregunta() {
    return this.formPregunta.get('pregunta');
  }

  savePregunta() {
    if (this.formPregunta.valid) {
      const cert = this.formPregunta.value;
      console.log('cert ', cert);
      this.preguntaService.createPregunta(this.userId, cert).subscribe(
        (card) => {
          this.onNoClick();
        },
        (err) => {
          this.openSnackBar(err.error.message);
        }
      );
    } else {
      this.openSnackBar('Verifique los campos');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', {
      panelClass:'color-snackbar',
      duration: 5000,
      //  horizontalPosition: this.horizontalPosition,
      //  verticalPosition: this.verticalPosition,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close(false);
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
