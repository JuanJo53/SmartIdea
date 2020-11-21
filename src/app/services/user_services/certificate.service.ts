import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiKey from '../apiKey';
import { Certificate } from './../../models/certificate.model';
@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getAllCertificates() {
    return this.http.get<Certificate[]>(apiKey.api + '/user/1/certificates');
  }
  getCertificate(id: number) {
    return this.http.get(`http://localhost:8080/user/1/certificates/${id}`);
  }
}
