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
      const id = parseInt(params.id);
      const cert = this.certificatesService.getCertificate(id);
      console.log(cert);
    });
  }
}
