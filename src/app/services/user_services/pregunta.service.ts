import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiKey from '../apiKey';
@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http: HttpClient) {}
  getAllPreguntas(proyectId: number) {
    return this.http.get<any[]>(`http://localhost:8080/pregunta/${proyectId}/pregunta`);
  }
  getPregunta(userid: number, id: number) {
    return this.http.get<any>(
      `http://localhost:8080/user/${userid}/card/${id}`
    );
  }

  createPregunta(userid: number, pregunta: any) {
    return this.http.post(`http://localhost:8080/pregunta/${userid}/pregunta`, pregunta);
  }
  updatePregunta(pregunta: any, id: number,userid: number) {
    return this.http.put(
      `http://localhost:8080/pregunta/${userid}/pregunta/${id}`,pregunta);
  }
  deletePregunta(userid: number, id: number) {
    return this.http.delete(apiKey.api + `/pregunta/${userid}/pregunta/${id}`);
  }
}
