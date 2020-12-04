import { Certificate } from './../../../models/certificate.model';
import { certificateRequest } from '../../../models/certificateRequest.model';
import { Component, OnChanges, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/user_services/certificate.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateCertificateComponent } from '../dialogs/create-certificate/create-certificate.component';
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
  userId: number = parseInt(localStorage.getItem('userId'));
  constructor(
    public dialog: MatDialog,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    console.log('OnInit excecuted');
    this.fecthCertificates();
  }
  createCertificate(): void {
    const dialogRef = this.dialog.open(CreateCertificateComponent, {
      width: '500px',
      data: {
        certificateName: this.certificateName,
        company: this.company,
        expeditionDate: this.expeditionDate,
        credentialId: this.credentialId,
        credentialURL: this.credentialURL,
        expirationDate: this.expirationDate,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.certificateName = result;
      this.ngOnInit();
    });
  }
  fecthCertificates(): void {
    this.certificateService
      .getAllCertificates(this.userId)
      .subscribe((certificates) => {
        this.certificates = certificates;
      });
  }
}
