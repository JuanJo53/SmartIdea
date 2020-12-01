import { Notification } from '../../models/notification.model';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/user_services/notification.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  notifications: Notification[] = [];
  notificationCount: number;
  showNotification: boolean;
  constructor(
    private notificationService: NotificationService,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.fecthNotifications();
  }
  viewNotification(id: number): void {
    this.notificationService
      .markSeenNotification(1, id)
      .subscribe((notification) => {
        console.log(notification);
      });
  }
  fecthNotifications(): void {
    this.notificationService
      .getUserNotifications(1)
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.notificationCount = this.notifications.length;
        console.log(this.notificationCount);
        console.table(notifications);
      });
  }
}
