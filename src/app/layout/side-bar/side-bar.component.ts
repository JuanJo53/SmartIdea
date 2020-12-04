import { NotificationDetailsComponent } from './../../modules/components/dialogs/notification-details/notification-details.component';
import { Notification } from '../../models/notification.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/user_services/notification.service';
import { UserService } from '../../services/user_services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import {LoginComponent} from "../../modules/home/pages/login/login.component";

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
  intervalId: any;
  notifications: Notification[] = [];
  notificationCount: number = 0;
  showNotification: boolean;
  iduser: string;
  logo: string = 'assets/images/logo.JPG';

  constructor(
    private notificationService: NotificationService,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.intervalId = setInterval(() => this.fecthNotifications(), 20000);
    this.fecthNotifications();
    this.getimage();
    this.iduser = localStorage.getItem('userId');
    console.log(localStorage)
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  viewNotification(id: number): void {
    this.notificationService
      .markSeenNotification(parseInt(this.iduser), id)
      .subscribe((notification) => {
        console.log(notification);
      });
  }
  getNotificationDetails(id: number): void {
    this.openDialog(id);
    console.log('Notify id clicked: ' + id.toString());
  }
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(NotificationDetailsComponent, {
      width: '700px',
      data: {
        notificationId: id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.viewNotification(id);
      this.ngOnInit();
    });
  }
  fecthNotifications(): void {
    this.notificationCount = 0;
    this.notificationService
      .getUserNotifications(parseInt(this.iduser))
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.notifications.forEach((notif) => {
          if (notif.status === 2) {
            this.notificationCount++;
          }
        });
      });
    console.log('Notifications fetched');
  }
  getimage() {
    var iduser= parseInt(localStorage.getItem('userId'));
    this.userService.getUserDeatails(iduser).subscribe((data) => {
      this.user = data;
    });
  }
  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    alert('Logout')
    console.log(localStorage)
    this.ngOnInit()
  }
  login(){
    const dialogref= this.dialog.open(LoginComponent,{
      width: '500px',
    });
    dialogref.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
