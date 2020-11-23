import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiKey from '../apiKey';
import { Certificate } from './../../models/certificate.model';
import { certificateRequest } from '../../models/certificateRequest.model';
@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getAllCertificates() {
    return this.http.get<Certificate[]>(apiKey.api + '/user/1/certificates');
  }
  getCertificate(id: number) {
    return this.http.get<Certificate>(
      apiKey.api + `/user/1/certificates/${id}`
    );
  }
  postNewCertificate(certificate: certificateRequest) {
    return this.http.post(apiKey.api + '/user/1/certificates', certificate);
  }
  updateCertificate(id: number, certificate: certificateRequest) {
    return this.http.put(
      apiKey.api + `/user/1/certificates/${id}`,
      certificate
    );
  }
  deleteCertificate(id: number) {
    return this.http.delete(apiKey.api + `/user/1/certificates/${id}`);
  }
}
