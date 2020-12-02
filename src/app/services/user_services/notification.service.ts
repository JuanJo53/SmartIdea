import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../../models/notification.model';
import apiKey from '../apiKey';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getUserNotifications(id: number) {
    return this.http.get<Notification[]>(
      apiKey.api + '/user/' + id + '/notifications'
    );
  }
  getNotificationDetail(userid: number, notifid: number) {
    return this.http.get<Notification>(
      apiKey.api + '/user/' + userid + '/notifications/' + notifid
    );
  }
  markSeenNotification(userid: number, notifid: number) {
    return this.http.put(
      apiKey.api + '/user/' + userid + '/notifications/' + notifid,
      null
    );
  }
}
