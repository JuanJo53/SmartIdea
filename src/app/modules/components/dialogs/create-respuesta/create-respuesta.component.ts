import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RespuestaService } from 'src/app/services/user_services/respuesta.service';

@Component({
  selector: 'app-create-respuesta',
  templateUrl: './create-respuesta.component.html',
  styleUrls: ['./create-respuesta.component.css'],
})
export class CreateRespuestaComponent implements OnInit {
  data: any;
  formRespuesta: FormGroup;
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private respuestaService: RespuestaService,

    private _snackBar: MatSnackBar,

    private dialogRef: MatDialogRef<CreateRespuestaComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    this.formRespuesta = this.fromBuilder.group({
      respuesta: ['', [Validators.required]],
      respuestaCorrecta: [false, [Validators.required]],
      preguntaId: [this.data.pregunta.preguntaId, [Validators.required]],
      // projectsId: [this.data.pregunta.projectsId, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get respuesta() {
    return this.formRespuesta.get('respuesta');
  }

  get respuestaCorrecta() {
    return this.formRespuesta.get('respuestaCorrecta');
  }

  saveRespuesta() {
    if (this.formRespuesta.valid) {
      const cert = this.formRespuesta.value;
      console.log('cert ', cert);

      var sendData = {
        respuesta:cert.respuesta,
        respuestaCorrecta: cert.respuestaCorrecta,
        preguntaId:cert.preguntaId// this.userId,
      };

      this.respuestaService.createRespuesta(this.userId, cert).subscribe(
        (card) => {
          this.onNoClick();
        },
        (err) => {
          this.openSnackBar(err.error.message);
        }
      );
    } else {
      this.openSnackBar('Verifique sus datos');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', {
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
}
