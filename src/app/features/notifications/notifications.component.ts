import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <h2>Notifications</h2>
      <p>Vos notifications récentes</p>
    </div>
  `,
  styles: [`
    .notifications-container {
      padding: 1rem;
    }
    h2 {
      color: #0a66c2;
    }
  `]
})
export class NotificationsComponent {}
