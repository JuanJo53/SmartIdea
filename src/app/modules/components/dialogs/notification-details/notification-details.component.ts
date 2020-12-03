import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/user_services/notification.service';
import { Notification } from '../../../../models/notification.model';
@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css'],
})
export class NotificationDetailsComponent implements OnInit {
  detailedNotification: Notification;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<NotificationDetailsComponent>
  ) {}

  ngOnInit(): void {
    this.detailedNotification = this.data;
    this.getNotificationDetails(this.detailedNotification.notificationId);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  goToProject(): void {
    this.dialogRef.close();
  }
  getNotificationDetails(id: number) {
    this.notificationService
      .getNotificationDetail(1, id)
      .subscribe((notification) => {
        this.detailedNotification = notification;
        console.log(this.detailedNotification);
      });
  }
}
