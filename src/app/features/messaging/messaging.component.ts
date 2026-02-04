import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="messaging-container">
      <h2>Messagerie</h2>
      <p>Vos conversations privées</p>
    </div>
  `,
  styles: [`
    .messaging-container {
      padding: 1rem;
    }
    h2 {
      color: #0a66c2;
    }
  `]
})
export class MessagingComponent {}
