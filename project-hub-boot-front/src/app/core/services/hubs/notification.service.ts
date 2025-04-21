import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as signalR from '@microsoft/signalr';
import { UserService } from '../user/user.service';
import { Notification } from '../../../core/interfaces/Hubs/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly http = inject(HttpClient);
  private hubConnection: signalR.HubConnection | null = null; 
  private userService = inject(UserService)

  apiUrl = environment.apiUrl;

  // notification active
  notificationActive = signal<boolean>(false);

  // Notifications signals
  unreadCount = signal<number>(0);
  notifications = signal<Notification[]>([]);

  notificationCategories = signal<any[]>([
    { id: 'all', label: 'All', badge: '0' },
    { id: 'unread', label: 'Unread' },
    { id: 'read', label: 'Read' }
  ]);

  selectedCategory = signal<string>('all');

  constructor() {
    this.startConnection();
    this.loadNotifications();
  }

  // Start connection
  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/hubs/notification`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().then(() => {
      console.log('Connection started');
      this.notificationActive.set(true);
      this.loadNotifications();
    }).catch((err) => {
      console.error('Error while starting connection: ', err);
      setTimeout(() => this.startConnection(), 3000);
    });
  }

  // Load notifications
  loadNotifications() {
    const userId = this.userService.currentUser()?.id;

    if (userId) {
      this.http.get<Notification[]>(`${this.apiUrl}/notifications/user/${userId}`)
        .subscribe((notifications) => {
          this.notifications.set(notifications);
          this.updateUnreadCount();
        });
    }
  }

  // Update unread count
  updateUnreadCount() {
    const count = this.notifications().filter((n: Notification) => !n.isRead).length;
    this.unreadCount.set(count);
    
    // Update badge in categories
    const categories = [...this.notificationCategories()];
    const allCategory = categories.find(c => c.id === 'all');
    if (allCategory) {
      allCategory.badge = count.toString();
    }
    this.notificationCategories.set(categories);
  }

  markAsRead(id: number) {
    return this.http.put(`${environment.apiUrl}/api/notifications/${id}/read`, {})
      .subscribe(() => {
        this.loadNotifications();
      });
  }

  markAllAsRead() {
    const userId = this.userService.currentUser()?.id;
    if (!userId) return;
    
    return this.http.put(`${environment.apiUrl}/api/notifications/read-all?userId=${userId}`, {})
      .subscribe(() => {
        this.loadNotifications();
      });
  }

  
  
    
}
