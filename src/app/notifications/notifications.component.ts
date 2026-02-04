import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications = [
    {
      id: '1',
      type: 'connection',
      title: 'Nouvelle demande de connexion',
      message: 'Claire Robert souhaite se connecter avec vous',
      avatar: 'assets/images/KangahHenriJoel.jpg',
      time: 'Il y a 5 minutes',
      read: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'job',
      title: 'Nouvelle offre d\'emploi correspondante',
      message: 'Senior Frontend Developer chez TechCorp Solutions',
      avatar: 'assets/images/ami2.png',
      time: 'Il y a 1 heure',
      read: false,
      actionRequired: false
    },
    {
      id: '3',
      type: 'profile_view',
      title: 'Votre profil a été consulté',
      message: 'Pierre Martin a consulté votre profil',
      avatar: 'assets/images/ami3.jpg',
      time: 'Il y a 2 heures',
      read: true,
      actionRequired: false
    },
    {
      id: '4',
      type: 'like',
      title: 'Votre publication a reçu un j\'aime',
      message: 'Sophie Bernard a aimé votre publication',
      avatar: 'assets/images/ami4.jpg',
      time: 'Il y a 3 heures',
      read: true,
      actionRequired: false
    },
    {
      id: '5',
      type: 'message',
      title: 'Nouveau message',
      message: 'Thomas Petit vous a envoyé un message',
      avatar: 'assets/images/KangahHenriJoel.jpg',
      time: 'Hier',
      read: true,
      actionRequired: false
    },
    {
      id: '7',
      type: 'profile_view',
      title: 'Votre profil a été consulté',
      message: 'Un recruteur a consulté votre profil d\'étudiant EIT',
      avatar: 'assets/images/KangahHenriJoel.jpg',
      time: 'Il y a 3 jours',
      read: true,
      actionRequired: false
    }
  ];

  filterType = 'all';
  filteredNotifications = [...this.notifications];

  constructor() {}

  ngOnInit(): void {
    this.filterNotifications();
  }

  filterNotifications(): void {
    if (this.filterType === 'all') {
      this.filteredNotifications = [...this.notifications];
    } else {
      this.filteredNotifications = this.notifications.filter(n => n.type === this.filterType);
    }
  }

  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.showNotification('Toutes les notifications marquées comme lues', 'success');
  }

  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.filterNotifications();
    this.showNotification('Notification supprimée', 'info');
  }

  acceptConnection(notificationId: string): void {
    this.markAsRead(notificationId);
    this.showNotification('Demande de connexion acceptée !', 'success');
  }

  ignoreConnection(notificationId: string): void {
    this.markAsRead(notificationId);
    this.showNotification('Demande de connexion ignorée', 'info');
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'connection':
        return 'bi-person-plus';
      case 'job':
        return 'bi-briefcase';
      case 'profile_view':
        return 'bi-eye';
      case 'like':
        return 'bi-hand-thumbs-up';
      case 'message':
        return 'bi-envelope';
      case 'endorsement':
        return 'bi-award';
      default:
        return 'bi-bell';
    }
  }

  getNotificationColor(type: string): string {
    switch (type) {
      case 'connection':
        return '#0a66c2';
      case 'job':
        return '#28a745';
      case 'profile_view':
        return '#6f42c1';
      case 'like':
        return '#e0245e';
      case 'message':
        return '#fd7e14';
      case 'endorsement':
        return '#20c997';
      default:
        return '#6c757d';
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  showNotification(message: string, type: 'success' | 'error' | 'info'): void {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
        ${message}
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }
}
