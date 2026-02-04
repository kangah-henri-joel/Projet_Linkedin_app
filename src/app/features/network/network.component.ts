import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="network-container">
      <h2>Réseau</h2>
      <p>Gérez vos connexions professionnelles</p>
    </div>
  `,
  styles: [`
    .network-container {
      padding: 1rem;
    }
    h2 {
      color: #0a66c2;
    }
  `]
})
export class NetworkComponent {}
