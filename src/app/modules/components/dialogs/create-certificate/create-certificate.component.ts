import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Event } from '@angular/router';
import { certificateRequest } from 'src/app/models/certificateRequest.model';
import { CertificateService } from 'src/app/services/user_services/certificate.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../certificates/certificates.component';
@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css'],
})
export class CreateCertificateComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private certificatesService: CertificateService,
    public dialogRef: MatDialogRef<CreateCertificateComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.editCert();
  }
  editCert(): void {
    this.form = this.fromBuilder.group({
      id: [0, [Validators.required]],
      certificateName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      expeditionDate: ['', [Validators.required]],
      expirationDate: [''],
      credentialId: ['', [Validators.required]],
      credentialURL: ['', [Validators.required]],
    });
  }
  saveCertificate(): void {
    if (this.form.valid) {
      const cert = this.form.value;
      console.log(cert);
      this.createCertificate(cert);
    }
    this.dialogRef.close();
  }

  createCertificate(newCertificate: certificateRequest): void {
    this.certificatesService
      .postNewCertificate(newCertificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
  }
}
