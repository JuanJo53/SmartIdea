import { Certificate } from './../../../models/certificate.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CertificateService } from 'src/app/services/user_services/certificate.service';

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

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      console.log(id);
      this.fetchCertificate(id);
    });
  }

  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }
  fetchCertificate(id: number) {
    this.certificatesService.getCertificate(id).subscribe((certificate) => {
      this.certificate = certificate;
    });
  }
  deleteCertificate(id: number) {
    this.certificatesService.deleteCertificate(id);
    console.log('Deleted');
  }
}
