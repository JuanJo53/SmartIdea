import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countRespCorrectas'
})
export class CountRespCorrectasPipe implements PipeTransform {

  transform(value: any, listEvaluacion: any[]): unknown {
var nroEvaluacion_ =value.nroEvaluacion;

var resp_=0;

var eval_ = listEvaluacion.filter(e=>e.nroEvaluacion==nroEvaluacion_);
console.log("value ", value);
console.log("eval_ ", eval_);

eval_.forEach(e=>{
  if (e.respuestaUser==e.respuestaCorrecta) {
    resp_++;
  }
});


    return resp_;
  }

}
