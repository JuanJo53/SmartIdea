import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CertificateService } from 'src/app/services/user_services/certificate.service';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css'],
})
export class WarningDialogComponent implements OnInit {
  message: string = '¿Esta seguro que desea eliminar el certificado?';
  buttonMessage: string = 'Si';
  constructor(public matDialogRef: MatDialogRef<WarningDialogComponent>) {}
  ngOnInit(): void {}
  accept() {
    this.matDialogRef.close(true);
  }
  cancel() {
    this.matDialogRef.close(false);
  }
}
