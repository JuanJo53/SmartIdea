import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Event } from '@angular/router';
import { certificateRequest } from 'src/app/models/certificateRequest.model';
import { CertificateService } from 'src/app/services/user_services/certificate.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../certificates/certificates.component';
import {worker} from 'cluster';
@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css'],
})
export class CreateCertificateComponent implements OnInit {
  form: FormGroup;
  userId: number = 1;
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
      certificateName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      company: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      expeditionDate: ['', [Validators.required, Validators.min(2020)]],
      expirationDate: ['', [Validators.required, Validators.min(2020)]],
      credentialId: ['', [Validators.required, Validators.maxLength(60)]],
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
    var iduser = parseInt(localStorage.getItem('userId'));
    this.certificatesService
      .postNewCertificate(iduser, newCertificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
  }
}
