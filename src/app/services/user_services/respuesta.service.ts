import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiKey from '../apiKey';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  constructor(private http: HttpClient) {}
  getAllRespuestas(userid: number) {
    return this.http.get<any[]>(`http://localhost:8080/respuesta/${userid}/respuesta`);
  }
  getRespuestas(userid: number, id: number) {
    return this.http.get<any>(
      `http://localhost:8080/respuesta/${userid}/respuesta/${id}`
    );
  }

  createRespuesta(userid: number, respuesta: any) {
    return this.http.post(`http://localhost:8080/respuesta/${userid}/respuesta`, respuesta);
  }
  updateRespuesta(respuesta: any, id: number,userid: number) {
    return this.http.put(
      `http://localhost:8080/respuesta/${userid}/respuesta/${id}`,respuesta);
  }
  deleteRespuesta(userid: number, id: number) {
    return this.http.delete(apiKey.api + `/respuesta/${userid}/respuesta/${id}`);
  }
}
