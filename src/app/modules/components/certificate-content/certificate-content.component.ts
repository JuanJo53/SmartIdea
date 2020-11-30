import { CertificateService } from './../../../services/user_services/certificate.service';
import { Certificate } from './../../../models/certificate.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { certificateRequest } from 'src/app/models/certificateRequest.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificateComponent } from '../../home/pages/certificate/certificate.component';
import { WarningDialogComponent } from '../dialogs/warning-dialog/warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
    private certificatesService: CertificateService,
    public dialog: MatDialog
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
  saveCertificate(event: Event, id: number): void {
    event.preventDefault();
    if (this.form.valid) {
      const cert = this.form.value;
      console.log(cert);
      this.updateCertificate(id, cert);
    }
    this.cancel();
    window.location.reload();
  }
  updateCertificate(id: number, updateCertificate: certificateRequest): void {
    this.certificatesService
      .updateCertificate(id, updateCertificate)
      .subscribe((certificate) => {
        console.log(certificate);
      });
  }
  deleteCertificate(id: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data:{
        message: "¿Esta seguro que desea eliminar el certificado?",
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.certificatesService.deleteCertificate(id).subscribe((rta) => {
          console.log(rta);
        });
        window.location.reload();
        console.log('Deleted');
      }
    });
  }
}
