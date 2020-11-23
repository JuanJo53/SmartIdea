import { Certificate } from './../../../models/certificate.model';
import { certificateRequest } from '../../../models/certificateRequest.model';
import { Component, OnChanges, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/user_services/certificate.service';
import { MatDialog } from '@angular/material/dialog';
export interface DialogData {
  certificateName: string;
  company: string;
  expeditionDate: string;
  credentialId: string;
  credentialURL: string;
  expirationDate: string;
}
@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css'],
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [];

  certificateName: string;
  company: string;
  expeditionDate: string;
  credentialId: string;
  credentialURL: string;
  expirationDate: string;

  constructor(
    public dialog: MatDialog,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    this.fecthCertificates();
  }
  createCertificate(): void {
    const newCertificate: certificateRequest = {
      certificateName: 'Curso de Adobe Photoshop',
      company: 'Coursera',
      expeditionDate: '2018-10-12',
      credentialId: '1234asdr6547resswqqd',
      credentialURL: 'http://coursera.com/certificados/photoshop',
      expirationDate: '2022-10-12',
    };
    this.certificateService
      .postNewCertificate(newCertificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
  }
  fecthCertificates(): void {
    this.certificateService.getAllCertificates().subscribe((certificates) => {
      this.certificates = certificates;
      console.table(certificates);
    });
  }
}
