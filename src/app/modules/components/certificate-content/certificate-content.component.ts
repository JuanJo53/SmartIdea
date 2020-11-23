import { Certificate } from './../../../models/certificate.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CertificateService } from 'src/app/services/user_services/certificate.service';
import { certificateRequest } from 'src/app/models/certificateRequest.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-certificate-content',
  templateUrl: './certificate-content.component.html',
  styleUrls: ['./certificate-content.component.css'],
})
export class CertificateContentComponent implements OnInit {
  @Input() certificate: Certificate;

  form: FormGroup;

  // certificate: Certificate;

  constructor(
    private fromBuilder: FormBuilder,
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
  cancel() {
    this.edit = false;
  }
  editCert(): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      id: [0, [Validators.required]],
      certificateName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      expeditionDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      credentialId: ['', [Validators.required]],
      credentialURL: ['', [Validators.required]],
    });
  }
  fetchCertificate(id: number): void {
    this.certificatesService.getCertificate(id).subscribe((certificate) => {
      this.certificate = certificate;
    });
  }
  saveCertificate(event: Event, id: number) {
    event.preventDefault();
    if (this.form.valid) {
      const cert = this.form.value;
      this.updateCertificate(id, cert);
    }
    this.cancel();
  }
  updateCertificate(id: number, updateCertificate: certificateRequest): void {
    this.certificatesService
      .updateCertificate(id, updateCertificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
  }
  deleteCertificate(id: number): void {
    this.certificatesService.deleteCertificate(id).subscribe((rta) => {
      console.log(rta);
    });
    console.log('Deleted');
  }
}
