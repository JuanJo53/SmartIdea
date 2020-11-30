import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CertificateService } from 'src/app/services/user_services/certificate.service';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css'],
})
export class WarningDialogComponent implements OnInit {

  buttonMessage: string = 'Si';
  constructor(public matDialogRef: MatDialogRef<WarningDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
  ngOnInit(): void {}
  accept() {
    this.matDialogRef.close(true);
  }
  cancel() {
    this.matDialogRef.close(false);
  }
}
