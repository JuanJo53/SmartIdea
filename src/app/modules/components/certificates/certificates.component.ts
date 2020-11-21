import { Certificate } from './../../../models/certificate.model';
import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/services/user_services/certificate.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css'],
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [];

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.fecthCertificates();
  }

  clickCertificate(id: number) {
    console.log('product');
    console.log(id);
  }
  fecthCertificates() {
    this.certificateService.getAllCertificates().subscribe((certificates) => {
      this.certificates = certificates;
      console.log(certificates);
    });
  }
}
