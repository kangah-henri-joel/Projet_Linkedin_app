// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'network',
    loadComponent: () => import('./network/network.component').then(m => m.NetworkComponent)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./jobs/jobs.component').then(m => m.JobsComponent)
  },
  {
    path: 'messaging',
    loadComponent: () => import('./messaging/messaging.component').then(m => m.MessagingComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];