import { Notification } from '../../models/notification.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/user_services/notification.service';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  intervalId: number;
  notifications: Notification[] = [];
  notificationCount: number;
  showNotification: boolean;
  constructor(
    private notificationService: NotificationService,
    private breakpointObserver: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.intervalId = setInterval(() => this.fecthNotifications(), 10000);
    this.fecthNotifications();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  viewNotification(id: number): void {
    this.notificationService
      .markSeenNotification(1, id)
      .subscribe((notification) => {
        console.log(notification);
      });
  }
  getNotificationDetails(id: number) {
    console.log(id);
  }
  fecthNotifications() {
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
