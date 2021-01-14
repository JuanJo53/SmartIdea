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
  lettersPattern = '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$';
  numPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  idPattern = '[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]{0,74}';
  URLPattern = '^(http|https):[-a-zA-Z0-9+&@#/%?=~_|!:,.;]{0,}';
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private certificatesService: CertificateService,
    public dialogRef: MatDialogRef<CreateCertificateComponent> // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  edit=false;

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close(false);
  }

  cancel() {
    this.edit = false;
  }

  ngOnInit(): void {
    this.editCert();
  }
  editCert(): void {
    this.form = this.fromBuilder.group({
      id: [0, [Validators.required]],
      certificateName: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern(this.lettersPattern)]],
      company: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern(this.lettersPattern)]],
      expeditionDate: ['', [Validators.required, Validators.min(2020), Validators.max(2029), this.noWhitespaceValidator]],
      expirationDate:  ['', [Validators.required, Validators.min(2020), Validators.max(2029), this.noWhitespaceValidator]],
      credentialId: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), this.noWhitespaceValidator, Validators.pattern(this.idPattern)]],
      credentialURL: ['', [Validators.required,  Validators.minLength(8), Validators.maxLength(74), this.noWhitespaceValidator, Validators.pattern(this.URLPattern)]],
          });
  }

  get certificateName(){
    return this.form.get('certificateName');
  }

  get company(){
    return this.form.get('company');
  }

  get expeditionDate(){
    return this.form.get('expeditionDate');
  }

  get expirationDate(){
    return this.form.get('expirationDate');
  }

  get credentialId(){
    return this.form.get('credentialId');
  }

  get credentialURL(){
    return this.form.get('credentialURL');
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public space(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  saveCertificate(): void {
    if (this.form.valid) {
      const cert = this.form.value;
      console.log(cert);
      this.createCertificate(cert);
    } else {
      window.alert("ERROR: Datos vacios o inválidos");
      //this.dialogRef.close();
    }
  }
  createCertificate(newCertificate: certificateRequest): void {
    var iduser = parseInt(localStorage.getItem('userId'));
    this.certificatesService
      .postNewCertificate(iduser, newCertificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
    this.onNoClick();
  }
}
