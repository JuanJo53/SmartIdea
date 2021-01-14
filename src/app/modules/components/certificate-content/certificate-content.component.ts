import { CertificateService } from './../../../services/user_services/certificate.service';
import { Certificate } from './../../../models/certificate.model';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { certificateRequest } from 'src/app/models/certificateRequest.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CertificateComponent } from '../../home/pages/certificate/certificate.component';
import { WarningDialogComponent } from '../dialogs/warning-dialog/warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-certificate-content',
  templateUrl: './certificate-content.component.html',
  styleUrls: ['./certificate-content.component.css'],
})
export class CertificateContentComponent implements OnInit, OnDestroy {
  @Input() certificate: Certificate;

  form: FormGroup;
  userId: number = parseInt(localStorage.getItem('userId'));
  lettersPattern = '^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$';
  numPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  idPattern  = '[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]{0,74}';
  URLPattern = '^(http|https):[-a-zA-Z0-9+&@#/%?=~_|!:,.;]{0,}';

  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private certificatesService: CertificateService,
    public dialog: MatDialog
  ) {

  }
  edit = false;
  destroyed = false;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      console.log(id);
      if (id) {
        this.fetchCertificate(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    console.log('Component destroyed');
  }
  cancel() {
    this.edit = false;
  }

  editCert(): void {
    this.edit = true;
    this.form = this.fromBuilder.group({
      id: [0, [Validators.required]],
      certificateName: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern(this.lettersPattern)]],
      company: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern(this.lettersPattern)]],
      expeditionDate: ['', [Validators.required, Validators.min(2020), Validators.max(2029), this.noWhitespaceValidator, Validators.pattern(this.numPattern)]],
      expirationDate:  ['', [Validators.required, Validators.min(2020), Validators.max(2029), this.noWhitespaceValidator, Validators.pattern(this.numPattern)]],
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


  fetchCertificate(id: number): void {
    this.certificatesService
      .getCertificate(this.userId, id)
      .subscribe((certificate) => {
        this.certificate = certificate;
      });
  }
  saveCertificate(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const cert = this.form.value;
      console.log(cert);
      this.updateCertificate(id, cert);
    }
      this.cancel();
  }
  updateCertificate(id: number, updateCertificate: certificateRequest): void {
    this.certificatesService
      .updateCertificate(this.userId, id, updateCertificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
  }
  deleteCertificate(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data: {
        message: '¿Esta seguro que desea eliminar el certificado?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.certificatesService
          .deleteCertificate(this.userId, id)
          .subscribe((rta) => {
            console.log(rta);
          });
        console.log('Deleted');
      }
      this.ngOnDestroy();
    });
  }
}
