import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRespuesta'
})
export class FilterRespuestaPipe implements PipeTransform {

  transform(value: any[], pregunta: any): unknown {
    
    return value.filter(e=>e.preguntaId===pregunta.preguntaId);
  }

}
