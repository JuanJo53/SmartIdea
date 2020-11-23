import { Certificate } from './../../../models/certificate.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CertificateService } from 'src/app/services/user_services/certificate.service';
import { certificateRequest } from 'src/app/models/certificateRequest.model';

@Component({
  selector: 'app-certificate-content',
  templateUrl: './certificate-content.component.html',
  styleUrls: ['./certificate-content.component.css'],
})
export class CertificateContentComponent implements OnInit {
  @Input() certificate: Certificate;

  // certificate: Certificate;

  constructor(
    private route: ActivatedRoute,
    private certificatesService: CertificateService
  ) {}
  edit = false;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      console.log(id);
      if (id) {
        this.fetchCertificate(id);
      }
    });
  }
  editCert() {
    this.edit = true;
  }
  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }
  fetchCertificate(id: number) {
    this.certificatesService.getCertificate(id).subscribe((certificate) => {
      this.certificate = certificate;
    });
  }
  updateCertificate(certificate: certificateRequest) {
    const updateCertificate: certificateRequest = {
      certificateName: 'Curso de Adobe Ilustrator',
      company: 'Coursera',
      expeditionDate: '2018-10-12',
      credentialId: '1234asdr6547resswqqd',
      credentialURL: 'http://coursera.com/certificados/ilustrator',
      expirationDate: '2022-10-12',
    };
    this.certificatesService
      .updateCertificate(4, certificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
  }
  deleteCertificate(id: number) {
    this.certificatesService.deleteCertificate(id).subscribe((rta) => {
      console.log(rta);
    });
    console.log('Deleted');
  }
}
