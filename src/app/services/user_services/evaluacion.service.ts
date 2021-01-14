import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import apiKey from '../apiKey';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor(private http: HttpClient) {}
  getAllEvaluacion(userid: number) {
    return this.http.get<any[]>(`http://localhost:8080/evaluacion/${userid}/evaluacion`);
  }
  getEvaluacion(userid: number, id: number) {
    return this.http.get<any>(
      `http://localhost:8080/user/${userid}/card/${id}`
    );
  }

  createEvaluacion(userid: number, evaluacion: any) {
    return this.http.post(`http://localhost:8080/evaluacion/${userid}/evaluacion`, evaluacion);
  }
  updateEvaluacion(evaluacion: any, id: number,userid: number) {
    return this.http.put(
      `http://localhost:8080/evaluacion/${userid}/evaluacion/${id}`,evaluacion);
  }
  deleteEvaluacion(userid: number, id: number) {
    return this.http.delete(apiKey.api + `/evaluacion/${userid}/evaluacion/${id}`);
  }
}
