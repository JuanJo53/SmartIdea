import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/user_services/card.service';
import { CreateCardComponent } from '../../../components/dialogs/create-card/create-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditCardComponent } from '../../../components/dialogs/edit-card/edit-card.component';
import { WarningDialogComponent } from '../../../components/dialogs/warning-dialog/warning-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreatePreguntaComponent } from 'src/app/modules/components/dialogs/create-pregunta/create-pregunta.component';
import { PreguntaService } from 'src/app/services/user_services/pregunta.service';
import { CreateRespuestaComponent } from 'src/app/modules/components/dialogs/create-respuesta/create-respuesta.component';
import { RespuestaService } from 'src/app/services/user_services/respuesta.service';
import { EvaluacionService } from 'src/app/services/user_services/evaluacion.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId'));
  listPreguntas: any[];
  listRespuestas: any[];
  pregunta: any;
  disableBtn: Boolean = false;
  respuestas: any[];
  evaluacion: any[] = [];
  respuestaSelect: any;
  index: any = 0;
  sendEvaluacionIndex: any = 0;
  nroEvaluacion = new Date();
  data: any;
  disableBtnSiguiente: boolean = true;
  proyectId: number;
  constructor(
    private preguntaService: PreguntaService,
    private respuestaService: RespuestaService,
    private evaluacionService: EvaluacionService,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<CreateRespuestaComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
    this.proyectId = data.proyectId;
  }

  ngOnInit(): void {
    this.loadlistPreguntas();
  }

  loadlistPreguntas() {
    this.preguntaService.getAllPreguntas(this.proyectId).subscribe((data) => {
      this.listPreguntas = data;
      this.loadlistRespuestas();
    });
  }

  loadlistRespuestas() {
    this.respuestaService.getAllRespuestas(this.userId).subscribe((data) => {
      this.listRespuestas = data;
      this.getPreguntaRespuestas(this.index);
    });
  }

  getPreguntaRespuestas(index) {
    this.pregunta = this.listPreguntas[index];
    this.respuestas = this.listRespuestas.filter(
      (e) => e.preguntaId === this.pregunta.preguntaId
    );
  }

  btnSiguiente() {
    // this.respuestaSelect=null;
    this.disableBtnSiguiente = true;
    this.index = this.index + 1;

    if (this.index == this.listPreguntas.length - 1) {
      console.log('finalizar...');
      // this.disableBtn = true;
      this.getPreguntaRespuestas(this.index);
    } else {
      console.log('siguiente.....');
      this.getPreguntaRespuestas(this.index);
    }

    console.log('nroEvaluacion ', this.nroEvaluacion.getTime());

    this.addEvaluacion();
  }

  addEvaluacion() {
    this.evaluacion.push({
      nroEvaluacion: this.nroEvaluacion.getTime(),
      preguntaId: this.respuestaSelect.preguntaId,
      proyectoId: this.proyectId,
      respuestaCorrecta: this.respuestas.find(
        (e) => e.respuestaCorrecta == true
      ).respuestaId,
      respuestaUser: this.respuestaSelect.respuestaId,
      totalPreguntas: this.listPreguntas.length,
    });
  }

  btnSelectRespuesta(respuesta) {


    // this.index = this.index + 1;

    if (this.index == this.listPreguntas.length - 1) {
      console.log('verdadero');
      this.disableBtn = true;
      this.respuestaSelect = respuesta;
    } else {

      this.respuestaSelect = respuesta;
      this.disableBtnSiguiente = false;
      // console.log('respuesta ', respuesta);

      console.log('false');
    }
  }

  btnEnviarEvaluacion() {
    this.addEvaluacion();
    var total_ = this.evaluacion.length;
    ////
    this.sendEvaluacion(this.sendEvaluacionIndex);
  }

  sendEvaluacion(posX) {
    console.log('sendEvaluacion');
    var eval_ = this.evaluacion[posX];

    this.evaluacionService
      .createEvaluacion(this.userId, eval_)
      .subscribe((data) => {
        this.sendEvaluacionIndex++;
        if (this.sendEvaluacionIndex == this.evaluacion.length) {
          this.closeAndSave();
        } else {
          this.sendEvaluacion(this.sendEvaluacionIndex);
        }

        console.log('data ', data);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closeAndSave() {
    this.dialogRef.close(true);
  }

}
