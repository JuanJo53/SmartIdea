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

  getAllCertificates(userid: number) {
    return this.http.get<Certificate[]>(
      apiKey.api + `/user/${userid}/certificates`
    );
  }
  getCertificate(userid: number, id: number) {
    return this.http.get<Certificate>(
      apiKey.api + `/user/${userid}/certificates/${id}`
    );
  }
  postNewCertificate(userid: number, certificate: certificateRequest) {
    return this.http.post(
      apiKey.api + `/user/${userid}/certificates`,
      certificate
    );
  }
  updateCertificate(
    userid: number,
    projectid: number,
    certificate: certificateRequest
  ) {
    return this.http.put(
      apiKey.api + `/user/${userid}/certificates/${projectid}`,
      certificate
    );
  }
  deleteCertificate(userid: number, projectid: number) {
    return this.http.delete(
      apiKey.api + `/user/${userid}/certificates/${projectid}`
    );
  }
}
