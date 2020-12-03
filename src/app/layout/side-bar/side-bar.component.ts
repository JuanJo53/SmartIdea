import { Notification } from '../../models/notification.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/user_services/notification.service';
import { interval, Subscription } from 'rxjs';
import {UserService} from "../../services/user_services/user.service";
import {User} from "../../models/user.model";

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
  user: User;
  intervalId: number;
  notifications: Notification[] = [];
  detailedNotification: Notification;
  notificationCount: number = 0;
  showNotification: boolean;
  logo: string = 'assets/images/logo.JPG';
  constructor(
    private notificationService: NotificationService,
    private breakpointObserver: BreakpointObserver,
    private userService:UserService,
  ) {}
  ngOnInit(): void {
    this.intervalId = setInterval(() => this.fecthNotifications(), 1000000);
    this.fecthNotifications();
    this.getimage()
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
    this.notificationService
      .getNotificationDetail(1, id)
      .subscribe((notification) => {
        this.detailedNotification = notification;
        console.log(this.detailedNotification);
      });
    console.log(id);
  }
  fecthNotifications() {
    this.notificationService
      .getUserNotifications(1)
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.notifications.forEach((notif) => {
          if (notif.status === 2) {
            this.notificationCount++;
          }
        });
        console.log(this.notificationCount);
      });
  }
  getimage(){
    this.userService.getUserDeatails().subscribe(data=>{
      this.user = data;
    });
  }
}
