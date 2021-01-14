import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notaFinal',
})
export class NotaFinalPipe implements PipeTransform {
  transform(value: any, listEvaluacion: any[]): unknown {
    var nroEvaluacion_ = value.nroEvaluacion;

    var resp_ = 0;

    var eval_ = listEvaluacion.filter((e) => e.nroEvaluacion == nroEvaluacion_);
    //  console.log("value ", value);
    //  console.log("eval_ ", eval_);

    eval_.forEach((e) => {
      if (e.respuestaUser == e.respuestaCorrecta) {
        resp_++;
      }
    });

    var notaPorcentaje = (resp_ * 100) / value.totalPreguntas;
    var nota = Math.round(notaPorcentaje);

    var nx = nota >= 51 ? 'Aprobado' : 'Reprobado';

    return `${nota} % ${nx} `;
  }
}
